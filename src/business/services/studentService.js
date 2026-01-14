// src/business/services/studentService.js
const studentRepository = require('../../data/repositories/studentRepository');
const studentValidator = require('../validators/studentValidator');

class StudentService {

    // GET ALL STUDENTS + STATISTICS
    async getAllStudents({ major = null, status = null } = {}) {
        // 1. Validate filters (if provided)
        if (major) studentValidator.validateMajor(major);
        if (status) studentValidator.validateStatus(status);

        // 2. เรียก repository
        const students = await studentRepository.findAll(major, status);

        // 3. คำนวณสถิติ
        const statistics = {
            total: students.length,
            active: students.filter(s => s.status === 'active').length,
            graduated: students.filter(s => s.status === 'graduated').length,
            suspended: students.filter(s => s.status === 'suspended').length,
            avgGPA:
                students.length === 0
                    ? 0
                    : (
                        students.reduce((sum, s) => sum + (s.gpa || 0), 0) /
                        students.length
                      ).toFixed(2)
        };

        // 4. return
        return { students, statistics };
    }

    // GET STUDENT BY ID
    async getStudentById(id) {
        // 1. Validate ID
        studentValidator.validateId(id);

        // 2. เรียก repository
        const student = await studentRepository.findById(id);

        // 3. ถ้าไม่เจอ
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        // 4. return student
        return student;
    }

    // CREATE STUDENT
    async createStudent(studentData) {
        // 1. Validate student data
        studentValidator.validateStudent(studentData);

        // 2. Validate student_code
        studentValidator.validateStudentCode(studentData.student_code);

        // 3. Validate email
        studentValidator.validateEmail(studentData.email);

        // 4. Validate major
        studentValidator.validateMajor(studentData.major);

        // 5. เรียก repository.create()
        const createdStudent = await studentRepository.create(studentData);

        // 6. return created student
        return createdStudent;
    }

    // UPDATE STUDENT (FULL UPDATE)
    async updateStudent(id, studentData) {
        studentValidator.validateId(id);
        studentValidator.validateStudent(studentData);

        const existing = await studentRepository.findById(id);
        if (!existing) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        return await studentRepository.update(id, studentData);
    }

    // UPDATE GPA
    async updateGPA(id, gpa) {
        // 1. Validate GPA
        studentValidator.validateGPA(gpa);

        // 2. ดึงนักศึกษาจาก repository
        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        // 3. เรียก repository.updateGPA()
        return await studentRepository.updateGPA(id, gpa);
    }

    // UPDATE STATUS
    async updateStatus(id, status) {
        // 1. Validate status
        studentValidator.validateStatus(status);

        // 2. ดึงนักศึกษา
        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        // 3. Business rule
        if (student.status === 'withdrawn') {
            const err = new Error('Cannot change status of withdrawn student');
            err.name = 'ConflictError';
            throw err;
        }

        // 4. เรียก repository.updateStatus()
        return await studentRepository.updateStatus(id, status);
    }

    // DELETE STUDENT
    async deleteStudent(id) {
        studentValidator.validateId(id);

        // 1. ดึงนักศึกษา
        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        // 2. Business rule
        if (student.status === 'active') {
            const err = new Error('Cannot delete active student');
            err.name = 'ConflictError';
            throw err;
        }

        // 3. เรียก repository.delete()
        await studentRepository.delete(id);
    }
}

module.exports = new StudentService();
