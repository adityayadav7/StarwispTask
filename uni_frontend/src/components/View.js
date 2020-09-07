import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import ReactPaginate from 'react-paginate';
import '../App.css'

class View extends Component {
    constructor(props) {
        super(props)

        this.state = {
            University_Data: [],
            delete: false,
            ID: '',
            rowsPerPage: 3,
            page: 0,
            Offset: 0,
            Uni: []
        }
    }
    componentDidMount() {
        this.getUniversityList()
        localStorage.setItem('Id', this.state.rowsPerPage)

    }
    componentWillMount() {
         this.getUniversityList()
    }
 
    getUniversityList() {

        axios.get('http://localhost:5000/api/data')
            .then(res => {
                this.setState({
                    University_Data: res.data
                })
            }).catch(err => {
                console.log(err)
            })
    }
    onNext(e) {
        const selectedPage = e.selected;
        let r=this.state.rowsPerPage
        const offset = selectedPage * r ;

        this.setState({
            page: selectedPage,
            Offset: offset
        }, 
        () => {
            this.getUniversityList()
        });
    }
    onChangeDelete(e, id) {
        this.setState({
            delete: true,
            ID: id
        })
    }
    onChangeDelete1(e) {
        this.setState({
            delete: false,
            ID: ''
        })
    }
    delete(e, id) {
        axios.delete('http://localhost:5000/api/delete/' + id)
            .then(res => {
                this.setState({
                    delete: false
                })
                this.getUniversityList()
                console.log('deleted')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {

        return (
            <div >
                <Table aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <TableCell>UID</TableCell>
                            <TableCell>University Name</TableCell>
                            <TableCell>Registration Date</TableCell>
                            <TableCell>Expiry Date</TableCell>
                            <TableCell>Image Url</TableCell>
                            <TableCell>No.of Student</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Web URL</TableCell>
                            <TableCell>Contact No.</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.University_Data.slice(this.state.Offset, this.state.Offset + this.state.rowsPerPage).map((d, i) => {
                            return (

                                <TableRow key={i}>
                                    <TableCell>{d.uid}</TableCell>
                                    <TableCell>{d.Uniname}</TableCell>
                                    <TableCell>{d.regDate}</TableCell>
                                    <TableCell>{d.ExpiryDate}</TableCell>
                                    <TableCell>{d.imgurl}</TableCell>
                                    <TableCell>{d.students}</TableCell>
                                    <TableCell>{d.email}</TableCell>
                                    <TableCell>{d.weburl}</TableCell>
                                    <TableCell>{d.ContactNo}</TableCell>
                                    <TableCell>
                                        <Link to={"/edit/" + d.uid}>Edit</Link>
                                        <Button onClick={e => this.onChangeDelete(e, d.uid)} >Delete</Button>
                                    </TableCell>
                                    {this.state.delete ?
                                        (
                                            <div className="base-container">
                                                <div className="xb">
                                                    <div className="form" onSubmit={this.login}>
                                                        <div className="header">Do you want to delete?</div>

                                                        <div className="delete1">
                                                            <div className='footer'>
                                                                <button type="submit" onClick={e => this.onChangeDelete1(e)} className="btn1">No</button>
                                                            </div>
                                                            <div className='footer1'>
                                                                <button type="submit" onClick={e => { this.delete(e, this.state.ID) }} className="btn1">Yes</button>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        )
                                        :
                                        null
                                    }
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                

                <div className='fr'>
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  pageCount={Math.ceil(this.state.University_Data.length/3)}
                  onPageChange={this.onNext.bind(this)}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                
                />
                </div>
            </div>
        )
    }
}

export default View

