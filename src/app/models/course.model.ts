import { CourseCategory } from "./category.model";
import { SessionDetail } from "./sessionDetail.model";
import { UserRating } from "./userRating.model";

export interface Course {
  courseId: number;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  courseType: 'Online' | 'Offline';
  seatsAvailable: number | null;
  duration: number; // Duration in hours
  categoryId: number;
  instructorId: number;
  startDate: string | null;
  endDate: string | null;
  category?: CourseCategory;
  userRating?: UserRating;
  sessionDetails?: SessionDetail[];
}