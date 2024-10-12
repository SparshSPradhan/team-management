const Team = require('../models/Team');

// Create Team
const createTeam = async (req, res) => {
    const { name } = req.body;
    const newTeam = await Team.create({ name });
    res.status(201).json(newTeam);
};

// Get All Teams
const getAllTeams = async (req, res) => {
    const teams = await Team.find().populate('members', 'username');
    res.json(teams);
};

// Add Member to Team
const addMemberToTeam = async (req, res) => {
    const { teamId, userId } = req.body;
    const team = await Team.findById(teamId);

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    if (!team.members.includes(userId)) {
        team.members.push(userId);
        await team.save();
    }

    res.json(team);
};

// Delete Team
const deleteTeam = async (req, res) => {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    res.status(204).send();
};

module.exports = { createTeam, getAllTeams, addMemberToTeam, deleteTeam };
