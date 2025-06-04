import React, { useState } from 'react';

export const HandleAttachments = ({
    setFieldValue,
    attachments,
    setAttachments,
    maxFileSize = 1 * 1024 * 1024, // Default 1MB
    allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.doc', '.docx'], // Default allowed extensions
}) => {
    const [errors, setErrors] = useState({});

    const extensionToMime = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };

    const allowedFileTypes = allowedExtensions.map((ext) => extensionToMime[ext] || '').filter(Boolean);

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return `${bytes} Bytes`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    };

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];

        if (!file) return; // No file selected

        const newErrors = { ...errors };

        // Validate file type
        if (!allowedFileTypes.includes(file.type)) {
            newErrors[index] = `Invalid file type. Allowed extensions are: ${allowedExtensions.join(', ')}`;
            setErrors(newErrors);
            return;
        }

        // Validate file size
        if (file.size > maxFileSize) {
            const maxFileSizeFormatted = formatFileSize(maxFileSize);
            const fileSizeFormatted = formatFileSize(file.size);
            newErrors[index] = `File size (${fileSizeFormatted}) exceeds the maximum limit of ${maxFileSizeFormatted}`;
            setErrors(newErrors);
            return;
        }

        // Clear error for this index
        delete newErrors[index];
        setErrors(newErrors);

        // Update attachments
        const newAttachments = [...attachments];
        newAttachments[index] = file;
        setAttachments(newAttachments);
        setFieldValue(`attachments`, newAttachments);
    };

    const removeAttachment = (index) => {
        const newAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(newAttachments);
        setFieldValue(`attachments`, newAttachments);

        // Remove error for this index
        const newErrors = { ...errors };
        delete newErrors[index];
        setErrors(newErrors);
    };

    return (
        <div className="form-group">
            <div className='row gy-4'>
                {attachments.map((attachment, index) => (
                    <div key={index} className="col-xl-6">
                        <div key={index} className="input-group">
                            <input
                                type="file"
                                name={`attachment-${index}`}
                                accept={allowedFileTypes.join(',')}
                                onChange={(event) => handleFileChange(index, event)}
                                className="form-control form--control"
                            />
                            <button
                                type="button"
                                onClick={() => removeAttachment(index)}
                                className="btn btn-danger"
                                style={{ marginLeft: '10px' }}
                            >
                                <i className="las la-trash"></i>
                            </button>
                            {errors[index] && (
                                <div className="text-danger" style={{ marginTop: '5px' }}>
                                    {errors[index]}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
