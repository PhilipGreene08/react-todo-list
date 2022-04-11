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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Todos() {
  const [todoData, setTodoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchData = async () => {
          const todosRef = collection(db, 'todos');
          const q = query(
            todosRef,
            where('userRef', '==', auth.currentUser.uid)
          );
          const querySnap = await getDocs(q);
          const todosArray = [];
          querySnap.forEach((doc) => {
            todosArray.push(doc.data());
          });
          setTodoData(todosArray);
          setLoading(false);
        };
        fetchData();
      }
    });
  }, []);

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
        <div className='todoList'>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              <li>{todoData.map((todo) => todo.name)}</li>
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default Todos;
