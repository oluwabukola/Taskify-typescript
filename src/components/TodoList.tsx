import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from './model';
import SingleTodo from './SingleTodo';

interface Props{

todos: Todo[],
setTodos:React.Dispatch<React.SetStateAction<Todo[]>>,
completedTodos: Todo[],
setCompletedTodos:React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({todos, setTodos,  completedTodos, setCompletedTodos}:Props) => {
  return (
   <div className="flex justify-between items-start w-[95%] mt-2">
     <Droppable droppableId='TodosList'>
      { (provided, snapshot) => (
        <div className={`${snapshot.isDraggingOver ?  'bg-cyan-700' : ''} flex w-[47.5%] flex-col p-4 rounded-md bg-sky-400`}
        ref={provided.innerRef} {...provided.droppableProps}>

       <span className='text-3xl text-white'>Active Tasks</span>
       
        {todos.map((todo,index) => (
        <SingleTodo todo={todo} index={index} key={todo.id} todos={todos} setTodos={setTodos}/>
        ))}
      {provided.placeholder}
     </div>
       )}
     
     </Droppable>
     <Droppable droppableId='TodosRemove'> 
       {
         (provided, snapshot) => (
          <div className={`${snapshot.isDraggingOver ? 'bg-red-900' : ''} flex w-[47.5%] flex-col p-4 rounded-md bg-red-400`}
          
          ref={provided.innerRef} {...provided.droppableProps}>
          <span className='text-3xl text-white'>Completed Tasks</span>
       
        {completedTodos.map((todo, index) => (
            <SingleTodo todo={todo} index={index}  key={todo.id} todos={completedTodos} setTodos={setCompletedTodos}/>
        ))}
        {provided.placeholder}
     </div>
         )
       }
     </Droppable>
    
     
   </div>
  )
}

export default TodoList