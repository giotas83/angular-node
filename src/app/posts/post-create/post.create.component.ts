import { Component} from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from '../../services/index';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent {

  constructor(private postService: PostService) {

  }

  public onAddPost(form: NgForm) {
    if (form.invalid) return;
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
