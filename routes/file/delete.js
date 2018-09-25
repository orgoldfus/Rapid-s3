const fs = require('fs').promises;
const path = require('path');
const STORAGE_PATH = path.join(__root, 'storage');

async function deleteFile (req, res) {
  const file = req.file;

  if (!file || file.deletedAt) {
    return res.status(404).send('File not found')
  }

  await fs.unlink(`${STORAGE_PATH}/${file.id}`);
  file.deletedAt = Date.now();
  await file.save();

  return res.status(200).send('File deleted successfully');
}

module.exports = deleteFile;