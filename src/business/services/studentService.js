// src/business/services/studentService.js
const studentRepository = require('../../data/repositories/studentRepository');
const studentValidator = require('../validators/studentValidator');

class StudentService {

    // GET ALL
    async getAllStudents({ major = null, status = null } = {}) {
        // 1. Validate filters
        if (major) studentValidator.validateMajor(major);
        if (status) studentValidator.validateStatus(status);

        // 2. Repository
        const students = await studentRepository.findAll(major, status);

        // 3. Statistics
        const total = students.length;
        const active = students.filter(s => s.status === 'active').length;
        const graduated = students.filter(s => s.status === 'graduated').length;
        const suspended = students.filter(s => s.status === 'suspended').length;

        const avgGPA =
            total === 0
                ? 0
                : (
                    students.reduce((sum, s) => sum + (s.gpa || 0), 0) / total
                ).toFixed(2);

        // 4. Return
        return {
            students,
            statistics: {
                total,
                active,
                graduated,
                suspended,
                avgGPA: Number(avgGPA)
            }
        };
    }

    // GET BY ID
    async getStudentById(id) {
        // 1. Validate ID
        studentValidator.validateId(id);

        // 2. Repository
        const student = await studentRepository.findById(id);

        // 3. Not found
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        // 4. Return
        return student;
    }

    // CREATE
    async createStudent(studentData) {
        // 1. Validate student data
        studentValidator.validateStudent(studentData);

        // 2. Validate student code
        studentValidator.validateStudentCode(studentData.student_code);

        // 3. Validate email
        studentValidator.validateEmail(studentData.email);

        // 4. Validate major
        studentValidator.validateMajor(studentData.major);

        // 5. Repository
        const createdStudent = await studentRepository.create(studentData);

        // 6. Return
        return createdStudent;
    }

    // UPDATE ALL DATA
    async updateStudent(id, studentData) {
        studentValidator.validateId(id);
        studentValidator.validateStudent(studentData);

        const existingStudent = await studentRepository.findById(id);
        if (!existingStudent) {
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

        // 2. Check student
        const student = await studentRepository.findById(id);
        if (!student) {
            const err = new Error('Student not found');
            err.name = 'NotFoundError';
            throw err;
        }

        // 3. Update
        return await studentRepository.updateGPA(id, gpa);
    }

    // UPDATE STATUS
    async updateStatus(id, status) {
        // 1. Validate
        studentValidator.validateStatus(status);

        // 2. Check student
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

        // 4. Update
        return await studentRepository.updateStatus(id, status);
    }

    // DELETE
    async deleteStudent(id) {
        // 1. Check student
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

        // 3. Delete
        await studentRepository.delete(id);
        return true;
    }
}

module.exports = new StudentService();
