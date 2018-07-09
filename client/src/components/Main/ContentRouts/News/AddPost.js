import React from 'react'
import FileBase64 from 'react-file-base64';
import { Button, Form, TextArea } from 'semantic-ui-react';

const AddPost = ( {viewAddPost, btnEventView, getFiles, sendPost, changeTextArea, configLang} ) =>{
  return (<div className='AddPost'>
    {viewAddPost ? <div>
      <Button fluid color='yellow' content={configLang.btnClosePost} onClick={btnEventView}/>
      <Form>
        <TextArea placeholder={configLang.placeHolderPost} onChange={changeTextArea}/>
        <div className="actions">
          <div className='addPhoto'>
            <Button content={configLang.btnAddPhoto} color='teal'/>
            <FileBase64 multiple={false} onDone={getFiles}/>
          </div>
          <Button content={configLang.btnSendPost} color='teal' onClick={sendPost}/>
        </div>
      </Form>
    </div> : <Button color='yellow' fluid content='Add post' onClick={btnEventView}/>}
  </div>)
};

export default AddPost;