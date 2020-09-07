import React, { Component } from 'react'
import '../style/style.css';
import axios from 'axios';
class AddDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            uniname: '',
            regDate: '',
            expDate: '',
            weburl: '',
            imgUrl: '',
            students: '',
            email: '',
            contactNo: '',
            weburl:''

        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit(e) {
        e.preventDefault()
        const details = {
            "Uniname": this.state.uniname,
            "email": this.state.email,
            "regDate": this.state.regDate,
            "ExpiryDate": this.state.expDate,
            "imgurl": this.state.imgUrl,
            "students": this.state.students,
            "ContactNo": this.state.contactNo,
            "weburl":this.state.weburl
        }
        axios.post('http://localhost:5000/api/add', details)
            .then(res => {
                console.log('sent');
                this.props.history.push('/view');
            })
            .catch(err => {
                console.log(err)
            })
    }


    render() {
        return (
            <div>
                <div className='fr'>
                    <div className='shadow'>
                        <div className="form1">

                            <form >

                                <div>
                                    <div className='same-line'>
                                        <div className="form-group1 ">
                                            <input
                                                className="input1"
                                                id="uniname"
                                                type="text"
                                                value={this.state.uniname}
                                                onChange={this.onChange}
                                                required />
                                            <label>University Name</label>
                                        </div>
                                        <div className="form-group1">
                                            <input
                                                className="input1"
                                                id="regDate"
                                                type="date"
                                                value={this.state.regDate}
                                                onChange={this.onChange}

                                                required />
                                            <label htmlFor="name">Registration Date</label>
                                        </div>
                                    </div>
                                    <div className='same-line'>
                                        
                                        <div className="form-group1 ">
                                            <input
                                                className="input1"
                                                id="expDate"
                                                type="date"
                                                value={this.state.expDate}
                                                onChange={this.onChange}
                                                required />
                                            <label >Expiry date</label>
                                        </div>
                                        <div className="form-group1 ">
                                            <input
                                                className="input1"
                                                id="imgUrl"
                                                type="url"
                                                value={this.state.imgUrl}
                                                onChange={this.onChange}
                                                required />
                                            <label >Image Url</label>
                                        </div>
                                    </div>
                                    <div className='same-line'>
                                        
                                        <div className="form-group1">
                                            <input
                                                className="input1"
                                                id="students"
                                                type="number"
                                                value={this.state.students}
                                                onChange={this.onChange}
                                                required />
                                            <label >No.of Student</label>
                                        </div>
                                        <div className="form-group1 ">
                                            <input
                                                className="input1"
                                                type="email"
                                                id="email"
                                                value={this.state.email}
                                                onChange={this.onChange}
                                                required />
                                            <label >Email</label>
                                        </div>
                                    </div>
                                    <div className='same-line'>
                                        
                                        <div className="form-group1 ">
                                            <input
                                                className="input1"
                                                id="contactNo"
                                                type="number"
                                                value={this.state.contactNo}
                                                onChange={this.onChange}
                                                required />
                                            <label >Contact No.</label>
                                        </div>
                                        <div className="form-group1 ">
                                            <input
                                                className="input1"
                                                id="weburl"
                                                type="url"
                                                value={this.state.weburl}
                                                onChange={this.onChange}
                                                required />
                                            <label >Web Url</label>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                {/* <div className='btn-submit1'>
                                    <button onClick={this.props.onCancel} >Cancel</button>
                                </div> */}
                                <div className='btn-submit'>
                                    <button type='submit' onClick={this.onSubmit.bind(this)} > Submit</button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default AddDetails;