import React, { useContext, useState } from 'react';
import { ApiContext } from '../contexts/ApiContext';

const ImageUpload = (props) => {
    const { files, setFiles } = props;
    const { storeSingleImage, storeMultipleImages } = useContext(ApiContext);

    let DEBUG = true;

    function fileChangeHandler(event) {
        setFiles(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault(); 

        storeSingleImage(files, (res) => console.log(res));
        // storeMultipleImages(files, (res) => console.log(res));

    }

    // const images = files.map(file => (
    //     <div key={file.name}>
    //         <div style={styles.previewContainer}>
    //             <img src={file.preview} style={styles.previewImage} alt='preview' />
    //         </div>
    //     </div>
    // ));

    // if (DEBUG) console.log(files);

    return (  
        <>
            <form enctype='multipart/form-data' onSubmit={handleSubmit} style={{padding: '200px'}}>
                {/* {images} */}
                <input type='file'enctype='multipart/form-data'  onChange={fileChangeHandler}/>
                {/* <button className='formButton' type='submit'>Submit file to Backend</button> */}
            </form>
        </>
    );
}
 
export default ImageUpload;