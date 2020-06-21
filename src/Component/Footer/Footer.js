import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Link, NavLink, Redirect } from "react-router-dom";
class Footer extends Component {
    isShow = () => {
        if (this.props.is_status_show_app) {
            return (
                <footer className="footer-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-2 offset-lg-1">
                                <div className="footer-widget">
                                    <h5>Đời Sống</h5>
                                    <ul>
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
                            <div className="footer-widget">
                                <h5>Tin Tức Header</h5>
                                <ul>
                                    <li ><NavLink to="/" >Tin Mới Nhất</NavLink></li>
                                    <li ><NavLink to="/TinTucTheGioi" >Tin Tức Thế Giới</NavLink></li>
                                    <li ><NavLink to="/TinCongNghe" >Tin Công Nghệ</NavLink></li>
                                    <li ><NavLink to="/TinKinhTe" >Tin Kinh Tế - Thị Trường</NavLink></li>

                                </ul>
                            </div>
                            <div className="col-lg-2">
                                <div className="footer-widget">
                                    <h5>Công Nghệ</h5>
                                    <ul>
                                        <li ><NavLink to="/SanPhamCongNghe" >Sản Phẩm Công Nghệ</NavLink></li>
                                        <li ><NavLink to="/ThuThuat" >Thủ Thuật</NavLink></li>
                                        <li ><NavLink to="/TinGame" >Tin Game</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-2">
                                <div className="footer-widget">
                                    <h5>Nổi Bật</h5>
                                    <ul>
                                        <li ><NavLink to="/TinNoiBat" >Tin Nổi Bật</NavLink></li>
                                        <li ><NavLink to="/TinTheThao" >Tin Thể Thao</NavLink></li>
                                        <li ><NavLink to="/TinNong" >Tin Nóng</NavLink></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="copyright-reserved">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="copyright-text float-right">                                  
                                            2020 © All  <i className="fa fa-copyright" aria-hidden="true"/>
                                    </div>
                                    <div className="payment-pic">
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href="/" className="cd-top">Back To Top</a>
                </footer>

            )

        }
    }
    render() {
        return (
            <div>
                {this.isShow()}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        is_status_show_app: state.is_status_show_app
    }
}
export default connect(mapStateToProps)(Footer)
