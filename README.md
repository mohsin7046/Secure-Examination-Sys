## Secure Examination and Paper Distribution System

### Overview

The Secure Examination and Paper Distribution System is designed to facilitate secure sharing of PDF documents for examinations and paper distribution. It ensures confidentiality, integrity, and controlled access to sensitive documents.

### Features

- **Secure PDF Sharing**: Upload and share PDF files securely.
- **Access Control**: Define access permissions to restrict document visibility.
- **Encryption**: Ensure encrypted file transfers for enhanced security.
- **Authentication**: Authenticate users securely to access and manage documents.
- **Audit Trail**: Maintain a log of document access and distribution activities.

### Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

### Setup Instructions

#### Prerequisites

- Node.js (version >= 12.0.0)
- npm or yarn
- MongoDB (installed and running)

#### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd secure-examination-system
    ```

2. Install dependencies:

   ```npm install
   git clone <repository-url>
   cd secure-examination-system
    ```

3. Set up environment variables:

   ```npm install
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/secure_exam_db
   JWT_SECRET=your_jwt_secret
    ```

4. Start the server:
    ```bash
    npm start
    ```
