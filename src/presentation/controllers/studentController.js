// src/presentation/controllers/studentController.js
const studentService = require('../../business/services/studentService');

class StudentController {

    // GET /api/students?major=&status=
    async getAllStudents(req, res, next) {
        try {
            const { major, status } = req.query;

            const students = await studentService.getAllStudents({ major, status });

            res.status(200).json({
                success: true,
                data: students
            });
        } catch (error) {
            next(error);
        }
    }

    // GET /api/students/:id
    async getStudentById(req, res, next) {
        try {
            const { id } = req.params;

            const student = await studentService.getStudentById(id);

            res.status(200).json({
                success: true,
                data: student
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/students
    async createStudent(req, res, next) {
        try {
            const studentData = req.body;

            const newStudent = await studentService.createStudent(studentData);

            res.status(201).json({
                success: true,
                data: newStudent
            });
        } catch (error) {
            next(error);
        }
    }

    // PUT /api/students/:id
    async updateStudent(req, res, next) {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const updatedStudent = await studentService.updateStudent(id, updateData);

            res.status(200).json({
                success: true,
                data: updatedStudent
            });
        } catch (error) {
            next(error);
        }
    }

    // PATCH /api/students/:id/gpa
    async updateGPA(req, res, next) {
        try {
            const { id } = req.params;
            const { gpa } = req.body;

            const updatedStudent = await studentService.updateGPA(id, gpa);

            res.status(200).json({
                success: true,
                data: updatedStudent
            });
        } catch (error) {
            next(error);
        }
    }

    // PATCH /api/students/:id/status
    async updateStatus(req, res, next) {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const updatedStudent = await studentService.updateStatus(id, status);

            res.status(200).json({
                success: true,
                data: updatedStudent
            });
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/students/:id
    async deleteStudent(req, res, next) {
        try {
            const { id } = req.params;

            await studentService.deleteStudent(id);

            res.status(200).json({
                success: true,
                message: 'Student deleted successfully'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new StudentController();
