const express = require('express');
const router = express.Router();
const Sport = require('../../models/Sports');

router.get('/', async (req, res) => {
  try {
    const sports = await Sport.find(); 
    res.json(sports);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sports' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name} = req.body;
    const newSport = new Sport({
      name,
    });

  
    await newSport.save();

    
    res.status(201).json({ message: 'Sport added successfully!' });
  } catch (error) {
    console.error('Error adding Sport:', error); 
    res.status(500).json({ message: 'Failed to add Sport' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSport = await Sport.findByIdAndDelete(id);

    if (!deletedSport) {
      return res.status(404).json({ message: 'Sport not found' });
    }

    res.status(200).json({ message: 'Sport deleted successfully' });
  } catch (error) {
    console.error('Error deleting Sport:', error);
    res.status(500).json({ message: 'Failed to delete Sport' });
  }
});



module.exports = router;