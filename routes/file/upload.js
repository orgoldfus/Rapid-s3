const fs = require('fs').promises
const shortid = require('shortid');
const FileModel = require('../../models/fileModel');

async function uploadFileMultipart (req, res) { 
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file was received');
  }

  const receivedAccessType = req.body.accessType && req.body.accessType.toLowerCase();
  if (receivedAccessType && !['private', 'public'].includes(receivedAccessType)) {
    await deleteFile(file.filename)
    return res.status(400).send('accessType can be either private or public');
  }

  const fileExists = await FileModel.findOne({ 
    userId: req.user.id,
    name: file.originalname,
    deletedAt: null
  }).exec();

  if (fileExists) {
    await deleteFile(file.filename)
    return res.status(409).send('File already exists');
  }

  const accessToken = receivedAccessType === 'private' ? shortid.generate() : null;
  const now = Date.now();
  const fileMetadata = await FileModel.create({ 
    id: file.filename,
    userId: req.user.id,
    name: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
    accessType: receivedAccessType || 'public',
    accessToken
  });

  // Remove deleted file with same name (if exists)
  await FileModel.remove({
    userId: req.user.id,
    name: file.originalname,
    deletedAt: { $ne: null }
  });
  
 return res.status(201).json({
   fileId: fileMetadata.id,
   accessType: fileMetadata.accessType,
   accessToken: accessToken || undefined
 });
}

async function deleteFile(fileName) {
  await fs.unlink(`${process.env.STORAGE_PATH}/${fileName}`);
}

module.exports = uploadFileMultipart