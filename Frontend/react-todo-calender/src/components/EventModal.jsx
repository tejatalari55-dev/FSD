import { useState } from 'react';

const EventModal = ({ isOpen, onClose, onSave, onDelete, initialEvent, selectedDate }) => {
  const [event, setEvent] = useState(initialEvent || {
    title: '',
    date: selectedDate || '',
    time: '12:00',
    description: '',
    color: '#6366f1'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(event);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{initialEvent ? 'Edit Event' : 'Add New Event'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              required 
              value={event.title} 
              onChange={e => setEvent({...event, title: e.target.value})}
              placeholder="What's happening?"
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              required 
              value={event.date} 
              onChange={e => setEvent({...event, date: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Time</label>
            <input 
              type="time" 
              value={event.time} 
              onChange={e => setEvent({...event, time: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              rows="3"
              value={event.description} 
              onChange={e => setEvent({...event, description: e.target.value})}
              placeholder="Any details?"
            />
          </div>
          <div className="form-group">
            <label>Color Tag</label>
            <input 
              type="color" 
              value={event.color} 
              onChange={e => setEvent({...event, color: e.target.value})}
              style={{ height: '40px', padding: '2px' }}
            />
          </div>
          <div className="modal-actions">
            {initialEvent && (
              <button type="button" className="btn-delete" onClick={() => onDelete(event.id)}>
                Delete
              </button>
            )}
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="today-btn">Save Event</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
