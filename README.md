# Student Management System - Layered Architecture

## 📋 Project Information

* **Student Name:** วรินทร เครืออินตา
* **Student ID:**  67543210065-8
* **Course:** ENGSE207 Software Architecture

---

## 🏗️ Architecture Style

**Layered Architecture (3-Tier Architecture)**

ระบบถูกออกแบบโดยแยกความรับผิดชอบออกเป็น 3 ชั้นหลัก เพื่อให้ง่ายต่อการพัฒนา ดูแลรักษา และขยายระบบในอนาคต

1. **Presentation Layer** – จัดการ HTTP Request/Response และ Routing
2. **Business Layer** – จัดการ Business Logic และ Validation
3. **Data Layer** – จัดการการเข้าถึงฐานข้อมูล (SQLite)

---

## 📂 Project Structure

```
project-root/
│
├── server.js                # Entry Point ของระบบ
├── students.db              # SQLite Database
│
├── src/
│   ├── presentation/        # Presentation Layer
│   │   ├── routes/           # API Routes
│   │   ├── controllers/      # Controllers
│   │   └── middlewares/      # Error Handler
│   │
│   ├── business/             # Business Layer
│   │   ├── services/         # Business Logic
│   │   └── validators/       # Data Validation
│   │
│   └── data/                 # Data Layer
│       ├── database/         # Database Connection
│       └── repositories/     # Repository Pattern
│
└── README.md                 # Project Documentation
```

---

## 🎯 Refactoring Summary

### ปัญหาของ Monolithic Architecture (เดิม):

1. โค้ดรวมอยู่ในไฟล์เดียว ทำให้โค้ดอ่านยาก
2. แก้ไขส่วนหนึ่งกระทบทั้งระบบ
3. ยากต่อการทดสอบ (Testing)
4. Business Logic ปะปนกับ Database Logic
5. ขยายระบบในอนาคตทำได้ยาก

---

### วิธีแก้ไขด้วย Layered Architecture:

1. แยก Controller ออกจาก Business Logic
2. ใช้ Service จัดการ Business Rules โดยเฉพาะ
3. ใช้ Repository Pattern สำหรับการเข้าถึง Database
4. แยก Validation ออกเป็น Module เฉพาะ
5. ใช้ Error Handling กลาง (Middleware)

---

### ประโยชน์ที่ได้รับ:

1. โค้ดเป็นระเบียบ อ่านง่าย และดูแลรักษาง่าย
2. สามารถแก้ไขหรือเพิ่มฟีเจอร์ได้โดยไม่กระทบส่วนอื่น
3. รองรับการทำ Unit Test ได้ดีขึ้น
4. ลดการพึ่งพากันระหว่าง Layer (Loose Coupling)
5. สอดคล้องกับหลัก Software Architecture ที่ดี

---

## 🚀 How to Run

```bash
# 1. Clone repository
git clone https://github.com/your-username/student-management-system.git

# 2. Install dependencies
npm install

# 3. Run server
npm start

# 4. Test API
# Open browser: http://localhost:3000
```

---

## 📝 API Endpoints

### Student APIs

| Method | Endpoint                 | Description              |
| ------ | ------------------------ | ------------------------ |
| GET    | /api/students            | ดึงข้อมูลนักศึกษาทั้งหมด |
| GET    | /api/students/:id        | ดึงข้อมูลนักศึกษาตาม ID  |
| POST   | /api/students            | เพิ่มข้อมูลนักศึกษาใหม่  |
| PUT    | /api/students/:id        | แก้ไขข้อมูลนักศึกษา      |
| PATCH  | /api/students/:id/gpa    | แก้ไข GPA                |
| PATCH  | /api/students/:id/status | เปลี่ยนสถานะนักศึกษา     |
| DELETE | /api/students/:id        | ลบข้อมูลนักศึกษา         |

---

📌 *Project นี้เป็นส่วนหนึ่งของรายวิชา ENGSE207 Software Architecture*
