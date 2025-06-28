import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VideoRequest } from '../../../models/video-request.model';
import { VideoRequestService } from '../../../services/video-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  videoRequests: VideoRequest[] = [];

  constructor(
    private videoRequestService: VideoRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVideoRequests();
  }

  loadVideoRequests(): void {
    this.videoRequestService.getAll().subscribe(
      (requests) => {
        this.videoRequests = requests;
      },
      (error) => {
        console.error('Error fetching video requests:', error);
      }
    );
  }

  editRequest(requestId: number): void {
    this.router.navigate(['/admin/technology/requests/edit', requestId]);
  }
}
