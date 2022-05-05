import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const multerOptions: MulterOptions = {
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return callback(null, true);
    }
    return callback(
      new BadRequestException('지원하지 않는 이미지 형식입니다.'),
      false,
    );
  },

  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'public';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      callback(null, uploadPath);
    },

    filename: (request, file, callback) => {
      callback(null, generateRandomFilename(file));
    },
  }),
};

function generateRandomFilename(file: Express.Multer.File): string {
  const randomFilename = `${uuid()}${extname(file.originalname)}`;
  return randomFilename;
}
