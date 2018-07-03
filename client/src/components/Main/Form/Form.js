import axios from 'axios';
import React,{ Component } from 'react';
import { Button,Form, Label } from 'semantic-ui-react';
import { regExp } from '../../../constants';
import { validate, validateName, addClassErr, addClassValid } from '../../../validateFunc';
import Input from './Input';
import ModalReg from './ModalReg';
import browserHistory from '../../../browserHistory';

class FormControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      first:'',surname:'',email:'',gender:'',age:'', photo: '', middle: '', modal: false
    };

    this.clickRegister = this.clickRegister.bind(this);
    this.clickModalReg = this.clickModalReg.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    FormControl.handlerSelect = FormControl.handlerSelect.bind(this);
  }

  static handlerSelect(e){
    e.preventDefault();
    if(e.target.getAttribute('gender') === 'male' || e.target.getAttribute('gender') === 'female'){
      addClassValid(e);
      this.setState({gender:e.target.getAttribute('gender')});
    }else{
      addClassErr(e);
    }
  }

  handlerInput(e){
    const {type,value,name} = e.target;
    if(type === 'text' && name !== 'age'){
      validateName(regExp,name,value) ? ( addClassValid(e), this.setState({ [name]:value }) ) : addClassErr(e);
    }else{
      validate(regExp,name,value) ? ( addClassValid(e), this.setState({ [name]:value }) ) : addClassErr(e);
    }
  }
  clickRegister(e){
    e.preventDefault();
    const {photo} = this.state;
    const userField = Object.keys(this.state).filter(field => { return field !== 'modal' && field !== 'middle' });
    const requiredFields = userField.every(field => this.state[field]);

    if ( requiredFields && photo && photo !== 'photo is big' ) {
    const formData = new FormData();
      Object.keys( this.state ).filter( fieldName => {
        (fieldName !== 'photo' && fieldName !== 'modal') ? formData.append( `${fieldName}`, this.state[fieldName] ) :
          formData.append( `${fieldName}`, this.fileUpload.files[0] );
      });

      axios({
        method: 'post', url: '/api/user',
        headers: {'Content-Type': 'multipart/form-data'},
        data: formData
      })
      .then( res => {
        if(res.data.message === 'email busy') {
          this.setState({ email: res.data.message });
        } else {
          localStorage.setItem('token', res.data.token);
          const data = Object.assign({}, res.data.user, {psw: res.data.password});
          this.setState({modal: data});
        }
      })
      .catch( err => {
        console.log( 'post_ERRORS_/API/user/___Form--->', err );
      });

    } else {
      console.log('Selected photo or enter fields!');
    }
  }
  clickModalReg(){
    const data = this.state.modal;
    delete data.psw;
    this.props.addUser( data );
  }

  render(){
    const {configLang, auth, addUser} = this.props;
    const { modal } = this.state;
    const onPhotoChange = () =>{
      const file = this.fileUpload.files[ 0 ];
      file.size > 40 && file.size < 5000 ? this.setState({ photo: file }) : this.setState({ photo: 'photo is big' });
    }

    return (
      <div className='form-wrapper'>
        {modal ? <ModalReg
          psw={ modal.psw }
          login={ modal.email }
          eventClick={ this.clickModalReg }
        /> : <div className='FormBox'>
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
        </div>}
      </div>
    )
  }
}

export default FormControl;