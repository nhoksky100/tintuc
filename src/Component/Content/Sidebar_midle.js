import React, { Component } from 'react';
import { datafirebase } from '../../firebaseConnect';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import { stringtoslug } from '../stringtoslug.js';
import { connect } from 'react-redux';
class Sidebar_midle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFB: [],
            bollan: true
        }
    }
    componentWillMount() {
        var data = datafirebase.database().ref("TinNoiBat")
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
            if (this.props.is_status_sidebar_midle === true) {
                return (
                    <div className="row ">
                        <div className="col shadow bg">
                            <div className="filter-control">
                                <h3 className="text-muted float-left">Tin Nổi Bật</h3>
                            </div>
                            <div className="product-slider ">
                                {this.state.dataFB.length && (
                                    <OwlCarousel items={6} margin={8} loop autoplay={true}>
                                        {this.state.dataFB.map((value, key) => {
                                            // if (value.title.length > 50) {
                                            //     return (
                                            //         <div>
                                            //             {`${value.title.substring(0, 50)}...`}
                                            //             {/* <a href="/">...</a> */}
                                            //         </div>
                                            //     )
                                            // }
                                            return (
                                                <div className="product-item" key={key}>

                                                    <div className="pi-pic">
                                                        <li onClick={() => this.change_status()} className="linkto "><NavLink className="disabled" to={"/chi-tiet/TinNoiBat/"+ stringtoslug(value.title) + "." + key + ".html"}><img src={value.file_image} alt="" /></NavLink></li>
                                                        {/* <div className="icon">
                                                        <i className="icon_heart_alt" />
                                                        
                                                    </div> */}
                                                    </div>
                                                    <div className="pi-text">
                                                        <div className="catagory-name">{value.datetime}</div>
                                                        <li onClick={() => this.change_status()} className="linkto"> <NavLink to={"/chi-tiet/TinNoiBat/"  + stringtoslug(value.title) + "." + key + ".html"}>
                                                            <h6>{value.title}</h6>
                                                        </NavLink></li>
                                                    </div>
                                                </div>

                                            );
                                        })}
                                    </OwlCarousel>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
    change_status = () => {
        this.props.is_Status();
    }
    render() {
        return (
            <div className="container-fuild ">
                {this.isShow()}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        is_status_sidebar_midle: state.is_status_sidebar_midle,
        is_status_show_app: state.is_status_show_app,
        urlpath:state.path
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        is_Status: () => {
            dispatch({ type: 'Is_status_sidebar_midle' })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar_midle)
