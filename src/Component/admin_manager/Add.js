import React, { Component } from 'react';
import { connect } from 'react-redux';
// import CKEditor from 'ckeditor4-react';
import CKEditor from "react-ckeditor-component";
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            notetitle: '',
            notecontent: '',
            image: '',
            file_image: '',
            content: 'content',
            name_component: '',
            value_component: '',
            file: ''
        }
    }
    componentWillMount() {
        var slug = this.props.slug;
        switch (slug) {
            case 'tin-moi-nhat':
                this.setState({ name_component: 'TinMoiNhat', value_component: 'Tin Mới Nhất' }); break;
            case 'tin-tuc-the-gioi':
                this.setState({ name_component: 'TinTucTheGioi', value_component: 'Tin Tức Thế Giới' }); break;
            case 'tin-cong-nghe':
                this.setState({ name_component: 'TinCongNghe', value_component: 'Tin Công Nghệ' }); break;
            case 'tin-cong-nghe/san-pham-cong-nghe':
                this.setState({ name_component: 'SanPhamCongNghe', value_component: 'Sản Phẩm Công Nghệ' }); break;
            case 'tin-cong-nghe/thu-thuat':
                this.setState({ name_component: 'ThuThuat', value_component: 'Thủ Thuật Công Nghệ' }); break;
            case 'tin-cong-nghe/tin-game':
                this.setState({ name_component: 'TinGame', value_component: 'Tin Game' }); break;
            case 'tin-the-thao':
                this.setState({ name_component: 'TinTheThao', value_component: 'Tin Thể Thao' }); break;
            case 'tin-nong':
                this.setState({ name_component: 'TinNong', value_component: 'Tin Nóng' }); break;
            case 'tin-noi-bat':
                this.setState({ name_component: 'TinNoiBat', value_component: 'Tin Nổi Bật' }); break;
            case 'tin-kinh-te':
                this.setState({ name_component: 'TinKinhTe', value_component: 'Tin Kinh Tế - Thị Trường' }); break;
            case 'suc-khoe':
                this.setState({ name_component: 'ChuyenMuc/SucKhoe', value_component: 'Chuyên mục - Sức Khỏe' }); break;
            case 'giai-tri':
                this.setState({ name_component: 'ChuyenMuc/GiaiTri', value_component: 'Chuyên mục - Giải Trí' }); break;
            case 'kham-pha':
                this.setState({ name_component: 'ChuyenMuc/KhamPha', value_component: 'Chuyên mục - Khám Phá' }); break;
            case 'du-lich':
                this.setState({ name_component: 'ChuyenMuc/DuLich', value_component: 'Chuyên mục - Du Lịch' }); break;
            case 'khach-san':
                this.setState({ name_component: 'ChuyenMuc/KhachSan', value_component: 'Chuyên mục -Khách Sạn' }); break;
            case 'giao-duc':
                this.setState({ name_component: 'ChuyenMuc/GiaoDuc', value_component: 'Chuyên mục - Giáo Dục' }); break;
            case 'van-hoa':
                this.setState({ name_component: 'ChuyenMuc/VanHoa', value_component: 'Chuyên mục - Văn Hóa' }); break;
            default: break;
        }
    }

    isChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    addEditData = (title, content, file_image, select_technology) => {
        if (file_image === undefined) {
            file_image = this.state.f_file;
        }
        if (title !== '' && content !== '' && file_image !== '') {
            var newitem = {}; // them moi du lieu
            newitem.notetitle = title;
            newitem.notecontent = content;
            var dateFormat = require('dateformat');
            var datetime = new Date();
            // set time
            var hours = datetime.getHours();
           // var minutes = datetime.getMinutes();
            var ampm = hours >= 12 ? ' PM' : ' AM';
            //   hours = hours % 12;
           // hours = hours ? hours : 12; // the hour '0' should be '12'
          //  minutes = minutes < 10 ? '0' + minutes : minutes;
           // var strTime = hours + ':' + minutes;
            //end set time
            newitem.datetime = dateFormat(datetime, "dS, dd/mm/yyyy - h:MM")+ampm;
            newitem.file_image = file_image;
            if (select_technology === 'select' || select_technology === undefined) {
                this.setState({ notetitle: '', notecontent: '', file_image: '' });
                this.props.addDataStore(newitem, this.state.name_component);
                toast(<div className="save_add"><i className="fas fa-save" /><i> Thêm Mới Thành Công</i></div>);
            } else {
                this.setState({ notetitle: '', notecontent: '', file_image: '' });
                this.props.addDataStore(newitem, select_technology);
                toast(<div className="save_add"><i className="fas fa-save" /><i> Thêm Mới Thành Công</i></div>);
            }
        } else {
            toast(<div className="clear_add"><i className="fa fa-minus-circle" aria-hidden="true" /><i> Các Trường Không Được bỏ trống</i></div>);
        }
    }

    getFile = () => {
        // const ffile = e.target.files[0].name; // lay ten file
        var files_s = this.refs.file.files[0];
        if (files_s !== undefined) {
            var reader = new FileReader();
            var url = reader.readAsDataURL(files_s);
            reader.onloadend = function (e) {
                this.setState({
                    file: [reader.result],
                    file_image: [reader.result]
                })
            }.bind(this);
        } else {
            this.setState({
                file: this.state.file_image
            })

        }

        // this.setState({
        //     file_image: ffile
        // })
    }
    onChange = (e) => {
        const vlaue = e.editor.getData();
        this.setState({
            notecontent: vlaue
        })
    }
    select_case = () => {
        if (this.state.name_component === 'TinCongNghe') {
            return (
                <div className="row text-center center">
                    <select required onChange={(e) => this.isChange(e)} name="select_technology" type="text" id="prefixInside4" className="form-control" >

                        <option value="select">Select</option>
                        <option value="SanPhamCongNghe">Sản Phẩm Công Nghệ</option>
                        <option value="ThuThuat">Thủ Thuật</option>
                        <option value="TinGame">Tin Game</option>
                    </select>
                </div>

            )
        }
    }
    // hien thi or an file input
    is_Show_input_image = () => {
        if (this.state.f_file === undefined || this.state.f_file === '') {
            return (
                <div className="form-group div_inline">
                    <label htmlFor="imageUpload" type="file" className="btn btn-primary btn-block btn-outlined">Chọn Hình Ảnh
                         <i className="fa fa-file-image-o" aria-hidden="true" /></label>
                    <input className="block" type="file" onChange={() => this.getFile()} name="f_file" id="imageUpload" accept="img/*" ref="file" className="form-control" placeholder="title" aria-describedby="noteedit" /><img className="url_img" src={this.state.file[0]} />
                </div>
            )
        }
    }
    isShow = () => {
        if (this.props.isAdd === true) {
            return (
                <div className="container-sm">
                    <div className=" text-center">
                        <h4 id="title_add">Thêm {this.state.value_component}</h4>
                    </div>
                    {this.select_case()}
                    <form id="form_width">
                        <div className="form-group _title">

                            <label htmlFor="notecontentname">Tiêu Đề Nội Dung:</label>
                            <input type="text" onChange={(e) => this.isChange(e)} name="notetitle" id="nodetitle" className="form-control" placeholder="title" aria-describedby="noteedit" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="notecontent">Nội Dung Bài Viết: </label>
                            {/* <textarea name="notecontent" defaultValue={this.props.content} className="form-control" type="text" placeholder="Text area" /> */}
                            <CKEditor
                                activeClass="p10"
                                content={this.state.notecontent}
                                events={{
                                    // "blur": this.onBlur,
                                    // "afterPaste": this.afterPaste,
                                    "change": this.onChange
                                }}
                                onChange={(e) => this.onChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="url_image">URL Địa Chỉ Hình Ảnh:</label>
                            <input defaultValue={this.state.f_file} type="text" onChange={(e) => this.isChange(e)} name="f_file" id="url_image" className="form-control" placeholder="url_image" aria-describedby="noteedit" />
                            <img className="url_img" src={this.state.f_file} />
                        </div>

                        {this.is_Show_input_image()}

                        <button
                            type="reset" onClick={() => this.addEditData(this.state.notetitle, this.state.notecontent, this.state.file[0], this.state.select_technology)} className="btn btn-dark btn-block reset">Thêm <i className="fas fa-save"
                            />
                        </button>
                    </form>
                </div>
            )
        } else return <Redirect to="/login" />
    }
    render() {
        return (
            <div>
                {this.isShow()}
                <ToastContainer />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isAdd: state.isAdd
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addDataStore: (GetItem, Get_url_data) => {
            dispatch({ type: "ADD_DATA", GetItem, Get_url_data })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Add);