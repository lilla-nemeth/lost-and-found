import React from 'react';
import { useDropzone } from 'react-dropzone';

const styles = {
    dropZone: {
        border: '3px dashed rgb(34 102 96)', 
        background: 'rgb(243 243 243)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        height: '450px',
        overflow: 'hidden',
    },
    dropText: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        font: '700 32px/1.2 "Poppins", sans-serif',
        position: 'absolute',
        top: '50%',
        zIndex: '1',
    },
    previewContainer: {
        position: 'relative',
        height: '450px',
        overflow: 'hidden',
        width: '100%',
    },
    previewImage: {
        position: 'absolute',
        top: '50%',    
        left: '50%',
        right: '50%',
        margin: 'auto',
        transform: 'translate( -50%, -50%)',
        objectFit: 'cover',
        minHeight: '100%',
        minWidth: '100%',
        maxHeight: '150%',
        maxWidth: '150%',
        zIndex: '2',
    }
}

const DragnDropZone = (props) => {
    const { files, setFiles } = props;
    
    let DEBUG = false;
    
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
    const images = files && files.map(file => (
        <div key={file.name}>
            <div style={styles.previewContainer}>
                <img src={file.preview} style={styles.previewImage} alt='preview' />
            </div>
        </div>
    ));

    // TODO: for image uploading:
    // upload bar with percentage

    return (  
        <div>
            <div className='petListPicture'>
                <div style={styles.dropZone} {...getRootProps()}>
                        {files.length > 0 && <button className='deleteButton' onClick={() => setFiles([])}>X</button>}
                        {images}
                        <input {...getInputProps()} type='file' name='image'/>
                        <p style={styles.dropText}>Drop files here</p>
                </div>
            </div>
        </div>
    );
}
 
export default DragnDropZone;