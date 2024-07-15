var inputName=document.getElementById("name");
var inputUrl=document.getElementById("url");
var addBtn=document.getElementById("addBtn");
var tableBody=document.getElementById("tableBody");
var bookmarks;
var mainIndex=0;
if(localStorage.getItem("bookmarks")==null){
    bookmarks=[];

}else{
    bookmarks=JSON.parse( localStorage.getItem("bookmarks"));
    displayBook(bookmarks)
}
//validation
var nameRegex=/^[A-za-z_]{1,}$/

function isNameValid(){
    if(nameRegex.test(inputName.value)){
        return true;
    }else{
        return false;
    }
   
    
}
var urlRgex =  /^(https:\/\/)?(www\.)?[A-Za-z0-9\.]{1,}\.[a-z]{3}$/

function isUrlValid(){
    if(urlRgex.test(inputUrl.value)){
        return true;
    }else{
        return false;
    }}
  
    
   inputName.onkeyup = function(){
        if( isUrlValid ()&& isNameValid()){
         addBtn.removeAttribute("disabled")
        }else{
            addBtn.disabled="true";
        }
    }
    inputUrl.onkeyup = function(){
        if(isUrlValid() && isNameValid()){
         addBtn.removeAttribute("disabled")
        }else{
            addBtn.disabled="true";
        }
    }
addBtn.onclick=function(){
    if(addBtn.innerHTML=="update"){
        addBtn.innerHTML="Submit";
        var bookMark={
            name:inputName.value,
            url:inputUrl.value,
        }
        bookmarks.splice(mainIndex,1,bookMark);
    }
    else{
        var bookMark={
            name:inputName.value,
            url:inputUrl.value,
        }
        bookmarks.push(bookMark)
    }

localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
displayBook(bookmarks)
clearData();
}
function displayBook(anyArray){
    var marks=``;
    for(var i=0 ; i<anyArray.length ; i++){
        marks+=`
        <tr>
        <td>${anyArray[i].name}</td>
        <td> <button class="btn btn-primary">vist</button></td>
        <td> <button onClick="ubdateBook(${i})" class="btn btn-info">update</button></td>
        <td> <button  onClick="deleteBook(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML=marks;
}
function clearData(){
    inputName.value="";
    inputUrl.value=""
}
function deleteBook(index){
    bookmarks.splice(index,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks))
    displayBook(bookmarks);
}
function ubdateBook(index){
    inputName.value=bookmarks[index].name;
    inputUrl.value=bookmarks[index].url;
    addBtn.innerHTML="update";
    mainIndex=index;
}
function search(term){
    wantedBook=[];
    for(var i=0 ; i<bookmarks.length;i++){
        if(bookmarks[i].name.toLowerCase().includes(term)){
            wantedBook.push(bookmarks[i]);
        }
    }
 displayBook(wantedBook)
}