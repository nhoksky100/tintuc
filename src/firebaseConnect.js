import * as firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyAHHAp0Qg0TfAjlIHotDEmXCKxHFrADOQI",
  authDomain: "nodetitle.firebaseapp.com",
  databaseURL: "https://nodetitle.firebaseio.com",
  projectId: "nodetitle",
  storageBucket: "nodetitle.appspot.com",
  messagingSenderId: "624812120392",
  appId: "1:624812120392:web:74c4c48f8d79de5446bb7d",
  measurementId: "G-MMRJH7YG9B"
};
export  const  datafirebase= firebase.initializeApp(firebaseConfig); //ket noi du lieu firebase
 //const datafirebase = firebase.database().ref('TinNoiBat'); //  kết nối du liệu bảng firebase
//var data = firebase.database().ref('table1/node1'); // ref(lấy) bảng database 
// data.once('value').then(function (snapshot) { // once (sau khi) có giá trị rồi then( thì) hành động.
//     console.log(snapshot.val()); // .val() in ra gia trị 

// });
// data.set({
//     id:1,
//     title:" title 1 cua node 1",
//     content:"content 1 cua notde 1"
// })
