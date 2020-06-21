import React, { Component } from 'react';
import { BrowserRouter as Link, NavLink, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { datafirebase } from '../../firebaseConnect';
import { stringtoslug } from '../stringtoslug.js';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isStatus_nav: false,
            search_value: '',
            data_search: [],
            dataFB: [],
            isStatus_search: true,
            color: 'yellow'
        }
    }

    componentWillMount() {
        var data = datafirebase.database().ref('Search');
        data.on('value', (notes) => {
            var datapush = [];
            notes.forEach(element => {
                const key = element.key;
                const notetitle = element.val().notetitle;
                const notecontent = element.val().notecontent;// lay đúng tên dữ liệu trên firebase
                const datetime = element.val().datetime;
                const file = element.val().file_image;
                datapush.push({
                    id: key,
                    title: notetitle,
                    content: notecontent,
                    datetime: datetime,
                    file_image: file
                });
            });
            this.setState({ dataFB: datapush })
        })
    }
    isShow = () => {
        if (this.props.is_status_show_app) {
            return (<header className="header-section">
                <div className="nav-item">
                    <div className="container">
                       <NavLink to="/"><span className="span_logo float-left"><img src="../../img/logo/logo.png" /></span></NavLink>
                        <div className="nav-depart">
                            <div className="depart-btn">
                                
                                <i className="ti-menu" />
                                <span>Chuyên Mục Đời Sống</span>
                                <ul className="depart-hover">
                                    <li ><NavLink to="/ChuyenMuc/SucKhoe">Sức Khỏe</NavLink></li>
                                    <li ><NavLink to="/ChuyenMuc/VanHoa">Văn Hóa</NavLink></li>
                                    <li ><NavLink to="/ChuyenMuc/GiaiTri">Giải Trí</NavLink></li>
                                    <li ><NavLink to="/ChuyenMuc/KhamPha">Khám Phá</NavLink></li>
                                    <li ><NavLink to="/ChuyenMuc/DuLich">Du lịch</NavLink></li>
                                    <li ><NavLink to="/ChuyenMuc/KhachSan">Khách Sạn</NavLink></li>
                                    <li ><NavLink to="/ChuyenMuc/GiaoDuc">Giáo Dục</NavLink></li>

                                </ul>
                            </div>
                        </div>
                        <nav id="nav-menu" className="nav-menu mobile-menu">
                            <ul>
                                <li ><NavLink to="/" activeStyle={{ color: 'red' }} activeClassName="active" >Trang Chủ</NavLink></li>
                                <li> <NavLink to="/TinTucTheGioi" activeStyle={{ color: 'red', background: '#e7ab3c' }} activeClassName="active" className="nav-link">Thế Giới</NavLink></li>
                                <li> <NavLink to="/TinCongNghe" activeStyle={{ color: 'red', background: '#e7ab3c' }} activeClassName="active" className="nav-link">Công Nghệ</NavLink>
                                    <ul className="dropdown">
                                        <li ><NavLink to="/ThuThuat">Thủ Thuật</NavLink></li>
                                        <li ><NavLink to="/TinGame">Tin Game</NavLink></li>
                                        <li ><NavLink to="/SanPhamCongNghe">Sản Phẩm Công Nghệ</NavLink></li>
                                    </ul>
                                </li>
                                <li> <NavLink to="/TinKinhTe" activeStyle={{ color: 'red', background: '#e7ab3c' }} activeClassName="active" className="nav-link">Thị Trường - Kinh Tế</NavLink></li>
                            </ul>
                        </nav>
                        <div />
                    </div>
                </div>
            </header>
            )
        }
    }
    SearchValue = (e) => {
        this.setState({ search_value: e.target.value });
        var flag = false, vkey = [], i = 0, temp = [];
        this.state.dataFB.forEach((item, key) => {
            if (
                (stringtoslug(item.title).indexOf(e.target.value) !== -1 && e.target.value !== '') ||
                (item.title.indexOf(e.target.value) !== -1 && e.target.value !== '') ||
                (item.title.toUpperCase().indexOf(e.target.value) !== -1 && e.target.value !== '') ||
                (item.title.toLowerCase().indexOf(e.target.value) !== -1 && e.target.value !== '')) {
                temp.push(item);
                vkey[i] = true; //bật true xóa key trùng lặp
                flag = true; //bật true xóa tất cả pt trùng lặp
            } if (e.target.value === '') {
                this.setState({ data_search: [] })
            }
            i++;
        })
        if (flag === false) {
            this.setState({ data_search: [] })
        }
        // lựa chọn key duy nhất được bật show
        while (i >= 0) {
            if (vkey[i] === true) {
                this.setState({ data_search: temp })
            }
            i--;
        }
    }
    isStatus_Search = () => {
        this.setState({ data_search: [] })
    }
    isShow_Search_header = () => {
        if (this.props.is_status_show_app) {
            return (
                <div className="container-2"  >
                    <span className="icon "><i className="fa fa-search" /></span>
                    <input type="search" onChange={(e) => this.SearchValue(e)} id="search" placeholder="Search..." />
                    <div className="row" id="value_search" onClick={() => this.isStatus_Search()}>
                        {this.state.data_search.map((value, key) => {

                            return (
                                <div key={key} id='div_search'>
                                    <NavLink to={"/chi-tiet/Search/" + stringtoslug(value.title) + "." + key + ".html"} className="nav-link" >
                                        <img src={value.file_image} alt="" />
                                        <li className="nav-item li_search"><h6>{value.title}</h6></li>
                                    </NavLink>
                                </div>
                            )

                        })}
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.isShow()}
                {this.isShow_Search_header()}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        is_status_show_app: state.is_status_show_app,
        Search_data: state.Search_data
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Search_click: (search) => {
            dispatch({ type: 'Search', search })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)

