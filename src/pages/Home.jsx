import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import List from "../components/List.jsx"

const Home = () => {

  const {lists} = useLoaderData()

  const listDisplay = lists.map((list) => {
    return <List key={list.listId} list={list}/>
  })

  console.log(lists)
  return (
    <div>
      {listDisplay}
    </div>
  )
}

export default Home