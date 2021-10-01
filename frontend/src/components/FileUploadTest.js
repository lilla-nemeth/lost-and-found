import React, { useContext, useState } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import createHistory from 'history/createBrowserHistory';


import axios from 'axios';

const FileUploadTest = () => {

    const [fileData, setFileData] = useState();



    const { token } = useContext(ApiContext);

    // const { storeSingleImage, setFileData } = useContext(ApiContext);

    let DEBUG = true;
    console.log("file data from hooks",fileData)
    function fileChangeHandler(event) {
        setFileData(event.target.files[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        console.log('file data', fileData)

        formData.append('image', fileData);
        // console.log("FILE DATA", fileData)
        // const obj = imgData.append('image', fileData);

        console.log("form data from axios", formData)
        let options = {
            method: 'post',
            url: 'http://localhost:3003/single',
            mode: 'cors',
            headers: {
                'Content-Type': 'multipart/form-data',
                'x-auth-token': token
            },
            data: formData
            
        };
        axios(options)
        .then(res => console.log('res', res))
        .catch(err => console.log('err', err.message));
        // axios.post("https://httpbin.org/anything", formData).then((res)=> console.log(res)).catch(err => console.log(err))
        // axios.post('http://localhost:3003/single', formData, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data',
        //       'x-auth-token': token
        //     }
        // })
    }

    createHistory().replace('/single');

    return (  
        <>
            <form enctype='multipart/form-data' onSubmit={handleSubmit} style={{padding: '200px'}}>
                {/* <input type='file' value={file} onChange={fileChangeHandler}/> */}
                <input type='file' onChange={fileChangeHandler}/>
                <button className='formButton' type='submit'>Submit file to Backend</button>
            </form>








            {/* <form onSubmit={handleSubmit} action='/single' method='POST'> */}
            {/* <form onSubmit={handleSubmit} action='/single' method='POST' enctype='multipart/form-data' style={{background: '#ccc', height: '300px', width: '200px', padding: '150px'}}>
                <input type='file' name='image'/>
                <button className='formButton' type='submit'>Submit</button>
            </form> */}
            {/* <form onSubmit={handleSubmit} action='/multiple' method='POST' enctype='multipart/form-data' style={{background: '#ccc', height: '300px', width: '200px', padding: '150px'}}>
                <input type='file' name='images' multiple />
                <button className='formButton' type='submit'>Submit</button>
            </form> */}

        </>
    );
}
 
export default FileUploadTest;