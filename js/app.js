// CODE EXPLAINED channel
// Seletct the Elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//class names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

//get item from localstorage
let data = localStorage.getItem("ToDo");

//check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; //set the id to the last one in the list
    loadList(LIST);
}else{
    //if data isn't empty
   LIST = [];
   id = 0;
}

//load items to user's interface
function loadList(array){
    array.forEach(function(item){
        addTODo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//show today's date
const options = {weekday :"long", month:"short", day:"numeric"}
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to to function
function addTODo(toDO, id, done, trash){

    if(trash){ return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = ` <li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDO}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                    </li>
                 `;

                const position = "beforeend";
                list.insertAdjacentHTML(position,item);
    }

//add an item to the list user the enter key
document.addEventListener("keyup",function(event){
    if(event.keyCode == 13){
        const toDo = input.value;

        //if the input isn't empty
        if(toDo){
            addTODo(toDo, id, false, false);

            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            });

            //add item to localstorage(this code must be added where the LIST array is updated)
             localStorage.setItem("ToDo", JSON.stringify(LIST));


            id++
        }
        input.value = "";
    }
});

//complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the item created dynamically

list.addEventListener("click", function(event){
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if(elementJob == "complete"){
        completeToDo(element);
    
    }else if(elementJob == "delete"){
        removeToDo(element);
    }

    //add item to localstorage(this code must be added where the LIST array is updated)
     localStorage.setItem("ToDo", JSON.stringify(LIST));

});

