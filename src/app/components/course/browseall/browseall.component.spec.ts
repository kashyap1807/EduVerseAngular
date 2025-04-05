import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseallComponent } from './browseall.component';

describe('BrowseallComponent', () => {
  let component: BrowseallComponent;
  let fixture: ComponentFixture<BrowseallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
