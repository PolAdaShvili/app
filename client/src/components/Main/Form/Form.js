import React, { Component } from 'react';
import { Select, Form, Button } from 'semantic-ui-react';
import { regExp } from '../../../constants';
import Input from './Input';
import InputFileSize from './InputFile';

class FormControl extends Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      first: '',
      surname: '',
      middle: '',
      email: '',
      gender: '',
      age: '',
      photo: ''
    };

    this.handlerInput = this.handlerInput.bind ( this );
    FormControl.handlerSelect = FormControl.handlerSelect.bind ( this );
    FormControl.handlerInputFile = FormControl.handlerInputFile.bind ( this );
    FormControl.clickRegister = FormControl.clickRegister.bind ( this );
  }

  static handlerInputFile ( e ) {
    const elem = e.target.parentNode.nextSibling;
    elem.innerText = 'Photo upload';
    elem.style.backgroundColor = '#2185d0';
  }
  static validate ( regExp, name, value, ) {
    return regExp[ name ].test ( value );
  }
  static validateName ( regExp, name, value, ) {
    return ( value.search ( regExp.name ) !== - 1 );
  }
  static clickRegister () {
    console.log ( this.state );

  }
  static handlerSelect ( e ) {
    if ( e.target.children[ 0 ].innerText ) {
      e.target.classList.remove ( 'err' );
    } else {
      e.target.classList.add ( 'err' );
    }
  }

  handlerInput ( e ) {
    const { type, value, name } = e.target;

    if ( type === 'text' && name !== 'age' ) {
      if ( FormControl.validateName ( regExp, name, value ) ) {
        this.setState ( { [ name ]: value } );
        e.target.classList.remove ( 'err' );
      } else {
        e.target.classList.add ( 'err' );
      }
    } else {
      if ( FormControl.validate ( regExp, name, value ) ) {
        this.setState ( { [ name ]: value } );
        e.target.classList.remove ( 'err' );
      } else {
        e.target.classList.add ( 'err' );
      }
    }
  }

  render () {
    const { configLang } = this.props;
    const options = [
      { key: 'm', text: configLang.gender.male, value: 'male' },
      { key: 'f', text: configLang.gender.female, value: 'female' },
    ];

    return (
      <div className='FormBox'>
        <Form className='Form' size='mini'>
          <Input
            label={configLang.name}
            name='first'
            placeHolder={configLang.name}
            onChange={this.handlerInput}
          />
          <Input
            name='surname'
            label={configLang.surname}
            placeHolder={configLang.surname}
            onChange={this.handlerInput}
          />
          <Form.Group widths={2}>
            <Form.Field
              control={Select}
              name='gender'
              label={configLang.gender.title}
              options={options}
              onChange={FormControl.handlerSelect}
              placeholder={configLang.gender.title}
            />
            <Input
              name='age'
              type='number'
              label={configLang.age}
              placeHolder={configLang.age}
              onChange={this.handlerInput}
            />
          </Form.Group>
          <Input
            name='middle'
            required={false}
            label={configLang.middle}
            placeHolder={configLang.middle}
            onChange={this.handlerInput}
          />
          <Input
            name='email'
            type='email'
            label={configLang.email}
            placeHolder={configLang.email}
            onChange={this.handlerInput}

          />
          <div className='buttonBox'>
            <InputFileSize/>
            <Button fluid icon='download' className='dowLand'/>
          </div>
            <Button
              fluid color='blue'
              size='small'
              onClick={ FormControl.clickRegister }
            >
              {configLang.button}
            </Button>
        </Form>
      </div>
    )
  }
}

export default FormControl;
