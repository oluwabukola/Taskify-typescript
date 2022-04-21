import React, { useState } from 'react';
import { Todo } from './components/model';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  const[todo, setTodo] = useState<string>('');
  const[todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo []>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if(todo) {
      setTodos([...todos, {id: Date.now(), todo, isDone: false}]);
      setTodo('')
    }
  }
 const onDragEnd = (result: DropResult) => {
  const {source, destination} = result;
  if(!destination) return

  if(destination.droppableId === source.droppableId && destination.index=== source.index)
   return;
  
  let add,
  active = todos,
   complete = completedTodos
   if(source.droppableId === 'TodosList'){
     add = active[source.index];
     active.splice(source.index, 1);
   }
   else{
    add = complete[source.index];
    complete.splice(source.index, 1);
  }

  if(destination.droppableId === 'TodosList'){
    active.splice(destination.index, 0, add);
    
  }
  else{
    complete.splice(destination.index, 0, add);
 }
 setCompletedTodos(complete)
 setTodos(active)
 }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="w-screen h-screen flex flex-col items-center bg-[#2f74c0]">
     <span className="uppercase text-[40px] z-[1] my-7 text-white">Taskify</span>
     <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
     <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos}
     setCompletedTodos={setCompletedTodos}/>
    </div>
    </DragDropContext>
    
  );
}

export default App;
