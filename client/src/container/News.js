import React, { Component } from 'react';
import axios from 'axios';
import NewsComponent from '../components/Main/ContentRouts/News/News';


class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      viewAddPost: false,
      allPosts: []
    }

    this.getFiles = this.getFiles.bind(this);
    this.handleSendPost = this.handleSendPost.bind(this);
    this.handleTextArea = this.handleTextArea.bind(this);
    this.handleViewAddPost = this.handleViewAddPost.bind(this);
  }
  componentDidMount(){
    this.props.user ? axios({
      method: 'get', url: '/api/user/news',
      headers: {'Content-Type': 'multipart/form-data', authorization: localStorage.getItem( 'token' )},
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
    formData.append('post', this.state.newPost);
    formData.append('photos', this.state.newPhotoPost);

    axios({
      method: 'put', url: '/api/user/news',
      headers: {'Content-Type': 'multipart/form-data', authorization: localStorage.getItem( 'token' )},
      data: formData
    }).then(res => {
      console.log( res.data );
      this.setState({newPost: null, newPhotoPost: null});
      //this.props.setNews( res.data.allPosts );
    }).catch(err => { console.log( err ) })
  }
  handleTextArea(e){
    this.setState({newPost: e.target.value})
  }
  getFiles(files){
    this.setState({ newPhotoPost: files.base64 });
  }

  render(){
    const { allPosts,viewAddPost } = this.state;

    return (
      <NewsComponent
        handleViewAddPost={ this.handleViewAddPost }
        allPosts={ allPosts } getFiles={ this.getFiles } viewAddPost={ viewAddPost }
        handleSendPost={ this.handleSendPost } handleTextArea={ this.handleTextArea }
      />
    )
  }
}

export default News;