const Auth = require('../models/auth');
const Candidate = require('../models/candidate');
const { Employer } = require('../models/employer');
const TrainingProvider = require('../models/trainingProvider');
const nodemailer = require('nodemailer');
const { handleError, logSuccess } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

class L1AdminService {
    static async getAssignedRegions(adminId) {
        try {
            const admin = await Auth.findById(adminId);
            if (!admin) throw handleError(ERROR_TYPES.NOT_FOUND, 'Admin not found');
            return { states: admin.assignedStates, cities: admin.assignedCities };
        } catch (error) {
            throw error;
        }
    }

    static async getAllRecords(role, states, cities) {
        try {
            const model = this.getModel(role);
            return model.find({
                $or: [{ state: { $in: states } }, { city: { $in: cities } }],
            });
        } catch (error) {
            throw error;
        }
    }

    static async getRecordById(role, id) {
        try {
            role = role.toUpperCase();
            const model = this.getModel(role);
            const record = await model.findById(id);
            if (!record) throw handleError(ERROR_TYPES.NOT_FOUND, 'Record not found');
            return record;
        } catch (error) {
            throw error;
        }
    }

    static async updateStatus(role, id, newStatus, adminId) {
        try {
            const model = this.getModel(role);
            const record = await model.findById(id);
            if (!record) throw handleError(ERROR_TYPES.NOT_FOUND, `${role} not found`);
            record.status = newStatus;
            await record.save();

            if (newStatus === 'APPROVED') {
                await Auth.create({
                    email: record.email,
                    role: role.toUpperCase(),
                    referenceId: id,
                });
                this.sendApprovalMail(record.email);
            }

            return { message: `${role} status updated successfully` };
        } catch (error) {
            throw error;
        }
    }

    static getModel(role) {
        switch (role) {
            case 'candidate': return Candidate;
            case 'employer': return Employer;
            case 'trainingProvider': return TrainingProvider;
            default: throw handleError(ERROR_TYPES.VALIDATION_ERROR, 'Invalid role');
        }
    }

    static async sendApprovalMail(email) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Approval Notification',
            text: 'Your profile has been approved.',
        });
    }
}

module.exports = L1AdminService;
