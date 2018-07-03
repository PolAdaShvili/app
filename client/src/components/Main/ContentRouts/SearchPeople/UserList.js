import React from 'react'
import { Divider, Feed, Icon, Image, Button } from 'semantic-ui-react'


const UserList = ({ users }) => (
  <Feed className='ListUser'>
    { users.map( ( user, i ) => {
      return ( <div className='ListItem' key={ user._id } data-id={ user._id }>
        <Feed.Event className='feed-row'>
          <div className="photoBox">
            <Feed.Label className='Photo'>
              <Image src={ user.photo } size='small' className='ItemImg' avatar />
            </Feed.Label>
          </div>
          <Feed.Content>
            <Feed.Summary className='fieldName'>
              { `${user.name}  ${user.surname}` }
              <Feed.Meta>
                <div className='age'>
                  { `Age: ${user.age }` }
                  <Icon name={user.gender} />
                  { user.gender }
                </div>
              </Feed.Meta>
            </Feed.Summary>
          </Feed.Content>
          <Feed.Extra className='ItemActions'>
            <Button color='brown' content='Add friend'/>
          </Feed.Extra>
        </Feed.Event>
          <Divider fitted={true}/>
        </div>
      )
    }) }
  </Feed>
)

export default UserList;
