// src/business/validators/studentValidator.js
class StudentValidator {

    validateStudent(data) {
        const { student_code, first_name, last_name, email, major } = data;

        if (!student_code || !first_name || !last_name || !email || !major) {
            const err = new Error('All fields are required');
            err.name = 'ValidationError';
            throw err;
        }

        return true;
    }

    validateStudentCode(code) {
        // Format: YYXXXXX (10 digits)
        const codePattern = /^\d{10}$/;

        if (!codePattern.test(code)) {
            const err = new Error('Invalid student code format (must be 10 digits)');
            err.name = 'ValidationError';
            throw err;
        }

        return true;
    }

    validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            const err = new Error('Invalid email format');
            err.name = 'ValidationError';
            throw err;
        }

        return true;
    }

    validateMajor(major) {
        const validMajors = ['CS', 'SE', 'IT', 'CE', 'DS'];

        if (!validMajors.includes(major)) {
            const err = new Error(
                'Invalid major. Must be one of: CS, SE, IT, CE, DS'
            );
            err.name = 'ValidationError';
            throw err;
        }

        return true;
    }

    validateGPA(gpa) {
        if (typeof gpa !== 'number' || gpa < 0 || gpa > 4.0) {
            const err = new Error('GPA must be between 0.0 and 4.0');
            err.name = 'ValidationError';
            throw err;
        }

        return true;
    }

    validateStatus(status) {
        const validStatuses = ['active', 'graduated', 'suspended', 'withdrawn'];

        if (!validStatuses.includes(status)) {
            const err = new Error(
                'Invalid status. Must be one of: active, graduated, suspended, withdrawn'
            );
            err.name = 'ValidationError';
            throw err;
        }

        return true;
    }

    validateId(id) {
        const numId = Number(id);

        if (!Number.isInteger(numId) || numId <= 0) {
            const err = new Error('Invalid student ID');
            err.name = 'ValidationError';
            throw err;
        }

        return numId;
    }
}

module.exports = new StudentValidator();
