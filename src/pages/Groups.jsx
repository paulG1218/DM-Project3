import React, {useState} from 'react'
import '../css/Groups.css'

import { useSelector } from 'react-redux';
import Group from '../components/Group.jsx'
import GroupsModal from '../components/GroupsModal.jsx';


const Groups = () => {
  
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => setShowModal(!showModal)

  const groups = useSelector((state) => state.login.groups);

  const groupDisplay = groups.map((group) => {
    return <Group key={group.groupId} group={group}/>;
  });

  return (
    <>
    <GroupsModal show={showModal} handleModal={handleModal}/>
    <div>
      <h1 className="pageHeader">
        Your Groups
        
      </h1>
      <div className='groupListDisplay'>
        <h1 className='groupListHeader'>All</h1>
        <hr className='homeLines'/>
        {groupDisplay}
      </div>
    </div>
    </>
  )
}

export default Groups