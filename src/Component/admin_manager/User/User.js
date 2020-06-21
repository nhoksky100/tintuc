import React, { Component } from 'react';
import { datafirebase } from '../../../firebaseConnect';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFB: []
        }
    }
    componentWillMount() {
        var data = datafirebase.database().ref('AdminUser');
        data.on('value', (notes) => {
            var datapush = [];
            notes.forEach(element => {
                const key = element.key;
                const { email } = element.val();
                const {username} = element.val();
                const {password} = element.val();
                const {permission} = element.val();
                datapush.push({
                    id: key,
                    email: email,
                    username: username,
                    password: password,
                    permission: permission
                });
            });
            datapush.reverse();
            this.setState({
                dataFB: datapush
            })
        })
    }
    render() {
        return (
            <div className="wrapper">
                <div className="table">
                    <div className="row row_user header">
                        <div className="cell">Họ Tên</div>
                        <div className="cell">Tuổi</div>
                        <div className="cell"> Quyền</div>
                        <div className="cell">Thao Tác</div>
                    </div>
                    {
                        this.state.dataFB.map((value, key) => {
                            return (
                                <div className="row row_user" key={key}>
                                    <div className="cell" data-title="Name">{value.username}</div>
                                    <div className="cell" data-title="Email">{value.email}</div>
                                    <div className="cell" data-title="Occupation">{value.permission}</div>
                                    <div className="cell" data-title="Location">
                                        <i className="fa fa-pencil-square-o button edit mr-2" title="Edit" />
                                        <i className="fa fa-trash button delete" title="Delete" aria-hidden="true" />

                                    </div>
                                </div>
                            )
                        })


                    }
                </div>


            </div>

        );
    }
}

export default User;