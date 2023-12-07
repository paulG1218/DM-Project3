import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import List from "../components/List.jsx"

const Home = () => {

  const userId = useSelector((state) => state.login.userId)
  const lists = useSelector((state) => state.login.lists)

  console.log(lists)

  if (!userId) {
    return (<p>TODO if no user logged in</p>)
  }
    
    const listDisplay = lists.map( (list) => {
      console.log(list.tasks)
      return <List key={list.listId} tasks={list.tasks}/>
    })
    
    console.log(listDisplay)

    return (

      <div>
        {listDisplay}
      </div>
  )
}

export default Home