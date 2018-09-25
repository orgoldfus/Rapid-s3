const router = require('express').Router();
const path = require('path');
const multer  = require('multer');
const STORAGE_PATH = path.join(__root, 'storage');
const storage = multer({ dest: STORAGE_PATH });
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