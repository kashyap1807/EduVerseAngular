import { Component } from '@angular/core';
import { BrowseCourseComponent } from "../browse-course/browse-course.component";

@Component({
  selector: 'app-browseall',
  standalone: true,
  imports: [BrowseCourseComponent],
  templateUrl: './browseall.component.html',
  styleUrl: './browseall.component.css'
})
export class BrowseallComponent {

}
