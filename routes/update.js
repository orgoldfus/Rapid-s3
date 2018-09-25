const shortid = require('shortid');

async function updateFile (req, res) {
  const file = req.file;

  if (!file || file.deletedAt) {
    return res.status(404).send('File not found')
  }

  const receivedAccessType = req.body.accessType && req.body.accessType.toLowerCase();
  if (receivedAccessType && !['private', 'public'].includes(receivedAccessType)) {
    return res.status(400).send('accessType can be either private or public');
  }

  if (file.accessType !== receivedAccessType) {
    file.accessType = receivedAccessType;
    file.accessToken = receivedAccessType === 'private' ? shortid.generate() : null;
  }

  file.updatedAt = Date.now();
  await file.save();

  return res.status(200).json({
    fileId: file.id,
    accessType: file.accessType,
    accessToken: file.accessToken || undefined
  });
}

module.exports = updateFile;