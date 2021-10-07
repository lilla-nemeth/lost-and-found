import React, { useContext } from 'react';
import { ApiContext } from '../../contexts/ApiContext';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

const ImageUpload = (props) => {
    const { files, setFiles, preview, setPreview } = props;

    const { storeSingleImage, storeMultipleImages } = useContext(ApiContext);

    let DEBUG = true;

    function fileChangeHandler(event) {
        setFiles((event.target.files[0]));
        setPreview(URL.createObjectURL(event.target.files[0]));
    }

    // function handleSubmit(event) {
    //     event.preventDefault(); 

    //     if (files.length > 0) {
    //         storeSingleImage(files, (res) => console.log(res));
    //     }
        // storeMultipleImages(files, (res) => console.log(res));

    // }

    if (DEBUG) console.log('files from ImageUpload', files);
    if (DEBUG) console.log('files.length from ImageUpload', files.length);

    {/* <form enctype='multipart/form-data' onSubmit={handleSubmit} className='imageUploadContainer'> */}
    {/* </form> */}

    return (  
        <>
            <div className='imageUploadContainer'>
                {!preview ? 
                    <>
                        <input type="file" name="image" id="file" enctype='multipart/form-data' className="inputFile" onChange={fileChangeHandler} />
                        <label for="file" className='inputLabel'>Choose a file</label>
                    </> 
                    :
                    <>
                        <button className='deleteButton' onClick={() => setFiles([])}><DeleteIcon /></button>
                        <div className='previewContainer'>
                            <img src={preview} className='previewImage'/>
                        </div> 
                    </>
                }
            </div>

        </>
    );

}
 
export default ImageUpload;