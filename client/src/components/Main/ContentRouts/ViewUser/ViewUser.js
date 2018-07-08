import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label, Icon, Segment, Form, Image, Button } from 'semantic-ui-react';
import history from '../../../../browserHistory';
import FieldInputs from '../Account/FieldInputs';


class ViewUser extends Component{
  render(){
    const { ownProps } = this.props;
    const { user } = ownProps.location;

    return (<div className='ViewUser'>
      <div className="backBox" onClick={history.goBack}>
        <Button
          size='mini'
          className='back'
          content='Back'
          icon='arrow alternate circle left'
        />
      </div>
      <Form className='AccountForm'>
        { user ? <div className='infoUser'>
          <div className="photo">
            <div className='avatarBox'>
              <Image src={user.photo} alt="avatar"/>
            </div>
          </div>
          <div className='infoUserBox'>
            <div className='mail'>
              <FieldInputs
                type='email'
                fieldName='email'
                val={ user.email }
                fieldTitle='Email:'
              />
            </div>

            <div className='nameBox'>
              <FieldInputs
                fieldName='first'
                val={ user.name }
                fieldTitle='First name:'
              />
              <FieldInputs
                fieldName='surname'
                val={ user.surname }
                fieldTitle='Surname:'
              />
            </div>
            <div className="middle">
              <FieldInputs
                fieldName='middle'
                val={ user.middle }
                fieldTitle='Middle name:'
              />
            </div>
            <div className="additionally">
              <div className='age'>
                <FieldInputs
                  corner={ true }
                  fieldName='age'
                  val={ user.age }
                  fieldTitle='Age'
                />
              </div>
              <div className='gender'>
                <Label content='Gender' corner={ true }/>
                <Segment>
                  { user.gender === 'male' ? <Icon name='male'/> : <Icon name='female'/> }
                </Segment>
              </div>
            </div>
          </div>
        </div> : null }
      </Form>
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ownProps: state.router
  }
}

export default connect(mapStateToProps)(ViewUser);