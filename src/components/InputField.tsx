import React, { useRef } from 'react';

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}
const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {
 const inputRef = useRef<HTMLInputElement>(null)
    return (
   <form  onSubmit={(e) => {
       handleAdd(e);
       inputRef.current?.blur()
       }} className='flex items-center relative w-[90%]'>
       <input type='text' ref={inputRef} placeholder='Enter a task'
        className='w-full rounded-[50px] py-7 px-5 text-2xl border-0 transition duration-200
         shadow-input focus:shadow-focus outline-none' value={todo} onChange={(e) => setTodo(e.target.value)} />
       <button  type='submit' className='absolute w-[50px] h-[50px] m-3 rounded-[50px] border-0
       right-0 text-sm bg-[#2f74c0] transition-all duration-200 shadow-input
    hover:bg-[#388ae2] active:scale-75 active:shadow-input'>Go</button>
       
   </form>
  )
}

export default InputField