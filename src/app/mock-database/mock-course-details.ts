import { CourseDetailsComponent } from "../components/course/course-details/course-details.component"

export const MOCK_COURSE_DETAILS: CourseDetailsComponent[] = [
  {
    reviews: [
      {
        courseId: 1,
        userName: 'Alice Johnson',
        rating: 5,
        comments: 'Excellent course, highly recommended!',
        reviewData: '2025-03-27T22:35:55.637',
      },
    ],
    sessionDetails: [
      {
        sessionId: 1,
        courseId: 1,
        title: 'Introduction to Angular',
        description: 'Overview of Angular and its core concepts.',
        videoUrl: 'https://example.com/angular-intro',
        videoOrder: 1,
      },
      {
        sessionId: 2,
        courseId: 1,
        title: 'Angular Components',
        description: 'Deep dive into Angular components.',
        videoUrl: 'https://example.com/angular-components',
        videoOrder: 2,
      },
      {
        sessionId: 3,
        courseId: 1,
        title: 'Angular Services and Dependency Injection',
        description: 'Learn how to create and use services in Angular.',
        videoUrl: 'https://example.com/angular-services',
        videoOrder: 3,
      },
      {
        sessionId: 4,
        courseId: 1,
        title: 'Routing in Angular',
        description: 'Understanding routing and navigation in Angular.',
        videoUrl: 'https://example.com/angular-routing',
        videoOrder: 4,
      },
    ],
    courseId: 1,
    title: 'Angular Full Course',
    description:
      'Comprehensive course covering Angular from basics to advanced topics.',
    price: 199.99,
    courseType: 'Online',
    seatsAvailable: 50,
    duration: 40.5,
    categoryId: 1,
    instructorId: 1,
    startDate: '2024-09-01T00:00:00',
    endDate: '2024-09-30T00:00:00',
    category: {
      categoryId: 1,
      categoryName: 'Programming',
      description:
        'Courses related to software development and programming languages.',
    },
    userRating: {
      courseId: 1,
      averageRating: 5,
      totalRating: 1,
    },
  },
];