## Authentication

The service uses [Amazon Cognito](https://aws.amazon.com/cognito/) for authenticating HTTP requests. All endpoints require authentication. 

## API endpoints

| Endpoint        | Method | Description                       |
|-----------------|--------|-----------------------------------|
| /api/caregivers | GET    | Returns the number of caregivers. |
| /api/users      | GET    | Returns the number of users.      |
| /api/newusers  | GET    | Returns new app users within last week. |
| /api/cumulative | GET   | Returns all new users, cumulative, week by week. |
| /api/activitytoday | GET | Returns user activities today. |
| /api/retention | GET | Returns retention rate / usage periods |
| /api/avgretention | GET | average retention rate |
