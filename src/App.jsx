import { useState, useEffect } from 'react';
import { Todoprovider } from './contexts/TodoContext';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { FaSearch } from "react-icons/fa";

function App() {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addTodo = (todos) => {
    setTodos((prev) => [{ id: Date.now(), ...todos }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Todoprovider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-gradient-to-tl from-slate-800 via-violet-500 to-zinc-400 min-h-screen py-8 shadow-xl">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white bg-[#9333EA]">
          <h1 className="text-3xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4 flex justify-center ">
            <FaSearch className='mr-2 inline mt-3' />
            <input
              type="text"
              placeholder="Search Todos..."
              className=" border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 mb-4 placeholder-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              
            />
          </div>
          <h1 className='text-lg font-semibold'>
            Add New Tasks:
            </h1>
            <TodoForm />
          <div className="flex flex-wrap gap-y-3 mt-4">
            {filteredTodos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  );
}

export default App;
