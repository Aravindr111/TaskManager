// components/PopularEvents.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Events.css'
import EditEventForm from './EditEventForm';


const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false); 
  const [currentEvent, setCurrentEvent] = useState(null);
  
 
  useEffect(() => {
    fetchEvents();
  }, []);
   
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    
    
  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:3000/api/events/${id}`);
        setEvents(events.filter(event => event._id !== id)); 
        alert('Event deleted successfully');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event');
      }
    }
  };
 

  const handleEdit = (event) => {
    setCurrentEvent(event); 
    setIsEditOpen(true);    
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      await axios.put(`http://localhost:3000/api/events/${updatedEvent._id}`, updatedEvent);
      alert('Event updated successfully');
      fetchEvents(); 
      setIsEditOpen(false); 
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event');
    }
  };
  
  

  
  return (
    <div className="events">
       
      <h2>Events</h2>
      <div className="events-grid">
      {events.map((event) => (
        <div key={event._id} className="event-card">
            {event.image && <img src={event.image} alt={event.name} />}
          <h2>{event.name}</h2> 
          <h3>Sport: {event.game}</h3> 
          <p>{event.description}</p> 
          <p>Location: {event.location}</p> 
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <div className='event-buttons'> 
          <button className="delete-button" onClick={() => handleDelete(event._id)}>Delete</button>
          <button className="update-button" onClick={() => handleEdit(event)}>Edit</button> 
        </div>
        </div>
      ))}
      
      </div>
      {isEditOpen && <EditEventForm event={currentEvent} onUpdate={handleUpdate} onClose={() => setIsEditOpen(false)} />}
    </div>
  );
};

export default EventsList;
