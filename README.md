AWS Serverless To-Do Application
<div align="center">
https://img.shields.io/badge/AWS-Serverless-orange?logo=amazon-aws&style=for-the-badge
https://img.shields.io/badge/Frontend-React-blue?logo=react&style=for-the-badge
https://img.shields.io/badge/Database-DynamoDB-blue?logo=amazon-dynamodb&style=for-the-badge
https://img.shields.io/badge/Backend-Node.js-green?logo=node.js&style=for-the-badge

A modern, full-stack to-do application built with React frontend and AWS serverless backend. Features real-time task management with complete CRUD operations in a cloud-native architecture.

Live Demo • Deployment Guide • API Documentation

</div>

 Features
Feature	Description	Status
 Task Management	Add, edit, delete, and mark tasks as complete	🟢 Complete
 Real-time Updates	Instant UI feedback with state management	🟢 Complete
 Responsive Design	Works seamlessly on all devices	🟢 Complete
 Serverless Backend	No server management with AWS Lambda	🟢 Complete
 Cloud Database	Data persistence with DynamoDB	🟢 Complete
 Secure API	RESTful API with proper CORS and security	🟢 Complete
 Fast Performance	Optimized React app with efficient rendering	🟢 Complete
 System Architecture
graph TB
    A[User Browser] --> B[React App<br/>S3 Hosted]
    B --> C[API Gateway<br/>REST Endpoints]
    C --> D[Lambda Functions<br/>Node.js Runtime]
    D --> E[DynamoDB<br/>NoSQL Database]
    
    style A fill:#61dafb
    style B fill:#61dafb
    style C fill:#ff9900
    style D fill:#ff9900
    style E fill:#ff9900
Technology Stack
Layer	Technology	Purpose
Frontend	React 18, CSS3, HTML5	User interface and experience
API Layer	AWS API Gateway	RESTful API management
Backend	AWS Lambda, Node.js 18.x	Serverless business logic
Database	AWS DynamoDB	NoSQL data storage
Hosting	AWS S3	Static website hosting
Security	AWS IAM	Access control and permissions

Application Preview
<div align="center">
 Modern User Interface
https://via.placeholder.com/800x400/667eea/ffffff?text=Clean+Modern+To-Do+Interface
Clean, intuitive design with smooth animations

 Responsive Design
https://via.placeholder.com/300x600/764ba2/ffffff?text=Mobile+Responsive
Perfectly adapted for mobile devices

</div>
 Quick Start
Prerequisites
Node.js 16.x or higher

AWS Account with appropriate permissions

Git for version control

Local Development
Clone the repository

bash
git clone https://github.com/fadeel7/project3-aws-todo-app.git
cd project3-aws-todo-app
Set up the frontend

bash
cd frontend
npm install
npm start
The app will open at http://localhost:3000

Configure environment (create .env file in frontend folder)

env
REACT_APP_API_URL=https://your-api-id.execute-api.region.amazonaws.com/prod
REACT_APP_AWS_REGION=us-east-1
 AWS Infrastructure Setup
1. Create DynamoDB Table
bash
aws dynamodb create-table \
    --table-name TodoItems \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
Table Schema:

javascript
{
  id: "uuid-string",           // Primary key
  task: "Task description",    // Task content
  completed: false,           // Completion status
  createdAt: "2024-01-15T10:30:00.000Z"  // Creation timestamp
}
2. Deploy Lambda Function
Navigate to AWS Lambda Console

Create function: TodoBackend

Runtime: Node.js 18.x

Upload code from backend/lambda-function.js

Set handler to lambda-function.handler

3. Configure API Gateway
Create REST API named TodoAPI

Create resources:

GET /todos - Fetch all tasks

POST /todos - Create new task

PUT /todos/{id} - Update task

DELETE /todos/{id} - Delete task

Enable CORS for all methods

Deploy to stage (prod)

4. Set Up IAM Permissions
Lambda Execution Role:

json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:UpdateItem",
                "dynamodb:DeleteItem",
                "dynamodb:Scan"
            ],
            "Resource": "arn:aws:dynamodb:region:account-id:table/TodoItems"
        }
    ]
}
 API Documentation
Endpoints Overview
Method	Endpoint	Description	Parameters
GET	/todos	Get all tasks	None
POST	/todos	Create new task	task (string)
PUT	/todos/{id}	Update task	completed (boolean)
DELETE	/todos/{id}	Delete task	id (path parameter)
Detailed Examples
Create a New Task

http
POST /todos
Content-Type: application/json

