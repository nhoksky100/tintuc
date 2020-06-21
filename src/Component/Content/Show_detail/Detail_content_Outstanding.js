import React, { Component } from 'react';
import { datafirebase } from '../../../firebaseConnect';
import html from 'react-inner-html';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
class Detail_content_Outstanding extends Component {
    constructor(props) {
        super(props);
        this.state = {         
            dataFB: []
        }
    }
    Content = (content) => {
        return <div {...html(content)}></div>;
    }
    componentWillMount() {
        var data = datafirebase.database().ref('TinNoiBat');
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
               
              {/* <button onClick={()=>this.props.change_status()} className="btn btn-info">click</button> */}
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
        Is_status_sidebar_midle: state.Is_status_sidebar_midle
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        is_status: (ac_status) => {
            dispatch({type:'Is_status_sidebar_midle',ac_status})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Detail_content_Outstanding)

