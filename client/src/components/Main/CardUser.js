import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';

const CardUser = ({name, surname, middle, email, gender, age, photo, password}) => (
  <Card raised={true}>
    <Image/>
    <Card.Content>
      <Card.Header>{` ${ name }  ${ surname } `}</Card.Header>
      <Card.Meta>
        <span className='date'>Joined in 2015</span>
      </Card.Meta>
      <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
);

export default CardUser;