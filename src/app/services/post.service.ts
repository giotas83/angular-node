import { Injectable } from '@angular/core';
import { Post } from '../models/index';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _posts: Array<Post> = [];
  private postUpdated = new Subject<Post[]>();

  constructor() { }

  getPostUpdateListener(): Observable<Post[]> {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string): void {
    const post: Post = new Post(title, content);
    this._posts.push(post);
    this.postUpdated.next([...this._posts]);
  }
}
