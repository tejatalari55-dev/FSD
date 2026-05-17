import { useState, useEffect } from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { IoAdd, IoTrash, IoPencil, IoCheckmarkDone, IoSquareOutline } from 'react-icons/io5';
import { todoService } from '../services/api';
import './TodoList.css';

const TodoList = ({ selectedDate, onTodoChange }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState('');

  const fetchTodos = async () => {
    try {
      const data = await todoService.getAllTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const todo = {
        title: newTodo,
        date: format(selectedDate, 'yyyy-MM-dd'),
        completed: false,
      };
      await todoService.addTodo(todo);
      setNewTodo('');
      fetchTodos();
      onTodoChange();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      fetchTodos();
      onTodoChange();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      await todoService.updateTodo(todo.id, { ...todo, completed: !todo.completed });
      fetchTodos();
      onTodoChange();
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const startEdit = (todo) => {
    setEditingTodo(todo.id);
    setEditText(todo.title);
  };

  const handleUpdateTodo = async (todo) => {
    if (!editText.trim()) return;
    try {
      await todoService.updateTodo(todo.id, { ...todo, title: editText });
      setEditingTodo(null);
      fetchTodos();
      onTodoChange();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const filteredTodos = todos.filter(todo => isSameDay(parseISO(todo.date), selectedDate));

  return (
    <div className="todo-container">
      <div className="todo-header">
        <h1>Tasks</h1>
        <p>{format(selectedDate, 'EEEE, MMMM do')}</p>
      </div>

      <form className="todo-form" onSubmit={handleAddTodo}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">
          <IoAdd size={24} />
        </button>
      </form>

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="no-todos">No tasks for this day.</div>
        ) : (
          filteredTodos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-checkbox" onClick={() => handleToggleComplete(todo)}>
                {todo.completed ? <IoCheckmarkDone size={20} className="icon-done" /> : <IoSquareOutline size={20} />}
              </div>
              
              <div className="todo-content">
                {editingTodo === todo.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={() => handleUpdateTodo(todo)}
                    onKeyDown={(e) => e.key === 'Enter' && handleUpdateTodo(todo)}
                    autoFocus
                  />
                ) : (
                  <span onClick={() => handleToggleComplete(todo)}>{todo.title}</span>
                )}
              </div>

              <div className="todo-actions">
                <button onClick={() => startEdit(todo)} className="edit-btn">
                  <IoPencil size={18} />
                </button>
                <button onClick={() => handleDeleteTodo(todo.id)} className="delete-btn">
                  <IoTrash size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList;
