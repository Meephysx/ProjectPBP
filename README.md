### Kelompok 1
1. M.Zulfan.M.A     |   20230040152
2. Adelia shabira   |   20230040194
3. Siti Fauziyyah   |   20230040046  

---


### Daftar Isi Dokumentasi Proyek Pinterest Clone

1. **Pendahuluan**  
2. **Database**  
3. **Struktur Proyek**  
   - Folder dan File Utama  
4. **Endpoint API**  
5. **Kode yang Telah Dibuat**

---

### Pendahuluan  

Pinterest Clone adalah sebuah proyek aplikasi web yang dikembangkan untuk meniru fitur dasar dari platform Pinterest. Aplikasi ini dirancang untuk memberikan pengalaman pengguna dalam berbagi konten visual berupa pin, mengelola komentar, serta memungkinkan pengguna untuk melakukan berbagai interaksi, seperti melaporkan konten yang tidak sesuai.  

#### **Latar Belakang Proyek**  
Proyek ini dibuat sebagai bagian dari pembelajaran pemrograman berbasis platform, yang bertujuan untuk memahami dan mengimplementasikan konsep-konsep pengembangan aplikasi full-stack. Dengan menggunakan teknologi modern, proyek ini memberikan pemahaman menyeluruh tentang pengelolaan server, pembuatan API, dan manipulasi database.  

#### **Fungsi Utama Aplikasi**  
- **Membuat dan Berbagi Pin**: Pengguna dapat membuat pin dengan menambahkan judul, deskripsi, dan gambar.  
- **Manajemen Komentar**: Fitur untuk menambahkan, membaca, mengedit, dan menghapus komentar pada pin tertentu.  
- **Melaporkan Pin**: Pengguna dapat melaporkan pin yang tidak sesuai atau melanggar kebijakan komunitas.  
- **Pencarian dan Filter Pin**: Memudahkan pengguna untuk mencari konten tertentu berdasarkan kata kunci.  

#### **Teknologi yang Digunakan**  
- **Backend**: Node.js dengan Express.js sebagai framework utama.  
- **Database**: MySQL untuk pengelolaan data yang terstruktur.  
- **Autentikasi**: JSON Web Token (JWT) untuk keamanan akses API.  
- **Middleware**: Penggunaan middleware kustom untuk validasi, logging, dan pengelolaan error.  

#### **Tujuan Dokumentasi**  
Dokumentasi ini disusun untuk:  
1. Membantu pengembang lain memahami struktur proyek secara keseluruhan.  
2. Memberikan panduan dalam menavigasi folder, file, dan kode yang ada di dalam aplikasi ini.  
3. Mempermudah proses pengembangan lebih lanjut, seperti penambahan fitur atau perbaikan bug.  

Jika ada poin tambahan atau hal lain yang perlu dimasukkan, silakan beri tahu saya!

---

### Database

#### **Struktur Database**

Proyek Pinterest Clone menggunakan MySQL sebagai sistem manajemen basis data relasional (RDBMS). Berikut adalah detail struktur dan kode SQL untuk membuat tabel-tabel yang digunakan dalam aplikasi.

---

#### **1. Tabel Users**

**Deskripsi**:
1. **Users**
   - **id**: ID unik pengguna (Primary Key, Auto Increment).
   - **username**: Nama pengguna (Unique, Not Null).
   - **email**: Alamat email pengguna (Unique, Not Null).
   - **password_hash**: Hash dari kata sandi pengguna (Not Null).
   - **created_at**: Timestamp saat pengguna dibuat (Default: CURRENT_TIMESTAMP).

**Kode SQL**:

