export interface UserReview {
  reviewId: number;
  courseId: number;
  userId: number;
  userName: string; // Optionally, this can be omitted if not needed in the form
  rating: number;
  comments?: string;
  reviewDate: Date;
}