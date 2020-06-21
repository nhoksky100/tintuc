import React, { Component } from 'react';
import './App.css';
import Header from './Headers/Header';
import Sidebar_midle from './Content/Sidebar_midle';
import Sidebar_right_top from './Content/Sidebar_right_top';
import Sidebar_right_bottom from './Content/Sidebar_right_bottom';
import Sidebar_bottom from './Content/Sidebar_bottom';
import Footer from './Footer/Footer';
import { BrowserRouter as Router } from "react-router-dom";
import Url_nav from '../Router/Url_nav';
import { connect } from 'react-redux';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fuild">
          <Header />
          <Sidebar_right_top />
          <Url_nav />
          <Sidebar_right_bottom />
          <Sidebar_midle />
          <Sidebar_bottom />
          <Footer />
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    is_status_login: state.is_status_login,
    is_status_show_app: state.is_status_show_app
  }
}
 export default connect(mapStateToProps)(App)


