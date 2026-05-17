import { useState } from 'react';
import Calendar from './components/Calendar';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="app-container">
      <div className="todo-panel">
        <TodoList 
          selectedDate={selectedDate} 
          onTodoChange={triggerRefresh} 
        />
      </div>
      <div className="calendar-panel">
        <Calendar 
          selectedDate={selectedDate} 
          onDateSelect={setSelectedDate} 
          refreshKey={refreshKey}
        />
      </div>
    </div>
  );
}

export default App;
