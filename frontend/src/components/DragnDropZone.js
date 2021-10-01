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
    },
}

const DragnDropZone = () => {
    // empty arr, we map it (below)
    const [files, setFiles] = useState([]);

    // console.log(files)

    let DEBUG = true;

    // Object.assign() - usually merges multiple object elements, or can clone also
    
    
    // The Dropzone: 
    // accepted file formats like: jpg, png...
    // These are the hooks that Dropzone uses
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        multiple: 'false',
        onDrop: acceptedFiles => {
            setFiles(
                acceptedFiles.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                }))
            )
        }
    });

    // Place of Preview Image
    const images = files.map(file => (
        <div key={file.name}>
            <div style={styles.previewContainer}>
                <img src={file.preview} style={styles.previewImage} alt='preview' />
            </div>
        </div>
    ));

    

    // WHAT I NEED FOR IMAGE UPLOADING:
    // Frontend, Features: 
    // upload bar with percent; Delete button; ImageUploader component 
    // Backend: 
    // multer npm middleware; put the middleware to petreport request; test with Postman; Cloudinary;   

    return (  
        <div style={{padding: '45px 0 0 0'}}>
            <div className='petPicture'>
                <div style={{border: '3px dashed rgb(34 102 96)', background: 'rgb(243 243 243)'}} {...getRootProps()}>
                        {images}
                        <input {...getInputProps()} type='file' name='image'/>
                        <p style={{lineHeight: '350px',textAlign: 'center'}}>
                            Drop files here
                        </p>
                </div>
            </div>
            {/* Instead of button it could be an X (top right corner)*/}
            {files.length > 0 && <button onClick={() => setFiles([])}>Delete</button>}
        </div>
    );
}
 
export default DragnDropZone;