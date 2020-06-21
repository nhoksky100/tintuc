import React, { Component } from 'react';
import { BrowserRouter as Link, Route, Redirect } from "react-router-dom";
import { datafirebase } from '../../../firebaseConnect';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const data_user = [];
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false,
            keyword: ''
        }
    }
    componentWillMount() {
        var data = datafirebase.database().ref('AdminUser');
        data.on('value', (notes) => {
            //var datapush = [];
            notes.forEach(element => {
                const {key} = element;
                const {username} = element.val();
                const {password} = element.val();// lay đúng tên dữ liệu trên firebase      
                data_user.push({
                    id: key,
                    username_fire: username,
                    password_fire: password
                })
            });
        })
        if (localStorage.getItem('userData') === null || localStorage.getItem('userData') === undefined || localStorage.getItem('userData') === "") { //kiem tra lay, neu du lieu khong co thi 
            localStorage.setItem('userData', ''); // tao lai du lieu trong localStorage truyền vào file json và chuyển đổi thành string
            // alert('da lay du lieu');
        } else {
            var temp = localStorage.getItem('userData');
            if (temp === 'keyword') {
                // alert('da co data');
                this.props.isStatus();
                this.setState({
                    isRedirect: true
                });
            }
        }
    }

    setForm = (event) => {
        const ten = event.target.name;
        const giatri = event.target.value;

        this.setState({
            [ten]: giatri
        })
    }
    keyup = (e) => {
        if (e.keyCode === 13) {
            return this.submitForm();
        }
    }
    submitForm = () => {
        data_user.map((value) => {
            if (this.state.username === value.username_fire && this.state.password === value.password_fire.toString()) {
                this.setState({
                    isRedirect: true,
                    keyword: 'keyword',
                });
                localStorage.setItem('userData', 'keyword');
                this.props.isStatus();
            } else {
                toast(<div className="login_false"><i className="fa fa-minus-circle" aria-hidden="true" />
                    <i> Đăng nhập sai username hoặc password!</i></div>);
            }
        })
    }
    render() {
        if (this.props.is_status_show_app) {
            this.props.is_status_app();
        }
        if (this.state.isRedirect) {
            return <Redirect to="/admin_manager/" />;
        }
        return (
            <div>
                <div className="wrapper fadeInDown">
                    <div id="formContent">
                        <div className="fadeIn first">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8hsNOdWQcY3D8KhtqsfjzycZj-3ECpbDV7LN7BNNx6q0Jh-in&usqp=CAU" id="icon" alt="User Icon" />
                        </div>
                        {/* Login Form */}
                        <form noValidate="novalidate">
                            <input onKeyUp={(e) => this.keyup(e)} type="text" onChange={(event) => this.setForm(event)} id="username" className="fadeIn second" name="username" placeholder="username" />
                            <input onKeyUp={(e) => this.keyup(e)} type="password" id="password" onChange={(event) => this.setForm(event)} className="fadeIn second" name="password" placeholder="password" />
                            <input type="reset" onClick={() => this.submitForm()} className="fadeIn fourth" defaultValue="Login" />
                            {/* <input type="file" onChange={(event) => this.setFile(event)} className="form-control-file" name="ffile" id="" placeholder="" aria-describedby="fileHelpId" /> */}
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        is_status_show_app: state.is_status_show_app
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        isStatus: () => {
            dispatch({ type: 'isLogin' })
        },
        is_status_app: () => {
            dispatch({ type: 'is_status_app' })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
