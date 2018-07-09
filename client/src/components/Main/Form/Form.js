import React,{ Component } from 'react';
import { Button,Form, Label } from 'semantic-ui-react';
import FileBase64 from 'react-file-base64';
import Input from './Input';
import ModalSuccessRegitration from './ModalSuccessRegitration';


const FormComponent = ({ modal, configLang, handlerInput, clickModalReg, handlerSelect,
  email, photo, getFiles, clickRegister, err }) => {
  return ( <div className='form-wrapper'>
    {modal ? <ModalSuccessRegitration
      psw={ modal.psw }
      login={ modal.email }
      eventClick={ clickModalReg }
    /> : <div className='FormBox'>
      <Form className='Form' size='mini' encType="multipart/form-data" >
        <Input
          label={ configLang.name }
          name='first'
          placeHolder={ configLang.name }
          onChange={ handlerInput }
        />
        <Input
          name='surname'
          className='required'
          label={ configLang.surname }
          placeHolder={ configLang.surname }
          onChange={ handlerInput }
        />
        <Form.Group widths={2}>
          <Form.Group grouped size='mini'>
            <label className='label-for-select'>Select gender</label>
            <div className='selects'>
              <Button.Group role='button'>
                <Button color='blue' gender='male' size='mini' role='none' className='gender male'
                        onClick={ handlerSelect }>Male</Button>
                <Button.Or/>
                <Button color='pink' gender='female' size='mini' role='none' className='gender female'
                        onClick={ handlerSelect }>Female</Button>
              </Button.Group>
            </div>
          </Form.Group>
          <Input
            name='age'
            type='number'
            className='required'
            label={ configLang.age }
            placeHolder={ configLang.age }
            onChange={ handlerInput }
          />
        </Form.Group>
        <div className='no-required'>
          <Input
            name='middle'
            className='middle'
            label={ configLang.middle }
            placeHolder={ configLang.middle }
            onChange={ handlerInput }
          />
        </div>
        <div className="mailBox">
          <Input
            name='email'
            type='email'
            className='required'
            label={configLang.email}
            placeHolder={configLang.email}
            onChange={ handlerInput }
          />
          {email === 'email busy' ? <Label basic color='red' size='mini' pointing='above'>
            Email is busy!
          </Label> : null}
        </div>
      </Form>
      <form className='buttonBox' encType="multipart/form-data" method='post'>
        { photo === 'photo is big' ?
          <Button fluid icon='download' className='dowLand' content={'photo is big'}/> :
          <Button fluid icon='download' className='dowLand' content={'upload photo'}/> }
        <FileBase64
          multiple={ false }
          onDone={ getFiles }
        />
      </form>
      <Button
        type='submit'
        fluid color='blue'
        size='small'
        className='Submit'
        onClick={ clickRegister }
      >
        {configLang.button}
      </Button>
      {
        err ? <Label basic color='red' size='small' pointing='above'>
          {err}
        </Label> : null
      }
    </div>}
  </div> )
};

export default FormComponent;