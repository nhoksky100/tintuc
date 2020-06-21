import React, { Component } from 'react';
// import { datafirebase } from '../../firebaseConnect';
import { stringtoslug } from '../stringtoslug.js';
import html from 'react-inner-html';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
class Sidebar_bottom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFB: [],
            textpath: '',
            pathname: ''
        }
    }
    isShow = () => {
        if (this.props.is_status_show_app) {
            var rd = 0, i = 0;
            var data_relate = JSON.parse(localStorage.getItem('data_relate'));
            var number_rd = data_relate.length;
            var urlpath = localStorage.getItem('dataDetail');
            return (
                <div className=" col-8 mt-5  shadow bg">
                    <div className="filter-control">
                        <h3 className="text-muted float-left">Tin Liên Quan</h3>
                    </div><br />
                    <div className="row">
                        <div className="col">
                            <div className="card-columns">
                                {data_relate.map((value, key) => {
                                    rd = Math.floor(Math.random() * number_rd/2) + 0;
                                    if (i++ < 6) {
                                        if (key >= rd) {
                                            return (
                                                <div className="card col-10" key={key}>
                                                    <Link to={"/chi-tiet/" + urlpath + "/" + stringtoslug(value.title) + "." + key + ".html"} className="nav-link" >
                                                        <img src={value.file_image} alt="" />
                                                    </Link>
                                                    <div className="list card-body">
                                                        <Link to={"/chi-tiet/" + urlpath + "/" + stringtoslug(value.title) + "." + key + ".html"} className="nav-link">
                                                            <h6 className="title">{value.title}</h6>
                                                        </Link>
                                                        <h6 className="card-text">{value.datetime}</h6>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    } else return 0;
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
    Content = (content) => <div {...html(content)}></div>;
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
        is_status_show_app: state.is_status_show_app,
        urlpath: state.path
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        get_urlpath: (path) => {
            //   dispatch({ type: 'getulr_patname', path })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar_bottom)
