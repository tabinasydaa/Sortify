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
            return res.status(200).json({ message: 'Login successful', token });
        } else {
            return res.status(401).json({ message: 'Invalid password' });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
