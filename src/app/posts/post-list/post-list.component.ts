import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../models/index';
import { PostService } from '../../services/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  public posts: Array<Post> = [];
  private postsSub: Subscription = new Subscription();

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe( (posts: Post[]) => {
        this.posts = posts;
      })
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  editPost() {

  }

  deletePost() {

  }

}
