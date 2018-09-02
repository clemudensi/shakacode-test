import React from 'react';
import LocalAuthService from "./components/LocalAuthService";
import decode from 'jwt-decode';

class Login extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.Auth = new LocalAuthService();
  }
  handleLoginEmail = (e) => {
    this.setState({email: e.target.value});
  };

  handleLoginPass = (e) =>{
    this.setState({password: e.target.value});
  };

  handleFormSubmit = async e=> {
    e.preventDefault();
    const {email, password} = this.state;
    const res = await this.Auth.login(email, password);
    const decoded = decode(res.data.token);
    if (decoded.role === 4){
      window.location.replace(`/admin/${res.data._id}/dashboard`);
    } else {
      window.location.replace(`/user/${res.data._id}/dashboard`);
    }
    this.setState({id: res.data._id})
  };

  render(){
    const { email, password } = this.state;
    return(
      <div className="col-6">
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control mr-sm-2" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="Enter email" value={email} onChange={this.handleLoginEmail}/>
              <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.
              </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control mr-sm-2" id="exampleInputPassword1" placeholder="Password" value={password} onChange={this.handleLoginPass}/>
          </div>
          <div className="form-group form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default Login;
