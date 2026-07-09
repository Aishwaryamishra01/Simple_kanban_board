// here we selected the cardds(the added tasks ) and the list (the three different lists like to do , in progress and done)
const cards= document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
// here we selected the overall KanBan board body to manage the classes when we click the add more task button
const KanbanBoard = document.querySelector(".container");
// these are the selected classes form the to do list
const todoForm = document.querySelector(".form-todo");
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector(".todo-list");
//  here i selected the add more task button and the section in which the to to list is placed using its id
const ToDoBtn = document.querySelector(".add");
const ToDoList = document.getElementById("todolist")
for(const card of cards){
    card.addEventListener("dragstart",dragStart);
    card.addEventListener("dragged",dragEnd);
}

for(const list of lists){
    list.addEventListener("dragover",dragOver);
    list.addEventListener("dragenter",dragEnter);
    list.addEventListener("dragleave",dragLeave);
    list.addEventListener("drop",dragDrop);

}
function dragStart(e){
    // this allows the drop location to know which element is being moved when you release it
    e.dataTransfer.setData("text/plain",this.id);

}

function dragEnd(){
    console.log("drag end");
}

function dragOver(e){
    // this line is imp because by default browser don't allow you to drop elements onto other elements.
    e.preventDefault()
    
}
function dragEnter(e){
    e.preventDefault();
    this.classList.add("over");
}
function dragover(e){
  
    this.classList.remove("over");
}
function dragLeave(e){
    this.classList.remove("over")
}

function dragDrop(e){
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
    
    this.appendChild(card);
    this.classList.remove("over");
   
}

//   managing the view of the kanban board and the to do list by removing and adding classes 
ToDoBtn.addEventListener("click",()=>{
      // Remove class from source
 ToDoList.classList.remove("hidden")

  // Add class to target
  KanbanBoard.classList.add("hidden");
 ToDoBtn.classList.add("hidden");

});
//  these lines of code contain  the function of the to do list like when we will input something new it will get stored as a list item with two buttons(done and remove)
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoText = todoInput.value;
  const newLi = document.createElement("li");
  const newLiInnerHtml = `<span class="text">${newTodoText}</span>`;
  newLi.innerHTML = newLiInnerHtml;
  todoList.append(newLi);
  todoInput.value = "";
});

todoList.addEventListener("click", (e) => {
  // check if user clicked on done button
  if (e.target.classList.contains("remove")) {
    const targetedLi = e.target.parentNode.parentNode;
    targetedLi.remove();
  }
  if (e.target.classList.contains("done")) {
    const liSpan = e.target.parentNode.previousElementSibling;
    liSpan.style.textDecoration = "line-through";
  }
});



