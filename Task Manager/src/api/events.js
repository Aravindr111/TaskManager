const express = require('express');
const router = express.Router();
const multer = require('multer');
const Event = require('../../models/Event'); 

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

router.get('/', async (req, res) => {
  try {
    const events = await Event.find();

    // Convert image buffer to Base64 for frontend use
    const eventsWithImages = events.map((event) => ({
      ...event._doc,
      image: event.image ? `data:${event.imageType};base64,${event.image.toString('base64')}` : null,
    }));
    res.json(eventsWithImages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { name,game, description, date,location } = req.body;

   
    const newEvent = new Event({
      name,
      game,
      description,
      date: new Date(date), 
      location,
      image: req.file.buffer, 
      imageType: req.file.mimetype,
    });

  
    await newEvent.save();

    
    res.status(201).json({ message: 'Event added successfully!' });
  } catch (error) {
    console.error('Error adding event:', error); 
    res.status(500).json({ message: 'Failed to add event' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Failed to delete event' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Prepare updated fields (excluding the image)
    const updatedFields = {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
    };

    // Find and update the event (without modifying the image)
    const updatedEvent = await Event.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ message: 'Event updated successfully', updatedEvent });
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Failed to update event', error });
  }
});

router.get('/search', async (req, res) => {
  const { city, sport, eventName } = req.query;

  try {
    const query = {};
    if (city) query.location = { $regex: city, $options: 'i' };  // Case-insensitive search
    if (sport) query.game = { $regex: sport, $options: 'i' };
    if (eventName) query.name = { $regex: eventName, $options: 'i' };

    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error searching events' });
  }
});
module.exports = router;


