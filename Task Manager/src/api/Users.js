const express = require('express');
const router = express.Router();
const User = require('../../models/user');

router.get('/', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users); 
    } catch (error) {
      res.status(500).json({ message: 'Error fetching User' });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedEvent = await User.findByIdAndDelete(id);
  
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Users not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ message: 'Failed to delete User' });
    }
  });
  module.exports = router;