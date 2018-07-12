import React from 'react';
import { Button, Form, Icon, Image, Label, Segment } from 'semantic-ui-react';
import FieldInputs from '../Account/FieldInputs';

const ViewUserComponent = ( {history, user, configLang} ) =>{
  return ( <div className='WrapperAccount'>
    <div className='ViewUser'>
    <div className="backBox" onClick={history.goBack}>
      <Button
        size='mini'
        className='back'
        content={configLang.btnBack}
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
              mode='view'
              type='email'
              fieldName='email'
              val={ user.email }
              fieldTitle={configLang.email}
            />
          </div>

          <div className='nameBox'>
            <FieldInputs
              mode='view'
              fieldName='first'
              val={ user.name }
              fieldTitle={configLang.first}
            />
            <FieldInputs
              mode='view'
              fieldName='surname'
              val={ user.surname }
              fieldTitle={configLang.surname}
            />
          </div>
          <div className="middle">
            <FieldInputs
              mode='view'
              fieldName='middle'
              val={ user.middle }
              fieldTitle={configLang.middle}
            />
          </div>
          <div className="additionally">
            <div className='age'>
              <FieldInputs
                mode='view'
                corner={ true }
                fieldName='age'
                val={ user.age }
                fieldTitle={configLang.age}
              />
            </div>
            <div className='gender'>
              <Label content={configLang.gender} corner={true}/>
              <Segment>
                { user.gender === 'male' ? <Icon name='male'/> : <Icon name='female'/> }
              </Segment>
            </div>
          </div>
        </div>
      </div> : null }
    </Form>
  </div>
  </div>)
};

export default ViewUserComponent;