```sql
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

#### **2. Tabel Boards**

**Deskripsi**: 
2. **Boards**
   - **id**: ID unik board (Primary Key, Auto Increment).
   - **user_id**: ID pengguna yang membuat board (Foreign Key, Not Null).
   - **title**: Nama atau judul board (Not Null).
   - **description**: Deskripsi tambahan untuk board.
   - **created_at**: Timestamp saat board dibuat (Default: CURRENT_TIMESTAMP).

**Kode SQL**:

```sql
CREATE TABLE Boards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
```

---

#### **3. Tabel Pins**

**Deskripsi**:
3. **Pins**
   - **id**: ID unik pin (Primary Key, Auto Increment).
   - **board_id**: ID dari board tempat pin disimpan (Foreign Key, Not Null).
   - **title**: Judul dari pin (Not Null).
   - **image_url**: URL gambar untuk pin (Not Null).
   - **description**: Deskripsi tambahan untuk pin.
   - **created_at**: Timestamp saat pin dibuat (Default: CURRENT_TIMESTAMP).

**Kode SQL**:

```sql
CREATE TABLE Pins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    board_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (board_id) REFERENCES Boards(id) ON DELETE CASCADE
);
```

---

#### **4. Tabel Comments**

**Deskripsi**: 
4. **Comments**
   - **id**: ID unik komentar (Primary Key, Auto Increment).
   - **pin_id**: ID pin yang dikomentari (Foreign Key, Not Null).
   - **user_id**: ID pengguna yang memberikan komentar (Foreign Key, Not Null).
   - **comment_text**: Isi komentar (Not Null).
   - **created_at**: Timestamp saat komentar dibuat (Default: CURRENT_TIMESTAMP).

**Kode SQL**:

```sql
CREATE TABLE Comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pin_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pin_id) REFERENCES Pins(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);
```



#### **Relasi Antar Tabel**

- **Users** memiliki relasi **One-to-Many** dengan tabel **Boards**, **Pins**, dan **Comments**, karena satu pengguna dapat membuat banyak board, pin, dan komentar.
- **Boards** memiliki relasi **One-to-Many** dengan tabel **Pins**, karena satu board dapat memiliki banyak pin.
- **Pins** memiliki relasi **One-to-Many** dengan tabel **Comments**, karena satu pin dapat menerima banyak komentar.

#### **Tujuan Desain Database**

1. **Efisiensi**: Mengoptimalkan pengambilan data melalui indeks pada kolom penting seperti `id`, `username`, dan `board_id`.
2. **Integritas**: Menjaga hubungan antar tabel dengan Foreign Key untuk mencegah data yang tidak valid.
3. **Skalabilitas**: Memastikan struktur database dapat menangani peningkatan data seiring pertumbuhan aplikasi.

---

### Sturktur Proyek 

```
pinterest-clone/
├── config/
│   └── db.js                # Konfigurasi database untuk menghubungkan aplikasi ke database.
├── controllers/
│   ├── boardsController.js  # Mengelola board pada tampilan pins.
│   ├── pinsController.js    # Mengelola operasi CRUD untuk Pins.
│   ├── commentsController.js# Mengatur fungsi untuk komentar pada Pins.
│   └── usersController.js   # Mengelola data pengguna seperti getUsers, searchUsers, dll.
├── middlewares/
│   ├── authenticateToken.js # Middleware untuk memvalidasi token JWT.
│   └── errorHandler.js      # Middleware untuk penanganan error secara global.
├── node_modules/            # Berisi semua dependensi proyek yang diinstal melalui npm.
├── routes/
│   ├── boardsRoutes.js      # Routing untuk endpoint terkait tampilan.
│   ├── pinsRoutes.js        # Routing untuk endpoint terkait Pins (create, get, update, delete).
│   ├── commentsRoutes.js    # Routing untuk endpoint terkait komentar pada Pins.
│   └── usersRoutes.js       # Routing untuk endpoint terkait data pengguna.
├── .env                     # File konfigurasi environment untuk menyimpan variabel sensitif.
├── .gitignore               # File untuk menentukan direktori atau file yang diabaikan oleh Git.
├── package.json             # File konfigurasi proyek Node.js, mendeskripsikan dependensi dan skrip.
├── package-lock.json        # Versi terkunci dari dependensi proyek.
└── server.js                # Entry point utama aplikasi, tempat server Node.js dijalankan.
```

**Penjelasan Direktori:**
- **config/**: Menyimpan file konfigurasi, misalnya untuk database.
- **controllers/**: Mengelola logika utama aplikasi, seperti operasi CRUD dan autentikasi.
- **middlewares/**: Berisi middleware untuk validasi dan penanganan error.
- **node_modules/**: Direktori dependensi Node.js.
- **routes/**: Mendefinisikan endpoint aplikasi yang menghubungkan ke controller terkait.
- **.env**: Berisi variabel environment seperti koneksi database, secret key JWT, dll.


---
### Endpoint API

#### **1. User (Autentikasi)**

##### **a. Register User**
- **Endpoint**: `/api/users/register`
- **Method**: POST
- **Body**:
  ```json
  {
      "username": "exampleuser",
      "email": "example@example.com",
      "password": "password123"
  }
  ```
- **Contoh Respons**:
 ![Screenshot 2025-01-26 203734](https://github.com/user-attachments/assets/b8ff0fcc-4548-45e3-811e-286d6588dd00)


##### **b. Login User**
- **Endpoint**: `/api/users/login`
- **Method**: POST
- **Body**:
  ```json
  {
      "email": "example@example.com",
      "password": "password123"
  }
  ```
- **Contoh Respons**:
 ![Screenshot 2025-01-26 204045](https://github.com/user-attachments/assets/6d203575-b8ac-40ba-b4e8-f5bb3a93be67)


##### **c. Get All Users**
- **Endpoint**: `/api/users`
- **Method**: GET
- **Contoh Respons**:
![Screenshot 2025-01-26 204304](https://github.com/user-attachments/assets/aa4a4e25-619a-412d-b0af-cc63373bb92d)


##### **d. Search Users By ID**
- **Endpoint**: `/api/users/search?username=<query>`
- **Method**: GET
- **Contoh Respons**:
  ![Screenshot 2025-01-26 204343](https://github.com/user-attachments/assets/7748e02f-841f-4d3f-8fb9-e2f700e08afb)


---

#### **2. Board**

##### **a. Create Board**
- **Endpoint**: `/api/boards`
- **Method**: POST
- **Body**:
  ```json
  {
      "user_id": 1,
      "name": "My Travel Board",
      "description": "Board for my travel pins."
  }
  ```
- **Contoh Respons**:
  ![Screenshot 2025-01-26 204421](https://github.com/user-attachments/assets/5be9dad4-d723-47c1-b7ee-97a46735a5e4)


##### **b. Get All Boards**
- **Endpoint**: `/api/boards`
- **Method**: GET
- **Contoh Respons**:
  ![Screenshot 2025-01-26 204517](https://github.com/user-attachments/assets/38359f3f-9569-4867-ad83-7df0ad19cb1e)


##### **c. Get Board By ID**
- **Endpoint**: `/api/boards/:id`
- **Method**: GET
- **Contoh Respons**:
  ![Screenshot 2025-01-26 204552](https://github.com/user-attachments/assets/48521684-4957-4ae1-a3bb-33ed62bd4599)


##### **d. Update Board**
- **Endpoint**: `/api/boards/:id`
- **Method**: PUT
- **Body**:
  ```json
  {
      "name": "Updated Board Name",
      "description": "Updated description."
  }
  ```
- **Contoh Respons**:
  ![Screenshot 2025-01-26 204627](https://github.com/user-attachments/assets/43131796-cd89-4d52-b7fa-edfd0b0c5a4e)


##### **e. Delete Board**
- **Endpoint**: `/api/boards/:id`
- **Method**: DELETE
- **Contoh Respons**:
  ![Screenshot 2025-01-26 204704](https://github.com/user-attachments/assets/cba473ef-b763-4d90-9d17-893893a14ee7)


---

#### **3. Pins**

##### **a. Create Pin**
- **Endpoint**: `/api/pins`
- **Method**: POST
- **Body**:
  ```json
  {
      "board_id": 1,
      "title": "Beach Sunset",
      "image_url": "https://example.com/sunset.jpg",
      "description": "A beautiful sunset at the beach."
  }
  ```
- **Contoh Respons**:
  ![Screenshot 2025-01-26 204738](https://github.com/user-attachments/assets/7f0b6eb7-34db-46b6-b7ef-6a19b71fe51b)


##### **b. Get All Pins**
- **Endpoint**: `/api/pins`
- **Method**: GET
- **Contoh Respons**:
  ![Screenshot 2025-01-26 204846](https://github.com/user-attachments/assets/cc98d038-decf-42c0-938d-c6a82cb50600)


##### **c. Delete Pins**
- **Endpoint**: `/api/pins/:id`
- **Method**: DELETE
- **Contoh Respons**:
  ![Screenshot 2025-01-26 205101](https://github.com/user-attachments/assets/f33e1938-3743-4877-9c98-30db2ad18a46)

  


##### **d. Update Pin**
- **Endpoint**: `/api/pins/:id`
- **Method**: PUT
- **Body**:
  ```json
  {
      "title": "Updated Pin Title",
      "description": "Updated description."
  }
  ```
- **Contoh Respons**:
  ![Screenshot 2025-01-26 205136](https://github.com/user-attachments/assets/32caca5b-fd62-4b0f-8c3d-a053cafa1b87)


##### **e. Search Pin By Tittle**
- **Endpoint**: `/api/pins/:Tittle`
- **Method**: GET
- **Contoh Respons**:
  ![Screenshot 2025-01-26 205323](https://github.com/user-attachments/assets/a0ce2d3d-c889-44a1-9005-135295b495d7)


  ##### **e. Share Pin By Id**
- **Endpoint**: `/api/pins/:Id`
- **Method**: GET
- **Contoh Respons**:
![Screenshot 2025-01-26 205541](https://github.com/user-attachments/assets/ed4500cc-47e0-40e5-a4f6-ec9c8ca1a7c5)


---

#### **4. Comments**

##### **a. Create Comment**
- **Endpoint**: `/api/comments`
- **Method**: POST
- **Body**:
  ```json
  {
      "pin_id": 1,
      "user_id": 2,
      "comment_text": "Amazing pin!"
  }
  ```
- **Contoh Respons**:
  ![Screenshot 2025-01-26 210215](https://github.com/user-attachments/assets/8131e814-7501-498e-b092-d4bc30ea0083)


##### **b. Get All Comments for a Pin**
- **Endpoint**: `/api/comments?pin_id=<id>`
- **Method**: GET
- **Contoh Respons**:
  ![Screenshot 2025-01-26 210347](https://github.com/user-attachments/assets/fa54a1d7-b56c-46ac-b971-a0fd1ae744a7)


##### **c. Update Comment**
- **Endpoint**: `/api/comments/:id`
- **Method**: PUT
- **Body**:
  ```json
  {
      "comment_text": "Updated comment text."
  }
  ```
- **Contoh Respons**:
- ![Screenshot 2025-01-26 210641](https://github.com/user-attachments/assets/2b393bcf-e52f-428b-a7e7-996d94aa5ed3)


 ##### **d. Delete Comment By Id**
- **Endpoint**: `/api/pins/:Id`
- **Method**: DELETE
- **Contoh Respons**:
- ![Screenshot 2025-01-26 210957](https://github.com/user-attachments/assets/c3e70950-b5d3-4495-ac6c-3dae142bf6d4)


---

### Kode yang telah dibuat

---
**boardsControllers**

### `exports.createBoard`

```javascript
exports.createBoard = async (req, res) => {
    const { user_id, name, description } = req.body;

    // Validasi input
    if (!user_id || !name) {
        return res.status(400).json({
            error: "Missing required fields",
            message: "user_id and name are required"
        });
    }

    try {
        const query = `
        INSERT INTO Boards (user_id, name, description)
        VALUES (?, ?, ?)
        `;
        const values = [user_id, name, description || null];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("Error inserting board:", err.message);
                return res.status(500).json({
                    error: "Failed to create board",
                    details: err.message,
                });
            }

            return res.status(201).json({
                message: "Board created successfully",
                board: {
                    id: result.insertId,
                    user_id,
                    name,
                    description: description || null,
                    created_at: new Date().toISOString(),
                },
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
};
```

---

### Penjelasan Poin-Poin Penting:
1. **Mengambil Data dari `req.body`**:
   ```javascript
   const { user_id, name, description } = req.body;
   ```
   - Data seperti `user_id`, `name`, dan `description` diambil dari body permintaan HTTP.
   - `description` opsional, sehingga jika tidak ada, nilai default-nya adalah `null`.

2. **Validasi Input**:
   ```javascript
   if (!user_id || !name) {
       return res.status(400).json({
           error: "Missing required fields",
           message: "user_id and name are required"
       });
   }
   ```
   - Mengecek apakah `user_id` dan `name` disediakan.
   - Jika salah satu tidak ada, akan mengembalikan respon **400 Bad Request** dengan pesan error.

3. **Query SQL untuk Menambahkan Data**:
   ```javascript
   const query = `
   INSERT INTO Boards (user_id, name, description)
   VALUES (?, ?, ?)
   `;
   const values = [user_id, name, description || null];
   ```
   - Menyusun query SQL menggunakan parameterized query (`?`) untuk mencegah serangan SQL Injection.
   - Nilai `description` menggunakan operator `||` untuk memastikan nilai `null` jika tidak diisi.

4. **Eksekusi Query ke Database**:
   ```javascript
   db.query(query, values, (err, result) => {
       if (err) {
           console.error("Error inserting board:", err.message);
           return res.status(500).json({
               error: "Failed to create board",
               details: err.message,
           });
       }
   ```
   - Fungsi `db.query` digunakan untuk menjalankan query SQL ke database.
   - Jika terjadi error, log akan dicetak, dan respon **500 Internal Server Error** dikembalikan.

5. **Respon Berhasil**:
   ```javascript
   return res.status(201).json({
       message: "Board created successfully",
       board: {
           id: result.insertId,
           user_id,
           name,
           description: description || null,
           created_at: new Date().toISOString(),
       },
   });
   ```
   - Jika berhasil, akan mengembalikan respon **201 Created**.
   - Data board yang baru ditambahkan (termasuk ID-nya dari `result.insertId`) dikirimkan dalam format JSON.

---


### 1.  `exports.getBoards`**
```javascript
exports.getBoards = async (req, res) => {
    try {
        const query = "SELECT * FROM Boards";
        db.query(query, (err, results) => {
            if (err) {
                console.error("Error fetching boards:", err.message);
                return res.status(500).json({
                    error: "Failed to fetch boards",
                    details: err.message,
                });
            }

            return res.status(200).json({
                boards: results,
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
}
```

#### Penjelasan Poin-Poin:
1. **Query SQL untuk Mengambil Semua Boards**:
   ```javascript
   const query = "SELECT * FROM Boards";
   ```
   - Mengambil semua data dari tabel `Boards`.

2. **Eksekusi Query**:
   ```javascript
   db.query(query, (err, results) => {
   ```
   - Jika ada error saat mengambil data, maka akan dikembalikan respon **500 Internal Server Error**.

3. **Respon Berhasil**:
   ```javascript
   return res.status(200).json({
       boards: results,
   });
   ```
   - Jika berhasil, semua data boards dikembalikan dalam format JSON dengan respon **200 OK**.

---

### 2. `exports.updateBoard`**
```javascript
exports.updateBoard = async (req, res) => {
    const { board_id } = req.params;
    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "Missing required fields",
            message: "name is required"
        });
    }

    try {
        const query = `
        UPDATE Boards
        SET name = ?, description = ?
        WHERE id = ?
        `;
        const values = [name, description || null, board_id];

        db.query(query, values, (err, result) => {
            if (err) {      
                console.error("Error updating board:", err.message);
                return res.status(500).json({
                    error: "Failed to update board",
                    details: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Board not found",
                });
            }

            return res.status(200).json({
                message: "Board updated successfully",
                board: {
                    id: board_id,
                    name,
                    description: description || null,
                    updated_at: new Date().toISOString(),
                },
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
};
```

#### Penjelasan Poin-Poin:
1. **Validasi Input**:
   - Mengecek apakah `name` disediakan. Jika tidak, akan dikembalikan respon **400 Bad Request**.

2. **Query SQL untuk Update**:
   ```javascript
   const query = `
   UPDATE Boards
   SET name = ?, description = ?
   WHERE id = ?
   `;
   ```
   - Query untuk mengupdate data board berdasarkan `board_id`.

3. **Respon jika Data Tidak Ditemukan**:
   ```javascript
   if (result.affectedRows === 0) {
       return res.status(404).json({
           error: "Board not found",
       });
   }
   ```
   - Jika `affectedRows` bernilai 0, berarti `board_id` tidak ditemukan.

4. **Respon Berhasil**:
   ```javascript
   return res.status(200).json({
       message: "Board updated successfully",
       board: {
           id: board_id,
           name,
           description: description || null,
           updated_at: new Date().toISOString(),
       },
   });
   ```

---

### 3. `exports.deleteBoard`**
```javascript
exports.deleteBoard = async (req, res) => {
    const { board_id } = req.params;

    try {
        const query = "DELETE FROM Boards WHERE id = ?";
        db.query(query, [board_id], (err, result) => {
            if (err) {
                console.error("Error deleting board:", err.message);
                return res.status(500).json({
                    error: "Failed to delete board",
                    details: err.message,
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Board not found",
                });
            }

            return res.status(200).json({
                message: "Board deleted successfully",
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
};
```

#### Penjelasan Poin-Poin:
1. **Query SQL untuk Menghapus Data**:
   ```javascript
   const query = "DELETE FROM Boards WHERE id = ?";
   ```
   - Menghapus data berdasarkan `board_id`.

2. **Respon jika Data Tidak Ditemukan**:
   ```javascript
   if (result.affectedRows === 0) {
       return res.status(404).json({
           error: "Board not found",
       });
   }
   ```

3. **Respon Berhasil**:
   ```javascript
   return res.status(200).json({
       message: "Board deleted successfully",
   });
   ```

---

### 4. `exports.getBoardById`**
```javascript
exports.getBoardById = async (req, res) => {
    const { board_id } = req.params;

    try {
        const query = "SELECT * FROM Boards WHERE id = ?";
        db.query(query, [board_id], (err, results) => {
            if (err) {
                console.error("Error fetching board:", err.message);
                return res.status(500).json({
                    error: "Failed to fetch board",
                    details: err.message,
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    error: "Board not found",
                });
            }

            const board = results[0];

            return res.status(200).json({
                board,
            });
        });
    } catch (err) {
        console.error("Unexpected error:", err.message);
        return res.status(500).json({
            error: "An error occurred",
            details: err.message,
        });
    }
}
```

#### Penjelasan Poin-Poin:
1. **Query SQL untuk Mengambil Data berdasarkan ID**:
   ```javascript
   const query = "SELECT * FROM Boards WHERE id = ?";
   ```
   - Mengambil data board berdasarkan `board_id`.

2. **Respon jika Data Tidak Ditemukan**:
   ```javascript
   if (results.length === 0) {
       return res.status(404).json({
           error: "Board not found",
       });
   }
   ```

3. **Respon Berhasil**:
   ```javascript
   return res.status(200).json({
       board,
   });
   ```
   - Jika ditemukan, data board dikembalikan dalam format JSON.

---


**commentsControl**  

---

### 1. **`createComment`**
Fungsi ini digunakan untuk membuat komentar baru pada sebuah pin.

```javascript
exports.createComment = async (req, res) => {
  const { pin_id, user_id, comment_text } = req.body;

  // Validasi input
  if (!pin_id || !user_id || !comment_text) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Periksa apakah user_id ada di tabel users sebelum menambahkan komentar
    const checkUserQuery = "SELECT id FROM users WHERE id = ?";
    db.query(checkUserQuery, [user_id], (err, results) => {
      if (err) {
        console.error("Error checking user existence:", err.message);
        return res.status(500).json({ error: "Database error", details: err.message });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "Invalid user_id, user does not exist" });
      }

      // Jika user ditemukan, lanjutkan dengan memasukkan komentar
      const insertCommentQuery =
        "INSERT INTO Comments (pin_id, user_id, comment_text) VALUES (?, ?, ?)";
      const values = [pin_id, user_id, comment_text];

      db.query(insertCommentQuery, values, (err, result) => {
        if (err) {
          console.error("Error creating comment:", err.message);
          return res.status(500).json({
            error: "Failed to create comment",
            details: err.message,
          });
        }

        return res.status(201).json({
          message: "Comment created successfully",
          comment: {
            id: result.insertId,
            pin_id,
            user_id,
            comment_text,
            created_at: new Date(),
          },
        });
      });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    res.status(500).json({ error: "An error occurred", details: err.message });
  }
};
```

**Penjelasan**:
- **Input**: `pin_id`, `user_id`, `comment_text`.
- Fungsi ini memvalidasi input. Jika salah satu field kosong, respon error 400 akan dikirim.
- Fungsi mengecek apakah `user_id` valid dengan query ke tabel `users`.
- Jika valid, fungsi menambahkan komentar baru ke tabel `Comments` menggunakan query SQL `INSERT INTO`.
- Mengembalikan detail komentar yang berhasil dibuat.

---

### 2. **`getCommentsByPinId`**
Fungsi ini digunakan untuk mendapatkan daftar komentar berdasarkan `pin_id`.

```javascript
exports.getCommentsByPinId = async (req, res) => {
  const { pin_id } = req.params;

  try {
    const query = "SELECT * FROM Comments WHERE pin_id = ?";
    db.query(query, [pin_id], (err, results) => {
      if (err) {
        console.error("Error fetching comments:", err.message);
        return res.status(500).json({ error: "Failed to fetch comments", details: err.message });
      }

      return res.status(200).json({ comments: results });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "An error occurred", details: err.message });
  }
};
```

**Penjelasan**:
- **Input**: `pin_id` dari parameter URL.
- Fungsi menjalankan query untuk mengambil semua komentar pada tabel `Comments` berdasarkan `pin_id`.
- **Output**: JSON berisi array dari komentar terkait `pin_id`.

---

### 3. **`deleteComment`**
Fungsi ini digunakan untuk menghapus komentar berdasarkan `comment_id`.

```javascript
exports.deleteComment = async (req, res) => {
  const { comment_id } = req.params;

  try {
    const query = "DELETE FROM Comments WHERE id = ?";
    db.query(query, [comment_id], (err, result) => {
      if (err) {
        console.error("Error deleting comment:", err.message);
        return res.status(500).json({ error: "Failed to delete comment", details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return res.status(200).json({ message: "Comment deleted successfully" });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "An error occurred", details: err.message });
  }
};
```

**Penjelasan**:
- **Input**: `comment_id` dari parameter URL.
- Fungsi menjalankan query SQL `DELETE` untuk menghapus komentar dari tabel `Comments`.
- Jika `comment_id` tidak ditemukan, respon error 404 akan dikembalikan.
- Jika berhasil, respon sukses dengan pesan dikirim.

---

### 4. **`updateComment`**
Fungsi ini digunakan untuk memperbarui isi komentar berdasarkan `comment_id`.

```javascript
exports.updateComment = async (req, res) => {
  const { comment_id } = req.params;
  const { comment_text } = req.body;

  try {
    const query = "UPDATE Comments SET comment_text = ? WHERE id = ?";
    db.query(query, [comment_text, comment_id], (err, result) => {
      if (err) {
        console.error("Error updating comment:", err.message);
        return res.status(500).json({ error: "Failed to update comment", details: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Comment not found" });
      }

      return res.status(200).json({ message: "Comment updated successfully" });
    });
  } catch (err) {
    console.error("Unexpected error:", err.message);
    return res.status(500).json({ error: "An error occurred", details: err.message });
  }
};
```

**Penjelasan**:
- **Input**: 
  - `comment_id` dari parameter URL.
  - `comment_text` dari body request.
- Fungsi menjalankan query SQL `UPDATE` untuk memperbarui teks komentar.
- Jika `comment_id` tidak ditemukan, respon error 404 akan dikembalikan.
- Jika berhasil, respon sukses dikirim.

---

Semua fungsi ini memiliki struktur yang serupa:
1. Validasi input terlebih dahulu.
2. Menjalankan query SQL sesuai kebutuhan (SELECT, INSERT, UPDATE, DELETE).
3. Menangani kemungkinan error dari database.
4. Memberikan respon yang sesuai kepada client. 






