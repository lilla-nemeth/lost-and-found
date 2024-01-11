import React from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { v4 as uuidv4 } from 'uuid';

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

  // function fileChangeHandler(event) {
  //   // setFiles(event.target.files[0]);
  //   setFile(URL.createObjectURL(event.target.files[0]));
  //   console.log(event.target)
  // }

  return (
    <>
      {files && file ? (
        <button
          className='deleteButton'
          // key={uuidv4()}
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
              // onChange={(e) => setFile(URL.createObjectURL(e.target.files[0]))}
              {...getInputProps()}
            />
            Drop a file
            {files.map(file => (
              <>
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
