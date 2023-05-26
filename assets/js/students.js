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


var csvFileData = [];  



var stdcount = 0
var eligiblecount = 0
var detainedcount = 0
var institutecount = 0

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
  if(doc.data().State == st.options[st.selectedIndex].textContent && doc.data().City == ct.options[ct.selectedIndex].textContent && doc.data().InstituteName == co.options[co.selectedIndex].textContent){
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
  tbodys.innerHTML += `<tr>
  <td>
    <div class="d-flex px-2 py-1">
      <div>
        <img src="${doc.data().profilePic}" class="avatar avatar-sm me-3 border-radius-lg" alt="user1">
      </div>
      <div class="d-flex flex-column justify-content-center">
        <h6 class="mb-0 text-sm">${doc.data().firstName} ${doc.data().lastName}</h6>
        <p class="text-xs text-secondary mb-0">${doc.data().EmailId}</p>
      </div>
    </div>
  </td>
  <td>
    <p class="text-xs font-weight-bold mb-0">${doc.data().ScholarshipName}</p>
    <p class="text-xs text-secondary mb-0">Organization</p>
  </td>
  <td class="align-middle">
    <div class="progress-wrapper w-75 me-auto">
      <div class="progress-info">
        <div class="progress-percentage">
          <span class="text-xs font-weight-bold">20/180</span>
        </div>
      </div>
      <div class="progress">
        <div class="progress-bar bg-gradient-info" style="width: 25%; role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="180"></div>
      </div>
    </div>
  </td>
  <td class="align-middle text-center">
    <span class="text-secondary text-xs font-weight-bold">Download</span>
  </td>
  <td class="align-middle text-center" onclick=displayrecords("${doc.id}")>
    <a href="javascript:;" class=" text-secondary font-weight-bold text-xs text-center" data-toggle="tooltip" data-original-title="Edit user">
      Download
    </a>
  </td>
</tr>`
}
}

db.collection('state').get().then((snapshot) => {
  snapshot.docs.forEach(doc => {
    filters(doc);
  });
})

function citytrigger() {
  let stv = st.value
  let path = ('state/' + stv + '/City')
  
  db.collection(path).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      filtercity(doc);
    });
  })
  
  let options = ct.getElementsByTagName('option');
  for (var i = options.length; i--;) {
    ct.removeChild(options[i]);
  }
  let cityi = document.createElement('option')
  cityi.textContent = 'select'
  cityi.value = 'default'
  ct.appendChild(cityi)
}

function collegetrigger() {
  let stv = st.value
  let ctv = ct.value
  let path = ('state/' + stv + '/City/' + ctv + '/College')
  
  db.collection(path).get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      filtercollege(doc);
    });
  })

  let options = co.getElementsByTagName('option');
  for (var i = options.length; i--;) {
    co.removeChild(options[i]);
  }
  let collegei = document.createElement('option')
  collegei.textContent = 'select'
  collegei.value = 'default'
  co.appendChild(collegei)
}

function displaytrigger() {
  db.collection('student').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      display(doc);
    });
    // displayvalues()
  })
  
  tbodys.innerHTML = ``
}

// function displayvalues(){
//   tstd.textContent = `${stdcount}`
//   dstd.textContent = `${detainedcount}`
//   astd.textContent = `${eligiblecount}`
//   tins.textContent = `1`


  // cnt.innerHTML = `<div>Student count : ${stdcount}</div>
  // <div>Eligible count : ${eligiblecount}</div>
  // <div>Detained count : ${detainedcount}</div>`
//}


function displayrecords(x){
  var recordid = x
  db.collection('student/' + x + "/Record").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      addrecord(doc);
    });
    download_csv_file()
  })
}

function addrecord(doc){
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  var d = new Date(doc.data().date.seconds*1000)
  var day = weekday[d.getDay()]
  var date = d.getDate()
  csvFileData[i] = [d,doc.data().checkIn,doc.data().checkOut]
  i++
}
   
//create a user-defined function to download CSV file   
function download_csv_file() {  
 
   //define the heading for each row of the data  
   var csv = 'Date,CheckIn,CheckOut\n';  
     
   //merge the data with CSV  
   csvFileData.forEach(function(row) {  
           csv += row.join(',');  
           csv += "\n";  
   });  
      
   var hiddenElement = document.createElement('a');  
   hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);  
   hiddenElement.target = '_blank';  
     
   //provide the name for the CSV file to be downloaded  
   hiddenElement.download = 'student data.csv';  
   hiddenElement.click();  
}  



function logout(){
  window.location.replace("../pages/sign-up.html")
}