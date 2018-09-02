import React from "react";
import fetchAdmin from "../../actions/admin";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";

class AdminDashboard extends React.Component{

  componentDidMount(){
    this.props.fetchAdmin();
  }

  logout = () => {
    localStorage.removeItem('id_token');
    window.location.reload();
  };

  render(){
    const padBottom = {paddingBottom: 50};
    return(
      <div>
        <h4 style={padBottom}>Admin Dashboard</h4>
        <p>{this.props.admin_login.msg}</p>
        <button onClick={this.logout}>Log Out</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    admin_login: state.admin_login
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchAdmin}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
