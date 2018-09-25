const FileModel = require('../models/fileModel');

function getUser (req, res, next) {
  // TODO: get data from users table
  req.user = {
    qAzef32F: { name: 'user1', id: 'qAzef32F' },
    hT9Lmdx: { name: 'user2', id: 'hT9Lmdx' }
  }[req.params.userId];

  return req.user ? next() : res.status(404).send('User not found');
}

async function getFile (req, res, next) {
  const idenetityField = req.query.access_token ? 'id' : 'name'
  const fileMetadata = await FileModel.findOne({
    userId: req.user.id,
    [idenetityField]: req.params.fileIdentifier
  }).exec();

  req.file = fileMetadata;
  
  return next();
}

function validateAccessToken (req, res, next) {
  const file = req.file;

  if (req.file && req.file.accessToken &&
    file.accessToken !== req.query.access_token) {
    return res.status(403).send('Invalid access token');
  }

  return next();
}

module.exports = {
  getUser,
  getFile,
  validateAccessToken
}