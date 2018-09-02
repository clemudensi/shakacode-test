import React from 'react';
import LocalAuthService from "./components/LocalAuthService";

class RegisterAdmin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      adminCode: ''
    };
    this.Auth = new LocalAuthService();
  }

  handleFirstName = (e) =>{
    this.setState({firstName:e.target.value});
  };

  handleLastName = (e) =>{
    this.setState({ lastName: e.target.value });
  };

  handleEmail = (e) =>{
    this.setState({ email: e.target.value });
  };

  handlePassword = (e) =>{
    this.setState({ password: e.target.value });
  };

  handleAdminCode= (e) =>{
    this.setState({ adminCode: e.target.value });
  };

  handleFormSubmit = async e =>{
    e.preventDefault();
    const { firstName, lastName, email, password, adminCode } = this.state;
    const res = await this.Auth.admin(firstName, lastName, email, password, adminCode);
    if( res.data.token){
      window.location.replace(`/admin/${res.data._id}/dashboard`);
    }
  };

  render(){
    const { firstName, lastName, email, password, adminCode } = this.state;
    return(
      <div className="col-6">
        <h2>Register Admin account</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">First Name</label>
            <input type="text" className="form-control mr-sm-6" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="First Name" value={firstName} onChange={this.handleFirstName}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Last Name</label>
            <input type="text" className="form-control mr-sm-6" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="Last Name" value={lastName} onChange={this.handleLastName}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control mr-sm-6" id="exampleInputEmail1" aria-describedby="emailHelp"
                   placeholder="Enter email" value={email} onChange={this.handleEmail}/>
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control mr-sm-6" id="exampleInputPassword1" placeholder="Password" value={password} onChange={this.handlePassword}/>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Admin Code</label>
            <input type="password" className="form-control mr-sm-6" id="exampleInputPassword2" placeholder="Admin Code" value={adminCode} onChange={this.handleAdminCode}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default RegisterAdmin;
