import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Label, Icon, Segment, Form, Dropdown, Image, Button } from 'semantic-ui-react';
import FieldInputs from './FieldInputs';


const AccountComponent = ({user, mode, gender, photo, getFiles, modeOnclick, validateEmail,
  emailBusy, validateChangeInput, firstErr, surnameErr, middleErr, handleGender, saveOnClick}) => {
  return ( <div className='Account'>
    <div className='mode'>
      <Segment onClick={ modeOnclick }>
        { mode === 'view' ? <Icon name='eye'/> : <Icon name='edit' /> }
      </Segment>
    </div>
    <Form className='AccountForm'>
      <div className="photo">
        <div className='avatarBox'>
          { mode === 'edit' ? <FileBase64 className='changePhoto' multiple={ false } onDone={ getFiles } /> : null }
          { photo ? <Image src={photo} alt="avatar"/> : null }
        </div>
      </div>
      { user ? <div className='infoUser'>
        <div className='infoUserBox'>
          <div className='mail'>
            <FieldInputs
              mode={ mode }
              type='email'
              fieldName='email'
              val={ user.email }
              fieldTitle='Email:'
              eventHandler={ validateEmail }
            />
            { emailBusy ? <Label
              content={ emailBusy }
              basic color='red' attached='top left'
              size='middle' pointing='below'/> : null }
          </div>
          <div className='nameBox'>
            <div className="first">
              <FieldInputs
                mode={ mode }
                fieldName='first'
                val={ user.name }
                fieldTitle='First name:'
                eventHandler={ validateChangeInput }
              />
              { firstErr ? <Label
                content={firstErr}
                basic color='red' attached='top left'
                size='medium' pointing='below'/> : null }
            </div>
            <div className="surname">
              <FieldInputs
                mode={ mode }
                fieldName='surname'
                val={ user.surname }
                fieldTitle='Surname:'
                eventHandler={ validateChangeInput }
              />
              { surnameErr ? <Label
                content={surnameErr}
                basic color='red' attached='top left'
                size='medium' pointing='below'/> : null }
            </div>
          </div>
          <div className="middle">
            <FieldInputs
              mode={ mode }
              fieldName='middle'
              val={ user.middle }
              fieldTitle='Middle name:'
              eventHandler={ validateChangeInput }
            />
            { middleErr ? <Label
              content={middleErr}
              basic color='red' attached='top left'
              size='medium' pointing='below'/> : null }
          </div>
          <div className="additionally">
            <div className='age'>
              <FieldInputs
                corner={ true }
                mode={ mode }
                fieldName='age'
                val={ user.age }
                fieldTitle='Age'
                eventHandler={ validateChangeInput }
              />
            </div>
            <div className='gender' onClick={ handleGender }>
              <Label content='Gender' corner={ true }/>
              <Segment>
                { gender === 'male' ? <Icon name='male'/> : <Icon name='female'/> }
              </Segment>
            </div>
            { mode === 'edit' ? <Button className='btnSave' primary onClick={ saveOnClick } content='Save'/> : null }
          </div>
        </div>
      </div> : null }
    </Form>
  </div> )
};

export default AccountComponent;