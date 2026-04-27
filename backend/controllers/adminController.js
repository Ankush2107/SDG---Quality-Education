import User from '../models/User.js';
import Resource from '../models/Resource.js';
import Roadmap from '../models/Roadmap.js';
import ChatHistory from '../models/ChatHistory.js';

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalResources = await Resource.countDocuments();
  const activeRoadmaps = await Roadmap.countDocuments();
  const totalChats = await ChatHistory.countDocuments();

  res.json({
    stats: {
      totalUsers,
      totalResources,
      activeRoadmaps,
      totalChats
    }
  });
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json({ users });
};

// @desc    Update user status (activate/deactivate)
// @route   PUT /api/admin/users/:id
// @access  Private/Admin
export const updateUserStatus = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    if (user.role === 'admin') {
      res.status(400);
      throw new Error('Cannot deactivate another admin');
    }
    user.isActive = req.body.isActive;
    await user.save();
    res.json({ message: 'User status updated' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

// @desc    Add new resource
// @route   POST /api/admin/resources
// @access  Private/Admin
export const addResource = async (req, res) => {
  const { title, url, type, topic, description, tags } = req.body;
  const resource = await Resource.create({
    title, url, type, topic, description, tags, addedBy: req.user._id
  });
  res.status(201).json({ resource });
};

// @desc    Update resource
// @route   PUT /api/admin/resources/:id
// @access  Private/Admin
export const updateResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (resource) {
    resource.title = req.body.title || resource.title;
    resource.url = req.body.url || resource.url;
    resource.type = req.body.type || resource.type;
    resource.topic = req.body.topic || resource.topic;
    resource.description = req.body.description || resource.description;
    resource.tags = req.body.tags || resource.tags;
    
    const updatedResource = await resource.save();
    res.json({ resource: updatedResource });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
};

// @desc    Delete resource
// @route   DELETE /api/admin/resources/:id
// @access  Private/Admin
export const deleteResource = async (req, res) => {
  const resource = await Resource.findById(req.params.id);
  if (resource) {
    await resource.deleteOne();
    res.json({ message: 'Resource removed' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
};
