import React, { Component } from 'react';
import axios from "axios/index";
const approve = require('approvejs');
import FileBase64 from 'react-file-base64';
import { regExp } from '../constants';
import { validate, validateNames, setValidClass, setErrValidClass, validateEmail } from '../validateFunc';
import AccountComponent from '../components/Main/ContentRouts/Account/Account';


class Account extends Component {
  constructor( props ){
    super( props );
    this.state = {
      mode: 'view'
    };
    this.getFiles = this.getFiles.bind( this );
    this.validateEmail = this.validateEmail.bind( this );
    this.handleGender = this.handleGender.bind( this );
    this.validateChangeInput = this.validateChangeInput.bind( this );
    this.saveOnClick = this.saveOnClick.bind( this );
    this.modeOnclick = this.modeOnclick.bind( this );
  }
  componentDidMount(){
    const user = this.props.user;
    if ( user ) {
      this.setState( {
        first: user.name,
        surname: user.surname,
        email: user.email,
        gender: user.gender,
        age: user.age,
        photo: user.photo,
        middle: user.middle
      } )
    }
  }

  getFiles( files ){
    parseInt( files.size ) > 1 && parseInt( files.size ) < 5000 ? this.setState( {photo: files.base64} ) : this.setState( {photo: 'photo is big'} );
  }
  validateChangeInput( e ){
    const {type, value, name} = e.target;
    if ( type === 'text' && name !== 'age' ) {
      validateNames( regExp, name, value ) ? ( setValidClass( e ), this.setState( {
        [ name ]: value,
        firstErr: false,
        surnameErr: false,
        middleErr: false
      } ) ) : ( setErrValidClass( e ), this.setState( {[ name ]: value} ) );
    } else {
      validate( regExp, name, value ) ? ( setValidClass( e ), this.setState( {[ name ]: value} ) ) : ( setErrValidClass( e ), this.setState( {[ name ]: ''} ) );
    }
  }
  validateEmail( e ){
    const emailValid = approve.value( e.target.value, validateEmail );
    emailValid.approved ? ( this.setState( {
      email: e.target.value,
      emailBusy: false
    } ), setValidClass( e ) ) : ( this.setState( {email: e.target.value} ), setErrValidClass( e ) );
  }
  modeOnclick( e ){
    const val = this.state.mode;
    val === 'view' ? this.setState( {mode: 'edit'} ) : this.setState( {mode: 'view'} );
    val === 'edit' ? this.setState( {mode: 'view'} ) : this.setState( {mode: 'edit'} );
  }
  saveOnClick(){
    const dataUser = Object.assign( {}, this.state );
    delete dataUser.mode;
    const formData = new FormData();
    Object.keys( dataUser ).filter( fieldName =>{
      formData.append( `${fieldName}`, this.state[ fieldName ] );
    } );
    axios( {
      method: 'put',
      url: '/api/user/edit',
      headers: {'Content-Type': 'multipart/form-data', authorization: localStorage.getItem( 'token' )},
      data: formData
    } ).then( res =>{
      if ( ! res.data.success ) {
        res.data.message === 'first' ? this.setState( {firstErr: 'Not valid!'} ) :
          res.data.message === 'surname' ? this.setState( {surnameErr: 'Not valid!'} ) :
            res.data.message === 'middle' ? this.setState( {middleErr: 'Not valid!'} ) : null;
        res.data.message === 'Email is busy!' ? this.setState( {emailBusy: res.data.message} ) : null;
        res.data.message === 'name' ? this.setState( {first: res.data.message, surname: res.data.message} ) : null
        return;
      } else {
        this.props.addUser( res.data.user );
      }
    } ).catch( err =>{
      console.log( err )
    } );
  }
  handleGender(){
    if ( this.state.mode === 'edit' ) {
      const val = this.state.gender;
      val === 'female' ? this.setState( {gender: 'male'} ) : this.setState( {gender: 'female'} );
      val === 'male' ? this.setState( {gender: 'female'} ) : this.setState( {gender: 'male'} );
    }
  }

  render(){
    const {user} = this.props;
    const {mode, gender, photo, emailBusy, firstErr, surnameErr, middleErr} = this.state;
    return (<div><AccountComponent
      getFiles={ this.getFiles } modeOnclick={ this.modeOnclick }
      validateChangeInput={ this.validateChangeInput } firstErr={ firstErr }
      surnameErr={ surnameErr } handleGender={ this.handleGender }
      validateEmail={ this.validateEmail } emailBusy={ emailBusy }
      user={user} mode={mode} gender={gender} photo={photo} saveOnClick={ this.saveOnClick }
    /></div>)
  }
}


export default Account;
