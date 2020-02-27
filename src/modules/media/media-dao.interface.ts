import { MediaDto } from "./dto/media.dto";

export interface MediaDao {
  saveImage(path: string): Promise<number>;
  addImageToPost(imageId: number, postId: number): Promise<void>;
  findMediaFromPost(postId: number): Promise<MediaDto[]>
}
