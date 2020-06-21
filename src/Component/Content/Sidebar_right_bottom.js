import React, { Component } from 'react';
import { datafirebase } from '../../firebaseConnect';
import { stringtoslug } from '../stringtoslug.js';
import html from 'react-inner-html';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class Sidebar_right_bottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFB: [],
            textpath: ''
        }
    }
    componentWillMount() {
        var data = datafirebase.database().ref('TinNong');
        data.on('value', (notes) => {
            var datapush = [];
            notes.forEach(element => {
                const {key} = element;
                const {notetitle} = element.val();
                const {notecontent} = element.val();// lay đúng tên dữ liệu trên firebase
                const {datetime} = element.val();
                const {file_image} = element.val();
                datapush.push({
                    id: key,
                    title: notetitle,
                    content: notecontent,
                    datetime: datetime,
                    file_image: file_image
                });
            });
            datapush.reverse();
            this.setState({
                dataFB: datapush
            })


        })

    }
    isShow = () => {
        if (this.props.is_status_show_app === true) {
            return (
                <div className="col shadow ml bg">
                    <div className="filter-control">
                        <h3 className="text-muted float-left">Tin Nóng</h3>
                    </div><br />
                    {this.state.dataFB.map((value, key) => {
                        return (
                            <ul className="product-item row" key={key} >
                                <li className="list card-text col-4">
                                    <Link to={"/chi-tiet/TinNong/" + stringtoslug(value.title) + "." + key + ".html"} className="nav-link" >
                                        <img src={value.file_image} alt="" />
                                    </Link>
                                </li>
                                <li className="list card-text col-7">
                                    <Link to={"/chi-tiet/TinNong/" + stringtoslug(value.title) + "." + key + ".html"} className="nav-link">
                                        <h6 className="title">{value.title}</h6>
                                    </Link>
                                    <h6 className="card-text  .small smalls">{value.datetime}</h6>
                                </li>
                            </ul>
                        )
                    })}
                </div>
            )
        }
    }
    Content = (content) => <div {...html(content)}></div>;
    render() {
        return (
            <div className="col-4  float-right ">
                {this.isShow()}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        is_status_sidebar_right_bottom: state.is_status_sidebar_right_bottom,
        is_status_show_app: state.is_status_show_app
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        is_Status_sibar_right_bottom: () => {
            dispatch({ type: 'IsStatus_sibar_right_bottom' })
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar_right_bottom)
