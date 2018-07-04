import React from 'react';
import { Divider, Feed, Icon, Image, Button } from 'semantic-ui-react';


const UserList = ({users, addFriend, friends }) => {
  let btnBlockAdd;
  return users.map( ( user, i ) => {
    return ( <Feed className='ListUser' key={i}>
        <div className='ListItem'>
          <Feed.Event className='feed-row'>
            <div className="photoBox">
              <Feed.Label className='Photo'>
                <Image src={user.photo} size='small' className='ItemImg' avatar/>
              </Feed.Label>
            </div>
            <Feed.Content>
              <Feed.Summary className='fieldName'>
                {`${user.name}  ${user.surname}`}
                <Feed.Meta>
                  <div className='age'>
                    {`Age: ${user.age }`}
                    <Icon name={user.gender}/>
                    {user.gender}
                  </div>
                </Feed.Meta>
              </Feed.Summary>
            </Feed.Content>
            <Feed.Extra className='ItemActions'>
              {
                friends.map(id => {
                   id === user._id ? btnBlockAdd = <Button
                     className='btnAddFriend' color='green'
                     content='Your friend' icon='chevron circle down' data-id={user._id}/> : null;
                })
              }
              {
                !btnBlockAdd ? <Button
                  data-id={user._id}
                  className='btnAddFriend'
                  onClick={addFriend}
                  color='blue' content='Add friend' icon='plus'/> : btnBlockAdd
              }
            </Feed.Extra>
          </Feed.Event>
        </div>
      </Feed> )
  });
};

export default UserList;
