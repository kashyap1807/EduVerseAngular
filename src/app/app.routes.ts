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
import { AddCourseComponent } from './components/course/add-course/add-course.component';
import { RoleGuard } from './guards/role.guard';
import { MsalGuard } from '@azure/msal-angular';
import { FormComponent } from './components/video-request/form/form.component';
import { RequestComponent } from './components/video-request/request/request.component';
import { ListComponent } from './components/video-request/list/list.component';
import { ViewClaimsComponent } from './components/view-claims/view-claims.component';
import { canActivateGuard } from './components/guards/login.guard';
import { canDeactivateGuard } from './components/guards/can-deactivate.guard';
import { CourseComponent } from './components/course/course/course.component';
import { CourseListComponent } from './components/course/course-list/course-list.component';
import { canActivateAdminGuard } from './components/guards/admin.guard';

export const routes: Routes = [
  // Public Routes
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'plans-and-price', component: PlansAndPricingComponent },
  { path: 'course/browseall', component: BrowseallComponent },
  { path: 'course/category', component: CategoryComponent },
  { path: 'course/category/:categoryId', component: CourseByCategoryComponent },
  { path: 'course/details/:courseId', component: CourseDetailsComponent },

  {
    path: 'course/create',
    component: CourseComponent,
    canActivate: [canActivateAdminGuard],
  },
  { path: 'course/list', component: CourseListComponent },
  {
    path: 'course/edit/:courseId',
    component: CourseComponent,
    canActivate: [canActivateAdminGuard],
  },

  // Authenticated User Routes (requires login)
  {
    path: 'user/profile/:userId',
    component: ViewUserProfileComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'user/update-profile',
    component: UpdateProfileComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'course/enrollments',
    component: EnrollmentsComponent,
    canActivate: [MsalGuard],
  },

  // Instructor Routes
  // {
  //   path: 'course/add',
  //   component: AddCourseComponent,
  //   canActivate: [MsalGuard, RoleGuard],
  //   data: { roles: ['Instructor'] },
  // },
  // {
  //   path: 'user/instructors',
  //   component: ViewUserProfileComponent,
  //   canActivate: [MsalGuard, RoleGuard],
  //   data: { roles: ['Instructor'] },
  // },

  { path: 'claims', component: ViewClaimsComponent },
  {
    path: 'technology/request/video',
    component: FormComponent,
    canActivate: [canActivateGuard],
    canDeactivate: [canDeactivateGuard],
  },
  {
    path: 'technology/requests',
    component: RequestComponent,
    canActivate: [canActivateGuard],
  },
  {
    path: 'admin/technology/requests',
    component: ListComponent,
    canActivate: [canActivateAdminGuard],
  },
  {
    path: 'admin/technology/requests/edit/:id',
    component: FormComponent,
    canActivate: [canActivateAdminGuard],
  },

  // { path: 'course/enrollments', component: EnrollmentsComponent },
  // { path: 'user/update-profile', component: UpdateProfileComponent },
  // { path: 'user/instructors', component: ViewUserProfileComponent },
];
