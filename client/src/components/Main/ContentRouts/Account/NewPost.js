import React from 'react';
import FileBase64 from 'react-file-base64';
import { Button, Feed, Image, Input, Comment, Form, Icon, TextArea } from 'semantic-ui-react';
import FieldInputs from './FieldInputs';

const NewPost = ({ user, uploadPhotos, handleChangePost, sendPost, configLang }) =>{
  return (<div>
    {user ? <div className='NewPost'>
      <Comment.Group>
        <Comment>
          <Comment.Avatar className='aside' size='large' as='a' src={ user.photo } />
          <div className="photo">
            <div className='avatarBox'>
              <FileBase64 className='changePhoto' multiple={ true } onDone={ uploadPhotos } />
              <Button icon='photo' className='btnUploadPhotos'/>
            </div>
          </div>
          <Comment.Content>
            <Comment.Author as='a'>{ `${user.name} ${user.surname}` }</Comment.Author>
            <span className='titlePost'>{ configLang.createPost }</span>
            <Form reply>
              <TextArea
                autoHeight className='textArea'
                placeholder={ configLang.createPost } onChange={ handleChangePost } />
            </Form>
            <Button icon='paper plane' className='sendPost' animated='vertical' onClick={ sendPost }/>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </div> : null}
  </div> )
};

export default NewPost;