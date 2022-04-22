import React, { useState, useEffect, useRef } from 'react';
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  serverTimestamp,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
//import TodoItem from '../component/TodoItem';

function Todos() {
  const [todoData, setTodoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({
    name: '',
    department: '',
    completed: false,
    userRef: '',
    timestamp: serverTimestamp(),
    urgency: '',
  });
  const { name, department, completed, userRef, timestamp } = newTodo;

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

  const onSubmit = async (e) => {
    e.preventDefault();
    newTodo.userRef = auth.currentUser.uid;
    const newTodoDoc = newTodo;
    await addDoc(collection(db, 'todos'), newTodoDoc);
  };

  const onChange = (e) => {
    console.log(e.target.innerText);
    setNewTodo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
      timestamp: serverTimestamp(),
    }));
  };

  const onDelete = async (todoToDelete) => {
    // await deleteDoc(doc(db, 'todos', todoToDelete));
  };

  const onEdit = () => {};
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
              id='name'
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              placeholder='add team'
              id='department'
              value={department}
              onChange={onChange}
            />
            <select
              onChange={onChange}
              type='text'
              name='urgency'
              list='todoUrgency'
              id='urgency'
            >
              <option value='default' disabled>
                Select Urgency Level
              </option>
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
              {todoData.map((todo) => (
                <li>
                  <p>{todo.name}</p>
                  <p>{todo.department}</p>
                  <button
                    onClick={() => onDelete(todo.name)}
                    className='deleteTodoButton'
                  >
                    X
                  </button>
                  <button
                    onClick={() => onEdit(todo.name)}
                    className='deleteTodoButton'
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}

export default Todos;
