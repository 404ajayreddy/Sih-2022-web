let stdID = document.getElementById("stdID");
let stdPW = document.getElementById("stdPW");

function authstd(){
    function check(doc){    
        if(stdID.value == doc.data().id && stdPW.value == doc.data().password){
            location.replace('studentprofile.html')
            return;
        }
        else if(stdID.value == doc.data().id && stdPW.value != doc.data().password){
            alert('Wrong password')
        }
    }
    db.collection('student').get().then((snapshot) =>{
        snapshot.docs.forEach(doc => {
            check(doc)
        });
        
    })
    }