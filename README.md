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

Apakah ada revisi tambahan yang ingin Anda masukkan? Atau kita lanjutkan ke bagian berikutnya?

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








