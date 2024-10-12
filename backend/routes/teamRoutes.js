const express = require('express');
const { createTeam, getAllTeams, addMemberToTeam, deleteTeam } = require('../controllers/teamController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-team', protect, createTeam);
router.get('/', protect, getAllTeams);
router.post('/add-member', protect, addMemberToTeam);
router.delete('/:id', protect, deleteTeam);

module.exports = router;
