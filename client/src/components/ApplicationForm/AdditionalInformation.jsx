import React, { useRef } from "react";

const AdditionalInformation = ({ formData, handleInputChange, passportPhotoRef, nationalIDRef, educationDocRef, handlePassportUpload, handleNINUpload, handleEducationDocUpload  }) => {
    

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-900 mb-6">Additional Information</h3>
            <div className="space-y-4">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="computerAccess"
                        name="computerAccess"
                        checked={formData.computerAccess}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-900 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="computerAccess" className="text-gray-700">
                        I have access to a computer
                    </label>
                </div>
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="internetAccess"
                        name="internetAccess"
                        checked={formData.internetAccess}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-900 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="internetAccess" className="text-gray-700">
                        I have reliable internet access
                    </label>
                </div>

                {/* File input fields */}
                <div className="space-y-4">
                    <div>
                        <label htmlFor="passportPhoto" className="block text-gray-700 font-medium">
                            Passport Photograph
                        </label>
                        <input
                            type="file"
                            id="passportPhoto"
                            required
                            ref={passportPhotoRef}
                            onChange={handlePassportUpload}
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="nationalID" className="block text-gray-700 font-medium">
                            National Level Identification (Passport, NIN Slip, BVN, Driver's Licence)
                        </label>
                        <input
                            type="file"
                            id="nationalID"
                            ref={nationalIDRef}
                            onChange={handleNINUpload}
                            required
                            accept=".pdf,.jpeg,.jpg,.png/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="educationDoc" className="block text-gray-700 font-medium">
                            Highest Level of Education (PhD, MSc, BSc, HND, NCE, OND, O'Level/SSCE, Primary)
                        </label>
                        <input
                            type="file"
                            id="educationDoc"
                            onChange={handleEducationDocUpload}
                            ref={educationDocRef}
                            accept=".pdf,.jpeg,.jpg,.png"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalInformation;
