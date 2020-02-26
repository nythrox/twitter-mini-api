import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('media')
export class MediaController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadMedia(@UploadedFile() file) {
    console.log(file);
    return file;
  }
}
