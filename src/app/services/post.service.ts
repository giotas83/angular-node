import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/index';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: Array<Post> = [];
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .subscribe( (postData) => {
        this._posts = postData.posts;
        this.postUpdated.next([...this._posts]);
      })
  }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const post: Post = new Post(null, title, content);
    this._posts.push(post);
    this.postUpdated.next([...this._posts]);
  }
}
