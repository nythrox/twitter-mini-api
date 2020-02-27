import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMedia(@UploadedFile() file): Promise<number> {
    console.log(file);
    return this.mediaService.saveImage(file.filename);
  }

  @Get(':path')
  fetchImageByFilename(@Param('path') path: string, @Res() res) {
    console.log(path);
    return res.sendFile(path, { root: 'media' });
  }
}
