import React from 'react';
import { Link } from "react-router-dom";
import { Button, Feed, Icon, Image } from 'semantic-ui-react';

const FriendList = ( {friends, friendRemove, configLang} ) =>{

  return friends.map( ( user, i ) => {
    return ( <Feed className='ListFriends' key={i}>
      <div className='ListItemFriend'>
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
            <div className='viewBox'>
              <Button
                data-id={user._id}
                className='btnRemoveFriend'
                color='teal'
                content={configLang.view}
              />
              <Link to={{
                pathname: '/viewprofile/',
                user: user
              }} className='LinkView' />
            </div>
            <Button
              data-id={user._id}
              onClick={ friendRemove }
              className='btnRemoveFriend'
              color='red' content={configLang.remove}/>
          </Feed.Extra>
        </Feed.Event>
      </div>
    </Feed> )
  });
};

export default FriendList;
