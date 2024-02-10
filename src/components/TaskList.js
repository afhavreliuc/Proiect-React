import { useState, React } from 'react';
import { Button } from '@chakra-ui/react';
import { useEffect } from 'react';
import { db, auth } from '../firebase/firebase';
import { getDocs, collection, deleteDoc, updateDoc, doc } from 'firebase/firestore'

function TaskList() {

  const [tasks, setTasks] = useState([])

  const handleCompleteTask = async (taskId, completed) => {
    const taskDoc = doc(db, 'task', taskId)
    await updateDoc(taskDoc, {completed: !completed})
  };

  const handleDeleteTask = async taskId => {
    const taskDoc = doc(db, 'task', taskId)
    await deleteDoc(taskDoc)
  };

  const taskurile = collection(db, 'task')

  useEffect(() =>{
    const getTaskList = async () =>{

      try{
        const data = await getDocs(taskurile);
        const filteredData = data.docs
                             .filter(doc => doc.data()["userId"] === auth?.currentUser?.uid)
                             .map(doc => ({...doc.data(), id: doc.id}))
        setTasks(filteredData)
  
      } catch (err) {
        console.log(err)
      }
    }
    getTaskList()
  }, [taskurile])  


  return (
    <ul>{tasks.map(task => (
      <li key={task.id} style={{ marginTop:"10px" }}>
        <span style={{ color: task.completed ? 'green' : 'black' }}>
            {task.task}
        </span>

        <Button onClick={() => handleCompleteTask(task.id, task.completed)}>Complete</Button>
        <Button onClick={() => handleDeleteTask(task.id)}>Delete</Button>
        </li>
    ))}</ul>
  );
}

export default TaskList;
