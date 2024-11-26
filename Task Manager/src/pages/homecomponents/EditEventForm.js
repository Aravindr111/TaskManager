import React, { useState } from 'react';

const EditEventForm = ({ event, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: event.name,
    description: event.description,
    date: event.date.split('T')[0], 
    location: event.location,
  });
 
 

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...event, ...formData }); // Merge the form data with the current event
  };
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Event</button>
        </form>
      </div>
    </div>
  );
};

export default EditEventForm; 