# AWS-Cloud-Buddy
<img width="774" height="368" alt="Cloud-Buddy-icon-2" src="https://github.com/user-attachments/assets/524b4fa6-0887-46bc-a355-a16324ccaa4e" />

---

## Project Overview
**Cloud Buddy** is a serverless web application designed to help users master the **AWS Certified Cloud Practitioner (CLF-C02)** exam domains. It reinforces knowledge through digital flashcards, allowing users to filter by exam domain and flag complex services for later review.


## Project Team & Roles

| Role | Name |
| :--- | :--- |
| **Project Manager** | Changa Rose |
| **Technical Writer** | Ronna Curelea |
| **Developer Front-End** | Liza George |
| **Developer Back-End** | Giovany Victor |
| **Database Admin** | Roseline Akwanmi |
| **Solutions Architect** | Zinash Belay |


## **Language Stack**

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Front-end** | React & JavaScript | Responsive UI for exam prep and flashcard interaction. |
| **Back-end** | Node.js | Serverless logic within AWS Lambda functions. |
| **Database** | NoSQL | Data modeling and retrieval via Amazon DynamoDB. |



## System Architecture
The application utilizes a modern, serverless "Request-Response" architecture to ensure high availability and low cost.

* **Hosting:** S3 (Storage) + CloudFront (CDN)
* **Identity:** Amazon Cognito (User Auth)
* **API Layer:** Amazon API Gateway (Restful Endpoints)
* **Logic:** AWS Lambda (5 Microservices)
* **Data:** Amazon DynamoDB (NoSQL)



---

## API & Backend Mapping (Dev Stage)
The backend is modularized into five Lambda functions mapped to specific API resources.

| Endpoint Path | HTTP Method | Lambda Function | Description |
| :--- | :--- | :--- | :--- |
| `/` | `GET` | `getAllQuestions` | Fetches the full CLF-C02 question deck. |
| `/cards` | `GET` | `userQuestions` | Retrieves cards filtered by specific exam domains. |
| `/study-later` | `POST` | `studyLater` | Adds a card ID to the user's "Review List." |
| `/study-later` | `DELETE` | `deleteStudyLater` | Removes a mastered card from the review list. |
| `/user` | `GET` | `allUserQuestions` | Returns all cards currently flagged by the user. |

---

## Component Details

### A. Data Layer (DynamoDB)
* **Table:** `Flashcards` (Stores questions, answers, and CLF-C02 domain tags).
* **Table:** `UserStudyList` (Links UserIDs to CardIDs for personalized tracking).

### B. Logic Layer (Lambda)
* **`getAllQuestions`**: Queries the main database for total deck retrieval.
* **`userQuestions`**: Filters data based on the 4 CLF-C02 domains (Security, Billing, etc.).
* **`studyLater` & `deleteStudyLater`**: Manages user state and progress tracking.
* **`allUserQuestions`**: Aggregates a custom study deck for specific users.

### C. Frontend & Security
* **CloudFront:** Secures the origin S3 bucket using OAC (Origin Access Control).
* **Cognito:** Issues JWT tokens to authorized users to protect private `/user` data.
* **IAM:** Lambdas operate under "Least Privilege" roles, only accessing specific DynamoDB tables.

---

##  Deployment Guide
1.  **Backend:** Deploy Lambda functions and link to API Gateway resources in the `Dev` stage.
2.  **Database:** Seed DynamoDB with CLF-C02 content tags.
3.  **Frontend:** Upload build files to S3 and invalidate CloudFront cache for global update.
