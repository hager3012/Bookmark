const siteName=document.getElementById('siteName');
const siteUrl=document.getElementById('siteUrl');
const addBookBtn =document.getElementsByClassName('btn')[0];
const updateBookBtn =document.getElementsByClassName('btn')[1];
var listOfBook=[];
var numberOfBook;
(function(){
    if(localStorage.getItem("products").valueOf()){
        listOfBookInLocalStorage=JSON.parse(localStorage.getItem("products").valueOf()) ;
        listOfBook=listOfBookInLocalStorage;
        display(listOfBookInLocalStorage);
    }
})();

function addBook(){
    if(validBookName() && validUrl()){
        var book ={
            name:siteName.value,
            url:siteUrl.value,
        }
        clearform();
        listOfBook.push(book);
        display(listOfBook);
    }
    else if(!validBookName()){
        alert("Book name is invalid");
    }
    else{
        alert("Book Sit URL is invalid");
    }
    localStorage.setItem("products",JSON.stringify(listOfBook));
};

function clearform() {
    siteName.value="";
    siteUrl.value="";
}
function display(listOfDisplay){
    var container=``;
    for(var i=0; i<listOfDisplay.length;i++){
            container+=`
            <tr>
            <td>${listOfDisplay[i].name}</td>
            <td>${listOfDisplay[i].url}</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="setFormForUpdateBook(${i})">Update</button></td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="Delete(${i})">Delete</button></td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="vistUrl(${i})">Vist</button></td>
            </tr>`;
        }
    document.getElementById('tableBody').innerHTML=container;

};
function Delete(ele){
    listOfBook.splice(ele,1);
    display(listOfBook);
    localStorage.setItem("products",JSON.stringify(listOfBook));
};
function validBookName(){
    var regex=/^[A-Z][a-z]{3,20}$/;
    return  regex.test(siteName.value) ;
};
function setFormForUpdateBook(index){
    addBookBtn.classList.replace('d-block', 'd-none');
    updateBookBtn.classList.replace('d-none', 'd-block');
    siteName.value=listOfBook[index].name;
    siteUrl.value=listOfBook[index].url;
    numberOfBook=index;

};
function updateBook(){
    listOfBook[numberOfBook].name=siteName.value;
    listOfBook[numberOfBook].url=siteUrl.value;
    addBookBtn.classList.replace('d-none', 'd-block');
    updateBookBtn.classList.replace('d-block', 'd-none');
    display(listOfBook);
    localStorage.setItem("products",JSON.stringify(listOfBook));
    clearform();
};

function validUrl(){
    var regex=/(http:\/\/|https:\/\/)/gm;
    return regex.test(siteUrl.value);
}
function vistUrl(index){
        open(`${listOfBook[index].url}`)
}
addBookBtn.addEventListener('click',addBook);
updateBookBtn.addEventListener('click',updateBook);