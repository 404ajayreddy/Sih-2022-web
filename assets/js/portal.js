// var admins = []
// var students = []
// let adminid = ""
// let adminpassword = ""
// let studentid = ""
// let studentpassword = ""

// let btnad = document.getElementById('submit');
// let btnstd = document.getElementById('submitstd');
let adminID = document.getElementById("adminID");
let adminPW = document.getElementById("adminPW");
// let studentID = document.getElementById("studentID");
// let studentPW = document.getElementById("studentPW");


// function substd(){
//     studentid = studentID.value
//     studentpassword = studentPW.value
// }

function authadmin(){
function check(doc){
    if(adminID.value == doc.data().id && adminPW.value == doc.data().password){
        location.replace('dashboard.html')
    }
    else if(adminID.value != doc.data().adminid){
        alert('Wrong username')
    }
    else {
        alert('Wrong password')
    }
}
db.collection('admin').get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        check(doc)
    });
})
}

// function authstudent(){
//     function check(doc,[]){
//         if(adminid == doc.data().studentid && studentpassword == doc.data().password){
//             location.replace('studentdashboard.html')
//         }
//         else if(studentid != doc.data().stdid){
//             alert('Wrong username')
//         }
//         else {
//             alert('Wrong password')
//         }
//     }
//     db.collection('admin').get().then((snapshot) =>{
//         snapshot.docs.forEach(doc => {
//             check(doc,students)
//         });
//     })
//     }

// function register(){

// }

// function displaystudentlog(){
//     document.getElementById('selector').style.display = 'none';
//     document.getElementById('studentbx').style.display = 'block';
//     document.getElementById('adminbx').style.display = 'none';
// }

// function displayadminlog(){
//     document.getElementById('selector').style.display = 'none';
//     document.getElementById('studentbx').style.display = 'none';
//     document.getElementById('adminbx').style.display = 'block';
// }

// function goback(){
//   document.getElementById('selector').style.display = 'flex';
//   document.getElementById('studentbx').style.display = 'none';
//   document.getElementById('adminbx').style.display = 'none';
// }

// btnad.addEventListener('click', authadmin);









