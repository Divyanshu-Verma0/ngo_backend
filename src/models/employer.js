const mongoose = require('mongoose');

const employerSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    registrationID: {
        type: String,
        required: true,
        unique: true,
    },
    companyAddress: {
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
    industry: {
        type: String,
        required: true,
    },
    contactPerson: {
        name: {
            type: String,
            required: true,
        },
        designation: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
        },
        mobileNumber: {
            type: String,
            required: true,
            match: [/^\d{10}$/, 'Invalid mobile number'],
        },
    },
    jobsOffered: {
        type: String,
        required: true,
    },
    companyDocFile: {
        type: String, // Path to the file handled by multer
    },
    status: {
        type: String,
        enum: ['PENDING', 'REJECTED', 'ON_HOLD', 'APPROVED'],
        default: 'PENDING',
    }
}, { timestamps: true });

const jobVacancySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    positions: {
        type: Number,
        required: true,
        min: 1,
    },
    description: {
        type: String,
        required: true,
    },
    requiredSkills: {
        type: [String],
        required: true,
    },
    location: {
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        pincode: {
            type: String,
        },
    },
    employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Internship', 'Freelance'],
        required: true,
    },
    salaryRange: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
    },
    experienceRequired: {
        type: String,
        enum: ['Fresher', '0-1 Year', '1-3 Years', '3+ Years'],
        required: true,
    },
    applicationValidTill: {
        type: Date,
        required: true,
    },
    contactPerson: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: (v) =>
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
                message: 'Invalid email format',
            },
        },
        phone: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^[0-9]{10}$/.test(v),
                message: 'Phone number must be 10 digits',
            },
        },
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer',
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'REJECTED', 'ON_HOLD', 'APPROVED'],
        default: 'PENDING',
    },
}, { timestamps: true });

const Employer = mongoose.model('Employer', employerSchema);
const JobVacancy = mongoose.model('JobVacancy', jobVacancySchema);

module.exports = {
    Employer,
    JobVacancy
};