import React, { Component } from 'react';
import { Select, Form, Button } from 'semantic-ui-react';
import { regExp } from '../../../constans';
import Input from './Input';


class FormControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      surname: '',
      middle: '',
      email: '',
      gender: '',
      age: '',
      photo: '',
      err: false
    };

    this.handlerInput = this.handlerInput.bind(this);
    this.handlerSelect = this.handlerSelect.bind(this);
    FormControl.handlerInputFile = FormControl.handlerInputFile.bind(this);
    FormControl.clickRegister = FormControl.clickRegister.bind(this);
  }

  static handlerInputFile(e){
    const elem = e.target.parentNode.nextSibling;
    elem.innerText = 'Photo upload';
    elem.style.backgroundColor = '#2185d0';
    console.log(e.target.parentNode.nextSibling);
  }
  static validate(regExp, name, value,){
    return regExp[name].test(value);
  }
  static validateName(regExp, name, value,){
    return (value.search(regExp.name) !== -1) ;
  }
  static clickRegister(e){
    console.log(this.state);
    console.log(e.target)
  }

  handlerInput(e){
    const {type, value, name} = e.target;

    if(type === 'text' && name !== 'age'){
      if( FormControl.validateName(regExp, name, value) ){
        this.setState( {[name]: value} );
        e.target.classList.remove('err');
      } else {
        e.target.classList.add('err');
      }
    } else {
      if(FormControl.validate(regExp, name, value)){
        this.setState( {[name]: value} );
        e.target.classList.remove('err');
      } else {
        e.target.classList.add('err');
      }
    }
  }
  handlerSelect(e){
    if(e.target.children[0].innerText){
      e.target.classList.remove('err');
      this.setState({gender: e.target.children[0].innerText});
    } else {
      if(!this.state.gender){
        this.setState( {err: true} );
        e.target.classList.add('err');
      } else {
        this.setState( {err: true} );
        e.target.classList.add('err');
      }
    }
  }

  render() {
    const {configLang} = this.props;
    const options = [
      {key: 'm', text: configLang.gender.male, value: 'male'},
      {key: 'f', text: configLang.gender.female, value: 'female'},
    ];
    console.log(this.state);
    return (
      <div className='FormBox'>
        <Form className='Form' size='mini'>
          <Input
            label={ configLang.name }
            name='first'
            placeHolder={ configLang.name }
            onChange={ this.handlerInput }
          />
          <Input
            name='surname'
            label={ configLang.surname }
            placeHolder={ configLang.surname }
            onChange={ this.handlerInput }
          />
          <Form.Group widths={2}>
            <Form.Field
              control={ Select }
              name='gender'
              label={ configLang.gender.title }
              options={ options }
              onChange={ FormControl.handlerSelect }
              placeholder={ configLang.gender.title }
            />
            <Input
              name='age'
              label={ configLang.age }
              placeHolder={ configLang.age }
              onChange={ this.handlerInput }
            />
          </Form.Group>
          <Input
            name='middle'
            label={ configLang.middle }
            placeHolder={ configLang.middle }
            onChange={ this.handlerInput }
          />
          <Input
            name='email'
            type='email'
            label={ configLang.email }
            placeHolder={ configLang.email }
            onChange={ this.handlerInput }

          />
          <div className='buttonBox'>
            <Input
              name='file'
              type='file'
              label={ configLang.file }
              placeHolder={ configLang.file }
              className='uploadFile'
              onChange={ FormControl.handlerInputFile }
            />
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
