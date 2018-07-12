import React from 'react';
import { Button, Icon, Feed, Image, Divider } from 'semantic-ui-react';

const NewsComponent = ({ posts, getDateNews, configLang }) =>{
  return (  <div className='News'>
    {posts ? posts.allPosts.map( ({ postPhotos, postBody, date, userId, _id, avatar, author }, i ) => {
      return (<div className="Posts" key={i}>
        <div className='Post'>
        <Feed>

          <Feed.Event>
            <Feed.Label image={ avatar} />
            <Feed.Content>
              <Feed.Summary>
                { configLang.author }<strong>{ author }</strong>
              </Feed.Summary>
              <Feed.Meta>
                <Feed.Date>{ getDateNews(date) }</Feed.Date>
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
        </div>
      </div> )
    }) : null}
  </div> )
};

export default NewsComponent;