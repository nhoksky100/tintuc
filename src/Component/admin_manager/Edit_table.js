import React, { Component } from 'react';
import CKEditor from "react-ckeditor-component";
import { Redirect } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import html from 'react-inner-html';
class Edit_table extends Component {
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
        this.setState({
            id: this.props.data_edit[0].id,
            notetitle: this.props.data_edit[0].title,
            notecontent: this.props.data_edit[0].content,
            file_image: this.props.data_edit[0].file_image

        })
    }
    Content = (content) => <div {...html(content)}></div>;
    isChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        })
    }

    EditData = (title, content, file_image) => {
        if (this.state.f_file === undefined) {
            this.state.f_file = this.state.file_image;

        }
        if (file_image === undefined) {
            file_image = this.state.f_file;
        }
        if (title !== '' && content !== '' && file_image !== '' && file_image !== undefined
            && this.state.f_file !== '') {
            var newitem = {}; // them moi du lieu
            newitem.notetitle = title;
            newitem.notecontent = content;
            var dateFormat = require('dateformat');
            var datetime = new Date();
            var hours = datetime.getHours();
            var ampm = hours >= 12 ? ' PM' : ' AM';
            newitem.datetime = dateFormat(datetime, "dS, dd/mm/yyyy - h:MM") + ampm;
            newitem.file_image = file_image;
            newitem.id = this.props.data_edit[0].id;
            var url_data = this.props.get_data;
            //  this.setState({ notetitle: '', notecontent: '', file_image: '' });
            toast(<div className="save_add"><i className="fa fa-check" aria-hidden="true" />
                <i> Sửa Thành Công</i></div>);
            this.props.Edit_Data(newitem, url_data);
            setTimeout(() => {
                this.props.is_Show_edit();
              }, 5000);
        }
        else {
            toast(<div className="clear_add"><i className="fa fa-minus-circle" aria-hidden="true" />
                <i> Các Trường Không Được bỏ trống</i></div>);
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

    is_Show = () => {
        if (this.props.is_show_edit) {
            return (
                <div className="container-sm">
                    <div className=" text-center">
                        <h4 id="title_edit">Sửa {this.props.value_edit} </h4>
                    </div>

                    <form id="form_width" className="text-center" >
                        <div className="form-group _title">

                            <label htmlFor="notecontentname">Tiêu Đề Nội Dung:</label>
                            <input defaultValue={this.state.notetitle} type="text" onChange={(e) => this.isChange(e)} name="notetitle" id="nodetitle" className="form-control" placeholder="title" aria-describedby="noteedit" />
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
                        <div className="form-group" >
                            <label htmlFor="url_image">URL Địa Chỉ Hình Ảnh:</label>
                            <input defaultValue={this.state.file_image} type="text" onChange={(e) => this.isChange(e)} name="f_file" id="url_image" className="form-control" placeholder="url_image" aria-describedby="noteedit" />
                            <img className="url_img" src={this.state.f_file} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageUpload" type="file" className="btn btn-primary btn-block btn-outlined">Chọn Hình Ảnh
                                    <i className="fa fa-file-image-o" aria-hidden="true" /></label>
                            <input type="file" onChange={() => this.getFile()} name="f_file" id="imageUpload" accept="img/*" ref="file" className="form-control" placeholder="title" aria-describedby="noteedit" />
                            <img className="url_img" src={this.state.file[0]} />
                        </div>

                        <button type="reset" onClick={() => this.EditData(this.state.notetitle, this.state.notecontent, this.state.file[0], this.state.select_technology)} className="btn btn-dark btn-block reset">Sửa <i className="fas fa-save" /></button>
                        <button type="button" onClick={() => this.Handle_close()} className="btn btn-danger btn-block">Đóng <i className="fa fa-times-circle" aria-hidden="true" /></button>

                    </form>
                </div>
            )
        }
    }
    //close
    Handle_close = () => {
        this.props.is_Show_edit();
    }
    render() {
        // if (this.props.is_show_table === false) {

        //     return <Redirect to={"/admin_manager/edit/" + this.props.slug + ".html"} />
        // } 
        return (
            <div >
                {this.is_Show()}
                <ToastContainer />
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        is_show_table: state.is_show_table,
        data_edit: state.data_edit,
        value_edit: state.value_edit,
        get_data: state.get_data,
        slug: state.slug,
        is_show_edit: state.is_show_edit
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Edit_Data: (get_data_Edit, Get_url_data) => {
            dispatch({ type: 'edit_data', get_data_Edit, Get_url_data })
        },
        is_Show_edit: () => {
            dispatch({ type: 'is_show_edit' })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit_table)
