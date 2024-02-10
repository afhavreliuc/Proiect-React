import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions';
import {addDoc, collection} from 'firebase/firestore';
import { db, auth } from '../firebase/firebase'

function TaskForm() {
  const [task, setTask] = useState('');
  const dispatch = useDispatch();

  const taskurile = collection(db, 'task')

  const handleAddTask = async (e) => {
    if(task!==""){
      e.preventDefault()
      dispatch(addTask(task));
      setTask('');
      try{
        await addDoc(taskurile, 
          {userId: auth?.currentUser?.uid,
          task: task, 
          completed: false
        })
      } catch (err) {
        console.log(err)
      }
    }
  };

  return (
    <div>
      <form onClick={handleAddTask}>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} style={{ marginRight: "10px" }}/>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;
