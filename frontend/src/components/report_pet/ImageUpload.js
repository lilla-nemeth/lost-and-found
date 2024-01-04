import React from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { v4 as uuidv4 } from 'uuid';

const ImageUpload = (props) => {
  const { 
    files,
    setFiles,
    setFile, 
    getRootProps, 
    getInputProps, 
  } = props;

  let DEBUG = false;

  return (
    <>
      <div {...getRootProps({
          className: 'imageUploadContainer'
        })}>
        <div className='previewContainer'>
          <div className='inputLabel'>
            <input
              type='file'
              name='file'
              id='file'
              className='inputFile'
              // onChange={(e) => console.log(e.target)}
              {...getInputProps()}
            />
            Choose a file
            {files && files.map(file => (
              <>
              <button
                className='deleteButton'
                key={uuidv4()}
                onClick={() => {
                  setFiles([]);
                  setFile('');
                }}
              >
                <DeleteIcon />
              </button>
              <img 
                key={file.name} 
                src={file.preview} 
                alt={file.name} 
                onLoad={() => URL.revokeObjectURL(file.preview)}
                className='previewImage'
              />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
