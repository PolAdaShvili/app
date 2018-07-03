import React, { Component } from 'react';
import { Label, Icon, Segment, Form, Dropdown, Button } from 'semantic-ui-react';
import { regExp } from '../../../../constants';
import { validate, validateName, addClassErr, addClassValid } from '../../../../validateFunc';
import FieldInputs from './FieldInputs';
import axios from "axios/index";


class Account extends Component {
  constructor( props ){
    super( props );
    this.state = {
      mode: 'view'
    };

    this.handleGender = this.handleGender.bind(this);
    this.validateChangeInput = this.validateChangeInput.bind(this);
    this.saveTestOnClick = this.saveTestOnClick.bind(this);
    this.modeTestOnclick = this.modeTestOnclick.bind(this);
  }

  componentDidMount(){
    if(this.props.user){
      this.setState({
        first: this.props.user.name,
        surname: this.props.user.surname,
        email: this.props.user.email,
        gender: this.props.user.gender,
        age: this.props.user.age,
        middle:  this.props.user.middle
      })
    }

    if ( localStorage.getItem( 'token' ) ) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onreadystatechange = () =>{
        if ( xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200 ) {
          const img = document.createElement( 'img' );
          img.classList.add( 'avatar' );
          img.src = URL.createObjectURL( xhr.response );
          document.body.querySelector( '.avatarBox' ).appendChild( img );
        }
      };
      xhr.open( 'GET', '/api/user/avatar', true );
      xhr.setRequestHeader( 'authorization', localStorage.getItem( 'token' ) );
      xhr.send();
    }
  }

  validateChangeInput(e){
    const { type, value, name} = e.target;

    if(type === 'text' && name !== 'age'){
      validateName(regExp,name,value) ?
        ( addClassValid(e), this.setState({ [name]: value }) ) :
        (addClassErr(e), this.setState({ [name]: '' }));
    }else{
      validate(regExp,name,value) ?
        ( addClassValid(e), this.setState({ [name]: value }) ) :
        (addClassErr(e), this.setState({ [name]: '' }));
    }
  }
  modeTestOnclick(e){
    this.setState({mode: e.target.getAttribute('mode')});
  }
  saveTestOnClick(){
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
      console.log( 'ERRRRRRRRR',err );
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
    const { mode, gender } = this.state;

    return ( <div className='Account'>
        <div className="photo">
          <div className='avatarBox'/>
          <div className='mode'>
            <Dropdown
              text='Mode'
              icon='sliders horizontal'
              floating
              labeled
              button
              size='mini'
              className='icon mode-menu'>
              <Dropdown.Menu onClick={ this.modeTestOnclick }>
                <Dropdown.Header role='button' icon='eye' mode='view' value='view' content='View' />
                <Dropdown.Header role='button' icon='edit' mode='edit' content='Edit' value='edit' />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        <Form>
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
                { mode === 'edit' ? <Button className='btnSave' primary onClick={ this.saveTestOnClick } content='Save'/> : null }
              </div>
            </div>
          </div> : null }
        </Form>
      </div>
    )
  }
}

export default Account;
