import React from 'react'
import { Divider, Feed, Icon, Image } from 'semantic-ui-react'


const UserList = ({ users }) => (
  <Feed className='ListUser'>
    { users.map( ( user, i ) => {
      return ( <div className='ListItem' key={ user._id }>
        <Feed.Event className='feed-row'>
          <div className="photoBox">
            <Feed.Label className='Photo'>
              <Image src={ user.photo } size='small' className='ItemImg' avatar />
            </Feed.Label>
          </div>
          <Feed.Content>
            <div className='fieldName'>
              { `${user.name} ${user.surname}` }
              <Feed.Meta>
                <div className='age'>
                  { `Age: ${user.age }` }
                  <Icon name={user.gender} />
                  { user.gender }
                </div>
              </Feed.Meta>
            </div>
          </Feed.Content>
        </Feed.Event>
          <Divider inverted/>
        </div>
      )
    }) }
  </Feed>
)

export default UserList;
