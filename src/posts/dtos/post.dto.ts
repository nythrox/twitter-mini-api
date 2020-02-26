export class PostDto {
  author: UserDto
  text: string;
  images: string[];
  replies: PostDto[]
  likes: number
}
