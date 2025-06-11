const { supabaseAdmin, supabaseAuth } = require("../config/database");
const { handleError, logSuccess } = require("../utils/errorHandler");
const { ERROR_TYPES } = require("../config/constants");

class AuthService {
    // static async signUp(userData) {
    //   try {
    //     const { email, password, username, first_name, middle_name, last_name, mobile, address, organization } = userData;

    //     const { data: signUpData, error: signUpError } = await supabaseAuth.auth.signUp({
    //       email,
    //       password,
    //       options: {
    //         data: { username }
    //       }
    //     });

    //     if (signUpError) {
    //       throw handleError(ERROR_TYPES.AUTHENTICATION_ERROR, signUpError.message);
    //     }

    //     const userId = signUpData.user.id;

    //     const { error: insertError, data: userRecord } = await supabaseAdmin
    //       .from('users')
    //       .insert([{
    //         id: userId,
    //         username,
    //         first_name,
    //         middle_name,
    //         last_name,
    //         mobile,
    //         email,
    //         address,
    //         organization
    //       }])
    //       .select()
    //       .single();

    //     if (insertError) {
    //       throw handleError(ERROR_TYPES.DATABASE_ERROR, insertError.message);
    //     }

    //     logSuccess('User created successfully', { userId, email });
    //     return { user: userRecord, session: signUpData.session };
    //   } catch (error) {
    //     throw error;
    //   }
    // }

    static async logIn(email, password) {
        try {
            const { data, error } = await supabaseAuth.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw handleError(
                    ERROR_TYPES.AUTHENTICATION_ERROR,
                    error.message
                );
            }

            logSuccess("User signed in successfully", {
                userId: data.user.id,
                email,
            });
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async registerCandidate(candidateData) {
        try {
            const {
                email,
                phone,
                fullName,
                fatherName,
                address,
                locality,
                state,
                city,
                postalCode,
                qualification,
                skillsInterested,
                category,
                aadharNumber,
                knowsSomeoneInPdf,
                isInterestedForOnline,
                aadharImageUrl,
            } = candidateData;

            const { error, data } = await supabaseAdmin
                .from("candidates")
                .insert([
                    {
                        full_name: fullName,
                        father_name: fatherName,
                        address,
                        locality,
                        state,
                        city,
                        postal_code: postalCode,
                        phone,
                        email,
                        qualification,
                        skills_interested: skillsInterested,
                        category,
                        aadhar_number: aadharNumber,
                        knows_someone_in_pdf: knowsSomeoneInPdf,
                        is_interested_for_online: isInterestedForOnline,
                        aadhar_image_url: aadharImageUrl,
                        status: "pending",
                    },
                ])
                .select()
                .single();

            if (error)
                throw handleError(ERROR_TYPES.DATABASE_ERROR, error.message);

            logSuccess("Candidate registered successfully", { email });
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async registerAgency(agencyData) {
        try {
            const { email, password } = agencyData;

            const { data: signUpData, error: signUpError } =
                await supabaseAuth.auth.signUp({
                    email,
                    password,
                });

            if (signUpError)
                throw handleError(
                    ERROR_TYPES.AUTHENTICATION_ERROR,
                    signUpError.message
                );

            const agencyId = signUpData.user.id;

            const {
                agencyName,
                agencyRegNo,
                agencyAddress,
                agencyLocality,
                agencyState,
                agencyCity,
                agencyPostalCode,
                cPName,
                cPDesignation,
                cPEmail,
                cPPhone,
                offeredPrograms,
                agencyRegDocumentUrl,
            } = agencyData;

            const { error, data } = await supabaseAdmin
                .from("agencies")
                .insert([
                    {
                        id: agencyId,
                        agency_name: agencyName,
                        registration_no: agencyRegNo,
                        registration_document_url: agencyRegDocumentUrl,
                        address: agencyAddress,
                        locality: agencyLocality,
                        state: agencyState,
                        city: agencyCity,
                        postal_code: agencyPostalCode,
                        contact_person_name: cPName,
                        contact_person_designation: cPDesignation,
                        contact_person_email: cPEmail,
                        contact_person_phone: cPPhone,
                        offered_programs: offeredPrograms,
                        status: "pending",
                    },
                ])
                .select()
                .single();

            if (error)
                throw handleError(ERROR_TYPES.DATABASE_ERROR, error.message);

            logSuccess("Agency registered successfully", { email });
            return { user: data, session: signUpData.session };
        } catch (error) {
            throw error;
        }
    }

    static async registerEmployer(employerData) {
        try {
            const { email, password } = employerData;

            const { data: signUpData, error: signUpError } =
                await supabaseAuth.auth.signUp({
                    email,
                    password,
                });

            if (signUpError)
                throw handleError(
                    ERROR_TYPES.AUTHENTICATION_ERROR,
                    signUpError.message
                );

            const employerId = signUpData.user.id;

            const {
                companyName,
                companyRegNo,
                companyAddress,
                companyLocality,
                companyState,
                companyCity,
                companyPostalCode,
                industry,
                cPName,
                cPDesignation,
                cPEmail,
                cPPhone,
                offeredJobs,
                companyRegDocumentUrl,
            } = employerData;

            const { error, data } = await supabaseAdmin
                .from("employers")
                .insert([
                    {
                        id: employerId,
                        company_name: companyName,
                        registration_no: companyRegNo,
                        registration_document_url: companyRegDocumentUrl,
                        address: companyAddress,
                        locality: companyLocality,
                        state: companyState,
                        city: companyCity,
                        postal_code: companyPostalCode,
                        industry,
                        contact_person_name: cPName,
                        contact_person_designation: cPDesignation,
                        contact_person_email: cPEmail,
                        contact_person_phone: cPPhone,
                        offered_jobs: offeredJobs,
                        status: "pending",
                    },
                ])
                .select()
                .single();

            if (error)
                throw handleError(ERROR_TYPES.DATABASE_ERROR, error.message);

            logSuccess("Employer registered successfully", { email });
            return { user: data, session: signUpData.session };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthService;
