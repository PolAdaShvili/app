import axios from 'axios';
import React,{ Component } from 'react';
import { Button,Form } from 'semantic-ui-react';
import { regExp } from '../../../constants';
import Input from './Input';
import browserHistory from '../../../browserHistory';

class FormControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      first:'',surname:'',email:'',gender:'',age:''
    };
    this.clickRegister = this.clickRegister.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    FormControl.handlerSelect = FormControl.handlerSelect.bind(this);
  }

  static validate(regExp,name,value){
    return regExp[name].test(value);
  }
  static validateName(regExp,name,value){
    return (value.search(regExp.name) !== - 1);
  }
  static handlerSelect(e){
    e.preventDefault();
    if(e.target.getAttribute('gender') === 'male' || e.target.getAttribute('gender') === 'female'){
      e.target.classList.remove('err');
      e.target.classList.add('valid');
      this.setState({gender:e.target.getAttribute('gender')});
    }else{
      e.target.classList.add('err');
      e.target.classList.remove('valid');
    }
  }

  handlerInput(e){
    const {type,value,name} = e.target;
    if(type === 'text' && name !== 'age'){
      if(FormControl.validateName(regExp,name,value)){
        this.setState({[name]:value});
        e.target.classList.add('valid');
        e.target.classList.remove('err');
      }else{
        e.target.classList.remove('valid');
        e.target.classList.add('err');
      }
    }else{
      if(FormControl.validate(regExp,name,value)){
        this.setState({[name]:value});
        e.target.classList.remove('err');
      }else{
        e.target.classList.add('err');
      }
    }
  }
  clickRegister(e){
    const data = this.state;
    const {addUserFunc} = this.props;
    const requiredFields = Object.values(this.state).every((field,i,arr) =>{
      if(field){  console.log( arr[i] );  return true }  });
    console.log(this.state);

    if(requiredFields){

      e.preventDefault();
      console.log('--> ',this.fileUpload.files[0]);
      console.log('--> ', data);
      axios({
        method: 'post',
        url: '/api/user',
        data: {data}
      })
      .then(res => {
        addUserFunc(res);
        browserHistory.push({pathname: "/"});
        console.log('ADD user info to server -->', res);
      })
      .catch(err => {
        console.log('ERROR user info to server -->', err);
      });
    }
  };


  render(){
    const {configLang} = this.props;
    const onPhotoChange =() => {
      const file = this.fileUpload.files[0];
      if(file.size > 40 && file.size < 5000){
        this.setState({photo: file});
        console.log('file dow')
      }else{
        console.log('file err size')
      }
      console.log(file);
    };

    return (<div className='FormBox'>
      <Form className='Form' size='mini'>
        <Input
          label={configLang.name}
          name='first'
          placeHolder={configLang.name}
          onChange={this.handlerInput}
        />
        <Input
          name='surname'
          className='required'
          label={configLang.surname}
          placeHolder={configLang.surname}
          onChange={this.handlerInput}
        />
        <Form.Group widths={2}>
          <Form.Group grouped size='mini'>
            <label className='label-for-select'>Select gender</label>
            <div className='selects'>
              <Button.Group>
                <Button color='blue' gender='male' size='mini' role='none' className='gender male'
                        onClick={FormControl.handlerSelect}>Male</Button>
                <Button.Or/>
                <Button color='pink' gender='female' size='mini' role='none' className='gender female'
                        onClick={FormControl.handlerSelect}>Female</Button>
              </Button.Group>
            </div>
          </Form.Group>
          <Input
            name='age'
            type='number'
            className='required'
            label={configLang.age}
            placeHolder={configLang.age}
            onChange={this.handlerInput}
          />
        </Form.Group>
        <div className='no-required'>
          <Input
            name='middle'
            className='middle'
            label={configLang.middle}
            placeHolder={configLang.middle}
            onChange={this.handlerInput}
          />
        </div>
        <Input
          name='email'
          type='email'
          className='required'
          label={configLang.email}
          placeHolder={configLang.email}
          onChange={this.handlerInput}
        />
      </Form>
      <form className='buttonBox' encType="multipart/form-data" method='post'>
        <Button fluid icon='download' className='dowLand'/>
        <input
          type="file"
          onChange={onPhotoChange}
          ref={(ref) => this.fileUpload = ref}
          accept=".png, .jpg, .jpeg"
        />
      </form>
      <Button
        type='submit'
        fluid color='blue'
        size='small'
        className='Submit'
        onClick={this.clickRegister}
      >
        {configLang.button}
      </Button>
      <form onSubmit={this.clickRegister} method='post'/>
    </div>)
  }
}

export default FormControl;