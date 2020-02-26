import { Injectable } from "@nestjs/common";
import { CreatePostDto } from './dtos/add-post.dto';
import { PostsService } from './posts.service';
import { create } from "domain";

@Injectable()
export class PostsFacade {
    constructor(private postsService: PostsService) {

    }
    async createPost(userId: number, createPostDto: CreatePostDto) {
        const postId = this.postsService.createPost(userId, createPostDto.text);
        // this.mediaService.createImages("asdasd","asdasd")
        return postId;
    }
}