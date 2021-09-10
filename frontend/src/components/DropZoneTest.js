import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';


const DropZoneTest = () => {
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState('');

    // const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    //     const acceptedFilesMapped = acceptedFiles.map(file => {
    //         file,
    //         errors
    //     });
    //     setFiles(currentFile => [...currentFile,...acceptedFilesMapped,...rejectedFiles]);
    // }, [])

    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: (acceptedFiles, rejectedFiles) => {
            const rejectedFilesMessages = rejectedFiles.map(file => {
                file.errors.map(err => {
                    if (err.code === 'file-too-large') {
                        setErrors(`Error: ${err.message}`);
                    }

                    if (err.code === 'file-invalid-type') {
                        setErrors(`Error: ${err.message}`);
                    }
                });
            });
            const acceptedFilesMapped = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file), errors
            }))
            setFiles(currentFile => [...currentFile,...acceptedFilesMapped,...rejectedFiles]);
            
        }

    });


    return (  
        <div {...getRootProps()}>
            <input {...getInputProps()}/>
                <p style={{ color: 'red'}}>{errors}</p>
                {/* <p style={{ color: 'green'}}>{}</p> */}
        </div>
    );



}
 
export default DropZoneTest;