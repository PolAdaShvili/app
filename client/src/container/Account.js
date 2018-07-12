import React, { Component } from 'react';
import axios from "axios/index";
import moment from 'moment';
import { connect } from 'react-redux';
import { regExp } from '../constants';
import { setErrValidClass, setValidClass, validate, validateNames } from '../validateFunc';
import AccountComponent from '../components/Main/ContentRouts/Account/Account';
import NewPost from '../components/Main/ContentRouts/Account/NewPost';
import ViewPosts from '../components/Main/ContentRouts/Account/ViewMyPosts';


class Account extends Component {
  constructor( props ){
    super( props );
    this.state = {
      mode: 'view'
    };

    this.getPosts = this.getPosts.bind( this );
    this.getFiles = this.getFiles.bind( this );
    this.sendPost = this.sendPost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.saveOnClick = this.saveOnClick.bind( this );
    this.modeOnclick = this.modeOnclick.bind( this );
    this.handleGender = this.handleGender.bind( this );
    this.uploadPhotos = this.uploadPhotos.bind( this );
    this.changeLangDate = this.changeLangDate.bind( this );
    this.handleChangePost = this.handleChangePost.bind( this );
    this.validateChangeInput = this.validateChangeInput.bind( this );
  }
  componentDidMount(){
    const user = this.props.user;
    user ? (this.setState({
      first: user.name,
      surname: user.surname,
      email: user.email,
      gender: user.gender,
      age: user.age,
      photo: user.photo,
      middle: user.middle
    }), this.getPosts() ) : null
  }

  getPosts(){
    if( this.props.user ) {
      axios({
        method: 'get', url: '/api/posts',
        headers: {'Content-Type': 'application/json', authorization: localStorage.getItem( 'token' )}
      }).then(res => {
        res.data ? (this.props.setNews(res.data), this.setState({postsID: res.data.posts._id})) : null;
      })
    }
  }
  sendPost(){
    const { postBody, postPhotos } = this.state;
    const payload ={ postBody, postPhotos };

    axios({
      method: 'post', url: '/api/posts', data: payload,
      headers: {'Content-Type': 'application/json', authorization: localStorage.getItem( 'token' )}
    }).then(res => {
      this.props.setNews(res.data);
      this.setState({postsID: res.data.posts._id});
    })
    .catch(err => { console.log( err ); });
  }
  changeLangDate(date){
    const { fixedLang } = this.props;
    fixedLang === 'gb' ? moment.locale('en') :
      fixedLang === 'ua' ? moment.locale('uk'):
        fixedLang ==='ru' ? moment.locale('ru') : null;

    if (fixedLang) return moment(date).fromNow();
  }
  getFiles( files ){
    parseInt( files.size ) < 4 ? this.setState({ photoInfo: 'small', photo: files.base64 }) :
      (parseInt( files.size ) > 500 &&  parseInt( files.size ) > 40) ?
        this.setState({ photoInfo: 'big', photo: files.base64 }) : this.setState({ photo: files.base64, photoInfo: false });
  }
  uploadPhotos( files ){
    this.setState({postPhotos: files});
  }
  handleChangePost(e){
    this.setState({ postBody: e.target.value });
  }
  validateChangeInput( e ){
    const {type, value, name} = e.target;
    if ( type === 'text' && name !== 'age' ) {
      validateNames( regExp, name, value ) ? ( setValidClass( e ), this.setState( {
        [ name ]: value,
        firstErr: false,
        surnameErr: false,
        middleErr: false
      } ) ) : ( setErrValidClass( e ), this.setState( {[ name ]: value} ) );
    } else {
      validate( regExp, name, value ) ? ( setValidClass( e ), this.setState( {[ name ]: value} ) ) : ( setErrValidClass( e ), this.setState( {[ name ]: ''} ) );
    }
  }
  modeOnclick( e ){
    this.setState( {mode: this.state.mode === 'view' ? 'edit' : 'view'} );
  }
  deletePost(e){
    const postID = e.target.getAttribute('data-post');
    const postsID = this.state.postsID;
    const payload ={ postsID, postID };
    axios({
      method: 'delete', url: '/api/posts', data: payload,
      headers: {'Content-Type': 'application/json', authorization: localStorage.getItem( 'token' )}
    }).then(res => {
      this.props.setNews(res.data);
    })
  }
  saveOnClick(){
    const dataUser = Object.assign( {}, this.state );
    delete dataUser.mode;
    const formData = new FormData();
    Object.keys( dataUser ).filter( fieldName =>{
      formData.append( `${fieldName}`, this.state[ fieldName ] );
    } );
    axios( {
      method: 'put',
      url: '/api/user/edit',
      headers: {'Content-Type': 'multipart/form-data', authorization: localStorage.getItem( 'token' )},
      data: formData
    } ).then( res =>{
      if ( ! res.data.success ) {
        res.data.message === 'first' ? this.setState( {firstErr: 'Not valid!'} ) :
          res.data.message === 'surname' ? this.setState( {surnameErr: 'Not valid!'} ) :
            res.data.message === 'middle' ? this.setState( {middleErr: 'Not valid!'} ) : null;
        res.data.message === 'Email is busy!' ? this.setState( {emailBusy: res.data.message} ) : null;
        res.data.message === 'name' ? this.setState( {first: res.data.message, surname: res.data.message} ) : null
        return;
      } else {
        this.props.addUser( res.data.user );
      }
    } ).catch( err =>{
      console.log( err )
    } );
  }
  handleGender(){
    if ( this.state.mode === 'edit' ) {
      const val = this.state.gender;
      val === 'female' ? this.setState( {gender: 'male'} ) : this.setState( {gender: 'female'} );
      val === 'male' ? this.setState( {gender: 'female'} ) : this.setState( {gender: 'male'} );
    }
  }

  render(){
    const { user, configLang, posts } = this.props;
    const { mode, gender, photo, emailBusy, firstErr, surnameErr, middleErr, myPosts } = this.state;
    return ( <div className='WrapperAccount'>
      <AccountComponent
        getFiles={ this.getFiles } modeOnclick={ this.modeOnclick }
        validateChangeInput={ this.validateChangeInput } firstErr={ firstErr }
        surnameErr={ surnameErr } handleGender={this.handleGender} middleErr={ middleErr }
        validateEmail={ this.validateEmail } emailBusy={ emailBusy } configLang={ configLang }
        user={ user } mode={ mode } gender={ gender } photo={ photo } saveOnClick={ this.saveOnClick }
      />
      <NewPost
        user={ user } sendPost={ this.sendPost } configLang={ configLang }
        handleChangePost={ this.handleChangePost } uploadPhotos={ this.uploadPhotos }
      />
       <ViewPosts
       user={ user } deletePost={ this.deletePost }
       configLang={ configLang } getDateNews={ this.changeLangDate }
      />
    </div>)
  }
}


export default Account;
