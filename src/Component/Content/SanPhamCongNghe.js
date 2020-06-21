import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {stringtoslug} from '../stringtoslug.js';
import html from 'react-inner-html';
class SanPhamCongNghe extends Component {
    Content = (content) =>  <div {...html(content)}></div>; 
    render() {
        return (
            <div className="row">
                <div className=" col-3 content-new">
                    <Link to={"/chi-tiet/" + this.props.urlpath + "/" +  stringtoslug( this.props.notetitle) + "." + this.props.chitietID + ".html"}><img src={this.props.file_image} alt="" /></Link>
                </div>
                <div className="col">

                    <Link to={"/chi-tiet/" + this.props.urlpath + "/" + stringtoslug( this.props.notetitle) + "." + this.props.chitietID + ".html"}> <h6 className="card-title">{this.props.notetitle}</h6></Link>
                    <p className="card-text  .small smalls">{this.props.datetime}</p>
                    <div className="card-text">{this.Content(this.props.noteContent.substring(0, 250))}<pre>...</pre></div>
                       
                    <hr/>
                </div>
            </div>
        );
    }
}

export default SanPhamCongNghe;