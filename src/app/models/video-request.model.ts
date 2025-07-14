export interface VideoRequest {
  videoRequestId: number; 
  userId?: number; 
  userName: string; 
  topic: string; 
  subTopic?: string; 
  requestStatus: string; 
  shortTitle: string; 
  requestDescription: string; 
  response?: string; 
  videoUrls?: string; 
}
