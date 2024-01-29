import React from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';

const ImageUpload = (props) => {
  const { 
    files,
    file,
    setFiles,
    setFile, 
    getRootProps, 
    getInputProps, 
  } = props;

  let DEBUG = false;

  return (
    <>
      {files && file ? (
        <button
          className='deleteButton'
          onClick={() => {
            setFiles([]);
            setFile('');
          }}
        >
          <DeleteIcon />
        </button>
      ) : <></>
      }
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
              {...getInputProps()}
            />
            Drop a file
            {files.map(file => (
              <img 
                key={file.name} 
                src={file.preview} 
                alt={file.name} 
                onLoad={() => URL.revokeObjectURL(file.preview)}
                className='previewImage'
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUpload;
