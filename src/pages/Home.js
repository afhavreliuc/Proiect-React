import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import SignOut from '../components/SignOut';
import { Center, Heading } from '@chakra-ui/react';


const Home = () => {
  return (
    <div>
    <Heading>
        <SignOut />
    </Heading>

    <Center>
        <h1>Task Manager</h1>
    </Center>
    <Center
    p="1">
        <TaskForm/>
    </Center>
    <Center>
        <TaskList />
    </Center>
</div>
  );
};

export default Home;
