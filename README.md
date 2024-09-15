# Groq LLM and Firebase Firestore Integration

This project demonstrates an Express.js application that integrates the Groq SDK for handling chat completions and Firebase Firestore for storing user queries and responses.

## Features

- **Groq SDK**: Used to handle chat completions with the Groq LLM.
- **Firebase Admin SDK**: Manages Firestore as the database for storing user queries and API responses.
- **Express.js**: Backend framework to handle API requests.
- **Marked.js**: Converts Groq LLM's markdown response to HTML.

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher)
- [Groq API Key](https://groq.com/) (stored in `.env`)
- Firebase Project and Service Account credentials for Firestore.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your keys:

   ```
   GROQ_API_KEY=your-groq-api-key
   FIREBASE_SERVICE_ACCOUNT_KEY=your-firebase-service-account-json
   ```

   > The \`FIREBASE_SERVICE_ACCOUNT_KEY\` is the JSON string of your Firebase service account credentials. You can download it from the Firebase Console under **Project Settings** -> **Service accounts**.

4. **Set up Firestore:**

   - Create a Firebase project and enable Firestore.
   - Make sure your Firebase service account has the necessary permissions to access Firestore.

## Usage

1. **Start the server:**

   ```bash
   npm start
   ```

2. **Access the application:**

   Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

3. **Send a prompt:**

   Enter a prompt in the UI, and it will send the request to the Groq LLM via the Groq SDK. The response is returned in markdown format, parsed using Marked.js, and displayed as HTML. Both the prompt and response are stored in Firestore under the \`conversations\` collection.

## File Structure

```
├── public/               # Static files (CSS, JS)
├── views/                # EJS Templates
├── firebaseAdmin.js      # Firebase Admin SDK setup
├── index.js              # Main Express.js application
├── package.json          # Node.js dependencies
├── .env                  # Environment variables (ignored by .gitignore)
└── README.md             # This file
```

## Security

- Ensure that sensitive data like your Groq API Key and Firebase credentials are not committed to the repository. This is handled by the \`.gitignore\` file.
  
  Your \`.env\` file should include:
  
  ```
  .env
  ```
## Hosted Website
- [ChatBOT](https://internship-task-r1se.onrender.com/query)
