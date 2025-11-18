#  AWS Serverless To-Do Application

A modern, full-stack to-do application built with **React frontend** and **AWS serverless backend**. Features real-time task management with complete CRUD operations in a cloud-native architecture.

##  Features

-  **Add, Edit, Delete Tasks** - Full CRUD functionality
-  **Mark Tasks Complete** - Toggle task completion status  
-  **Real-time Updates** - Instant UI feedback
-  **Responsive Design** - Works on all devices
-  **Serverless Backend** - No server management required
-  **Cloud Storage** - Data persistence with DynamoDB
-  **RESTful API** - Clean API architecture

##  Architecture

```
Frontend (React) → API Gateway → Lambda Functions → DynamoDB
       ↑
    S3 Hosting
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-------------|---------|
| **Frontend** | React, CSS3, HTML5 | User interface |
| **API Layer** | AWS API Gateway | REST API management |
| **Backend** | AWS Lambda, Node.js | Serverless functions |
| **Database** | AWS DynamoDB | NoSQL data storage |
| **Hosting** | AWS S3 | Static website hosting |

##  Quick Start

### Prerequisites

- Node.js 16.x or higher
- AWS Account
- Git

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/fadeel7/project3-aws-todo-app.git
cd project3-aws-todo-app
```

2. **Set up the frontend**
```bash
cd frontend
npm install
npm start
```
App opens at `http://localhost:3000`

3. **Configure environment** (create `.env` file in frontend folder)
```env
REACT_APP_API_URL=https://your-api-id.execute-api.region.amazonaws.com/prod
```

## 🛠️ AWS Setup

### 1. Create DynamoDB Table

```bash
aws dynamodb create-table \
    --table-name TodoItems \
    --attribute-definitions AttributeName=id,AttributeType=S \
    --key-schema AttributeName=id,KeyType=HASH \
    --billing-mode PAY_PER_REQUEST
```

### 2. Deploy Lambda Function

1. Go to **AWS Lambda Console**
2. Create function: `TodoBackend`
3. Runtime: **Node.js 18.x**
4. Upload code from `backend/lambda-function.js`
5. Set handler to `lambda-function.handler`

### 3. Configure API Gateway

1. Create **REST API** named `TodoAPI`
2. Create resources:
   - `GET /todos`
   - `POST /todos` 
   - `PUT /todos/{id}`
   - `DELETE /todos/{id}`
3. Enable **CORS** for all methods
4. Deploy to `prod` stage

### 4. Set Up IAM Permissions

Add these permissions to your Lambda execution role:
```json
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
            "Resource": "arn:aws:dynamodb:*:*:table/TodoItems"
        }
    ]
}
```

##  API Documentation

### Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| `GET` | `/todos` | Get all tasks | None |
| `POST` | `/todos` | Create new task | `task` (string) |
| `PUT` | `/todos/{id}` | Update task | `completed` (boolean) |
| `DELETE` | `/todos/{id}` | Delete task | `id` (path) |

### Request Examples

**Create Task:**
```http
POST /todos
Content-Type: application/json

{
  "task": "Learn AWS Serverless"
}

Response:
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "task": "Learn AWS Serverless", 
  "completed": false,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

**Get All Tasks:**
```http
GET /todos

Response:
[
  {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "task": "Learn AWS Serverless",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

##  Project Structure

```
project3-aws-todo-app/
├── frontend/                 # React Application
│   ├── src/
│   │   ├── App.js           # Main component
│   │   ├── App.css          # Styles
│   │   └── index.js         # Entry point
│   ├── public/
│   └── package.json
├── backend/
│   └── lambda-function.js   # Lambda function
├── docs/                    # Documentation
└── README.md
```

##  Deployment

### Frontend to S3

1. **Build the project**
```bash
cd frontend
npm run build
```

2. **Create S3 bucket**
```bash
aws s3 mb s3://your-todo-app-bucket
```

3. **Enable static hosting**
```bash
aws s3 website s3://your-todo-app-bucket --index-document index.html
```

4. **Upload files**
```bash
aws s3 sync build/ s3://your-todo-app-bucket --delete
```

5. **Set bucket policy** (make public)
```json
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
```

##  Troubleshooting

### Common Issues

**CORS Errors:**
- Enable CORS in API Gateway
- Check Lambda response headers

**403 Forbidden:**
- Verify IAM permissions for Lambda
- Check API Gateway resource policies

**Tasks not saving:**
- Confirm DynamoDB table name matches
- Check Lambda execution role permissions

**Blank white screen:**
- Check browser console for errors
- Verify React build completed successfully

### Debugging Steps

1. Check **CloudWatch Logs** for Lambda errors
2. Test API with **Postman** or **curl**
3. Verify **API Gateway** configuration
4. Check **browser network tab** for failed requests

##  Security

- IAM roles with least privilege
- API Gateway resource policies  
- Environment variables for configuration
- No hardcoded credentials

##  License

This project is licensed under the MIT License.

##  Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

<div align="center">

**Built using AWS Serverless Technologies**

 **Star this repo if you found it helpful!**

</div>
