import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
class Not_page404 extends Component {
    constructor(props) {
        super(props);
        this.state={
            is_status_show_app:false
        }
    }
    
  
    // componentWillUpdate(nextProps, nextState) {
    //     this.props.is_status_app();
    // }
    
    render() {
     
      if(this.state.is_status_show_app===false){
          this.setState({is_status_show_app:!this.state.is_status_show_app});
          this.props.is_status_app();
      }
       // alert('co 404');
        return (
            <div>
                
                <h1 className="text-center">404 page!</h1>
                <a href='/'className="btn btn-info center">Come Back</a>
                {/* { onClick={()=>window.history.go(-1)} } */}
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        is_status_show_app: state.is_status_show_app
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        is_status_app: () => {
            dispatch({type:'is_status_app'})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Not_page404)