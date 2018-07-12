import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import NewPost from '../components/Main/ContentRouts/Account/NewPost';
import NewsComponent from '../components/Main/ContentRouts/News/News';
import { connect } from "react-redux";

class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: false
    }

    this.handleChangePost = this.handleChangePost.bind( this );
    this.uploadPhotos = this.uploadPhotos.bind( this );
    this.sendPost = this.sendPost.bind( this );
    this.changeLangDate = this.changeLangDate.bind(this);
  }
  componentDidMount(){
    this.props.user ? this.getPosts() : null;
  }
  getPosts(){
    axios({
      method: 'get', url: '/api/posts/all',
      headers: {'Content-Type': 'application/json', authorization: localStorage.getItem( 'token' )}
    }).then(res => {
      this.setState({posts: res.data});
    }).catch(err => { console.log( err )});
  }
  sendPost(){
    const { postBody, postPhotos } = this.state;
    const payload ={ postBody, postPhotos };

    axios({
      method: 'post', url: '/api/posts', data: payload,
      headers: {'Content-Type': 'application/json', authorization: localStorage.getItem( 'token' )}
    }).then(res => {
      this.getPosts();
    }).catch(err => { console.log( err )});
  }
  uploadPhotos( files ){
    this.setState({postPhotos: files});
  }
  handleChangePost(e){
    this.setState({ postBody: e.target.value });
  }
  changeLangDate(date){
    const { fixedLang } = this.props;
    fixedLang === 'gb' ? moment.locale('en') :
      fixedLang === 'ua' ? moment.locale('uk'):
        fixedLang ==='ru' ? moment.locale('ru') : null;

    if (fixedLang) return moment(date).fromNow();
  }

  render(){
    const { configLang, fixedLang, user } = this.props;
    const { posts } = this.state;

    return (
      <div className='WrapperNews'>
        <NewPost user={ user } sendPost={ this.sendPost } configLang={ configLang }
          handleChangePost={ this.handleChangePost } uploadPhotos={ this.uploadPhotos }/>
        <NewsComponent posts={ posts } configLang={ configLang } getDateNews={ this.changeLangDate }/>
      </div>
    )
  }
}

export default News;