import React, { Component } from 'react';
import { Label, Icon, Segment, Form, Dropdown } from 'semantic-ui-react';
import FieldsInputs from './FieldInputs';



class Account extends Component {
  constructor( props ){
    super( props );
    this.state = {
      photo: null,
      mode: 'view'
    };

    this.testOnclick = this.testOnclick.bind(this);
  }

  componentDidMount(){
    const token = localStorage.getItem( 'userToken' );
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
    xhr.open( 'GET', 'api/user/avatar', true );
    xhr.setRequestHeader( 'authorization', token );
    xhr.send();
  }

  onHandleChangeName(){
  }
  testHandler(){
  }
  testOnclick(e){
    console.log( e.target );
  }

  render(){
    console.log( 'ACCOUNT',this.props );
    const {user} = this.props;
    const {mode} = this.state;

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
            <Dropdown.Menu onClick={this.testOnclick}>
              <Dropdown.Header role='button' icon='eye' mode='eye' value='eye' content='View' />
              <Dropdown.Header icon='edit' mode='edit' content='Edit' />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <Form>
        {user ? <div className='infoUser'>
          <div className='infoUserBox'>
            <div className='mail'>
              <FieldsInputs
                mode={mode}
                fieldName='mail'
                val={user.email}
                fieldTitle='Email:'
                eventHandler={this.testHandler}
              />
            </div>
            <div className='nameBox'>
              <FieldsInputs
                mode={mode}
                fieldName='name'
                val={user.name}
                fieldTitle='First name:'
                eventHandler={this.onHandleChangeName}
              />
              <FieldsInputs
                mode={mode}
                fieldName='surname'
                val={user.surname}
                fieldTitle='Surname:'
                eventHandler={this.onHandleChangeName}
              />
            </div>
            <div className="middle">
              <FieldsInputs
                mode={mode}
                fieldName='middle'
                val={user.middle}
                fieldTitle='Middle name:'
                eventHandler={this.onHandleChangeName}
              />
            </div>
            <div className="additionally">
              <div className='age'>
                <FieldsInputs
                  corner={true}
                  mode={mode}
                  fieldName='age'
                  val={user.age}
                  fieldTitle='Age'
                  eventHandler={this.testHandler}
                />
              </div>
              <div className='gender'>
                <Label content='Gender' corner={true}/>
                <Segment>
                  <Icon name={user.gender}/>
                </Segment>
              </div>
            </div>
          </div>
        </div> : null}
      </Form>
    </div> )
  }
}

export default Account;