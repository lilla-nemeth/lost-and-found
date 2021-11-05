import React from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

const ImageUpload = (props) => {
    const { files, setFiles, preview, setPreview } = props;

    let DEBUG = false;

    function fileChangeHandler(event) {
        setFiles((event.target.files[0]));
        setPreview(URL.createObjectURL(event.target.files[0]));
    }

    if (DEBUG) console.log('files from ImageUpload', files);
    if (DEBUG) console.log('files.length from ImageUpload', files.length);

    return (  
        <>
            <div className='imageUploadContainer'>
                {!preview ? 
                    <>
                        <input type="file" name="file" id="file" className="inputFile" onChange={fileChangeHandler} />
                        <label for="file" className='inputLabel'>Choose a file</label>
                    </> 
                    :
                    <>
                        <button className='deleteButton' onClick={() => {setFiles([]); setPreview('')}}><DeleteIcon /></button>
                        <div className='previewContainer'>
                            <img src={preview} alt='image preview' className='previewImage'/>
                        </div> 
                    </>
                }
            </div>

        </>
    );

}
 
export default ImageUpload;