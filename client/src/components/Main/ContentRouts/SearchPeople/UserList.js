import React from 'react';
import { Link } from "react-router-dom";
import { Button, Feed, Icon, Image } from 'semantic-ui-react';

const UserList = ( {users, addFriend, friends, configLang} ) =>{

  return users.map( ( user, i ) => {
    let btnBlockAdd;
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
                    {`${ configLang.age }: ${user.age }`}
                    <Icon name={user.gender}/>
                    {user.gender === 'male' ? configLang.male : configLang.female}
                  </div>
                </Feed.Meta>
              </Feed.Summary>
            </Feed.Content>
            <Feed.Extra className='ItemActions'>
              <div className='viewBox'>
                <Button
                  data-id={user._id}
                  className='btnRemoveFriend'
                  color='teal'
                  content={configLang.view}
                />
                <Link to={{
                  pathname: '/viewprofile/', user: user
                }} className='LinkView'/>
              </div>
              {
                friends.map(id => {
                   id === user._id ? btnBlockAdd = <Button
                     className='btnAddFriend' color='green'
                     disabled={true}
                     content={configLang.friend} data-id={user._id}/> : null;
                })
              }
              {
                !btnBlockAdd ? <Button
                  data-id={user._id}
                  className='btnAddFriend' onClick={addFriend}
                  color='blue' content={configLang.addFriend}/> : btnBlockAdd
              }
            </Feed.Extra>
          </Feed.Event>
        </div>
      </Feed> )
  });
};

export default UserList;
