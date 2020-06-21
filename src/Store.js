import { datafirebase } from './firebaseConnect'; //{datafirebase}  lưu ý đặt tên trùng vs const trong file firebaseConnect
//import EditContent from './Component/EditContent';
var redux = require('redux');
const noteInitialState = {
    is_status_sidebar_midle: true,
    datastore: [],
    is_status_login: false, is_status_show_app: true,
    isAdd: false, is_show_table: false, is_show_edit: false, data_edit: '', value_edit: '', get_data: '', slug: '', //add edit
    path: '', getpath: '', get_url_img: '',
    Search_click: [], data_search: [], Edit_search: [],
    number_page: [], is_show_table_user: false
}

const Allrecuder = (state = noteInitialState, action) => {
    var data = datafirebase.database().ref(action.Get_url_data);
    var data_search = datafirebase.database().ref('Search');
    switch (action.type) {
        // admin manager  
        case 'ADD_DATA': //add data
            data.push(action.GetItem); data_search.push(action.GetItem)
            return { ...state, get_url_img: action.get_url_img }
        case 'is_add':
            return { ...state, isAdd: !state.isAdd }
        case 'is_show_edit':
            return {
                ...state, is_show_edit: !state.is_show_edit,
                data_edit: action.data_edit, value_edit: action.get_title, get_data: action.Get_url_data, slug: action.get_slug,
                Edit_search: action.data_edit_search
            }
        case 'edit_data':
            data.child(action.get_data_Edit.id).update({ // cập nhật dữ liệu lên firebase
                notetitle: action.get_data_Edit.notetitle,
                notecontent: action.get_data_Edit.notecontent,
                datetime: action.get_data_Edit.datetime,
                file_image: action.get_data_Edit.file_image

            });
            //edit_search 
            data_search.child(state.Edit_search[0].id).update({ // cập nhật dữ liệu lên firebase
                notetitle: action.get_data_Edit.notetitle,
                notecontent: action.get_data_Edit.notecontent,
                datetime: action.get_data_Edit.datetime,
                file_image: action.get_data_Edit.file_image
            })
            return state
        case 'delete_data_row': // delete
            data.child(action.delete_data).remove();
            // data_search.child(action.delete_search).remove();
            return state;
        case 'is_show_table':
            return { ...state, is_show_table: !state.is_show_table }
        case 'is_show_table_user':
            return { ...state, is_show_table_user: !state.is_show_table_user }
        // end admin manager
        case 'Is_status_sidebar_midle':
            return { ...state, is_status_sidebar_midle: !state.is_status_sidebar_midle }
        case 'set_true':
            return { ...state, is_status_sidebar_midle: true }
        case 'pathchar':
            // console.log('da lay:' +action.actionpath);
            return { ...state, path: action.actionpath }
        case 'getpath':
            return { ...state, getpath: action.path }
        case 'isLogin':
            return { ...state, is_status_login: !state.is_status_login }
        case 'is_status_app':
            // console.log('toi da nhan dc status app la:'+state.is_status_show_app);  
            return { ...state, is_status_show_app: !state.is_status_show_app }
        case 'Search':
            return { ...state, Search_click: action.search }
        case 'number_page':
            return { ...state, number_page: action.number }
        //getulr_patname

        default:
            return state
    }
}

var store = redux.createStore(Allrecuder);
// store.subscribe(function(){
//     console.log(JSON.stringify(store.getState()));

// })
export default store;