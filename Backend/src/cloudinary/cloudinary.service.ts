import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadFile(image: string): Promise<string> {
    try {
      const result = await cloudinary.uploader.upload(image);
      return result?.secure_url;
    } catch (error) {
      throw new Error(`Cloudinary upload failed:${error.message}`);
    }
  }
}
