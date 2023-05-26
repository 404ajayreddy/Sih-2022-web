const st = document.querySelector('#stsl')
const ct = document.querySelector('#ctsl')
const co = document.querySelector('#cosl')
const tbodys = document.querySelector('#tbodystudents')
const cnt = document.querySelector('#countdisplay')
const rl = document.querySelector('#recordlist')
const tstd = document.querySelector('#tstd')
const tins = document.querySelector('#tins')
const dstd = document.querySelector('#dstd')
const astd = document.querySelector('#astd')

var i = 0

var stdcount = 0
var institutecount = 0
var querycount = 0
var notifscount = 0


var csvFileData = [];  







function filters(doc) {
  let statei = document.createElement('option')
  statei.textContent = doc.data().name
  statei.value = doc.id
  st.appendChild(statei)

}

function filtercity(doc) {
  let cityi = document.createElement('option')
  cityi.textContent = doc.data().name
  cityi.value = doc.id
  ct.appendChild(cityi)
}

function filtercollege(doc) {
  let collegei = document.createElement('option')
  collegei.textContent = doc.data().name
  collegei.value = doc.id
  co.appendChild(collegei)
}

function display(doc){
  // if(doc.data().State == st.options[st.selectedIndex].textContent && doc.data().City == ct.options[ct.selectedIndex].textContent && doc.data().InstituteName == co.options[co.selectedIndex].textContent){
    stdcount = stdcount + 1
  var eligiblity
  if(doc.data().present > 60){
    eligiblity = "eligible"
    eligiblecount++
  } 
  else{
    eligiblity = "detained"
    detainedcount++
  }
//   tbodys.innerHTML += `<tr>
//   <td>
//     <div class="d-flex px-2 py-1">
//       <div>
//         <img src="${doc.data().ProfilePic}" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
//       </div>
//       <div class="d-flex flex-column justify-content-center">
//         <h6 class="mb-0 text-sm">${doc.data().firstName} ${doc.data().lastName}</h6>
//         <p class="text-xs text-secondary mb-0">${doc.data().lastName}</p>
//       </div>
//     </div>
//   </td>
//   <td>
//     <p class="text-xs font-weight-bold mb-0">${doc.data().Scholarship}</p>
//     <p class="text-xs text-secondary mb-0">Organization</p>
//   </td>
//   <td class="align-middle text-center text-sm">
//     <span class="badge badge-sm bg-gradient-success">${doc.data().Present}</span>
//   </td>
//   <td class="align-middle text-center">
//     <span class="text-secondary text-xs font-weight-bold">${eligiblity}</span>
//   </td>
//   <td class="align-middle">
//     <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
//       Download
//     </a>
//   </td>
// </tr>`
  
}

// db.collection('state').get().then((snapshot) => {
//   snapshot.docs.forEach(doc => {
//     filters(doc);
//   });
// })

// function citytrigger() {
//   let stv = st.value
//   let path = ('state/' + stv + '/City')
  
//   db.collection(path).get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       filtercity(doc);
//     });
//   })
  
//   let options = ct.getElementsByTagName('option');
//   for (var i = options.length; i--;) {
//     ct.removeChild(options[i]);
//   }
//   let cityi = document.createElement('option')
//   cityi.textContent = 'select'
//   cityi.value = 'default'
//   ct.appendChild(cityi)
// }

// function collegetrigger() {
//   let stv = st.value
//   let ctv = ct.value
//   let path = ('state/' + stv + '/City/' + ctv + '/College')
  
//   db.collection(path).get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       filtercollege(doc);
//     });
//   })

//   let options = co.getElementsByTagName('option');
//   for (var i = options.length; i--;) {
//     co.removeChild(options[i]);
//   }
//   let collegei = document.createElement('option')
//   collegei.textContent = 'select'
//   collegei.value = 'default'
//   co.appendChild(collegei)
// }

function displaytrigger() {
  db.collection('admin').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      institutecount = `${doc.data().totalinstitutes}`;
      querycount = `${doc.data().noqueries}`;
      notifscount = `${doc.data().nonotifs}`;
      stdcount = `${doc.data().students}`;
    });
    displayvalues()
  })

  stdcount = 0
}

function displayvalues(){
  tstd.textContent = `${stdcount}`
  dstd.textContent = `${querycount}`
  astd.textContent = `${notifscount}`
  tins.textContent = `${institutecount}`


  // cnt.innerHTML = `<div>Student count : ${stdcount}</div>
  // <div>Eligible count : ${eligiblecount}</div>
  // <div>Detained count : ${detainedcount}</div>`
}


function displayrecords(x){
  var recordid = x
  db.collection('student/' + x + "/Record").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      displayrecord(doc);
    });
  })
}

function displayrecord(doc){
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  var d = new Date(doc.data().date.seconds*1000)
  var day = weekday[d.getDay()]
  var date = d.getDate()
  csvFileData[i] = [d,doc.data().checkIn,doc.data().checkOut]
  i++
  rl.innerHTML += `<div class="record">
  <div class="day"><div>${day}</div><div>${date}</div></div>
  <div class="checkin"><div>Check In</div><div>${doc.data().checkIn}</div></div>
  <div class="checkout"><div>Check Out</div><div>${doc.data().checkOut}</div></div>
</div>`
}
   
//create a user-defined function to download CSV file   
function download_csv_file() {  
 
   //define the heading for each row of the data  
   var csv = 'Name,Profession\n';  
     
   //merge the data with CSV  
   csvFileData.forEach(function(row) {  
           csv += row.join(',');  
           csv += "\n";  
   });  
  
   //display the created CSV data on the web browser   
   document.write(csv);  
 
    
   var hiddenElement = document.createElement('a');  
   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
   hiddenElement.target = '_blank';  
     
   //provide the name for the CSV file to be downloaded  
   hiddenElement.download = 'student data.csv';  
   hiddenElement.click();  
}  



window.addEventListener('load',()=>{
  displaytrigger()
})

function logout(){
  window.location.replace("../pages/sign-up.html")
}