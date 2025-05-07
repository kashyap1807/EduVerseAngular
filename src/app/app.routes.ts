import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/core/about-us/about-us.component';
import { ContactUsComponent } from './components/core/contact-us/contact-us.component';
import { PlansAndPricingComponent } from './components/plans-and-pricing/plans-and-pricing.component';
import { CourseByCategoryComponent } from './components/course/course-by-category/course-by-category.component';
import { CategoryComponent } from './components/course/category/category.component';
import { CourseDetailsComponent } from './components/course/course-details/course-details.component';
import { BrowseallComponent } from './components/course/browseall/browseall.component';
import { ViewUserProfileComponent } from './components/user/view-user-profile/view-user-profile.component';
import { EnrollmentsComponent } from './components/user/enrollments/enrollments.component';
import { UpdateProfileComponent } from './components/user/update-profile/update-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'plans-and-price', component: PlansAndPricingComponent },
  { path: 'course/browseall', component: BrowseallComponent },
  { path: 'course/category', component: CategoryComponent },
  { path: 'course/category/:categoryId', component: CourseByCategoryComponent }, //anything after the colon is a parameter or variable
  { path: 'course/details/:courseId', component: CourseDetailsComponent },
  { path: 'user/:userId', component: ViewUserProfileComponent },
  { path: 'user/update-profile', component: UpdateProfileComponent },
  { path: 'course/enrollments', component: EnrollmentsComponent },
];
