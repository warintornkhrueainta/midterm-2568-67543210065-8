# Architecture Diagram – Student Management System

## C1: Context Diagram

**Student Management System** เป็นระบบ Backend สำหรับจัดการข้อมูลนักศึกษา โดยมีผู้ใช้งานคือ

* นักศึกษา / เจ้าหน้าที่ (ผ่าน Client เช่น Browser หรือ Postman)
* ระบบเรียกใช้งานผ่าน REST API (HTTP)

Context โดยรวม:

Client → Student Management System → SQLite Database

ระบบรับ HTTP Request จาก Client ประมวลผลตาม Business Rules และจัดเก็บข้อมูลในฐานข้อมูล

---

## C2: Container Diagram (Layered Architecture)

```
┌─────────────────────────────────────┐
│     Presentation Layer              │
│  ┌──────────────────────────────┐   │
│  │ Routes → Controllers         │   │
│  │ (HTTP Handling)              │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Business Logic Layer            │
│  ┌──────────────────────────────┐   │
│  │ Services → Validators        │   │
│  │ (Business Rules)             │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│     Data Access Layer               │
│  ┌──────────────────────────────┐   │
│  │ Repositories → Database      │   │
│  │ (SQL Queries)                │   │
│  └──────────────────────────────┘   │
└──────────────┬──────────────────────┘
               │
               ▼
          ┌──────────┐
          │  SQLite  │
          └──────────┘
```

---

## Responsibilities ของแต่ละ Layer

### 1️⃣ Presentation Layer

**ที่อยู่:** `src/presentation`

**หน้าที่:**

* รับ HTTP Request จาก Client
* แยก routing ด้วย Express Routes
* Controllers ทำหน้าที่รับ–ส่งข้อมูล (Request / Response)
* ไม่เขียน Business Logic
* ส่ง error ต่อไปยัง Error Handler

ตัวอย่างไฟล์:

* `studentRoutes.js`
* `studentController.js`
* `errorHandler.js`

---

### 2️⃣ Business Logic Layer

**ที่อยู่:** `src/business`

**หน้าที่:**

* ประมวลผล Business Rules
* ตรวจสอบความถูกต้องของข้อมูล (Validation)
* คำนวณสถิติ เช่น GPA เฉลี่ย, สถานะนักศึกษา
* เป็นตัวกลางระหว่าง Controller และ Repository

ตัวอย่างไฟล์:

* `studentService.js`
* `studentValidator.js`

---

### 3️⃣ Data Access Layer

**ที่อยู่:** `src/data`

**หน้าที่:**

* ติดต่อฐานข้อมูลโดยตรง
* เขียน SQL Queries (CRUD)
* ไม่สนใจ Business Rules
* ส่งข้อมูลดิบกลับไปให้ Service

ตัวอย่างไฟล์:

* `studentRepository.js`
* `connection.js`

---

## Data Flow (Request → Response)

ตัวอย่าง: `GET /api/students`

1. Client ส่ง HTTP Request ไปยัง `/api/students`
2. Route ส่งต่อไปยัง `studentController.getAllStudents()`
3. Controller เรียก `studentService.getAllStudents()`
4. Service ตรวจสอบ filter และคำนวณ business logic
5. Service เรียก `studentRepository.findAll()`
6. Repository ดึงข้อมูลจาก SQLite
7. ข้อมูลถูกส่งกลับ → Service → Controller
8. Controller ส่ง JSON Response กลับไปยัง Client

---

## สรุป

Layered Architecture ช่วยให้ระบบ:

* แยกความรับผิดชอบชัดเจน
* ดูแลรักษาง่าย
* ทดสอบและขยายระบบได้สะดวก
* ลดการพึ่งพากันระหว่างแต่ละส่วน (Low Coupling)
