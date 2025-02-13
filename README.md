# 📚 Collaborative Study Platform

The **Collaborative Study Platform** is a dynamic and interactive web application designed to facilitate learning by connecting students, tutors, and administrators. It provides essential tools for scheduling study sessions, managing resources, and fostering a collaborative learning environment.

![Collaborative Study Platform](https://i.ibb.co.com/cX6Z9wbQ/Screenshot-2025-02-04-235842.png)

---

## 🚀 Live Demo

🔗 **Live Site URL:** [Collaborative Study Platform](https://collaborative-study-platform.web.app)

---

## 🔑 Admin Credentials

- **Admin Email:** `admin@gmail.com`
- **Admin Password:** `Admin123@`

---

## 📜 Dashboard

### 🔐 Admin Dashboard

![Collaborative Study Platform](https://i.ibb.co.com/9HWPGQRj/Screenshot-2025-02-14-012631.png)

---

## 📜 Key Features

### 🔐 User Authentication & Role Management

- JWT-based authentication ensures secure sessions.
- Social login via Google and GitHub (default role: Student).
- Role-based access control for **Students, Tutors, and Admins**.

### 🎨 Dynamic & Responsive Design

- Fully responsive UI for **desktop, tablet, and mobile**.
- **Role-specific dashboards** tailored for different users.

### 🏠 Home Page Sections

- **Navbar:** Displays **logo, login/sign-up options, user profile, logout**, and **dashboard button**.
- **Banner Section:** Professionally designed with **engaging imagery**.
- **Study Session Cards:** Displays **only approved** sessions with real-time status (**Ongoing/Closed**).

### 🎓 Student Features

- View **booked sessions** and session details.
- **Create, update, and delete** personal **notes**.
- Access study materials with **download links** and **URLs**.

### 👨‍🏫 Tutor Features

- Create **new study sessions** with session details.
- Upload **study materials** (images, Google Drive links).
- **Manage uploaded materials** (view, update, delete).

### 🔧 Admin Features

- **Manage users** (role updates, search functionality).
- Approve/reject **study sessions** with **feedback**.
- View & moderate **all study materials**.

### 🔔 Real-time Notifications

- CRUD operations trigger **SweetAlert/Toast** notifications.
- Success/failure alerts for **login, sign-up, and CRUD actions**.

### 🔒 Secure Data Handling

- **Environment variables** secure Firebase & MongoDB credentials.
- **Token-based authentication** stored in **local storage**.

### 📊 Pagination & Performance Optimization

- Implemented **pagination** on at least **two pages** for optimized data loading.

### ⚡ Advanced Features

- **Axios interceptors** for handling API requests efficiently.

---

## 🛠️ Technologies Used

### **Frontend**

- **React** (⚛️)
- **DaisyUI** (🌼)
- **TanStack Query** (⚡)

### **Backend**

- **Node.js** (🟢)
- **Express.js** (🚀)
- **MongoDB** (🍃)

### **Authentication & Hosting**

- **Firebase Auth** (🔐)
- **JWT (JSON Web Tokens)** (🔑)
- **Vercel** (Backend hosting)
- **Firebase** (Frontend hosting)
- **ImgBB** (Image hosting)

---

## ⚙️ Configuration (.env.local)

Create a `.env.local` file in your project root and add the following:

```env
VITE_apiKey=YOUR_FIREBASE_API_KEY
VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
VITE_projectId=YOUR_FIREBASE_PROJECT_ID
VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_appId=YOUR_FIREBASE_APP_ID
VITE_IMAGE_HOSTING_KEY=YOUR_IMGBB_API_KEY
VITE_STRIPE_PUBLIC_KEY=YOUR_STRIPE_PUBLIC_KEY

# API URL
VITE_API_URL=YOUR_BACKEND_API_URL
```

> ⚠️ **Warning:** Do **NOT** commit `.env.local` to version control (GitHub). Add it to your `.gitignore` file.

---

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```sh
   git clone https://github.com/ashraful2871/collaborative-study-platform.git
   cd collaborative-study-platform
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env.local` file (see above).
   - Replace placeholder values with your actual Firebase & API credentials.

4. **Run the development server**
   ```sh
   npm run dev
   ```

---

## 🔍 Troubleshooting

- **If Firebase authentication fails**:

  - Ensure your Firebase API key and authentication domain are correctly set in `.env.local`.
  - Verify that **Google & GitHub authentication** are enabled in your Firebase project.

- **If API requests fail**:
  - Check if your **backend server** is running.
  - Ensure `VITE_API_URL` is correctly set.

---

If you’re using **Firebase** for production deployment, your README should include clear instructions on how to build and deploy the project. Here's an updated **Production Deployment** section:

---

## 🚀 Production Deployment (Firebase)

To deploy the **Collaborative Study Platform** frontend to Firebase Hosting, follow these steps:

### 1️⃣ Install Firebase CLI

Make sure you have the **Firebase CLI** installed globally:

```sh
npm install -g firebase-tools
```

### 2️⃣ Login to Firebase

Authenticate your Firebase CLI with:

```sh
firebase login
```

### 3️⃣ Initialize Firebase in Your Project

Run the following command inside your project folder:

```sh
firebase init
```

- **Choose "Hosting"**
- **Select your Firebase project** (or create a new one)
- **Set `dist/` as the public directory** (for Vite projects)
- **Choose "Yes" for single-page app (SPA)**
- **Skip setting up automatic builds unless needed**

### 4️⃣ Build Your Project

Before deploying, create a **production build**:

```sh
npm run build
```

### 5️⃣ Deploy to Firebase

```sh
firebase deploy
```

This will upload your build files and make the site live at your **Firebase Hosting URL**.

---

### 🔄 Updating Production

Whenever you make changes and want to update the live site:

1. Run `npm run build`
2. Run `firebase deploy`

---

## 🔥 Firebase Hosting Configuration (`firebase.json`)

Ensure your `firebase.json` file is correctly set up for deployment:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

> **Note:**
>
> - `dist/` is the default build folder for Vite projects.
> - The `"rewrites"` section ensures that your **React app handles routing correctly**.

---
