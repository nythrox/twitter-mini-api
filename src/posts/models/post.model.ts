export class PostModel {
  constructor(
    public text: string,
    id: number,
    userId: number,
    replyingToPostId: number,
  ) {}
}
