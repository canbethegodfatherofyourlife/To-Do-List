let itemscontainer = document.getElementById('to-do-items-container')
let inputBox = document.getElementById('inputBox')
let addButton = document.getElementById('addButton')
let saveButton = document.getElementById('saveButton')


function localStorageItem(){
    let todoItemList = localStorage.getItem("todo")
    let todoParsedList = JSON.parse(todoItemList)
    if (todoParsedList === null){
        return []
    }else{
        return todoParsedList
    }
}

let itemList = localStorageItem()

saveButton.onclick = function(){
    localStorage.setItem("todo",JSON.stringify(itemList))
} 

let listLength = itemList.length

function onStatusChange(labelId,checkBoxId,todoId){
    let checkBoxEle = document.getElementById(checkBoxId)
    let labelEle =  document.getElementById(labelId)
    labelEle.classList.toggle('checked')

    let checkedIndex = itemList.findIndex(function(eachItem){
        let toDocheck = "todo" + eachItem.uniqueNo
        if (toDocheck===todoId){
            return true
        }else{
            return false
        }
    })

    let checkedObject = itemList[checkedIndex]
    if (checkedObject.ischecked === false){
        checkedObject.ischecked = true
    }else{
        checkedObject.ischecked = false
    }
}

function createToDoList(item){

    let todoId = "todo" + item.uniqueNo
    let labelId = "label" + item.uniqueNo
    let checkBoxId = "checkbox" + item.uniqueNo

    let items = document.createElement('li')
    items.id = todoId
    items.classList.add('items','d-flex')
    itemscontainer.appendChild(items)

    let checkBox = document.createElement('input')
    checkBox.id = checkBoxId
    checkBox.type = "checkbox"
    checkBox.checked = item.ischecked
    checkBox.classList.add('checkBoxInput')
    items.appendChild(checkBox)

    checkBox.onclick = function(){
        onStatusChange(labelId,checkBoxId,todoId)
    }

    let divContainer = document.createElement('div')
    divContainer.classList.add('divContainer')
    items.appendChild(divContainer)

    let labelElement = document.createElement('label')
    labelElement.id = labelId
    labelElement.textContent = item.text
    labelElement.classList.add('labelElement')
    labelElement.setAttribute('for',checkBoxId)
    divContainer.appendChild(labelElement)

    if (item.ischecked===true){
        labelElement.classList.add('checked')
    }

    let divDeleteContainer = document.createElement('div')
    divContainer.appendChild(divDeleteContainer)

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt","delIcon");
    divDeleteContainer.appendChild(deleteIcon);

    deleteIcon.onclick = function(){
        let todoEle = document.getElementById(todoId)
        itemscontainer.removeChild(todoEle)

        let deleteItemIndex = itemList.findIndex(function(eachItem){
            let eachTodo = "todo" + item.uniqueNo
            if (eachTodo===todoId){
                return true
            }else{
                return false
            }
        }) 
        itemList.splice(deleteItemIndex,1)
    }

}

for (let item of itemList){
    createToDoList(item)
}


addButton.onclick = function(){
    if (inputBox.value===""){
        alert("Enter Valid Input!")
        return
    }
    else{
        listLength = listLength + 1 

        let newTodoList = {
            text : inputBox.value,
            uniqueNo : listLength,
            ischecked : false
        }

        itemList.push(newTodoList)

        createToDoList(newTodoList)
        inputBox.value = ""
    }
}