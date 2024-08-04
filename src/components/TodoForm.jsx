import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    addTodo({ todo, description, completed: false, timestamp: new Date().toISOString() });
    setTodo("");
    setDescription("");
  };

  return (
    <form onSubmit={add} className="flex flex-col gap-2 items-center">
      <input
        type="text"
        placeholder="Title..."
        className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 placeholder-white"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <textarea
        placeholder="Write Description..."
        className="w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 placeholder-white"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="rounded-lg px-3 py-1 bg-green-500 hover:bg-green-600 text-white w-3/5 font-semibold transition-all">
        Add
      </button>
    </form>
  );
}

export default TodoForm;
