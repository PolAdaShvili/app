import React from 'react';
import { Button, Form, Icon, Feed, Image, Divider } from 'semantic-ui-react';
import { connect } from "react-redux";


const ViewPosts = ({ posts, user, deletePost }) =>{
  return ( <div className='WrapperMyPosts'>
    {posts ? <div className="Posts">
      {posts ? posts.posts.posts.map(({post, _id}, i) => {
        const { postBody, postPhotos, date } = post[0];
        return (
          <div className='Post' key={i}>
            <Feed>
              <Feed.Event>
                <Feed.Label image={ user.photo } />
                <Feed.Content>
                  <Feed.Summary>
                    Author: <strong>{`${user.name} ${user.surname}`}</strong>
                    <Feed.Extra><Button
                      onClick={ deletePost }
                      content='X'
                      negative className='deletePost'
                      data-post={_id}/></Feed.Extra>
                  </Feed.Summary>
                  <Feed.Meta>
                    <Feed.Like>
                      <Icon name='like' />
                      0 Likes
                    </Feed.Like>
                    <Feed.Date>{date}</Feed.Date>
                  </Feed.Meta>
                </Feed.Content>
              </Feed.Event>
            </Feed>
            <div className='PostContent'>
              {postBody ? <div className='postText'>
                { postBody }
              </div> : null}
              <Divider />
              {postPhotos.length >= 1 ? <div className='photosBlockPost'>
                {postPhotos.map((photo, i) => {
                  return <div key={`${_id}${i}`}>
                    <Image src={photo.base64} fluid />
                    <Divider/>
                  </div> })}
              </div> : null}
            </div>
          </div>)}) : null}
    </div> : null}
  </div> )
};

const mapStateToProps = state => {
  return{
    posts: state.addUser.userInfo.posts
  }
}

export default connect(mapStateToProps)(ViewPosts);