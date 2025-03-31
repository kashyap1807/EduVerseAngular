import { SessionDetail } from "./sessionDetail.model";
import { UserReview } from "./userReview.model";

export interface CourseDetail {
  courseId: number;
  title: string;
  description: string;
  price: number;
  courseType: string;
  seatsAvailable: number | null;
  duration: number;
  categoryId: number;
  instructorId: number;
  instructorUserId: number;
  thumbnail: string;
  startDate: string;
  endDate: string;
  category: {
    categoryId: number;
    categoryName: string;
    description: string;
  };
  userRating: {
    courseId: number;
    averageRating: number;
    totalRating: number;
  };
  reviews: UserReview[];
  sessionDetails: SessionDetail[];
}