const fs = require('fs').promises;

async function deleteFile (req, res) {
  const file = req.file;

  if (!file || file.deletedAt) {
    return res.status(404).send('File not found')
  }

  await fs.unlink(`${process.env.STORAGE_PATH}/${file.id}`);
  file.deletedAt = Date.now();
  await file.save();

  return res.status(200).send('File deleted successfully');
}

module.exports = deleteFile;