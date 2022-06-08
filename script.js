//getting all elements
const inputBox=document.querySelector(".inputfield input");
const addBtn=document.querySelector(".inputfield button");
const todoList=document.querySelector(".todolist");
const deleteAllBtn=document.querySelector(".footer button");
inputBox.onkeyup = ()=>{
    let userData=inputBox.value;//getting user entered value
    if(userData.trim() !=0){ //if uservalues are not only spaces
      addBtn.classList.add("active");//active the add button
    } 
    else{
        addBtn.classList.remove("active");//unactive the add button
    }
}
showTasks();//calling showtask function
//if user clicks on the add button
addBtn.onclick = ()=>{
    let userData=inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo");//getting localstorage
    if(getLocalStorage == null){ //iflocal storage is null
        listArr = [];//creating blank array

    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into js object
    }
    listArr.push(userData);//pushing or adding userdata
    localStorage.setItem("New Todo", JSON.stringify(listArr));//transforming js object into json string
    showTasks();//calling showtask function
    addBtn.classList.remove("active");
}
//function to add tasklist inside ul
function showTasks()
{
    let getLocalStorage = localStorage.getItem("New Todo");//getting localstorage
    if(getLocalStorage == null){ //if local storage is null
        listArr = [];//creating blank array

    }else{
        listArr = JSON.parse(getLocalStorage);//transforming json string into js object
    }
    const pendingNumb=document.querySelector(".pendingNumb");
    pendingNumb.textContent=listArr.length;//passing the length value to pending
    if(listArr.length>0)
    {
        deleteAllBtn.classList.add("active");//active the clear all button
    }
    else{
        deleteAllBtn.classList.remove("active");//unactive the clearall button
    }
    let newliTag='';
    listArr.forEach((element, index) => {
        newliTag +=`<li>${element}<span onclick ="deleteTask(${index})"; ><i class="fas fa-trash"></i></span></li>`;

    });
    todoList.innerHTML=newliTag;//adding new li tag inside ul tag
    inputBox.value="";//once task is added leave it blank

}
//delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);//delete or remove particular indexed li
    //after removing the li again update the localstorage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();



}
//delete all task functions
deleteAllBtn.onclick = ()=>{
    listArr = [];//empty the array
    //after deleting all task again update the localstorage 
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();

}
