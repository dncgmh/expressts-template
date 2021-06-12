import crypto from 'crypto';
import { Request } from 'express';
import fs from 'fs';
import { includes } from 'lodash';
import mkdirp from 'mkdirp';
import multer from 'multer';
import { BaseError, errorCode, logger } from '../util';

const dirName = `private/`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    !fs.existsSync(dirName)
      ? mkdirp(dirName)
          .then(() => cb(null, dirName))
          .catch((err) => (err ? logger.error('upload err') : cb(null, dirName)))
      : cb(null, dirName);
  },
  filename: function (req: Request, file, cb) {
    const filename = crypto.createHash('sha256').update(`${req.user._id}.${new Date().getTime()}`).digest('hex');
    cb(null, filename);
  }
});
const upload = multer({
  limits: { fileSize: 1024 * 1024 * 5 },
  storage,
  fileFilter: function (req, file, cb) {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
    if (includes(allowedMimes, file.mimetype)) {
      cb(null, true);
    } else {
      cb(new BaseError(400));
    }
  }
});

export const uploadImageMiddleware = upload.array('image');
export const uploadCertImage = upload.fields([
  { name: 'portrait_image', maxCount: 1 },
  { name: 'front_id_image', maxCount: 1 },
  { name: 'back_id_image', maxCount: 1 }
]);
