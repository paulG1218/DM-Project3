import React from 'react'

const List = ({tasks}) => {

    const taskDisplay = tasks.map(task => {
        return (
            <h1 key={task.taskId}>{task.title}</h1>
        )
    })

  return (
    <div>
        {taskDisplay}
    </div>
  )
}

export default List
