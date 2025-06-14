const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Candidate Schema
const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fatherName: {
        type: String,
        required: true,
    },
    address: {
        houseNo: String,
        locality: String,
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Invalid mobile number'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    qualification: {
        type: String,
        enum: ['High School', 'Intermediate', 'Graduation', 'Post Graduation'],
        required: true,
    },
    skills: {
        type: [String],
        enum: ['Dance', 'Recitation', 'Singing/Instrumental', 'Art Competition'],
        validate: [arrayLimit, 'Exceeds the limit of 2 skills'],
    },
    category: {
        type: String,
        required: true,
    },
    aadharFile: {
        type: String, // Path to the file handled by multer
        required: true,
    },
    aadharNumber: {
        type: String,
        required: true,
    },
    paymentReference: {
        type: String, // This will store the file path after multer uploads the file
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'REJECTED', 'ON_HOLD', 'APPROVED'],
        default: 'PENDING',
    },
    trainingProviderId: {
        type: Schema.Types.ObjectId,
        ref: 'TrainingProvider',
    },
    employerId: {
        type: Schema.Types.ObjectId,
        ref: 'Employer',
    },
    jobStatus: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        default: 'PENDING',
    },
    trainingStatus: {
        type: String,
        enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'],
        default: 'PENDING',
    }
}, { timestamps: true });

function arrayLimit(val) {
    return val.length <= 2;
}

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;