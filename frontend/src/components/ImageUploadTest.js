import React, { useState, useEffect } from 'react';
import axios from "axios"

const ImageUploadTest = () => {
    // const [text, setText] = useState('');
    const [img, setImg] = useState(null);
    const [posts, setPosts] = useState([]);

    let DEBUG = true;

    useEffect(()=> {
        axios.get('http://localhost:3003/image')
        .then(res => setPosts(res.data))
        .catch(err=> console.log(err))
    },[]);

    function handleSubmit(e) {
        e.preventDefault();
    
        const data = new FormData() 
    
        // data.append('content', text)
        data.append('file', img)
    
        axios.post("http://localhost:3003/image", data
        ).then(res => console.log(res)).catch(err=>console.log(err))
    }
    
    function fileChange(e) {
        setImg(e.target.files[0])
    }

    console.log('posts length', posts.length)

    // content = text
    // imghere = picture
    
    return (  
        <div style={{background: '#ccc', height: '600px', padding: '100px'}}>
            <form encType="multipart/form-data" onSubmit={(e)=> handleSubmit(e)}>
              <input type="file" onChange={e=> fileChange(e)}/>
              {/* <input type="text" value={text} onChange={e => setText(e.target.value)}/> */}
              <button>send</button>
            </form>
            {
                posts && posts.length > 0 && 
                posts.map(post => {
                return (<div key={post.id}>
                    {/* <p>{post.content}</p> */}
                    <img
                        src={`data:image/jpg;base64,${post.imghere}`}
                    />
                </div>)
                })
            }
        </div>
      );
}
 
export default ImageUploadTest;