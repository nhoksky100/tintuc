import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NoteContent from '../Component/Content/NoteContent';
import Detail_content_Outstanding from '../Component/Content/Show_detail/Detail_content_Outstanding';
import Detail_content_hot from '../Component/Content/Show_detail/Detail_content_hot';
import Detail_content_sport from '../Component/Content/Show_detail/Detail_content_sport';
import Detail_content_Related from '../Component/Content/Show_detail/Detail_content_Related';
import ScrollToTop from '../Component/Content/ScrollToTop';
import Login from '../Component/admin_manager/User/Login';
import Admin_manager from '../Component/admin_manager/User/Admin_manager';
import Not_page404 from '../Component/Not_page404';
import Detail_content from '../Component/Content/Show_detail/Detail_content';
import { connect } from 'react-redux';
import Search from '../Component/Headers/Search';
class Url_nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Urlpath: '',
            is_status: false
        }
    }
    componentWillMount() {
        var urlpath = this.props.path;
        this.setState({ Urlpath: urlpath })   //1   
    }
    render() { 
        var urlpath = this.props.path;
        if (localStorage.getItem('dataDetail') === null || localStorage.getItem('dataDetail') === undefined || localStorage.getItem('dataDetail') === "") {
            localStorage.setItem('dataDetail', this.props.path);
        } else {
            urlpath = localStorage.getItem('dataDetail');
        } if (window.location === true || (localStorage.getItem('dataDetail') === null || localStorage.getItem('dataDetail')) === '') {
            var urlpathname = window.location.pathname;
            for (var i = 10; i < urlpathname.length; i++) {
                if (urlpathname.charAt(i) === '/') {
                    urlpathname = urlpathname.slice(10, i);
                    break;
                }
            }
            localStorage.setItem('dataDetail', urlpathname);
        }
        return (
            
            <Fragment>
                <ScrollToTop />
                <Route exact path="/" component={NoteContent} />
                <Route exact path="/TinTucTheGioi" component={NoteContent} />
                <Route exact path="/TinTucTheGioi/" component={NoteContent} />
                <Route exact path="/TinCongNghe" component={NoteContent} />
                <Route exact path="/TinKinhTe" component={NoteContent} />
                <Route exact path="/SanPhamCongNghe" component={NoteContent} />
                <Route exact path="/TinGame" component={NoteContent} />
                <Route exact path="/ThuThuat" component={NoteContent} />
                <Route exact path="/ChuyenMuc/GiaiTri" component={NoteContent} />
                <Route exact path="/ChuyenMuc/KhamPha" component={NoteContent} />
                <Route exact path="/ChuyenMuc/GiaoDuc" component={NoteContent} />
                <Route exact path="/ChuyenMuc/KhachSan" component={NoteContent} />
                <Route exact path="/ChuyenMuc/VanHoa" component={NoteContent} />
                <Route exact path="/ChuyenMuc/DuLich" component={NoteContent} />
                <Route exact path="/ChuyenMuc/SucKhoe" component={NoteContent} />
                {/* <Route exact path="/Search/" component={Search} /> */}
                <Switch>
                    <Route exact path="/" />
                    <Route exact path="/TinTucTheGioi/" />
                   
                    <Route exact path="/TinCongNghe" />
                    <Route exact path="/TinKinhTe" />
                    <Route exact path="/SanPhamCongNghe" />
                    <Route exact path="/TinGame" />
                    <Route exact path="/ThuThuat" />
                    <Route exact path="/ChuyenMuc/GiaiTri" />
                    <Route exact path="/ChuyenMuc/KhamPha" />
                    <Route exact path="/ChuyenMuc/GiaoDuc" />
                    <Route exact path="/ChuyenMuc/KhachSan" />
                    <Route exact path="/ChuyenMuc/VanHoa" />
                    <Route exact path="/ChuyenMuc/DuLich" />
                    <Route exact path="/ChuyenMuc/SucKhoe" />
                    {/* <Route exact path="/Search/"/> */}
                    <Route exact path={"/chi-tiet/" + urlpath + "/" + ":slug.:id.html"} component={Detail_content} />
                    {/* <Route exact path={"/chi-tiet/TinLienQuan/:slug.:id.html"} component={Detail_content_Related} /> */}
                    <Route exact path="/chi-tiet/TinTheThao/:slug.:id.html" component={Detail_content_sport} />
                    <Route exact path="/chi-tiet/TinNong/:slug.:id.html" component={Detail_content_hot} />
                    <Route exact path="/chi-tiet/TinNoiBat/:slug.:id.html" component={Detail_content_Outstanding} />
                    <Route exact path="/chi-tiet/Search/:slug.:id.html" component={Search} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/admin_manager/" component={Admin_manager} />
                    <Route exact path="/admin_manager/addnew/:slug.html" component={Admin_manager} />
                    <Route exact path="/admin_manager/addnew/:slug/:slug.:id.html" component={Admin_manager} />
                    <Route exact path="/admin_manager/addnew-Categories/:slug.html" component={Admin_manager} />
                    <Route exact path="/admin_manager/show-Categories/:slug.html" component={Admin_manager} />
                    <Route exact path="/admin_manager/show/:slug.html" component={Admin_manager} />
                    <Route exact path="/admin_manager/show/:slug/:slug.:id.html" component={Admin_manager} />
                    {/* <Route exact path="/admin_manager/edit/:slug.html" component={Admin_manager} /> */}
                    <Route component={Not_page404} />
                </Switch>

            </Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        path: state.path
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch1: () => {
            // dispatch(actionCreator)
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Url_nav)

