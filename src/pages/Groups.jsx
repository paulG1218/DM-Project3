import React from 'react'
import '../css/Groups.css'
import { useSelector } from 'react-redux';
import Group from '../components/Group.jsx'

const Groups = () => {

  const groups = useSelector((state) => state.login.groups);

  const groupDisplay = groups.map((group) => {
    return <Group key={group.groupId} group={group}/>;
  });

  return (
    <div>
      <h1 className="pageHeader">Your Groups</h1>
      <div className='groupListDisplay'>
        <h1>All</h1>
        <hr className='homeLines'/>
        {groupDisplay}
      </div>
    </div>
  )
}

export default Groups