export class PostModel {
  constructor(
    public text: string,
    public id: number,
    public userId: number,
    public replyingToPostId: number,
  ) {}
}
