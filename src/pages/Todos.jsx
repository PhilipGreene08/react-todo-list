import React, { useState, useEffect, useRef } from 'react';
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';

function Todos() {
  const [newTodo, setNewTodo] = useState();
  const [currentUser, setCurrentUser] = useState('');
  const auth = getAuth();

  useEffect(() => {
    if (auth.currentUser) {
      setCurrentUser(auth.currentUser.uid);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const todosRef = collection(db, 'todos');
    const q = query(todosRef, where('userRef', '==', currentUser));
    const querySnap = await getDocs(q);
    querySnap.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(newTodo);
  };

  const onChange = (e) => {
    setNewTodo(e.target.value);
  };

  return (
    <div>
      <header>
        <h1>Todos</h1>
      </header>
      <main>
        <div className='newTodos'>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              placeholder='add todo'
              id='newTodo'
              onChange={onChange}
            />
            <select type='text' name='urgency' list='todoUrgency'>
              <option value='high'>High</option>{' '}
              <option value='medium'>Medium</option>{' '}
              <option value='low'>Low</option>{' '}
            </select>
            <button type='submit'>Add New Todo</button>
          </form>
        </div>
        <div className='todoList'></div>
      </main>
    </div>
  );
}

export default Todos;
