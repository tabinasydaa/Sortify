// routes/history.js
const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();

// Konfigurasi database MySQL
const dbConfig = {
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
  charset: 'utf8mb4'
};

// Membuat koneksi pool untuk performa yang lebih baik
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// POST /api/history - Menyimpan histori baru
router.post('/', async (req, res) => {
  let connection;
  
  try {
    const { id_user, type, desc, status } = req.body;
    
    // Validasi input
    if (!id_user || !type || !status) {
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
        message: 'Type tidak valid'
      });
    }

    connection = await pool.getConnection();
    
    // Query untuk insert data
    const insertQuery = `
      INSERT INTO histori (id_user, tanggal, type, \`desc\`, status) 
      VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?)
    `;
    
    const [result] = await connection.execute(insertQuery, [
      id_user,
      type,
      desc || null,
      status
    ]);

    // Ambil data yang baru disimpan
    const [newRecord] = await connection.execute(
      'SELECT * FROM histori WHERE id_histori = ?',
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: 'Histori berhasil disimpan',
      data: {
        id_histori: result.insertId,
        id_user: id_user,
        tanggal: newRecord[0].tanggal,
        type: type,
        desc: desc,
        status: status
      }
    });

  } catch (error) {
    console.error('Error saving history:', error);
    
    // Handle berbagai jenis error
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        success: false,
        message: 'User ID tidak ditemukan'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// GET /api/history/:userId - Mengambil histori berdasarkan user
router.get('/:userId', async (req, res) => {
  let connection;
  
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10, status } = req.query;
    
    const offset = (page - 1) * limit;
    
    connection = await pool.getConnection();
    
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
    
    const [rows] = await connection.execute(selectQuery, queryParams);
    
    // Query untuk total count
    const countQuery = `SELECT COUNT(*) as total FROM histori ${whereClause}`;
    const [countResult] = await connection.execute(countQuery, [userId, ...(status ? [status] : [])]);
    
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

  } catch (error) {
    console.error('Error getting history:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// PUT /api/history/:id - Update status histori
router.put('/:id', async (req, res) => {
  let connection;
  
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status || !['dibuang', 'tidak_dibuang'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status harus "dibuang" atau "tidak_dibuang"'
      });
    }

    connection = await pool.getConnection();
    
    // Cek apakah record exists
    const [checkResult] = await connection.execute(
      'SELECT id_histori FROM histori WHERE id_histori = ?',
      [id]
    );
    
    if (checkResult.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Histori tidak ditemukan'
      });
    }
    
    // Update status
    const [updateResult] = await connection.execute(
      'UPDATE histori SET status = ? WHERE id_histori = ?',
      [status, id]
    );
    
    res.json({
      success: true,
      message: 'Status berhasil diupdate',
      data: {
        id_histori: id,
        status: status
      }
    });

  } catch (error) {
    console.error('Error updating history:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// DELETE /api/history/:id - Hapus histori
router.delete('/:id', async (req, res) => {
  let connection;
  
  try {
    const { id } = req.params;

    connection = await pool.getConnection();
    
    const [deleteResult] = await connection.execute(
      'DELETE FROM histori WHERE id_histori = ?',
      [id]
    );
    
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Histori tidak ditemukan'
      });
    }
    
    res.json({
      success: true,
      message: 'Histori berhasil dihapus'
    });

  } catch (error) {
    console.error('Error deleting history:', error);
    res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan server'
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

module.exports = router;