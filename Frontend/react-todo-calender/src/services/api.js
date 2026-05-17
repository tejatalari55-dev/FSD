import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

export const eventService = {
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },
  addEvent: async (event) => {
    const response = await api.post('/events', event);
    return response.data;
  },
  updateEvent: async (id, event) => {
    const response = await api.put(`/events/${id}`, event);
    return response.data;
  },
  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },
};

export const todoService = {
  getAllTodos: async () => {
    const response = await api.get('/todos');
    return response.data;
  },
  addTodo: async (todo) => {
    const response = await api.post('/todos', todo);
    return response.data;
  },
  updateTodo: async (id, todo) => {
    const response = await api.put(`/todos/${id}`, todo);
    return response.data;
  },
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },
};

export default api;
