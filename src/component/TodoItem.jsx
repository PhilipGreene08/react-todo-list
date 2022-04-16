import React from 'react';
import { doc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';

function TodoItem({ todo, id }) {
  const auth = getAuth();

  const onDelete = async (todoId) => {
    const q = await query(
      collection(db, 'todos'),
      where('userRef', '==', auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  };
  return (
    <div>
      <li>{todo.name}</li>
      <button
        onClick={() => onDelete(todo.timestamp.seconds)}
        className='deleteTodoButton'
      >
        X
      </button>
      <button className='editTodoButton'>Edit</button>
    </div>
  );
}

export default TodoItem;
