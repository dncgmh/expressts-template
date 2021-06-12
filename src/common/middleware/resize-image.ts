import { Promise } from 'bluebird';
import fs from 'fs';
import sharp from 'sharp';
import { BaseResponse } from '../util';

const resizeImage =
  ({ format = 'png', height = 400, width }: { format?: any; width?: number; height?: number }) =>
  async (req, res, next) => {
    for (const key in req.files) {
      await Promise.mapSeries(req.files[key], async (file: any) => {
        await sharp(file.path)
          .resize({ height, width, fit: 'contain' })
          .toFormat(format)
          .toFile(file.path + '_resized');
        fs.unlink(file.path, (err) => console.log(`err`, err));
      });
    }
    return new BaseResponse({
        portrait_image: req.files.portrait_image && req.files.portrait_image[0].path + '_resized',
        front_id_image: req.files.front_id_image && req.files.front_id_image[0].path + '_resized',
        back_id_image: req.files.back_id_image && req.files.back_id_image[0].path + '_resized'
    }).json(res);
  };

export default resizeImage;
