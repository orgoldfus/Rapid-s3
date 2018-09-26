const router = require('express').Router();
const multer  = require('multer');
const storage = multer({ dest: process.env.STORAGE_PATH });
const {
  getUser, 
  getFile, 
  validateAccessToken
} = require('../lib/middleware');
const {
  uploadFile,
  updateFile,
  downloadFile,
  deleteFile
} = require('./file')

// Routes
router.post('/:userId', 
  storage.single('file'), 
  getUser, 
  uploadFile
);
router.post('/:userId/:fileIdentifier', 
  getUser, 
  getFile, 
  validateAccessToken, 
  updateFile
);
router.get('/:userId/:fileIdentifier', 
  getUser, 
  getFile, 
  validateAccessToken, 
  downloadFile
);
router.delete('/:userId/:fileIdentifier', 
  getUser, 
  getFile, 
  validateAccessToken, 
  deleteFile
);

module.exports = router;