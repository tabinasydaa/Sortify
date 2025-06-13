const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const db = require('./db');  // Koneksi ke database
const cors = require('cors');  // Mengimpor CORS

const app = express();

// Menambahkan middleware CORS setelah inisialisasi app
app.use(cors());  // Menambahkan middleware CORS

app.use(bodyParser.json());  // Agar bisa menerima JSON di request body

// Middleware untuk verifikasi JWT token (optional, jika ingin proteksi)
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }
    
    // Remove 'Bearer ' prefix if exists
    const actualToken = token.startsWith('Bearer ') ? token.slice(7) : token;
    
    jwt.verify(actualToken, 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    });
};

// Endpoint Registrasi (POST /register)
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Pastikan email dan password ada
    if (!email || !password) {
        console.log('Email atau password tidak ada');
        return res.status(400).json({ message: 'Email dan password harus diisi!' });
    }

    // Enkripsi password menggunakan bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log('Password hashed:', hashedPassword);  // Cek hasil hashing password

    const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(query, [email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);  // Log error di backend
            return res.status(500).json({ message: 'Error registering user, please try again!' });
        }
        console.log('User registered successfully:', result);  // Log jika berhasil
        return res.status(201).json({ message: 'User registered successfully' });
    });
});

// Endpoint Login (POST /login)
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Pastikan email dan password ada
    if (!email || !password) {
        console.log('Email atau password tidak ada');
        return res.status(400).json({ message: 'Email dan password harus diisi!' });
    }

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, result) => {
        if (err || result.length === 0) {
            return res.status(401).json({ message: 'User not found' });
        }

        const user = result[0];
        if (bcrypt.compareSync(password, user.password)) {  // Verifikasi password
            const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
            return res.status(200).json({ 
                message: 'Login successful', 
                token,
                userId: user.id // Mengirim userId untuk disimpan di frontend
            });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    });
});

// ==================== HISTORY ENDPOINTS ====================

// POST /api/history - Menyimpan histori baru
app.post('/api/history', (req, res) => {
    const { id_user, type, desc, status } = req.body;
    
    // Validasi input
    if (!id_user || !type || !status) {
        console.log('Data tidak lengkap:', { id_user, type, status });
        return res.status(400).json({
            success: false,
            message: 'id_user, type, dan status wajib diisi'
        });
    }

    // Validasi status
    if (!['dibuang', 'tidak_dibuang'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Status harus "dibuang" atau "tidak_dibuang"'
        });
    }

    // Validasi type (sesuai dengan enum di database)
    const validTypes = ['metal', 'battery', 'plastic', 'shoes', 'paper'];
    if (!validTypes.includes(type)) {
        return res.status(400).json({
            success: false,
            message: 'Type tidak valid. Harus salah satu dari: ' + validTypes.join(', ')
        });
    }

    // Query untuk insert data
    const query = `
        INSERT INTO histori (id_user, tanggal, type, \`desc\`, status) 
        VALUES (?, NOW(), ?, ?, ?)
    `;
    
    db.query(query, [id_user, type, desc || null, status], (err, result) => {
        if (err) {
            console.error('Error saving history:', err);
            
            // Handle foreign key constraint error
            if (err.code === 'ER_NO_REFERENCED_ROW_2') {
                return res.status(400).json({
                    success: false,
                    message: 'User ID tidak ditemukan'
                });
            }
            
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan saat menyimpan histori'
            });
        }

        console.log('History saved successfully:', result);
        
        // Ambil data yang baru disimpan
        const selectQuery = 'SELECT * FROM histori WHERE id_histori = ?';
        db.query(selectQuery, [result.insertId], (selectErr, selectResult) => {
            if (selectErr) {
                console.error('Error getting saved history:', selectErr);
                return res.status(500).json({
                    success: false,
                    message: 'Data tersimpan tapi gagal mengambil detail'
                });
            }

            res.status(201).json({
                success: true,
                message: 'Histori berhasil disimpan',
                data: selectResult[0]
            });
        });
    });
});

// GET /api/history/:userId - Mengambil histori berdasarkan user
app.get('/api/history/:userId', (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    
    const offset = (page - 1) * limit;
    
    let whereClause = 'WHERE id_user = ?';
    let queryParams = [userId];
    
    if (status && ['dibuang', 'tidak_dibuang'].includes(status)) {
        whereClause += ' AND status = ?';
        queryParams.push(status);
    }
    
    // Query untuk mengambil data dengan pagination
    const selectQuery = `
        SELECT id_histori, id_user, tanggal, type, \`desc\`, status
        FROM histori 
        ${whereClause}
        ORDER BY tanggal DESC
        LIMIT ? OFFSET ?
    `;
    
    queryParams.push(parseInt(limit), parseInt(offset));
    
    db.query(selectQuery, queryParams, (err, rows) => {
        if (err) {
            console.error('Error getting history:', err);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan saat mengambil histori'
            });
        }
        
        // Query untuk total count
        const countQuery = `SELECT COUNT(*) as total FROM histori ${whereClause}`;
        const countParams = [userId];
        if (status && ['dibuang', 'tidak_dibuang'].includes(status)) {
            countParams.push(status);
        }
        
        db.query(countQuery, countParams, (countErr, countResult) => {
            if (countErr) {
                console.error('Error getting history count:', countErr);
                return res.status(500).json({
                    success: false,
                    message: 'Terjadi kesalahan saat menghitung histori'
                });
            }
            
            res.json({
                success: true,
                data: rows,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: countResult[0].total,
                    totalPages: Math.ceil(countResult[0].total / limit)
                }
            });
        });
    });
});

// PUT /api/history/:id - Update status histori
app.put('/api/history/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['dibuang', 'tidak_dibuang'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Status harus "dibuang" atau "tidak_dibuang"'
        });
    }

    // Cek apakah record exists
    const checkQuery = 'SELECT id_histori FROM histori WHERE id_histori = ?';
    db.query(checkQuery, [id], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Error checking history:', checkErr);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan server'
            });
        }
        
        if (checkResult.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Histori tidak ditemukan'
            });
        }
        
        // Update status
        const updateQuery = 'UPDATE histori SET status = ? WHERE id_histori = ?';
        db.query(updateQuery, [status, id], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Error updating history:', updateErr);
                return res.status(500).json({
                    success: false,
                    message: 'Terjadi kesalahan saat mengupdate'
                });
            }
            
            res.json({
                success: true,
                message: 'Status berhasil diupdate',
                data: {
                    id_histori: id,
                    status: status
                }
            });
        });
    });
});

// DELETE /api/history/:id - Hapus histori
app.delete('/api/history/:id', (req, res) => {
    const { id } = req.params;

    const deleteQuery = 'DELETE FROM histori WHERE id_histori = ?';
    db.query(deleteQuery, [id], (err, result) => {
        if (err) {
            console.error('Error deleting history:', err);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan saat menghapus'
            });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Histori tidak ditemukan'
            });
        }
        
        res.json({
            success: true,
            message: 'Histori berhasil dihapus'
        });
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});