import React, { Component } from 'react';
import { datafirebase } from '../../firebaseConnect';
import Home_content from './Home_content';
import { connect } from 'react-redux';
import TinTucTheGioi from './TinTucTheGioi';
import TinKinhTe from './TinKinhTe';
import TinCongNghe from './TinCongNghe';
import Cultural from './Categories/Cultural';
import Discover from './Categories/Discover';
import Education from './Categories/Education';
import Entertainment from './Categories/Entertainment';
import Health from './Categories/Health';
import Hotel from './Categories/Hotel';
import Travel from './Categories/Travel';
import SanPhamCongNghe from './SanPhamCongNghe';
import TinGame from './TinGame';
import ThuThuat from './ThuThuat';
// const pageNumbers = [];
class NoteContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFB: [],
            path: '',
            textpath: '',
            currentPage: 1,
            newsPerPage: 5,
            pageNumbers: []
        }
    }
    componentWillMount() {
        var newpath = this.props.match.path;
        switch (newpath) {
            case '/': newpath = 'TinMoiNhat'; this.setState({ path: 'TinMoiNhat', textpath: 'Tin Mới Nhất' })
                break;
            case '/TinTucTheGioi': this.setState({ path: 'TinTucTheGioi', textpath: 'Tin Tức Thế Giới' })
                break;
            case '/TinKinhTe': this.setState({ path: 'TinKinhTe', textpath: 'Tin Kinh Tế - Thị Trường' })
                break;
            case '/TinCongNghe': this.setState({ path: 'TinCongNghe', textpath: 'Tin Công Nghệ' })
                break;
            case '/SanPhamCongNghe': this.setState({ path: 'SanPhamCongNghe', textpath: 'Sản Phẩm Công Nghệ' })
                break;
            case '/TinGame': this.setState({ path: 'TinGame', textpath: 'Tin Game' })
                break;
            case '/ThuThuat': this.setState({ path: 'ThuThuat', textpath: 'Thủ Thuật' })
                break;
            case '/ChuyenMuc/SucKhoe': this.setState({ path: 'ChuyenMuc/SucKhoe', textpath: 'Sức Khỏe' })
                break;
            case '/ChuyenMuc/VanHoa': this.setState({ path: 'ChuyenMuc/VanHoa', textpath: 'Văn Hóa' })
                break;
            case '/ChuyenMuc/GiaiTri': this.setState({ path: 'ChuyenMuc/GiaiTri', textpath: 'Giải Trí' })
                break;
            case '/ChuyenMuc/KhamPha': this.setState({ path: 'ChuyenMuc/KhamPha', textpath: 'Khám Phá' })
                break;
            case '/ChuyenMuc/KhachSan': this.setState({ path: 'ChuyenMuc/KhachSan', textpath: 'Khách Sạn' })
                break;
            case '/ChuyenMuc/GiaoDuc': this.setState({ path: 'ChuyenMuc/GiaoDuc', textpath: 'Giáo Dục' })
                break;
            case '/ChuyenMuc/DuLich': this.setState({ path: 'ChuyenMuc/DuLich', textpath: 'Du Lịch' })
                break;
            default: return false
        }
        var data = datafirebase.database().ref(newpath);
        //lấy dữ liệu từ Store và nếu có giá trị thì duyệt từng phần tử đổ vào 1 mảng truyền cho biến trung gian state lưu lại data
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
            this.setState({ dataFB: datapush })
        })
    }
    getData = () => {
        const {currentPage} = this.state; // trang hiện tại acti
        const {newsPerPage} = this.state; //cho trang tin tức mỗi trang 
        const indexOfLastNews = currentPage * newsPerPage; // lấy vị trí cuối cùng của trang ,của data
        const indexOfFirstNews = indexOfLastNews - newsPerPage; // lấy vị trí đầu tiên  của trang ,của data
        const currentTodos = this.state.dataFB.slice(indexOfFirstNews, indexOfLastNews); // lấy dữ liệu ban đầu và cuối gán cho các list
        var {path} = this.state;
        localStorage.setItem('dataDetail', path);
        localStorage.setItem('data_relate', JSON.stringify(this.state.dataFB));
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.dataFB.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        if (this.state.dataFB) {
            return (
                <div>
                    {
                        currentTodos.map((value, key) => {
                            switch (path) {
                                case 'TinMoiNhat': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <Home_content key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />
                                    )
                                case 'TinTucTheGioi': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <TinTucTheGioi key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />
                                    )
                                case 'TinCongNghe': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <TinCongNghe key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'SanPhamCongNghe': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <SanPhamCongNghe key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'TinGame': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <TinGame key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'ThuThuat': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <ThuThuat key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'TinKinhTe': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <TinKinhTe key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'ChuyenMuc/VanHoa': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <Cultural key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'ChuyenMuc/KhamPha': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <Discover key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'ChuyenMuc/GiaoDuc': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <Education key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'ChuyenMuc/GiaiTri': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <Entertainment key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'ChuyenMuc/SucKhoe': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <Health key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'ChuyenMuc/KhachSan': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <Hotel key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                case 'ChuyenMuc/DuLich': this.props.is_Status(); this.props.getpath(path);
                                    return (
                                        <Travel key={key}
                                            notetitle={value.title}
                                            noteContent={value.content}
                                            note={value}
                                            chitietID={key}
                                            datetime={value.datetime}
                                            file_image={value.file_image}
                                            urlpath={path}
                                        />)
                                default: return false
                            }
                            // end switch
                        })
                    }
                    <div className="pagination-custom">
                        <ul id="page-numbers">
                            {
                                pageNumbers.map(number => {
                                    if (this.state.currentPage === number) {
                                        return (
                                            <li key={number} id={number} aria-disabled="true" tabIndex={-1} className="active page-link page-item disabled">
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
    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    render() {
        return (
            <div className="col-8 shadow p-3 mb-5 mt-5 bg-white rounded">
                <div className="filter-control">
                    <h3 className="text-muted float-left">{this.state.textpath}</h3>
                </div>
                {this.getData()}
               
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        path: state.path,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getpath: (actionpath) => {
            dispatch({ type: "pathchar", actionpath })
        },
        is_Status: () => {
            dispatch({ type: "set_true" })
        },
        logpath: (log) => {
            dispatch({ type: "logpath", log })
        } 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NoteContent)
