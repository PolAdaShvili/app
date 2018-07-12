import React from 'react';
import FileBase64 from 'react-file-base64';
import { Button, Form, Icon, Image, Label, Segment } from 'semantic-ui-react';
import FieldInputs from './FieldInputs';
import NewPost from './NewPost';

const AccountComponent = ({user, mode, gender, photo, getFiles, modeOnclick, validateEmail, emailBusy,
  validateChangeInput, firstErr, surnameErr, middleErr, handleGender, saveOnClick, configLang } ) =>{
  return ( <div className='Account'>
      <div className='myPage'>
        <Form className='AccountForm'>
          <div className="photo">
            <div className='avatarBox'>
              {mode === 'edit' ? <FileBase64 className='changePhoto' multiple={false} onDone={getFiles}/> : null}
              {photo ? <Image src={photo} verticalAlign='middle' alt="avatar"/> : null}
            </div>
          </div>
          {user ? <div className='infoUser'>
            <div className='infoUserBox'>
              <div className='mode'>
                <Segment onClick={modeOnclick}>
                  {mode === 'view' ? <Icon name='eye'/> : <Icon name='edit'/>}
                </Segment>
              </div>
              <div className='mail'>
                <FieldInputs
                  mode={mode}
                  type='email'
                  fieldName='email'
                  val={user.email}
                  fieldTitle={configLang.email}
                  eventHandler={validateEmail}
                />
                {emailBusy ? <Label
                  content={configLang.emailBusy}
                  basic color='red' attached='top left'
                  size='small' pointing='below'/> : null}
              </div>
              <div className='nameBox'>
                <div className="first">
                  <FieldInputs
                    mode={mode}
                    fieldName='first'
                    val={user.name}
                    fieldTitle={configLang.first}
                    eventHandler={validateChangeInput}
                  />
                  {firstErr ? <Label
                    content={configLang.nameErr}
                    basic color='red' attached='top left'
                    size='medium' pointing='below'/> : null}
                </div>
                <div className="surname">
                  <FieldInputs
                    mode={mode}
                    fieldName='surname'
                    val={user.surname}
                    fieldTitle={configLang.surname}
                    eventHandler={validateChangeInput}
                  />
                  {surnameErr ? <Label
                    content={configLang.nameErr}
                    basic color='red' attached='top left'
                    size='medium' pointing='below'/> : null}
                </div>
              </div>
              <div className="middle">
                <FieldInputs
                  mode={mode}
                  fieldName='middle'
                  val={user.middle}
                  fieldTitle={configLang.middle}
                  eventHandler={validateChangeInput}
                />
                {middleErr ? <Label
                  content={configLang.nameErr}
                  basic color='red' attached='top left'
                  size='medium' pointing='below'/> : null}
              </div>
              <div className="additionally">
                <div className='age'>
                  <FieldInputs
                    corner={true}
                    mode={mode}
                    fieldName='age'
                    val={user.age}
                    fieldTitle={configLang.age}
                    eventHandler={validateChangeInput}
                  />
                </div>
                <div className='gender' onClick={handleGender}>
                  <Label content={configLang.gender} corner={true}/>
                  <Segment>
                    {gender === 'male' ? <Icon name='male'/> : <Icon name='female'/>}
                  </Segment>
                </div>
                {mode === 'edit' ?
                  <Button className='btnSave' primary onClick={saveOnClick} content={configLang.save}/> : null}
              </div>
            </div>
          </div> : null}
        </Form>
      </div>
    </div> )
};

export default AccountComponent;