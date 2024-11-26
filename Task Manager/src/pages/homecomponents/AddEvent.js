import React, { useState,useEffect } from 'react';
import axios from 'axios';
import'./AddEvent.css';

const AddEventForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location:'',
    image:null,
  });
  
  const [cities, setCities] = useState([]); 

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Cities'); // Ensure the URL matches your server configuration
        setCities(response.data); 
      } catch (error) {
        console.error('Error fetching cities:', error);
        alert('Failed to fetch cities'); 
      }
    };

    fetchCities();
  }, []);
 
  const [sports, setSports] = useState([]); 

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/Sports');
        setSports(response.data);      
      } catch (error) {
        console.error('Error fetching Sports:', error);
        alert('Failed to fetch Sports'); 
      }
    };

    fetchSports();
  }, []);

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
   
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(); // Use FormData for multipart/form-data
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('date', formData.date);
    data.append('location', formData.location);
    data.append('game', formData.game);
    data.append('image', formData.image); // Append the image file

    try {
      const response = await axios.post('http://localhost:3000/api/events/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set header for file upload
        },
      });
      alert(response.data.message);
      setFormData({
        name: '',
        description: '',
        date: '',
        location: '',
        game: '',
        image: null,
      });
      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event');
    }
  };
  if (!isOpen) return null;
  return (
    <div className="modal">
    <div className="modal-content">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h2 >Add a New Event</h2>
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
        <div className="game-group">
            <label className="game-label">Sport:</label>
            <select
              name="game"
              value={formData.game}
              onChange={handleChange}
              required
              className="game-select"
            >
              <option value="" className='game-option'>-- Select a Sport --</option>
              {sports.map((sport) => (
                <option key={sport._id} value={sport.name}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
        <div className="location-group">
            <label className="location-label">Location:</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="location-select"
            >
              <option value="" className='location-option'>-- Select a City --</option>
              {cities.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
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
        <div>
            <label>Image:</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
        <button type="submit">Add Event</button>
      </form>
    </div>
  </div>
  );
};

export default AddEventForm;