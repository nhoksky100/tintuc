import React, { Component } from 'react';
import { datafirebase } from '../../../firebaseConnect';
import html from 'react-inner-html';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
class Detail_content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getid: -1,
            dataFB: []
        }
    }
    Content = (content) => {
        return <div {...html(content)}></div>;
    }
    componentWillMount() {
        var path_data_detail = this.props.path;
        console.log(path_data_detail);
        
        var data = {};
        if (localStorage.getItem('dataDetail') === null || localStorage.getItem('dataDetail') === undefined || localStorage.getItem('dataDetail') === "") {
            //  alert('da tao du lieu detail');        
            localStorage.setItem('dataDetail', path_data_detail);
            data = datafirebase.database().ref(path_data_detail);
        } else {
            path_data_detail = localStorage.getItem('dataDetail');
            // alert('da lay du lieu detail');
            data = datafirebase.database().ref(path_data_detail);
        } if (window.location === true || (localStorage.getItem('dataDetail') === null || localStorage.getItem('dataDetail') === '')) {
            var urlpathname = window.location.pathname;
            for (var i = 10; i < urlpathname.length; i++) {
                if (urlpathname.charAt(i) === '/') {
                    //  alert('co'+i);
                    path_data_detail = urlpathname.slice(10, i);
                    break;
                }
            }
            localStorage.setItem('dataDetail', path_data_detail); 
            data = datafirebase.database().ref(path_data_detail);
        }
        //lấy dữ liệu từ Store và nếu có giá trị thì duyệt từng phần tử đổ vào 1 mảng truyền cho biến trung gian state lưu lại data
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
            this.setState({
                dataFB: datapush
            })
        })
    }
    render() {


        return (
            <div className="col-8 shadow p-3 mb-5 mt-5 bg-white rounded">
                <div className="container-fuild">
                    <div className="row">
                        {
                            this.state.dataFB.map((value, key) => {
                                if (parseInt(this.props.match.params.id) === key) {
                                    return (
                                        <div className="col" key={key}>
                                            <h3 className="card-title text-center">{value.title}</h3>
                                            <p className="card-text  .small smalls">{value.datetime}</p>
                                            <div className="card-text"> {this.Content(value.content)} </div>
                                        </div>
                                    )
                                } else if (value.id === null) { return false }
                            })

                        }

                    </div>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Detail_content)
