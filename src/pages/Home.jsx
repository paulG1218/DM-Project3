import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Home = () => {

  const userId = useSelector((state) => state.login.userId)

  const lists = async () => {
    const res = await axios.get('/api/getLists')
  }
  return (
    <div>

    </div>
  )
}

export default Home