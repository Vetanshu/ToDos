import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from "react-icons/io";


function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const [description, setDescription] = useState(todo.description);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [isExpanded, setIsExpanded] = useState(false);

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg, description, timestamp: new Date().toISOString() });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex flex-col border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? 'bg-[#c6e9a7]' : 'bg-[#d991e0]'
      }`}
    >
      <div className="flex items-center gap-x-3">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={todo.completed}
          onChange={toggleCompleted}
        />
        <input
          type="text"
          className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
          } ${todo.completed ? 'line-through' : ''}`}
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
          readOnly={!isTodoEditable}
        />
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? '📁' : '✏️'}
        </button>
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-200 shrink-0"
          onClick={() => deleteTodo(todo.id)}
        >
          ❌
        </button>
        <button
          className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? <IoIosArrowDropdownCircle/> : <IoIosArrowDropupCircle />}
        </button>
      </div>
      {isExpanded && (
        <div className="mt-2">
          <textarea
            className={`border outline-none w-full bg-transparent rounded-lg ${
              isTodoEditable ? 'border-black/10 px-2' : 'border-transparent'
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            readOnly={!isTodoEditable}
          />
          <div className="text-sm text-gray-500 mt-1">Last updated: {new Date(todo.timestamp).toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
