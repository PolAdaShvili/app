import React from 'react'
import FileBase64 from 'react-file-base64';
import { Form, TextArea, Button } from 'semantic-ui-react';


const AddPost = ({ viewAddPost, btnEventView, getFiles, sendPost, changeTextArea }) => {
  return (<div className='AddPost'>
    {
      viewAddPost ? <Button fluid color='yellow' content='Close' onClick={ btnEventView }/> :
        <Button color='yellow' fluid content='Add post' onClick={ btnEventView }/>
    }
    {
      viewAddPost ? <Form>
        <TextArea placeholder='New post' onChange={ changeTextArea }/>
        <div className="actions">
          <div className='addPhoto'>
            <Button content='Add photo' color='teal'/>
            <FileBase64 multiple={ false } onDone={ getFiles } />
          </div>
          <Button content='Send post' color='teal' onClick={ sendPost }/>
        </div>
      </Form> : null
    }
  </div>)
};

export default AddPost;
