import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../browserHistory';
import ViewUserComponent from '../components/Main/ContentRouts/ViewUser/ViewUser';

class ViewUser extends Component{
  render(){
    const {ownProps, configLang} = this.props;
    const { user } = ownProps.location;
    return ( <ViewUserComponent
      configLang={configLang}
      user={user} history={history}/> )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ownProps: state.router
  }
}

export default connect(mapStateToProps)(ViewUser);