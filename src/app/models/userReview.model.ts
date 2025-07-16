export interface UserReview {
  reviewId: number;
  courseId: number;
  userId: number;
  userName: string;
  rating: number;
  comments?: string;
  reviewDate: Date;
}