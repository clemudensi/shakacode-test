import React from "react";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import fetchUser from "../../actions/users";

class UserDashboard extends React.Component{

  componentWillMount(){
    this.props.fetchUser();
  }

  logout = () => {
    localStorage.removeItem('id_token');
    window.location.reload();
  };

  render(){
    const padBottom = {paddingBottom: 50};
    return(
      <div>
        <h4 style={padBottom}>User Dashboard</h4>
        <p>{this.props.user_login.msg}</p>
        <button onClick={this.logout}>Log Out</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user_login: state.user_login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
