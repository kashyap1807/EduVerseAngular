import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit{
  courseId: number = 0;
  
  constructor(private route:ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = Number(params.get('courseId'));
    });

  }

}