{
  "task": "Learn AWS Serverless Architecture"
}

Response (201 Created):
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "task": "Learn AWS Serverless Architecture",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
Get All Tasks

http
GET /todos

Response (200 OK):
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "task": "Learn AWS Serverless Architecture",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  },
  {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "task": "Deploy to Production",
    "completed": true,
    "createdAt": "2024-01-14T15:45:00.000Z"
  }
]
Update Task Completion

http
PUT /todos/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json

{
  "completed": true
}

Response (200 OK):
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "task": "Learn AWS Serverless Architecture",
  "completed": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:00:00.000Z"
}
 Project Structure
text
project3-aws-todo-app/
├── 📁 frontend/                 # React Application
│   ├── 📁 public/              # Static assets
│   │   ├── index.html          # Main HTML template
│   │   └── favicon.ico         # Site favicon
│   ├── 📁 src/                 # Source code
│   │   ├── App.js              # Main React component
│   │   ├── App.css             # Application styles
│   │   └── index.js            # React entry point
│   └── package.json            # Dependencies and scripts
├── 📁 backend/                 # AWS Infrastructure
│   └── lambda-function.js      # Lambda function code
├── 📁 docs/                    # Documentation
│   └── architecture.md         # System architecture details
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
🔧 Deployment Guide
Frontend Deployment to S3
Build the React application

bash
cd frontend
npm run build
Create S3 bucket for hosting

bash
aws s3 mb s3://your-todo-app-bucket --region us-east-1
Enable static website hosting

bash
aws s3 website s3://your-todo-app-bucket --index-document index.html
Upload build files

bash
aws s3 sync build/ s3://your-todo-app-bucket --delete
Set bucket policy for public access

json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::your-todo-app-bucket/*"
        }
    ]
}
Backend Deployment
Update Lambda function code via AWS Console

Deploy API Gateway to production stage

Update frontend environment variables with new API URL

Redeploy frontend to S3

 Troubleshooting
Common Issues & Solutions
Issue	Cause	Solution
CORS Errors	Missing CORS headers	Enable CORS in API Gateway
403 Forbidden	IAM permissions	Add DynamoDB permissions to Lambda role
Tasks not saving	DynamoDB write issues	Check table name and permissions
API not responding	Lambda timeout	Increase timeout to 30 seconds
Blank white screen	React build issues	Check console for JavaScript errors
Debugging Steps
Check CloudWatch Logs for Lambda execution errors

Verify API Gateway method responses and integration

Test endpoints using Postman or curl

Inspect browser console for frontend errors

Validate IAM roles and permissions

Useful Commands
bash
# Test API endpoints with curl
curl -X GET https://your-api.execute-api.region.amazonaws.com/prod/todos

# Check Lambda logs
aws logs describe-log-groups --log-group-name-prefix /aws/lambda/TodoBackend

# Verify DynamoDB table
aws dynamodb scan --table-name TodoItems
 Security Best Practices
 Least privilege IAM roles

 Environment variables for configuration

 CORS properly configured

 No hardcoded credentials

 API Gateway resource policies

 DynamoDB fine-grained access control

 Performance & Monitoring
CloudWatch Metrics to Monitor
Lambda invocation count and duration

API Gateway latency and 4xx/5xx errors

DynamoDB read/write capacity

S3 request counts

Optimization Tips
Enable Lambda provisioned concurrency for consistent performance

Use DynamoDB auto-scaling for variable workloads

Implement React code splitting for faster loads

Configure CloudFront for global content delivery

 Future Enhancements
Feature	Priority	Status
User Authentication	 High	Planned
Task Categories & Tags	 Medium	Planned
Due Dates & Reminders	 Medium	Planned
File Attachments	 Low	Future
Real-time Collaboration	 High	Future
Mobile App Version	 Medium	Future
Advanced Analytics	 Low	Future
 Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

Development Guidelines
Follow React best practices and hooks patterns

Maintain consistent code formatting

Add comments for complex logic

Update documentation for new features

 License
This project is licensed under the MIT License - see the LICENSE file for details.

 Acknowledgments
AWS Documentation - Comprehensive cloud services guides

React Community - Extensive component ecosystem

Serverless Framework - Inspiration for architecture patterns

Open Source Community - Continuous learning and improvement

 Support
If you encounter any issues or have questions:

Check the troubleshooting guide

Review API documentation

Create an issue

Contact the maintainer

<div align="center">
Built using Modern Serverless Technologies
If this project helped you, please give it a ⭐!

Explore Code • View API • Report Issue • Request Feature

</div>
