import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Claim } from '../../models/claim.model';

@Component({
  selector: 'app-view-claims',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-claims.component.html',
  styleUrl: './view-claims.component.css',
})
export class ViewClaimsComponent implements OnInit {
  claims: Claim[] = [];

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    //To subscribe for claims
    this.loginService.claims$.subscribe((c) => {
      this.claims = c;
    });
  }
}
