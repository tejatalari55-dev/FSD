/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  eachDayOfInterval,
  parseISO
} from 'date-fns';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { eventService, todoService } from '../services/api';
import EventModal from './EventModal';
import './Calendar.css';

const Calendar = ({ selectedDate, onDateSelect, refreshKey }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchData = async () => {
    try {
      const [eventsData, todosData] = await Promise.all([
        eventService.getAllEvents(),
        todoService.getAllTodos()
      ]);
      setEvents(eventsData);
      setTodos(todosData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today);
  };

  const onDayClick = (day) => {
    onDateSelect(day);
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const onEventClick = (e, event) => {
    e.stopPropagation();
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        await eventService.updateEvent(editingEvent.id, eventData);
      } else {
        await eventService.addEvent(eventData);
      }
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await eventService.deleteEvent(id);
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const renderHeader = () => (
    <div className="calendar-header">
      <h2>{format(currentMonth, 'MMMM yyyy')}</h2>
      <div className="nav-buttons">
        <button className="today-btn" onClick={handleToday}>Today</button>
        <button className="nav-btn" onClick={handlePrevMonth}><IoChevronBack size={20}/></button>
        <button className="nav-btn" onClick={handleNextMonth}><IoChevronForward size={20}/></button>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="calendar-grid">
        {days.map(day => (
          <div key={day} className="weekday-header">{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    return (
      <div className="calendar-grid">
        {allDays.map((day, idx) => {
          const formattedDate = format(day, dateFormat);
          const dayEvents = events.filter(e => isSameDay(parseISO(e.date), day));
          const dayTodos = todos.filter(t => isSameDay(parseISO(t.date), day));
          
          return (
            <div
              key={idx}
              className={`calendar-day ${
                !isSameMonth(day, monthStart) ? "other-month" : 
                isSameDay(day, new Date()) ? "today" : ""
              } ${isSameDay(day, selectedDate) ? "selected" : ""}`}
              onClick={() => onDayClick(day)}
            >
              <span className="day-number">{formattedDate}</span>
              <div className="events-container">
                {dayEvents.map(event => (
                  <div 
                    key={event.id} 
                    className="event-chip"
                    style={{ backgroundColor: event.color }}
                    onClick={(e) => onEventClick(e, event)}
                  >
                    {event.time} {event.title}
                  </div>
                ))}
                {dayTodos.length > 0 && (
                  <div className="todo-indicator">
                    {dayTodos.length} task{dayTodos.length > 1 ? 's' : ''}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      <EventModal 
        key={editingEvent ? editingEvent.id : selectedDate.toISOString()}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        initialEvent={editingEvent}
        selectedDate={format(selectedDate, 'yyyy-MM-dd')}
      />
    </div>
  );
};

export default Calendar;
