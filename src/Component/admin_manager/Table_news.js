import React, { Component } from 'react';
import { datafirebase } from '../../firebaseConnect';
import html from 'react-inner-html';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
class Table_news extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name_component: '',
            value_component: '',
            dataFB: [], data_search: [],
            currentPage: 1,
            newsPerPage: 5

        }
    }

    componentWillMount() {
        var slug = this.props.slug;
        var data_slug = '';
        switch (slug) {
            case 'tin-moi-nhat':
                data_slug = 'TinMoiNhat';
                this.setState({ name_component: 'TinMoiNhat', value_component: 'Tin Mới Nhất' }); break;
            case 'tin-tuc-the-gioi':
                data_slug = 'TinTucTheGioi';
                this.setState({ name_component: 'TinTucTheGioi', value_component: 'Tin Tức Thế Giới' }); break;
            case 'tin-cong-nghe':
                data_slug = 'TinCongNghe';
                this.setState({ name_component: 'TinCongNghe', value_component: 'Tin Công Nghệ' }); break;
            case 'san-pham-cong-nghe':
                data_slug = 'SanPhamCongNghe';
                this.setState({ name_component: 'SanPhamCongNghe', value_component: 'Sản Phẩm Công Nghệ' }); break;
            case 'thu-thuat':
                data_slug = 'ThuThuat';
                this.setState({ name_component: 'ThuThuat', value_component: 'Thủ Thuật Công Nghệ' }); break;
            case 'tin-game':
                data_slug = 'TinGame';
                this.setState({ name_component: 'TinGame', value_component: 'Tin Game' }); break;
            case 'tin-the-thao':
                data_slug = 'TinTheThao';
                this.setState({ name_component: 'TinTheThao', value_component: 'Tin Thể Thao' }); break;
            case 'tin-nong':
                data_slug = 'TinNong';
                this.setState({ name_component: 'TinNong', value_component: 'Tin Nóng' }); break;
            case 'tin-noi-bat':
                data_slug = 'TinNoiBat';
                this.setState({ name_component: 'TinNoiBat', value_component: 'Tin Nổi Bật' }); break;
            case 'tin-kinh-te':
                data_slug = 'TinKinhTe';
                this.setState({ name_component: 'TinKinhTe', value_component: 'Tin Kinh Tế - Thị Trường' }); break;
            case 'suc-khoe':
                data_slug = 'ChuyenMuc/SucKhoe';
                this.setState({ name_component: 'ChuyenMuc/SucKhoe', value_component: 'Chuyên mục - Sức Khỏe' }); break;
            case 'giai-tri':
                data_slug = 'ChuyenMuc/GiaiTri';
                this.setState({ name_component: 'ChuyenMuc/GiaiTri', value_component: 'Chuyên mục - Giải Trí' }); break;
            case 'kham-pha':
                data_slug = 'ChuyenMuc/KhamPha';
                this.setState({ name_component: 'ChuyenMuc/KhamPha', value_component: 'Chuyên mục - Khám Phá' }); break;
            case 'du-lich':
                data_slug = 'ChuyenMuc/DuLich';
                this.setState({ name_component: 'ChuyenMuc/DuLich', value_component: 'Chuyên mục - Du Lịch' }); break;
            case 'khach-san':
                data_slug = 'ChuyenMuc/KhachSan';
                this.setState({ name_component: 'ChuyenMuc/KhachSan', value_component: 'Chuyên mục -Khách Sạn' }); break;
            case 'giao-duc':
                data_slug = 'ChuyenMuc/GiaoDuc';
                this.setState({ name_component: 'ChuyenMuc/GiaoDuc', value_component: 'Chuyên mục - Giáo Dục' }); break;
            case 'van-hoa':
                data_slug = 'ChuyenMuc/VanHoa';
                this.setState({ name_component: 'ChuyenMuc/VanHoa', value_component: 'Chuyên mục - Văn Hóa' }); break;
            default: break;
        }
        var data = datafirebase.database().ref(data_slug);   
        var data_search_push = []; data_search_push.push(data_search);
        data.on('value', (notes) => {
            var datapush = [];
            notes.forEach(element => {
                const {key} = element;
                const {notetitle} = element.val();
                const {notecontent} = element.val();
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
        var data_search = datafirebase.database().ref('Search');
        data_search.on('value', (notes) => {
            var datapush = [];
            notes.forEach(element => {
                const {key} = element;
                const {notetitle} = element.val();
                const {notecontent} = element.val();
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
            this.setState({
                data_search: datapush
            })
        })

    }
    delete_row = (delete_data, delete_search) => {
        var data_delete_search = this.state.data_search.filter((item) => item.title === delete_search);
        //  console.log(data_delete_search.id);
        var delete_id_search = '';
        data_delete_search.map((value) => {
            delete_id_search = value.id;
        })
        this.props.Data_delete(delete_data, this.state.name_component, delete_id_search);
        toast(<div className="save_add"><i className="fa fa-eraser" aria-hidden="true" /><i> Xóa Thành Công</i></div>);

    }
    Edit_row = (edit_data, edit_search) => {
        this.props.is_Show_table();
        var data_edit = this.state.dataFB.filter(item => item.id === edit_data);
        var data_edit_search = this.state.data_search.filter(item => item.title === edit_search);
        this.props.is_Show_edit(data_edit, this.state.name_component, this.state.value_component, this.props.slug, data_edit_search);
    }

    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    isShow = () => {   
        if (this.props.is_show_table) {
            const {currentPage} = this.state; // trang hiện tại acti
            const {newsPerPage} = this.state; //cho trang tin tức mỗi trang 
            const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
            const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
            const currentTodos = this.state.dataFB.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.state.dataFB.length / newsPerPage); i++) {
                pageNumbers.push(i);
            } 
            // var edit_data = '';
            // var delete_data = '';
            // var delete_title = '';
            return (
                <div>
                    <table className="table_new .table-dark .table-striped" >
                        <thead className="thead">
                            <tr className="tr"><th colSpan={6}>Bảng {this.state.value_component}</th></tr>
                            <tr className="tr">
                                <th>STT</th>
                                <th >Tiêu Đề <br />Nội Dung Bài Viết</th>
                                <th >Thời Gian cập nhật</th>
                                <th >Hình ảnh</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {                            
                                currentTodos.map((value, key) => {
                                    //  edit_data = value.id;
                                    //  delete_data = value.id;
                                    //  delete_title = value.title;
                                    return (
                                        <tr className="tr" key={key}>
                                            <td>{key + 1 + (currentPage - 1) * newsPerPage}</td>
                                            <td>{value.title}</td>
                                            <td>{this.Content(value.content)}</td>
                                            <td>{value.datetime}</td>
                                            <td><img id="img_admin_show" src={value.file_image} alt="" /></td>
                                            <td>
                                                <i onClick={() => this.Edit_row(value.id, value.title)} className="fa fa-pencil-square-o button edit mr-2" title="Edit" />

                                                <i onClick={() => this.delete_row(value.id, value.title)} className="fa fa-trash button delete" title="Delete" aria-hidden="true" />
                                            </td>
                                        </tr>

                                    )

                                })
                            }

                        </tbody>
                    </table>
                    <div className="pagination-custom">
                        <ul id="page-numbers">               
                            {
                                pageNumbers.map(number => {
                                    if (this.state.currentPage === number) {
                                        return (
                                            <li key={number} id={number}  aria-disabled="true" tabIndex={-1} className="active page-link page-item disabled">
                                                {number}
                                            </li>
                                        )
                                    }
                                    else {
                                        return (
                                            <li key={number} id={number} onClick={this.chosePage} >
                                                {number}
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
            )

        }

    }
    select = (event) => {
        this.setState({
            newsPerPage: event.target.value
        })
    }
    Content = (content) => <div {...html(content)}></div>;
    render() {
        return (
            <div>
                {this.isShow()}

                <ToastContainer />
            </div>
        );

    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        is_show_table: state.is_show_table,
        is_show_edit: state.is_show_edit
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        Data_delete: (delete_data, Get_url_data, delete_search) => {
            dispatch({ type: 'delete_data_row', delete_data, Get_url_data, delete_search })
        },
        is_Show_table: () => {
            dispatch({ type: 'is_show_table' })
        },
        is_Show_edit: (data_edit, Get_url_data, get_title, get_slug, data_edit_search) => {
            dispatch({ type: 'is_show_edit', data_edit, Get_url_data, get_title, get_slug, data_edit_search })
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Table_news)
