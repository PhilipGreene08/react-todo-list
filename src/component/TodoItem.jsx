import React from 'react';
import { useState } from 'react';
import { doc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';

function TodoItem({ todo, id }) {
  const auth = getAuth();
  const [todos, setTodos] = useState([]);

  const onDelete = async (todoToDelete) => {
    console.log(todoToDelete.toLowerCase());
    const q = await query(
      collection(db, 'todos'),
      where('userRef', '==', auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    let dataArray = [];
    querySnapshot.forEach((doc) => {
      dataArray.push(doc.data());
    });
    let newArray = [];
    dataArray.filter((el) => {
      if (el.name.toLowerCase() !== todoToDelete.toLowerCase()) {
        newArray.push(el);
      }
    });
    setTodos(newArray);
  };

  const onEdit = () => {};
  return (
    <div>
      <li>{todo.name}</li>

      <button
        // onClick={() => onDelete(todo.timestamp.seconds)}
        onClick={() => onDelete(todo.name)}
        className='deleteTodoButton'
      >
        X
      </button>
      <button
        onClick={() => onEdit(todo.timestamp.seconds)}
        className='editTodoButton'
      >
        Edit
      </button>
    </div>
  );
}

export default TodoItem;
