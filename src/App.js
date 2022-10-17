import { useState } from "react";
import "./App.css";

const ToDoListContainer = (props) => {
	const {handleUpdateToDo} = props
	const toDosLength = props.toDoList.length
	return (
		<div>
			<h1>ToDo List</h1>
			<p>Number of ToDos: {toDosLength}</p>
			{props.toDoList.map((toDo, index)=>{
				return (
					<ToDoItem toDo={toDo} handleUpdateToDo={handleUpdateToDo} key={index} />
				)
			})}
		</div>
	)
}

const ToDoItem = (props) => {
	const {handleUpdateToDo} = props;
	const { title, priority, description, creationDate, completedDate, isComplete } = props.toDo

	return (
		<div className={`To-do-item ${priority}`}>
			<h1 className={`${isComplete ? "To-do-item-strikethrough" : "To-do-item-normal"}`}>{title}</h1>
			<p>Priority: {priority}</p>
			<p>Creation Date: {creationDate}</p>
			{completedDate && <p>Completed Date: {completedDate}</p>}
			<p>Description: {description}</p>
			<button onClick={()=>{
				handleUpdateToDo(title, creationDate)
			}}>Toggle Complete</button>
		</div>
	)
}

const ToDoForm = (props) => {
	const {handleAddToDo} = props

	const [title, setTitle] = useState("")
	const [priority, setPriority] = useState("")
	const [description, setDescription] = useState("")

	return (
		<div>
			<h1>To Do Form:</h1>
			<label>Title:</label>
			<input type="text" value={title} onChange={(e)=>{
				setTitle(e.target.value)
			}}/>
			<br/>
			<label>Priority:</label>
			<select value={priority} onChange={(e)=>{
				setPriority(e.target.value)
			}}>
				<option value={""}>Please select an option</option>
				<option value="High">Set Priority High</option>
				<option value={"Medium"}>Set Priority Medium</option>
				<option value={"Low"}>Set Priority Low</option>
			</select>
			<br/>
			<label>Description</label>
			<textarea value={description} onChange={(e)=>{
				setDescription(e.target.value)
			}}/>
			<br/>
			<button onClick={()=>{
				handleAddToDo(title, priority, description)
				setTitle("")
				setPriority("")
				setDescription("")
			}}>Add ToDo</button>
		</div>
	)
}

const App = () => {
	const [toDoList, setToDoList] = useState([{
		title: "Implement ToDo List",
		priority: "High",
		isComplete: false,
		description: "Implement the todo list application",
		creationDate: new Date().toString(),
		completedDate: null
	}])

	const handleAddToDo = (title, priority, description) => {
		const newToDo = {
			title,
			priority,
			description,
			isComplete: false,
			creationDate: new Date().toString(),
			completedDate: null
		}
		const toDoListCopy = [...toDoList, newToDo]
		setToDoList(toDoListCopy)
	}

	const handleUpdateToDo = (title, creationDate) => {
		const toDoListCopy = [...toDoList];
		const indexOfToDo = toDoListCopy.findIndex((toDo)=>{
			if (toDo.title === title && toDo.creationDate === creationDate) {
				return true;
			}
			return false;
		})
		toDoListCopy[indexOfToDo].isComplete = !toDoListCopy[indexOfToDo].isComplete
		if (toDoListCopy[indexOfToDo].completedDate === null) {
			toDoListCopy[indexOfToDo].completedDate = new Date().toString()
		} else {
			toDoListCopy[indexOfToDo].completedDate = null
		}
		setToDoList(toDoListCopy)
	}

	return (
		<div className="App-header">
			<ToDoForm handleAddToDo={handleAddToDo}/>
			<ToDoListContainer toDoList={toDoList} handleUpdateToDo={handleUpdateToDo}/>
		</div>
	);
}

export default App;


//Review 2
