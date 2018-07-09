import React from 'react';
import AddPost from './AddPost';
import { Feed, Image } from 'semantic-ui-react';

const NewsComponent = ( {
  getFiles, viewAddPost, handleSendPost, handleTextArea, handleViewAddPost, allPosts, configLang
} ) =>{
  return ( <div className='News'>
    <AddPost
      configLang={configLang}
      getFiles={ getFiles }
      viewAddPost={ viewAddPost }
      sendPost={ handleSendPost }
      changeTextArea={ handleTextArea }
      btnEventView={ handleViewAddPost } />
    {allPosts ? <div className='Posts'>
      {allPosts.map(post => {
        return (<div className='Post' key={post._id}>
          <div>
            <Feed>
              <Feed.Event>
                <Feed.Label>
                  <Image src={post.avatar}/>
                </Feed.Label>
                <Feed.Content>
                  {post.author}
                  <div className="postContent">
                    {post.photo !== 'undefined' ? <Image src={post.photo} size='small' /> : null}
                    {post.post ? <div className='post'>{ post.post }</div> : null}
                  </div>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </div>
        </div>)
      })}
    </div> : null}
  </div> )
};

export default NewsComponent;