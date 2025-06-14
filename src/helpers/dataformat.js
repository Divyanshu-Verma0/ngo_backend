export function candidateDataFormat(candidateData) {
    try {
        const formattedData = {
            name: candidateData.name,
            fatherName: candidateData.fatherName,
            address: {
                houseNo: candidateData.houseNo || candidateData['address.houseNo'],
                locality: candidateData.locality || candidateData['address.locality'],
                state: candidateData.state || candidateData['address.state'],
                city: candidateData.city || candidateData['address.city'],
                postalCode: candidateData.postalCode || candidateData['address.postalCode'],
            },
            mobileNumber: candidateData.mobileNumber,
            email: candidateData.email,
            qualification: candidateData.qualification,
            skills: Array.isArray(candidateData.skills) ? candidateData.skills :
                candidateData.skills ? candidateData.skills.split(',').map(s => s.trim()) : [],
            category: candidateData.category,
            aadharNumber: candidateData.aadharNumber,
            status: 'PENDING',
        };

        return formattedData;
    } catch (error) {
        throw error;
    }
}

export function employerDataFormat(employerData) {
    try {
        const formattedData = {
            companyName: employerData.companyName,
            registrationID: employerData.registrationID,
            companyAddress: {
                locality: employerData.locality || employerData['companyAddress.locality'],
                state: employerData.state || employerData['companyAddress.state'],
                city: employerData.city || employerData['companyAddress.city'],
                postalCode: employerData.postalCode || employerData['companyAddress.postalCode'],
            },
            industry: employerData.industry,
            contactPerson: {
                name: employerData.contactPersonName || employerData['contactPerson.name'],
                designation: employerData.contactPersonDesignation || employerData['contactPerson.designation'],
                email: employerData.contactPersonEmail || employerData['contactPerson.email'],
                mobileNumber: employerData.contactPersonMobile || employerData['contactPerson.mobileNumber'],
            },
            jobsOffered: employerData.jobsOffered,
            status: 'PENDING',
        };

        return formattedData;
    } catch (error) {
        throw error;
    }
}

export function trainingProviderDataFormat(trainingProviderData) {
    try {
        const formattedData = {
            agencyName: trainingProviderData.agencyName,
            registrationID: trainingProviderData.registrationID,
            agencyAddress: {
                locality: trainingProviderData.locality || trainingProviderData['agencyAddress.locality'],
                state: trainingProviderData.state || trainingProviderData['agencyAddress.state'],
                city: trainingProviderData.city || trainingProviderData['agencyAddress.city'],
                postalCode: trainingProviderData.postalCode || trainingProviderData['agencyAddress.postalCode'],
            },
            contactPerson: {
                name: trainingProviderData.contactPersonName || trainingProviderData['contactPerson.name'],
                designation: trainingProviderData.contactPersonDesignation || trainingProviderData['contactPerson.designation'],
                email: trainingProviderData.contactPersonEmail || trainingProviderData['contactPerson.email'],
                mobileNumber: trainingProviderData.contactPersonMobile || trainingProviderData['contactPerson.mobileNumber'],
            },
            skillsOffered: Array.isArray(trainingProviderData.skillsOffered) ? trainingProviderData.skillsOffered :
                trainingProviderData.skillsOffered ? trainingProviderData.skillsOffered.split(',').map(s => s.trim()) : [],
        };

        return formattedData;
    } catch (error) {
        throw error;
    }
}