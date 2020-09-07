import React, { Component } from 'react'
import '../style/style.css';
import axios from "axios";
import Loader from './Loader';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    
    this.state = {
      userid: '',
      password: '',
      error: '',
      step: true,
      load: false

    }
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
};
 


  login(e) {
   let user={
     user_id:this.state.userid,
     password:this.state.password
   }
    axios.post('http://localhost:5000/api/login',user)
    .then(res=>{
      if(res.data===null){
        toast.notify("Incorrect user_id and password", {
          duration: 2000
        })
        this.props.history.push('/');
      }else{
        localStorage.setItem('userId',user.user_id)
      //console.log(JSON.stringify(res.data));
      this.props.history.push('/dashboard');
      toast.notify("Logged In", {
              duration: 2000
            })
          }
    })
    .catch((err) => {
          this.setState({ load: false });
          
          toast.notify(err)
          console.log('Error: ' + err.toString());
        })

  }




 
  onhandle() {
    this.login();
  }


  render() {
   

    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="xb">
          {this.state.load ? <Loader /> :
            <div>
              <div className="form" onSubmit={this.login}>
                <div className="header">Login</div>
                <div className="in_pswd">{this.state.error}</div>
                <div className="form-group" >
                  <label >User ID</label>
                  <input 
                    id="userid" 
                    type="text" 
                    name="email" 
                    value={this.state.userid}  
                    onChange={this.onChange.bind(this)}
                    placeholder="Enter email"
                    />
                </div>
                <div className="form-group">
                  <label >Password</label>
                  <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    value={this.state.password}
                    onChange={this.onChange.bind(this)} 
                    placeholder="Password" 
                    />
                </div>
                <div className='footer12'>
                  <button type="submit" onClick={this.onhandle.bind(this)} className="btn1">Login</button>
                </div>
              </div>


            </div>
          }
        </div>
      </div>
    );
  }
}

export default Login;