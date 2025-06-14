const { JobVacancy } = require('../models/employer');
const Candidate = require('../models/candidate');
const { handleError } = require('../utils/errorHandler');
const { ERROR_TYPES } = require('../config/constants');

class JobProviderService {
    static async createJob(jobData) {
        try {
            const newJob = new JobVacancy(jobData);
            return await newJob.save();
        } catch (error) {
            throw error;
        }
    }

    static async editJob(jobId, jobData) {
        try {
            const updatedJob = await JobVacancy.findByIdAndUpdate(jobId, jobData, { new: true });
            if (!updatedJob) throw handleError(ERROR_TYPES.NOT_FOUND, 'Job not found');
            return updatedJob;
        } catch (error) {
            throw error;
        }
    }

    static async deleteJob(jobId) {
        try {
            const deletedJob = await JobVacancy.findByIdAndDelete(jobId);
            if (!deletedJob) throw handleError(ERROR_TYPES.NOT_FOUND, 'Job not found');
        } catch (error) {
            throw error;
        }
    }

    static async getAllAssignedCandidates(employerId, status) {
        try {
            const query = { employerId };
            if (status) {
                query.status = status; // Add status filter if provided
            }
            return Candidate.find(query);
        } catch (error) {
            throw error;
        }
    }

    static async getSingleCandidate(candidateId) {
        try {
            const candidate = await Candidate.findById(candidateId);
            if (!candidate) throw handleError(ERROR_TYPES.NOT_FOUND, 'Candidate not found');
            return candidate;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = JobProviderService;
