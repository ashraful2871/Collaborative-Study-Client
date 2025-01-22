# Collaborative Study Platform

The **Collaborative Study Platform** is designed to connect students, tutors, and administrators, providing tools to schedule study sessions, manage resources, and foster collaborative learning in a streamlined way.

---

## 🔑 Admin Credentials

- **Admin Email:** admin@collaborativestudy.com
- **Admin Password:** Admin123

## 🌐 Live Site URL

Visit the live site: [Collaborative Study Platform](https://collaborative-study-platform.web.app)

---

## 📜 Key Features

1. **User Authentication and Role Management:**

   - JWT-based authentication ensures secure sessions.
   - Social login via Google and GitHub (default role: Student).
   - Role-based access control for Students, Tutors, and Admins.

2. **Dynamic and Responsive Design:**

   - Fully responsive interface for desktop, tablet, and mobile views.
   - Tailored dashboards for each user role.

3. **Home Page with Key Sections:**

   - **Navbar:** Displays logo, login/sign-up options, user profile, logout, and dashboard button based on login state.
   - **Banner Section:** Professionally designed with relevant background imagery.
   - **Study Session Cards:** Displays only approved sessions with real-time status (Ongoing/Closed).

4. **Student Features:**

   - View booked sessions and detailed session information.
   - Create, update, and delete personal notes.
   - Access study materials from booked sessions with download links and URLs.

5. **Tutor Features:**

   - Create new study sessions with session details.
   - Upload study materials (images and Google Drive links) for approved sessions.
   - View, update, and delete uploaded materials.

6. **Admin Features:**

   - Manage users, including role updates and search functionality.
   - Approve or reject study sessions with detailed feedback and status updates.
   - View and moderate all study materials.

7. **CRUD Operations with Notifications:**

   - Real-time feedback using SweetAlert or Toast for all operations, including login, sign-up, and CRUD actions.

8. **Secure Data Handling:**

   - Environment variables used to secure Firebase and MongoDB credentials.
   - Token stored in local storage for secure user sessions.

9. **Pagination:**

   - Implemented on at least two pages for optimized data viewing.

10. **Advanced Features:**
    - Axios interceptors for enhanced API request handling.

---

## 💻 Technologies Used

- **Frontend:** React, DaisyUI, TanStack Query
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase, JWT
- **Hosting:** Vercel (Backend), Firebase (Frontend)
- **Image Hosting:** ImgBB

---
