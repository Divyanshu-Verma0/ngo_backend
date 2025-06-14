const L1AdminService = require('../services/l1AdminService');
const ResponseHandler = require('../utils/response');

class L1AdminController {
    static async getAssignedRegions(req, res, next) {
        try {
            const adminId = req.user.id; // Extract admin ID from authenticated user
            const result = await L1AdminService.getAssignedRegions(adminId);
            ResponseHandler.success(res, result, 'Assigned regions fetched successfully');
        } catch (error) {
            next(error);
        }
    }

    static async getAllCandidates(req, res, next) {
        try {
            const { states, cities } = await L1AdminService.getAssignedRegions(req.user.id);
            const result = await L1AdminService.getAllRecords('candidate', states, cities);
            ResponseHandler.success(res, result, 'Candidates fetched successfully');
        } catch (error) {
            next(error);
        }
    }

    static async getAllTrainingProviders(req, res, next) {
        try {
            const { states, cities } = await L1AdminService.getAssignedRegions(req.user.id);
            const result = await L1AdminService.getAllRecords('trainingProvider', states, cities);
            ResponseHandler.success(res, result, 'Training providers fetched successfully');
        } catch (error) {
            next(error);
        }
    }

    static async getAllEmployers(req, res, next) {
        try {
            const { states, cities } = await L1AdminService.getAssignedRegions(req.user.id);
            const result = await L1AdminService.getAllRecords('employer', states, cities);
            ResponseHandler.success(res, result, 'Employers fetched successfully');
        } catch (error) {
            next(error);
        }
    }

    static async getCandidateById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await L1AdminService.getRecordById('candidate', id);
            ResponseHandler.success(res, result, 'Candidate fetched successfully');
        } catch (error) {
            next(error);
        }
    }

    static async getTrainingProviderById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await L1AdminService.getRecordById('trainingProvider', id);
            ResponseHandler.success(res, result, 'Training provider fetched successfully');
        } catch (error) {
            next(error);
        }
    }

    static async getEmployerById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await L1AdminService.getRecordById('employer', id);
            ResponseHandler.success(res, result, 'Employer fetched successfully');
        } catch (error) {
            next(error);
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const { role, id } = req.params;
            const { status } = req.body;
            const adminId = req.user.id;
            const result = await L1AdminService.updateStatus(role, id, status, adminId);
            ResponseHandler.success(res, result, 'Status updated successfully');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = L1AdminController;
