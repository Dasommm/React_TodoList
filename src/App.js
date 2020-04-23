import React,{ useState, useCallback, useRef } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const[todos, setTodos] = useState([
    {
      id:1,
      text: '리액트의 클래스 컴포넌트',
      checked : true,
    },
    {
      id:2,
      text : 'Hook알아보기',
      checked : true,
    },
    {
      id:3,
      text : '리덕스 공부하기',
      checked:false,
    }
  ])

  const nextId = useRef(4);

  const onInsert = useCallback(
    text=>{
      const todo = {
        id: nextId.current,
        text,
        checked:false,
      }
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  )

  const onRemove = useCallback(
    id => {
      setTodos(todos.filter(todo => todo.id !== id));
    },
    [todos],
  )

  const onToggle = useCallback(
    id => {
      setTodos(
        todos.map(todo=>
          todo.id === id ? {...todo, checked : !todo.checked} : todo,
          ),
      );
    },
  );

  return (
   <TodoTemplate>
     <TodoInsert onInsert={onInsert}/>
     <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
   </TodoTemplate>
  );
};

export default App;