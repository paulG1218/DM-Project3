import axios from 'axios'
import React from 'react'
import AddTaskForm from '../components/AddTaskForm'

function AddTask() {

    const addNewTask = async() =>{
        axios.post('/api/addTask',addNewTaskFormInfo)
            .then ((res) => {
                console.log('task added')
            }) 
    }


  return (
    <div>AddTask
        <h1 >Gabe is a goober</h1>
        <h1>Under Constructino </h1>
        <p>need to add a rout a inpoot feeld a sublit button dropdown for difficly </p>
        <AddTaskForm addNewTask={addNewTask}/>
    </div>
  )
}

export default AddTask