import { CourseCategory } from "./category.model";
import { SessionDetail } from "./sessionDetail.model";
import { UserRating } from "./userRating.model";
import { UserReview } from "./userReview.model";

export interface Course {
  courseId: number;
  title: string;
  description: string;
  price: number;
  courseType: 'Online' | 'Offline';
  seatsAvailable: number | null;
  duration: number; // Duration in hours
  categoryId: number;
  instructorId: number;
  startDate: string | null;
  endDate: string | null;
  thumbnail?: string;
  category?: CourseCategory | null;
  userRating?: UserRating | null;
  reviews?:UserReview[] | null;
  sessionDetails?: SessionDetail[];
}