import React, { Component } from 'react';
import FileBase64 from 'react-file-base64';
import { Label, Icon, Segment, Form, Dropdown, Image, Button } from 'semantic-ui-react';
import { regExp } from '../../../../constants';
import { validate, validateName, setValidClass, setErrValidClass } from '../../../../validateFunc';
import FieldInputs from './FieldInputs';
import axios from "axios/index";


class Account extends Component {
  constructor( props ){
    super( props );
    this.state = {
      mode: 'view'
    };

    this.getFiles = this.getFiles.bind(this);
    this.handleGender = this.handleGender.bind(this);
    this.validateChangeInput = this.validateChangeInput.bind(this);
    this.saveOnClick = this.saveOnClick.bind(this);
    this.modeOnclick = this.modeOnclick.bind(this);
  }

  componentDidMount(){
    const user = this.props.user;
    const { name, surname,  email, gender, age, photo, middle} = user;
    if ( user ) {
      this.setState({
        first: name,
        surname: surname,
        email: email,
        gender: gender,
        age: age,
        photo: photo,
        middle: middle
      })
    }
  }

  getFiles(files){
    parseInt( files.size ) > 1 && parseInt( files.size ) < 5000 ?
      this.setState({ photo: files.base64 }) :
      this.setState({ photo: 'photo is big' });
  }
  validateChangeInput(e){
    const { type, value, name} = e.target;

    if(type === 'text' && name !== 'age'){
      validateName(regExp,name,value) ?
        ( setValidClass(e), this.setState({ [name]: value }) ) :
        ( setErrValidClass(e), this.setState({ [name]: '' }) );
    }else{
      validate(regExp,name,value) ?
        ( setValidClass(e), this.setState({ [name]: value }) ) :
        ( setErrValidClass(e), this.setState({ [name]: '' }) );
    }
  }
  modeOnclick(e){
    const val = this.state.mode;
    val === 'view' ? this.setState({mode: 'edit'}) : this.setState({mode: 'view'});
    val === 'edit' ? this.setState({mode: 'view'}) : this.setState({mode: 'edit'});
  }
  saveOnClick(){
    const dataUser = Object.assign({}, this.state);
    const formData = new FormData();
    const token = localStorage.getItem( 'token' );
    delete dataUser.mode;

    Object.keys( dataUser ).filter( fieldName => {
      formData.append( `${fieldName}`, this.state[fieldName] );
    });

    axios({
      method: 'put', url: '/api/user/edit',
      headers: {'Content-Type': 'multipart/form-data', authorization: token },
      data: formData
    }).then(res => {
      res.data.message ? this.setState({ emailBusy: res.data.message }) : this.props.addUser( res.data );
    }).catch(err => {
      console.log( err );
    })
  }
  handleGender(){
    if(this.state.mode === 'edit'){
      const val = this.state.gender;
      val === 'female' ? this.setState({gender: 'male'}) : this.setState({gender: 'female'});
      val === 'male' ? this.setState({gender: 'female'}) : this.setState({gender: 'male'});
    }
  }

  render(){
    const { user } = this.props;
    const { mode, gender, photo } = this.state;

    return ( <div className='Account'>
        <div className='mode'>
          <Segment onClick={ this.modeOnclick }>
            { mode === 'view' ? <Icon name='eye'/> : <Icon name='edit' /> }
          </Segment>
        </div>
        <Form className='AccountForm'>
          <div className="photo">
            <div className='avatarBox'>
              { mode === 'edit' ? <FileBase64 className='changePhoto' multiple={ false } onDone={ this.getFiles } /> : null }
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
                  eventHandler={ this.validateChangeInput }
                />
                { this.state.emailBusy ? <Label basic color='red' attached='top left' size='mini' pointing='below'>
                    { this.state.emailBusy }
                </Label> : null }
              </div>
              <div className='nameBox'>
                <FieldInputs
                  mode={ mode }
                  fieldName='first'
                  val={ user.name }
                  fieldTitle='First name:'
                  eventHandler={ this.validateChangeInput }
                />
                <FieldInputs
                  mode={ mode }
                  fieldName='surname'
                  val={ user.surname }
                  fieldTitle='Surname:'
                  eventHandler={ this.validateChangeInput }
                />
              </div>
              <div className="middle">
                <FieldInputs
                  mode={ mode }
                  fieldName='middle'
                  val={ user.middle }
                  fieldTitle='Middle name:'
                  eventHandler={ this.validateChangeInput }
                />
              </div>
              <div className="additionally">
                <div className='age'>
                  <FieldInputs
                    corner={ true }
                    mode={ mode }
                    fieldName='age'
                    val={ user.age }
                    fieldTitle='Age'
                    eventHandler={ this.validateChangeInput }
                  />
                </div>
                <div className='gender' onClick={ this.handleGender }>
                  <Label content='Gender' corner={ true }/>
                  <Segment>
                    { gender === 'male' ? <Icon name='male'/> : <Icon name='female'/> }
                  </Segment>
                </div>
                { mode === 'edit' ? <Button className='btnSave' primary onClick={ this.saveOnClick } content='Save'/> : null }
              </div>
            </div>
          </div> : null }
        </Form>
      </div>
    )
  }
}

export default Account;
