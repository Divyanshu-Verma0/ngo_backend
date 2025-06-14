const mongoose = require('mongoose');

const trainingProviderSchema = new mongoose.Schema({
    agencyName: {
        type: String,
        required: true,
    },
    registrationID: {
        type: String,
        required: true,
        unique: true,
    },
    agencyAddress: {
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
    skillsOffered: {
        type: [String],
        enum: ['Plumbing', 'Electrician Training', 'Singing/Instrumental', 'Dance', 'Basic Computer Skills', 'Tailoring'],
    },
    agencyDocFile: {
        type: String, // Path to the file handled by multer
        required: true,
    },
}, { timestamps: true });

const TrainingProvider = mongoose.model('TrainingProvider', trainingProviderSchema);

module.exports = TrainingProvider;