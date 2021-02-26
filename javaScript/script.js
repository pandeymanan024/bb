var elem = document.querySelector("form");
elem.addEventListener("submit",(event)=>{
    event.preventDefault();
    const formData = new FormData(); 
    const files = document.getElementById('file1').files;
    for(let i=0;i<files.length;i++){
        formData.append('myfile',files[i],files[i].name);
    }
    console.log(formData.getAll('myfile'));
    var request = new XMLHttpRequest();
    request.open('POST','https://bbecom-998a.restdb.io/media',true);
    //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader('x-apikey','602276113f9eb665a1689352');
    request.onload = ()=>{
        var response = request.responseText;
        console.log(response);
    }
    request.send(formData);
});
