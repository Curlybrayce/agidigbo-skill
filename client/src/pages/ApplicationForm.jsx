import React, { useState, useRef } from 'react';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Book,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Loader2
} from 'lucide-react';
import AdditionalInformation from '../components/applicationForm/AdditionalInformation';
import { apiFetch } from './../services/api';
import VerificationModal from '../components/ApplicationForm/VerificationModal';

const ApplicationForm = () => {
    const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [registrationSucceed, setRegistrationSucceed] = useState(false);
    const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);

    const [isSubmittingVerification, setIsSubmittingVerification] = useState(false);
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [isEmailSending, setIsEmailSending] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [pasportUrl, setPassportUrl] = useState();
    const [errors, setErrors] = useState({});
    const [showValidation, setShowValidation] = useState(false);
    const passportPhotoRef = useRef(null);
    const nationalIDRef = useRef(null);
    const educationDocRef = useRef(null);
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        gender: '',

        // Location
        state: '',
        zone: '',
        address: '',

        // Program Details
        handwork: '',
        stream: '',
        experience: '',
        expectations: '',

        // Additional Information
        education: '',
        computerAccess: false,
        internetAccess: false,
        passportPhoto: "",
        nationalID: "",
        educationDoc: "",
    });

    const validateStep = (stepNumber) => {
        const newErrors = {};
        switch (stepNumber) {
            case 1:
                if (!formData.firstName) newErrors.firstName = 'First name is required';
                if (!formData.lastName) newErrors.lastName = 'Last name is required';
                if (!formData.email) newErrors.email = 'Email is required';
                else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
                if (!formData.phone) newErrors.phone = 'Phone number is required';
                if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
                if (!formData.gender) newErrors.gender = 'Gender is required';
                break;

            case 2:
                if (!formData.zone) newErrors.zone = 'Geopolitical zone is required';
                if (!formData.state) newErrors.state = 'State is required';
                if (!formData.address) newErrors.address = 'Address is required';
                break;

            case 3:
                if (!formData.stream) newErrors.stream = 'Program stream is required';
                if (!formData.education) newErrors.education = 'Education background is required';
                if (!formData.experience) newErrors.experience = 'Work experience is required';
                if (!formData.expectations) newErrors.expectations = 'Program expectations are required';
                break;

            case 4:
                if (!formData.computerAccess && !formData.internetAccess) {
                    newErrors.access = 'Please confirm your computer and internet access';
                }
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (validateStep(step)) {
            setStep((prev) => prev + 1); // Move to the next step
            window.scrollTo(0, 0);
            setShowValidation(false);
        } else {
            setShowValidation(true);
        }
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
        window.scrollTo(0, 0);
        setShowValidation(false);
    };

    const handleResendCode = async () => {
        setIsSubmittingVerification(false)
        setIsSubmittingVerification(false)
        await sendVerificationCode();
    };

    const handleVerificationComplete = async (emailVerificationCode) => {
        setIsSubmittingVerification(true)
        try {
            const verifyResponse = await apiFetch('/api/auth/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    verificationCode: emailVerificationCode,
                }),
            });

            const verifyData = await verifyResponse.json();
            if (verifyData.verified) {
                setIsEmailVerified(true)
                setIsVerificationModalOpen(false)
                handleSubmit();
            } else {
                setIsSubmittingVerification(false)
                console.error(verifyData.message || 'Invalid verification code');
            }
        } catch (error) {
            console.error('Failed to verify email', error);
        }
    }

    const sendVerificationCode = async () => {
        try {
            setIsEmailSending(true);
            const response = await apiFetch('/api/application/send-verification-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    phone: formData.phone,
                    fullName: `${formData.firstName}`
                }),
            });

            const verificationData = await response.json();
            // console.log('Error reach here:', verificationData)
            if (verificationData.verificationSent) {
                setIsEmailVerificationSent(true);
                setIsVerificationModalOpen(true);
            } else {
                setIsEmailSending(false);
                if (verificationData.message === "Application Exists") {
                    setIsAlreadyApplied(true);
                    setLoading(false);
                    setStep(5);
                }
            }
        } catch (error) {
            console.error("Failed to send verification code.", error);
            setIsEmailSending(false);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        console.log('dont forget it will verify the fields should in case no registration proceeds ')
        if (validateStep(4)) {
            console.log('UPloading should be')
            try {
                const response = await apiFetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        email: formData.email,
                        phone: formData.phone,  // Added phone field
                        password: formData.password,
                        gender: formData.gender,
                        dateOfBirth: formData.dateOfBirth,
                        address: formData.address,
                        state: formData.state,
                        zone: formData.zone,
                        stream: formData.stream,
                        education: formData.education,
                        educationDoc: formData.educationDoc, // File upload (may require FormData)
                        nationalID: formData.nationalID, // File upload
                        passportPhoto: formData.passportPhoto, // File upload
                        experience: formData.experience,
                        expectations: formData.expectations,
                        handwork: formData.handwork,
                        computerAccess: formData.computerAccess ? "on" : "off", // Convert boolean to expected format
                        internetAccess: formData.internetAccess ? "on" : "off", // Convert boolean to expected format
                    }),
                });
                const data = await response.json();
                if (!data.signupSucceed) {
                    setRegistrationSucceed(true);
                }
            } catch (error) {
                console.log('error:', error)
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setShowValidation(true);
        }
    };

    const statesInNigeria = [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
        "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe",
        "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
        "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
        "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
    ];
    const zones = [
        { id: 1, name: "Ibadan Zone", areas: "Ibadan North, Ibadan North-East, Ibadan North-West, Ibadan South-East, Ibadan South-West, Ido, Akinyele, Egbeda, Lagelu, Ona-Ara" },
        { id: 2, name: "Ogbomoso Zone", areas: "Ogbomoso North, Ogbomoso South, Oriire, Ogo-Oluwa, Surulere" },
        { id: 3, name: "Oyo Zone", areas: "Oyo East, Oyo West, Atiba, Afijio" },
        { id: 4, name: "Ibarapa Zone", areas: "Ibarapa Central, Ibarapa East, Ibarapa North" },
        { id: 5, name: "Oke-Ogun Zone I", areas: "Iseyin, Itesiwaju, Kajola, Iwajowa" },
        { id: 6, name: "Oke-Ogun Zone II", areas: "Saki East, Saki West, Atisbo" },
        { id: 7, name: "Ogbomoso Rural Zone", areas: "Ogo-Oluwa, Surulere (Rural Areas)" }
    ];

    const handworks = [
        "Fashion Design",
        "Hairdressing",
        "Barbing",
        "Makeup Artistry",
        "Shoe Making",
        "Bag Making",
        "Photography",
        "Welding & Fabrication",
        "Carpentry & Furniture or Upholstery Making",
        "Painting & Interior Decoration",
        "Catering & Confectionery",
        "Plumbing",
        "Tiling",
        "Aluminium Work",
        "Auto Mechanics",
        "Electrical Installations",
        "Block Molding & Bricklaying",
        "Tailoring"
    ];

    const handlePassportUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPassportUrl(url);
        formData.passportPhoto = url
        console.log('handlePassportUpload:', formData.passportPhoto);
    }

    const handleNINUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPassportUrl(url);
        formData.nationalID = url
        console.log('handleNINUpload:', formData.nationalID);

    }

    const handleEducationDocUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPassportUrl(url);
        formData.educationDoc = url
        console.log('handleEducationDocUpload:', formData.educationDoc);

    }
    // const uploadFiles = async (e) => {
    //     e.preventDefault();

    //     console.log("file:", file)

    //     // Create a FormData object to send files and form data
    //     const data = new FormData();

    //     // Append text fields to FormData
    //     Object.keys(formData).forEach((key) => {
    //         data.append(key, formData[key]);
    //     });

    //     // Append files to FormData
    //     if (passportPhotoRef.current.files[0]) {
    //         data.append("passportPhoto", passportPhotoRef.current.files[0]);
    //     }
    //     if (nationalIDRef.current.files[0]) {
    //         data.append("nationalID", nationalIDRef.current.files[0]);
    //     }
    //     if (educationDocRef.current.files[0]) {
    //         data.append("educationDoc", educationDocRef.current.files[0]);
    //     }

    //     try {
    //         // Make an API request
    //         const response = await axios.post("YOUR_BACKEND_ENDPOINT", data, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });

    //         console.log("Upload successful:", response.data);
    //         alert("Form submitted successfully!");
    //     } catch (error) {
    //         console.error("Upload failed:", error);
    //         alert("Failed to submit the form.");
    //     }
    // };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-blue-900 mb-6">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-medium mb-2"
                                    htmlFor="firstName"
                                >
                                    First Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-medium mb-2"
                                    htmlFor="lastName"
                                >
                                    Last Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                        </div>

                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                            Email<span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                            Phone Number<span className="text-red-500">*</span>
                        </label>
                        <input type="text" id="phone" inputMode='numeric' name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="dateOfBirth">
                            Date of Birth<span className="text-red-500">*</span>
                        </label>
                        <input id="dateOfBirth" inputMode='numeric' name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Gender <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                {/* <option value="other">Prefer not to say</option> */}
                            </select>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-blue-900 mb-6">Location Details</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Geopolitical Zone <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="zone"
                                value={formData.zone}
                                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Zone</option>
                                {zones.map((zone) => (
                                    <option key={zone.id} value={zone.name.toLowerCase().replace(/ /g, '-')}>
                                        {zone.name}
                                    </option>
                                ))}
                            </select>
                        </div>


                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="phone">
                            State of Residence<span className="text-red-500">*</span>
                        </label>
                        <input type="text" list='states-list' id="state" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />

                        <datalist id='states-list'>
                            {statesInNigeria.map((option, index) => (
                                <option key={index} value={option} />
                            ))}
                        </datalist>

                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor='address'>
                            Full Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${showValidation && errors[formData.address] ? 'border-red-500' : 'border-gray-300'
                                }`}
                            rows="4"
                            required
                        />
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-blue-900 mb-6">Program Selection</h3>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Preferred Stream <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="stream"
                                value={formData.stream}
                                onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select Stream</option>
                                <option value="stream1">Stream 1 Lucrative Handwork </option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor='handwork'>
                                Preferred Handwork <span className="text-red-500">*</span>
                            </label>
                            <input type="text"
                                name="handwork"
                                list='handworks-list'
                                placeholder="Select your favorite handwork from the list"
                                value={formData.handwork} onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                            <datalist id='handworks-list'>
                                {handworks.map((option, index) => (
                                    <option key={index} value={option} />
                                ))}
                            </datalist>
                        </div>

                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="education">
                            Educational Background
                            {/* <span className="text-red-500">*</span> */}
                        </label>
                        <textarea
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            placeholder="Brief description of your educational background"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${showValidation && errors[formData.education] ? 'border-red-500' : 'border-gray-300'
                                }`}
                            rows="4"
                        // required
                        />

                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="experience">
                            Work Experience
                            {/* <span className="text-red-500">*</span> */}
                        </label>
                        <textarea
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            placeholder="Brief description of your previous work experience"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${showValidation && errors[formData.experience] ? 'border-red-500' : 'border-gray-300'
                                }`}
                            rows="4"
                        // required
                        />

                        <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={name}>
                            Program Expectations
                            {/* <span className="text-red-500">*</span> */}
                        </label>
                        <textarea
                            id="expectations"
                            name="expectations"
                            value={formData.expectations}
                            onChange={handleInputChange}
                            placeholder="What do you hope to achieve from this program?"
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${showValidation && errors[formData.expectations] ? 'border-red-500' : 'border-gray-300'
                                }`}
                            rows="4"
                        // required
                        />
                    </div>
                );

            case 4:
                return (
                    <AdditionalInformation formData={formData} handleInputChange={handleInputChange} passportPhotoRef={passportPhotoRef} nationalIDRef={nationalIDRef} educationDocRef={educationDocRef} handlePassportUpload={handlePassportUpload} handleNINUpload={handleNINUpload} handleEducationDocUpload={handleEducationDocUpload} />
                );

            case 5:
                return (
                    <>
                        {registrationSucceed || isAlreadyApplied && (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-bold text-blue-900 mb-2">Application Submitted!</h3>
                                <p className="text-gray-600 mb-6">
                                    Thank you for applying. We will review your application and get back to you shortly. Please do not apply Multiple times.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                                >
                                    Back to Home
                                </button>
                            </div>
                        )}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 md:mt-[80px] px-4">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    {/* Progress Steps */}
                    {step < 5 && (
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                {[1, 2, 3, 4].map((stepNumber) => (
                                    <div
                                        key={stepNumber}
                                        className={`flex items-center ${stepNumber < 4 ? 'flex-1' : ''
                                            }`}
                                    >
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= stepNumber
                                                ? 'bg-blue-900 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                                }`}
                                        >
                                            {stepNumber}
                                        </div>
                                        {stepNumber < 4 && (
                                            <div
                                                className={`flex-1 h-1 mx-2 ${step > stepNumber ? 'bg-blue-900' : 'bg-gray-200'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Form Card */}
                    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                        <form>
                            {renderStep()}

                            {/* Navigation Buttons */}
                            {step < 5 && (
                                <div className="flex justify-between mt-8">
                                    {step > 1 && !isEmailSending && (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="flex items-center px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5 mr-1" />
                                            Back
                                        </button>
                                    )}

                                    {step < 4 ? (
                                        <button
                                            type="button"
                                            onClick={(e) => nextStep(e)}
                                            className="flex items-center px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors ml-auto"
                                        >
                                            Next
                                            <ChevronRight className="w-5 h-5 ml-1" />
                                        </button>
                                    ) : (
                                        <>
                                            {!isEmailVerified && (
                                                <button
                                                    type="button"
                                                    onClick={sendVerificationCode}
                                                    // disabled={isEmailSending}
                                                    className="flex items-center px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors ml-auto"
                                                >
                                                    {isEmailSending ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                            Sending Verification
                                                        </>
                                                    ) : (
                                                        'Submit'
                                                    )}
                                                </button>
                                            )}

                                            {isEmailVerificationSent && (
                                                <VerificationModal
                                                    isOpen={isVerificationModalOpen}
                                                    onClose={() => setIsVerificationModalOpen(false)}
                                                    onComplete={handleVerificationComplete}
                                                    isSubmitting={isSubmittingVerification}
                                                    email={formData.email}
                                                    onResendCode={handleResendCode} />
                                            )}

                                            {isEmailVerified && (
                                                <button
                                                    type="button"
                                                    onClick={handleSubmit}
                                                    // disabled={loading}
                                                    className="flex items-center px-6 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition-colors ml-auto"
                                                >
                                                    {loading ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        'Submit Application'
                                                    )}
                                                </button>
                                            )}
                                        </>
                                    )}


                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationForm;