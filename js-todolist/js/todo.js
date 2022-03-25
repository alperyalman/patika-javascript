let addBtnDOM = document.querySelector("#liveToastBtn") // Get button element with id: liveToastBtn
let inputTaskDOM = document.querySelector("#task") // Get input element with id: task
let ulDOM = document.querySelector("#list"); // Get ul element with id: list
let listDOM = document.querySelectorAll("#list>li"); // Get all li elements under ul list
addBtnDOM.addEventListener('click', addTask); // Add function to call when clicked to Ekle button

// Create and add trash icon to delete the task, and add the function to done the task. 
var closebtn = htmlToElement(`<i style="font-size:24px" onclick="removeElement(this)" class="close fa">&#xf014;</i>`); // Create trash icon to add each task
listDOM.forEach(element => { 
    element.append(closebtn.cloneNode(true));
    element.addEventListener("click", taskIsDone);
});

// Convert html to object in order to append to a list element
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

// Function to remove elements when clicked trash button
const removeElement = param => param.parentNode.remove();

// Add or remove the "checked" class to/from the clicked task
function taskIsDone(){
    this.classList.toggle("checked");
}

// Function to add new task to the list
function addTask() {
    if (inputTaskDOM.value.trim()  == "") // Check if the input is empty 
        $(".error").toast("show");  
    else 
    {   
        let liDOM = document.createElement('li') // Create a <li></li> element
        liDOM.innerHTML = inputTaskDOM.value; // Read the input text and assign as the list element value
        liDOM.append(closebtn.cloneNode(true)); // Append trash icon to delete the task
        liDOM.addEventListener("click", taskIsDone); // Add function to call when clicked on the task 
        ulDOM.insertBefore(liDOM, ulDOM.childNodes[0]); // Instert the latest task to the top
        inputTaskDOM.value = ""; // Clear the input text value
        $(".success").toast("show");
    }
}

// Add saved tasks to do list
function addSavedTasks(txt, classname) {
        let liDOM = document.createElement('li') // Create a <li></li> element
        liDOM.innerHTML = txt; // Read the input text and assign as the list element value
        liDOM.className = classname; // Add latest classes to the task element
        liDOM.addEventListener("click", taskIsDone); // Add function to call when clicked on the task 
        ulDOM.append(liDOM); // Instert the tasks to the list
}


// Access saved tasks from local storage 
function getSavedTasksFromLocalStorage() {
        let savedTasks = JSON.parse(localStorage.getItem("items")) || [];
        let savedClasses = JSON.parse(localStorage.getItem("classes")) || [];
        savedTasks.forEach((element, index) => addSavedTasks(element, savedClasses[index]));
        console.log(savedTasks);
}

// Save current tasks to localstorage
function saveTasksToLocalStorage() {

    //Create an array to store the li values
    let toStorage = [];
    let values = document.querySelectorAll('#list>li');
    let classNames = [];
    //Cycle through the li array
    for (let i = 0; i < values.length; i++) {
      toStorage.push(values[i].innerHTML);
      classNames.push(values[i].className);
    }
    console.log(toStorage);
    //Can´t test this on stackoverflow se the jsFiddle link
    localStorage.setItem('items', JSON.stringify(toStorage));
    localStorage.setItem('classes', JSON.stringify(classNames));
  }

// Even when a window is about to unload 
window.onbeforeunload = saveTasksToLocalStorage;




