import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import axios from "axios/index";


class Account extends Component {
  constructor( props ){
    super( props );
    this.state = {
      photo: null
    }
  }

  //componentDidMount(){
  //  const token = localStorage.getItem('userToken');
  //  if(this.props.user){
  //    axios({
  //      method: 'get',
  //      url: '/api/user/avatar',
  //      headers: {'authorization': token}
  //    }).then(avatar => {
  //      this.setState({photo: avatar});
  //    }).catch(err => {
  //      console.log('-CLIENT---NOT_upload_image--->',err);
  //    });
  //  }
  //}

  render(){
    const { user } = this.props;
    return (
      <div>
        {user ? <div className='CardUser'><Card>
          <Card.Content>
            <Card.Header>{`${ user.name } ${ user.surname }`}</Card.Header>
            <Card.Meta>
              <span className='date'>Gender: { user.gender }</span>
              <br/>
              <span className='date'>Age: { user.age }</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='mail'/>
              { user.email }
            </a>
          </Card.Content>
        </Card></div> : null}
      </div>
    )
  }
}

export default Account;