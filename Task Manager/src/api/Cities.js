const express = require('express');
const router = express.Router();
const City = require('../../models/City');

router.get('/', async (req, res) => {
  try {
    const cities = await City.find(); 
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name} = req.body;
    const newCity = new City({
      name,
    });
    await newCity.save();
    res.status(201).json({ message: 'City added successfully!' });
  } catch (error) {
    console.error('Error adding City:', error); 
    res.status(500).json({ message: 'Failed to add City' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCity = await City.findByIdAndDelete(id);

    if (!deletedCity ) {
      return res.status(404).json({ message: 'City not found' });
    }

    res.status(200).json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error('Error deleting City:', error);
    res.status(500).json({ message: 'Failed to delete City' });
  }
});


module.exports = router;
