import axios from 'axios';
import React,{ Component } from 'react';
import FileBase64 from 'react-file-base64';
import { regExp } from '../constants';
import { validate, validateNames, setValidClass, setErrValidClass } from '../validateFunc';
import FormComponent from '../components/Main/Form/Form';
import browserHistory from '../browserHistory';

class FormControl extends Component {
  constructor(props){
    super(props);
    this.state = {
      first:'',surname:'',email:'',gender:'',age:'', photo: '', middle: '', modal: false, err: false
    };

    this.getFiles = this.getFiles.bind(this);
    this.clickRegister = this.clickRegister.bind(this);
    this.clickModalReg = this.clickModalReg.bind(this);
    this.handlerInput = this.handlerInput.bind(this);
    this.handlerSelect = this.handlerSelect.bind(this);
  }

  handlerSelect(e){
    e.preventDefault();
    if(e.target.getAttribute('gender') === 'male' || e.target.getAttribute('gender') === 'female'){
      setValidClass(e);
      this.setState({gender:e.target.getAttribute('gender')});
    }else{
      setErrValidClass(e);
    }
  }
  handlerInput(e){
    const {type,value,name} = e.target;
    if(type === 'text' && name !== 'age'){
      validateNames(regExp,name,value) ? ( setValidClass(e), this.setState({ [name]:value }) ) : setErrValidClass(e);
    }else{
      validate(regExp,name,value) ? ( setValidClass(e), this.setState({ [name]:value }) ) : setErrValidClass(e);
    }
  }
  clickRegister(e){
    e.preventDefault();
    const {photo} = this.state;
    const formData = new FormData();
    const userField = Object.keys(this.state).filter(field => {
      return field !== 'modal' && field !== 'middle' && field !== 'err'  && field !=='photoInfo'
    });
    const requiredFields = userField.every(field => this.state[field]);

    if ( requiredFields && photo && photo !== 'photo is big' ) {
      Object.keys( this.state ).filter( fieldName => {
        (fieldName !== 'modal' && fieldName !== 'err') ? formData.append( `${fieldName}`, this.state[fieldName] ) : null;
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
      this.setState({ err: 'Selected photo or enter requred fields!' });
      console.log('Selected photo or enter requred fields!');
    }
  }
  getFiles(files){
    parseInt( files.size ) < 4 ? this.setState({ photoInfo: 'small', photo: '' }) :
      (parseInt( files.size ) > 500 &&  parseInt( files.size ) > 40) ?
        this.setState({ photoInfo: 'big', photo: '' }) : this.setState({ photo: files.base64, photoInfo: false });
  }
  clickModalReg(){
    const data = this.state.modal;
    delete data.psw;
    this.props.addUser( data );
  }

  render(){
    const {configLang } = this.props;
    const { modal, err, email, photo, photoInfo } = this.state;

    return (
      <FormComponent
      modal={ modal } configLang={ configLang } handlerInput={ this.handlerInput }
      clickModalReg={ this.clickModalReg } handlerSelect={ this.handlerSelect }
      email={ email } photo={ photo } getFiles={ this.getFiles } err={ err }
      clickRegister={ this.clickRegister } photoInfo={ photoInfo }
      />
    )
  }
}

export default FormControl;