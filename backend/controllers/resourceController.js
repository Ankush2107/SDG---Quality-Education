import Resource from '../models/Resource.js';

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
export const getResources = async (req, res) => {
  const { type, topic, search } = req.query;
  
  const query = {};
  if (type) query.type = type;
  if (topic) query.topic = { $regex: topic, $options: 'i' };
  if (search) query.title = { $regex: search, $options: 'i' };

  const resources = await Resource.find(query).sort({ createdAt: -1 });
  res.json({ resources });
};
