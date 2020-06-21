import React, { Component } from 'react';
import { connect } from 'react-redux';
//import Login from './Login';
import { datafirebase } from '../../../firebaseConnect';
import { BrowserRouter as Link, Redirect, NavLink, useLocation } from "react-router-dom";
import Add from '../Add';
import Table_news from '../Table_news';
import Edit_table from '../Edit_table';
import User from './User';
// import User from '../../img/logo';

class Admin_manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: '',
            islogin: true,
            isAdd: false,
            data: '',
            logo:'../../img/chuyemuc/giaitri/ad11_ntaw.jpg'
        }

    }
    logout = () => {
        localStorage.setItem('userData', '');
        this.setState({ islogin: false });
        //return <Link to="/login"></Link>;
    }
    isAdd = () => {
        if (this.props.isAdd === true) {
            //  console.log( this.props.match.params.slug);
            return (<Add slug={this.props.match.params.slug} />)
        }

    }
    Show_table = () => {
        if (this.props.is_show_table) {
            return (<Table_news slug={this.props.match.params.slug} />)
        }
    }
    Show_edit = ()=>{
        if(this.props.is_show_edit){         
            return <Edit_table/>
        }
    }
    Show_table_user =()=>{
        if (this.props.is_show_table_user) {
            return (<User/>)
        }
    }
    isShow = () => {
        if (this.props.is_status_login) {
            return (
                <div className="container-fuild">
                    <div className="jumbotron">
                        <h3 className="display-6 text-center">Quản Lý Tin Tức</h3>

                        <div type="button" onClick={() => this.logout()} className="btn btn-danger float-right ml-1">Thoát
                         <i className="fa fa-power-off ml-1" aria-hidden="true" /></div>

                        <div className="menu-list float-right">
                            <li data-toggle="collapse" data-target="#Categories" className="btn btn-info collapsed active Categories">
                                <a href="#">Thêm Mới Chuyên mục <span className="arrow" /><i className="fa fa-hand-o-down" /></a>
                            </li>
                            <ul className="sub-menu-2 collapse" id="Categories">
                                <li onClick={() => this.props.is_Add()} ><NavLink to='/admin_manager/addnew-Categories/van-hoa.html'>Văn Hóa</NavLink></li>
                                <li onClick={() => this.props.is_Add()} ><NavLink to='/admin_manager/addnew-Categories/suc-khoe.html'>Sức Khỏe</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew-Categories/giai-tri.html'>Giải Trí</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew-Categories/kham-pha.html'>Khám Phá</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew-Categories/du-lich.html'>Du lịch</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew-Categories/khach-san.html'>Khách Sạn</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew-Categories/giao-duc.html'>Giáo Dục</NavLink></li>


                            </ul>
                        </div>
                        {/* end add new chuyen muc */}
                        <div className="menu-list float-right mr-1  gradient-buttons">
                            <li data-toggle="collapse" data-target="#addnew" className="btn btn-success collapsed active addnew_li">
                                <a href="#">Thêm Mới<span className="arrow" /><i className="fa fa-plus" aria-hidden="true" /></a>
                            </li>
                            <ul className=" collapse addnew_ul" id="addnew">
                                <li onClick={() => this.props.is_Add()} ><NavLink to='/admin_manager/addnew/tin-moi-nhat.html'>Tin Mới Nhất</NavLink></li>
                                <li onClick={() => this.props.is_Add()} ><NavLink to='/admin_manager/addnew/tin-tuc-the-gioi.html'>Tin Tức Thế Giới</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew/tin-cong-nghe.html'>Tin Công Nghệ</NavLink> </li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew/tin-kinh-te.html'>Tin Kinh Tế - Thị Trường</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew/tin-the-thao.html'>Tin Thể Thao</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew/tin-nong.html'>Tin Nóng</NavLink></li>
                                <li onClick={() => this.props.is_Add()}><NavLink to='/admin_manager/addnew/tin-noi-bat.html'>Tin Nổi Bật</NavLink></li>
                            </ul>
                        </div>

                    </div>
                    {/* end add new */}
                    {/* show table */}
                    <div className="nav-side-menu">
                        <div className="brand"><img  src="../img/logo/logo.png"/></div>
                        <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content" />
                        <div className="menu-list div_table_active">
                            <ul id="menu-content" className="menu-content collapse out">
                                <li>
                                    <a href="/"><i className="fas fa-tachometer-alt fa-lg" /> Trang Chủ</a>
                                </li>
                                <li data-toggle="collapse" data-target="#products" className="collapsed active">
                                    <a href="#"><i className="fab fa-studiovinari fa-lg" /> Chuyên Mục <span className="arrow" /></a>
                                </li>
                                <ul className="sub-menu collapse" id="products">
                                    <NavLink to='/admin_manager/show-Categories/van-hoa.html'><li onClick={() => this.props.is_Show_table()} >Văn Hóa</li></NavLink>
                                    <NavLink to='/admin_manager/show-Categories/suc-khoe.html'><li onClick={() => this.props.is_Show_table()} >Sức Khỏe</li></NavLink>
                                    <NavLink to='/admin_manager/show-Categories/giai-tri.html'><li onClick={() => this.props.is_Show_table()}>Giải Trí</li></NavLink>
                                    <NavLink to='/admin_manager/show-Categories/kham-pha.html'><li onClick={() => this.props.is_Show_table()}>Khám Phá</li></NavLink>
                                    <NavLink to='/admin_manager/show-Categories/du-lich.html'><li onClick={() => this.props.is_Show_table()}>Du lịch</li></NavLink>
                                    <NavLink to='/admin_manager/show-Categories/khach-san.html'><li onClick={() => this.props.is_Show_table()}>Khách Sạn</li></NavLink>
                                    <NavLink to='/admin_manager/show-Categories/giao-duc.html'><li onClick={() => this.props.is_Show_table()}>Giáo Dục</li></NavLink>

                                </ul>
                                <NavLink to='/admin_manager/show/tin-moi-nhat.html'>
                                    <li onClick={() => this.props.is_Show_table()} ><i className="fa fa-newspaper-o" aria-hidden="true" /> Bảng Tin Mới Nhất</li>
                                </NavLink>
                                {/*  */}
                                <li data-toggle="collapse" data-target="#new" className="collapsed"><i className="fab fa-pagelines fa-lg" /> Bảng Tin Công Nghệ <span className="arrow" /></li>
                                <ul className="sub-menu collapse" id="new">
                                    <NavLink to='/admin_manager/show/tin-cong-nghe.html'>
                                        <li onClick={() => this.props.is_Show_table()}>Tin Công Nghệ </li>
                                    </NavLink>
                                    <NavLink to='/admin_manager/show/tin-cong-nghe/san-pham-cong-nghe.0.html'>
                                        <li onClick={() => this.props.is_Show_table()}>Sản Phẩm Công Nghệ </li>
                                    </NavLink>
                                    <NavLink to='/admin_manager/show/tin-cong-nghe/thu-thuat.1.html'>
                                        <li onClick={() => this.props.is_Show_table()}>Thủ Thuật</li>
                                    </NavLink>
                                    <NavLink to='/admin_manager/show/tin-cong-nghe/tin-game.2.html'>
                                        <li onClick={() => this.props.is_Show_table()}>Tin Game </li>
                                    </NavLink>
                                </ul>
                                <NavLink to='/admin_manager/show/tin-tuc-the-gioi.html'>
                                    <li onClick={() => this.props.is_Show_table()} ><i className="fa fa-globe" aria-hidden="true/" /> Bảng Tin Thế Giới</li>
                                </NavLink>
                                <NavLink to='/admin_manager/show/tin-kinh-te.html'>
                                    <li onClick={() => this.props.is_Show_table()}><i className="fa fa-file-powerpoint-o" aria-hidden="true" /> Bảng Tin Kinh Tế</li>
                                </NavLink>
                                <NavLink to='/admin_manager/show/tin-nong.html'>
                                    <li onClick={() => this.props.is_Show_table()}> <i className="fa fa-fire" aria-hidden="true" />  Bảng Tin Nóng </li>
                                </NavLink>
                                <NavLink to='/admin_manager/show/tin-noi-bat.html'>
                                    <li onClick={() => this.props.is_Show_table()}> <i className="fa fa-bolt" aria-hidden="true" />  Bảng Tin Nổi Bật</li>
                                </NavLink>
                                <NavLink to='/admin_manager/show/tin-the-thao.html'>
                                    <li onClick={() => this.props.is_Show_table()}><i className="fa fa-futbol-o" aria-hidden="true" />  Bảng Tin Thể Thao</li>
                                </NavLink>
                                <NavLink to='/admin_manager/show/thanh-vien.html'>
                                    <li onClick={() => this.props.is_Show_table_user()}><i className="fa fa-users fa-lg" aria-hidden="true" />  Thành Viên</li>
                                </NavLink>
                                
                            </ul>
                        </div>
                    </div>

                </div>


            );
        } else return <Redirect to="/login" />
    }
    render() {
        if (this.state.islogin === false) {
            return <Redirect to="/login" />
        }
    
        return (
            <div className="container-fuild">
                {this.isShow()}
                {this.isAdd()}
                {this.Show_table()}
                {this.Show_edit()}
                {this.Show_table_user()}
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        is_status_login: state.is_status_login,
        isAdd: state.isAdd,
        is_show_table: state.is_show_table,
        is_show_edit:state.is_show_edit,
        is_show_table_user:state.is_show_table_user
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        is_status_app: () => {
            dispatch({ type: 'is_status_app' })
        },
        is_Add: () => {
            dispatch({ type: 'is_add' })
        },
        is_Show_table: () => {
            dispatch({ type: 'is_show_table' })
        },
        is_Show_table_user: () => {
            dispatch({ type: 'is_show_table_user' })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin_manager)
