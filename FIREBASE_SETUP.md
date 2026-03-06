# Firebase Setup Guide

## ✅ Already Done
- Firebase package installed (`npm install firebase`)
- Configuration files created

## 🔧 Setup Steps

### 1. Get Your Firebase Credentials
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Go to Project Settings (gear icon)
4. Copy your Firebase config

### 2. Add Your Firebase Config
Update [src/config/firebase.js](./config/firebase.js) with your credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Enable Firebase Services
In Firebase Console, enable these services:
- ✅ Authentication (Email/Password)
- ✅ Firestore Database
- ✅ Cloud Storage (if needed)

## 📚 Usage Examples

### Authentication (src/utils/authService.js)
```javascript
import { signUp, signIn, logout } from './utils/authService';

// Sign up
await signUp('user@email.com', 'password123');

// Sign in
await signIn('user@email.com', 'password123');

// Sign out
await logout();
```

### Firestore Database (src/utils/firestoreService.js)
```javascript
import { addDocument, getDocuments, getDocument, updateDocument, deleteDocument } from './utils/firestoreService';

// Add data
const docId = await addDocument('users', { name: 'John', age: 30 });

// Get all documents
const users = await getDocuments('users');

// Get single document
const user = await getDocument('users', docId);

// Update document
await updateDocument('users', docId, { age: 31 });

// Delete document
await deleteDocument('users', docId);
```

## 📁 Project Structure
```
src/
├── config/
│   └── firebase.js          # Firebase initialization
├── utils/
│   ├── authService.js       # Authentication functions
│   └── firestoreService.js  # Database functions
└── App.jsx
```

## 🚀 Next Steps
1. Update Firebase config with your credentials
2. Enable services in Firebase Console
3. Import and use the service functions in your React components
4. Build your app! 🎉
