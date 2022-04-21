import React, { useEffect, useRef, useState } from 'react';
import {Todo} from './model';
import {AiFillDelete, AiFillEdit} from 'react-icons/ai';
import {MdDone} from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';
 type Props ={
     todo: Todo,
     todos:Todo[],
     setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
     index: number
 }

const SingleTodo = ({todo, todos, setTodos, index}:Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const handleDone = (id:number) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, isDone: !todo.isDone }: todo  ))
    }

    const handleDelete = (id:number) => {
        setTodos(todos.filter(todo => todo.id !== id ))
    }

    const handleEdit = (e:React. FormEvent,  id:number) => {
        e.preventDefault();
        setTodos(todos.map(todo => todo.id === id ? {...todo, todo: editTodo} : todo));
        setEdit(false)
    }
    const editRef = useRef <HTMLInputElement>(null)

    useEffect(() => {
        editRef.current?.focus()
    }, [edit])
  return (
      <Draggable draggableId={todo.id.toString()} index={index}>
          {
              (provided, snapshot) => (
                <form  onSubmit={(e) => handleEdit(e, todo.id)}
                {...provided.draggableProps} {...provided.dragHandleProps}
                ref={provided.innerRef}
                className={`${snapshot.isDragging ?  'shadow-input ' : ''}flex rounded-md p-5 mt-4 bg-amber-300
                transition duration-200 hover:scale-105 hover:shadow-single`}>
                    {
                        edit ? (
                            <input value={editTodo} onChange ={(e) => setEditTodo(e.target.value)}
                            className='focus:outline-none' 
                            ref={editRef}/>
                        ):(
                             todo.isDone ? (
                                    <s className='flex-1 p-1 border-0 text-xl '>
                                    {todo.todo}
                                        </s>
                                ) : (
                                    <span className='flex-1 p-1 border-0 text-xl focus:outline-none'>
                                    {todo.todo}
                                    </span>
                                )
                            
                        )
                    }
                    
                    <div className='flex'>
                        <span className='ml-2 text-2xl cursor-pointer'
                        onClick={() =>{
                            if(!edit && !todo.isDone){
                                setEdit(!edit)
                            }
                          
                        }}><AiFillEdit /></span>
                        <span className='ml-2 text-2xl cursor-pointer'
                        onClick={() => handleDelete(todo.id)} ><AiFillDelete /></span>
                        <span className='ml-2 text-2xl cursor-pointer'
                        onClick={() => handleDone(todo.id)}> <MdDone /></span>
            
                    </div>
                </form>
              )
          }
         
      </Draggable>
    
  )
}

export default SingleTodo