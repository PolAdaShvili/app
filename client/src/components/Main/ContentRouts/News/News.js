import React, { Component } from 'react';
import axios from 'axios';
import AddPost from './AddPost';
import { Image, Feed } from 'semantic-ui-react';



class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewAddPost: false,
      post: null,
      allPosts: []
    }

    this.getFiles = this.getFiles.bind(this);
    this.handleSendPost = this.handleSendPost.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleViewAddPost = this.handleViewAddPost.bind(this);
  }

  componentDidMount(){
    this.props.user ? axios({
      method: 'get', url: '/api/user/posts', headers: {authorization: localStorage.getItem( 'token' )}
    }).then(res => {
      this.setState({ allPosts: res.data.allPosts });
    }).catch(err => {
      console.log( err )
    }) : null;
  }

  handleViewAddPost(){
    this.setState({viewAddPost:  !this.state.viewAddPost});
  }
  handleSendPost(){
    const formData = new FormData;
    formData.append('post', this.state.post);
    formData.append('photos', this.state.photos);

    axios({
      method: 'put', url: '/api/user/post',
      headers: {'Content-Type': 'multipart/form-data', authorization: localStorage.getItem( 'token' )},
      data: formData
    }).then(res => {
      console.log( res.data );
      this.setState({post: null, allPosts: res.data});
      //this.props.setNews( res.data.allPosts );
    }).catch(err => { console.log( err ) })
  }
  handleTextArea(e){
    this.setState({post: e.target.value})
  }
  getFiles(files){
    this.setState({ photos: files.base64 });
  }

  render(){
    const { allPosts } = this.state;
    const test = this.props.user;
    console.log( test );
    return ( <div className='News'>
        <AddPost
          getFiles={ this.getFiles }
          viewAddPost={ this.state.viewAddPost }
          sendPost={ this.handleSendPost }
          changeTextArea={ this.handleTextArea }
          btnEventView={ this.handleViewAddPost } />
          {
            allPosts ? <div className='Posts'>
              {
                allPosts.map(post => {
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
                            {
                              post.photo !== 'undefined' ? <Image src={post.photo} size='small' /> : null
                            }
                            {
                              post.post ? <div className='post'>{ post.post }</div> : null
                            }
                          </div>
                        </Feed.Content>
                      </Feed.Event>
                    </Feed>
                    </div>
                  </div>)
                })
              }
            </div> : null
          }
        </div>
    )
  }
}

export default News;