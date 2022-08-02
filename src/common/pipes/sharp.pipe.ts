import { Injectable, PipeTransform } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class SharpPipe
  implements
    PipeTransform<Express.Multer.File[], Promise<Express.Multer.File[]>>
{
  async transform(
    images: Express.Multer.File[],
  ): Promise<Express.Multer.File[]> {
    const newFilename = [];

    for (let i = 0; i < images.length; i++) {
      const filename = await this.resizeFile(images[i]);

      newFilename.push(filename);
    }

    return newFilename;
  }

  private async resizeFile(image: Express.Multer.File) {
    const file = path.join(__dirname, '../../..', image.path);
    const filename = this.generateRandomFilename(image);
    const filePath = path.join(__dirname, '../../../static/public', filename);

    await sharp(file).resize(500, 500).withMetadata().toFile(filePath);
    fs.unlinkSync(file);

    return filename;
  }

  private generateRandomFilename(file: Express.Multer.File): string {
    return `${uuid()}${path.extname(file.originalname)}`;
  }
}
