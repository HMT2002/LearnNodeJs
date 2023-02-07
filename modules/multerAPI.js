const multer = require('multer');

const storage = multer.diskStorage({
  destination: 'resources-storage/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const maxSize = 60 * 1024 * 1024; //30mb
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'video/mp4' ||
      file.mimetype == 'video/mkv'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
  limits: { fileSize: maxSize },
}).single('file');

// var Upload = upload.any([{ name: 'TenFieldsORouteVaHbsPhaiGiongNhau' }]);

module.exports = upload;
