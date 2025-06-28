import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { VideoRequest } from '../../../models/video-request.model';
import { VideoRequestService } from '../../../services/video-request.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, AccordionModule, RouterModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
})
export class RequestComponent implements OnInit {
  mockVideoRequests!: VideoRequest[];

  constructor(
    private videoRequestService: VideoRequestService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.getVideoRequest();
  }

  getVideoRequest() {
    this.videoRequestService
      .getByUserId(this.loginService.userId)
      .subscribe((s) => {
        this.mockVideoRequests = s;
      });
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'requested':
        return 'requested';
      case 'reviewed':
        return 'reviewed';
      case 'inprocess':
        return 'inprocess';
      case 'completed':
        return 'completed';
      case 'published':
        return 'published';
      default:
        return '';
    }
  }
}
