import React, { Component } from 'react';
import { datafirebase } from '../../../firebaseConnect';
import html from 'react-inner-html';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
class Detail_content_Related extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFB: []
        }
    }
    Content = (content) => <div {...html(content)}></div>;
   
    componentWillMount() {
         var newpath = this.props.path;
        // var talbe_path = newpath;
      //  console.log(newpath);
        // if (localStorage.getItem('dataDetail') === null || localStorage.getItem('dataDetail') === undefined || localStorage.getItem('dataDetail') === "") {
        //     localStorage.setItem('dataDetail', this.props.path);
        // } 
    //  var  urlpath = localStorage.getItem('dataDetail');
      //console.log(urlpath);
      
        // var data = datafirebase.database().ref(urlpath);
        // //lấy dữ liệu từ Store và nếu có giá trị thì duyệt từng phần tử đổ vào 1 mảng truyền cho biến trung gian state lưu lại data
        // data.on('value', (notes) => {
        //     var datapush = [];
        //     notes.forEach(element => {
        //         const key = element.key;
        //         const notetitle = element.val().notetitle;
        //         const notecontent = element.val().notecontent;// lay đúng tên dữ liệu trên firebase
        //         const datetime = element.val().datetime;
        //         const file = element.val().file_image;
        //         datapush.push({
        //             id: key,
        //             title: notetitle,
        //             content: notecontent,
        //             datetime: datetime,
        //             file_image: file
        //         });
        //     });
        //     this.setState({
        //         dataFB: datapush
        //     })
        // })
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
export default connect(mapStateToProps, mapDispatchToProps)(Detail_content_Related)

