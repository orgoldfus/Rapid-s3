async function downloadFile (req, res) {
  const file = req.file;
  
  if(file && req.query.metadata) {
    return res.status(200).json({
      fileName: file.name,
      fileSize: file.size,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      deletedAt: file.deletedAt || undefined
    })
  } else if (!file || file.deletedAt) {
    return res.status(404).send('File not found')
  }

  return res.sendFile(`${process.env.STORAGE_PATH}/${file.id}`);
}

module.exports = downloadFile;