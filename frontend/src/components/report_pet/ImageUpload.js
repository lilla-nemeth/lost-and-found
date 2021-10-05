import React, { useContext, useState } from 'react';
import { ApiContext } from '../../contexts/ApiContext';

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

const ImageUpload = (props) => {
    const { files, setFiles } = props;
    const { storeSingleImage, storeMultipleImages } = useContext(ApiContext);

    let DEBUG = true;

    function fileChangeHandler(event) {
        setFiles(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault(); 

        // storeSingleImage(files, (res) => console.log(res));
        storeMultipleImages(files, (res) => console.log(res));

    }

    if (DEBUG) console.log('files from ImageUpload', files);

    return (  
        <>
            <form enctype='multipart/form-data' onSubmit={handleSubmit} style={{padding: '200px'}}>
                <input name='image' type='file'enctype='multipart/form-data' onChange={fileChangeHandler}/>
                {/* <button className='formButton' type='submit'>Submit file to Backend</button> */}
            </form>
        </>
    );
}
 
export default ImageUpload;