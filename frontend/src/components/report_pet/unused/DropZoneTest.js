import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

const styles = {
    previewContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        height: '300px',
        width: '300px',
        overflow: 'hidden', 
        position: 'absolute', 
    }
}

const DropZoneTest = () => {
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState('');

    let DEBUG = false;

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
                        return setErrors(`Error: ${err.message}`);
                    }

                    if (err.code === 'file-invalid-type') {
                        return setErrors(`Error: ${err.message}`);
                    }
                });
            });
            const acceptedFilesMapped = acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file), errors
            }))
            setFiles(currentFile => [...currentFile,...acceptedFilesMapped,...rejectedFiles]);
            
        }

    });

    const images = files.map(file => (
        <div key={file.name}>
            <div style={styles.previewContainer}>
                <img src={file.preview} style={styles.previewImage} alt='preview' />
            </div>
        </div>
    ));

    // return (  
    //     <div {...getRootProps()}>
    //         <input {...getInputProps()}/>
    //             <p style={{ color: 'red'}}>{errors}</p>
    //             <p>Some text here</p>
    //             {/* <p style={{ color: 'green'}}>{}</p> */}
    //     </div>
    // );

    return (  
        <div>
            <div className='petPicture'>
                <div style={styles.inputImage} {...getRootProps()}>
                    {/* <div style={{overflow: 'hidden', position: 'absolute', bottom: '0'}}> */}
                        {images}
                    {/* </div> */}
                        <input {...getInputProps()} type='file'/>
                        <p style={{lineHeight: '300px',textAlign: 'center'}}>
                            Drop files here
                        </p>
                        <p style={{ color: 'red'}}>{errors}</p>
                </div>
            </div>
        </div>
    );

}
 
export default DropZoneTest;