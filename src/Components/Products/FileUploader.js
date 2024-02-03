import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';

const FileUploader = ({ className }) => {
    const [files, setFiles] = useState([]);
    const [rejected, setRejected] = useState([]);

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if (acceptedFiles?.length) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                ),
            ]);
        }

        if (rejectedFiles?.length) {
            setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        maxSize: 1024 * 1000,
        onDrop,
    });

    const removeFile = (name) => {
        setFiles((files) => files.filter((file) => file.name !== name));
    };

    const removeAll = () => {
        setFiles([]);
        setRejected([]);
    };

    const removeRejected = (name) => {
        setRejected((rejected) => rejected.filter(({ file }) => file.name !== name));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!files?.length) return;

        const formData = new FormData();
        files.forEach((file) => formData.append('file', file));
        formData.append('upload_preset', 'friendsbook');

        const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
        const data = await fetch(URL, {
            method: 'POST',
            body: formData,
        }).then((res) => res.json());

        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div
                {...getRootProps({
                    className: `dropzone border rounded text-center p-5 ${isDragActive ? 'border-primary' : ''
                        } ${className}`,
                    style: { cursor: 'pointer' },
                })}
            >
                <input {...getInputProps()} />
                <FontAwesomeIcon icon={faUpload} size="2x" className="mb-2" />
                {isDragActive ? <p>Drop the files here ...</p> : <p>Drag & drop files here, or click to select files</p>}
            </div>

            {/* Preview */}
            <section className="mt-10">
                <div className='d-flex gap-4'>
                    <button
                        type='button'
                        onClick={removeAll}
                        className='btn btn-danger mt-2'
                    >
                        Remove all files
                    </button>
                </div>

                {/* Accepted files */}
                <h3 className='mb-4 '>
                    Uploaded Files
                </h3>
                <ul className='"mt-6 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6 g-4'>
                    {files.map(file => (
                        <div key={file.name} className='rounded-md shadow-lg m-2 mt-3 position-relative'>
                            <div className='d-flex justify-content-end align-items-start position-absolute top-0 end-0 p-2'>
                            <FontAwesomeIcon
  onClick={() => removeFile(file.name)}
  icon={faTimes}
  size='lg'
  className='cursor-pointer bg-danger rounded-circle p-1 text-white'
  style={{ transition: 'background-color 0.3s ease-in-out' }}
/>

                            </div>

                            <img
                                src={file.preview}
                                alt={file.name}
                                onLoad={() => {
                                    URL.revokeObjectURL(file.preview);
                                }}
                                className='img-fluid'
                            />

                            <p className='mt-2 text-muted small font-weight-medium'>
                                {file.name}
                            </p>
                        </div>

                    ))}
                </ul>
            </section>
        </form>
    );
};

export default FileUploader;
