import axios from 'axios';
import React,{ Component } from 'react';
import { Button,Form, Label } from 'semantic-ui-react';
import { regExp } from '../../../constants';
import Input from './Input';
import browserHistory from '../../../browserHistory';

class FormControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      first:'',surname:'',email:'',gender:'',age:'', photo: ''
    };

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
    e.preventDefault();
    const {photo} = this.state;
    const requiredFields = Object.values( this.state ).every(( field => field ));

    if ( requiredFields && photo && photo !== 'photo is big' ) {
    const formData = new FormData();
      Object.keys( this.state ).filter( fieldName => {
        fieldName !== 'photo' ? formData.append( `${fieldName}`, this.state[fieldName] ) :
          formData.append( `${fieldName}`, this.fileUpload.files[0] );
      });

      axios({
        method: 'post', url: '/api/user',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
      })
      .then( res => {
        console.log( res.data.password );
        res.data.message ? this.setState({ email: res.data.message }) :
          localStorage.setItem('token', res.data.token)
            this.props.addUser( res.data )
      })
      .catch( err => {
        console.log( 'post_ERRORS_/API/user/___Form--->', err );
      });

    } else {
      console.log('Selected photo or enter fields!');
    }
  }

  render(){
    const {configLang, auth, addUser} = this.props;
    const onPhotoChange = () =>{
      const file = this.fileUpload.files[ 0 ];
      file.size > 40 && file.size < 5000 ? this.setState({ photo: file }) : this.setState({ photo: 'photo is big' });
    }

    return (<div className='FormBox'>
      <Form className='Form' size='mini' encType="multipart/form-data" >
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
        <div className="mailBox">
          <Input
            name='email'
            type='email'
            className='required'
            label={configLang.email}
            placeHolder={configLang.email}
            onChange={this.handlerInput}
          />
          {this.state.email === 'email busy' ? <Label basic color='red' size='mini' pointing='above'>
            Email is busy!
          </Label> : null}
        </div>
      </Form>
      <form className='buttonBox' encType="multipart/form-data" method='post'>
        {this.state.photo === 'photo is big' ?
          <Button fluid icon='download' className='dowLand' content={'photo is big'}/> :
          <Button fluid icon='download' className='dowLand' content={'upload photo'}/> }
        <input
          name='upload'
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
    </div>)
  }
}

export default FormControl;