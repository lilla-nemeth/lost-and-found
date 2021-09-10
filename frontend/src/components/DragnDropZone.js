import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';


const styles = {
    inputImage: {
        // textAlign: 'center',
        // lineHeight: '300px',
    },
    // if I want to see it when the picture dropped to the container
    // inputText: {
    //     position: 'absolute', 
    //     top: '0', 
    //     textAlign: 'center', 
    //     right: '0', 
    //     left: '0',
    // },
    previewContainer: {
        display: 'flex',
        // flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        height: '300px',
        width: '300px',
        overflow: 'hidden', 
        position: 'absolute', 
        // bottom: '0',
        // top: '0',
    },
    previewImage: {
        // minWidth: '100%',
        // opacity: '70%'

    }
}

const DragnDropZone = () => {
    // empty arr, we map it (below)
    const [files, setFiles] = useState([]);

    let DEBUG = true;

    // Object.assign() - usually merges multiple object elements, or can clone also
    
    
    // The Dropzone: 
    // accepted file formats like: jpg, png...
    // These are the hooks that Dropzone uses
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
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
    ))

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
                </div>
            </div>
        </div>
    );
}
 
export default DragnDropZone;