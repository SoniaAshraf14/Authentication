# Full Authentication System with Dashboard (React + Express + MongoDB)

This is a **full-stack authentication system** developed using **React**, **Express.js**, **MongoDB**, and **Node.js**. It includes user signup, login, password reset via OTP, image uploads (cover photo and profile image), and a responsive dashboard with update functionality.

---

### Features

* User Signup with:

  * Email, Password, Gender, Date of Birth, Phone Number
  * Validations (DOB, Pakistani phone number, password strength)
  * Auto-generated unique username (editable only after 24 hours)
  * Upload cover photo and profile image using Multer

* Login with JWT authentication

* Forgot Password (OTP via email)

* Reset Password with OTP validation

* Responsive Dashboard:

  * View and update username (1 update allowed every 24 hours)
  * View and update cover photo and profile picture
  * View personal info (email, DOB, gender)

* Protected routes with token validation

---

## Tech Stack

| Frontend | Backend | Database | Others                                 |
| -------- | ------- | -------- | -------------------------------------- |
| React    | Express | MongoDB  | Axios, bcrypt, JWT, Multer, Nodemailer |

---

### Folder Structure

### Frontend (React - Vite)

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
├── package.json
├── tailwind.config.js
```

Backend (Express + MongoDB)

```
backend/
├── controller/
│   └── userController.js
├── middleware/
│   ├── upload.js
│   ├── validateSignup.js
├── models/
│   └── User.js
├── routes/
│   └── userRoute.js
|   └── authRoute.js
├── uploads/
│   └── profileImage & coverPhoto saved here
├── config/
│   └── db.js
├── app.js
├── .env
```

---

### API Routes

### Public Routes

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| POST   | `/api/users/signup`        | User signup with image & data |
| POST   | `/api/auth/login`          | User login                    |
| POST   | `/api/auth/forgotpassword` | Send OTP to email             |
| POST   | `/api/auth/resetpassword`  | Reset password using OTP      |

### Protected Routes (JWT Token Required)

| Method | Endpoint                             | Description                |
| ------ | ------------------------------------ | -------------------------- |
| GET    | `/api/users/:userId`                 | Get user by ID             |
| PATCH  | `/api/users/update-username/:userId` | Update username            |
| PATCH  | `/api/users/update-photo/:userId`    | Upload profile/cover photo |

---

## Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/your-username/your-repo-name
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**.env File**

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

##  Validations

* **Password:** Must include uppercase, lowercase, special character, number, min 8 chars
* **Phone Number:** Must be a valid Pakistani number starting with 03 (11 digits)
* **DOB:** Must be 15 years or older
* **Username:** Editable only after 24 hours
* **Email:** Cannot be changed once registered

---

## 📸 Image Uploads

* Handled using `multer` on backend
* Images are stored in the `/uploads` folder
* File names are saved in MongoDB with the user document

---

## 📌 Future Improvements

* Pagination & search for users
* Logout button on dashboard
* Profile deletion option
* Dark mode theme
* Role-based access (Admin, User)

---

Contribution Breakdown

| Contributor                | Work Done                                                  |
| -------------------------- | ---------------------------------------------------------- |
| **Sonia**                  | Designed UI, built React components, integrated APIs       |
| ChatGPT (AI Assistant)** | Helped in backend logic, error fixes, and code suggestions |

**AI Contribution Estimate:** \~95% of the backend structure and error-handling logic, \~20% guidance on frontend integration.
**Sonia's Contribution Estimate:** \~5% hands-on development, styling, API integration, form building, and logic testing.

---

Author

**Sonia**
Feel free to connect and share feedback!

---

License

This project is licensed for learning purposes and personal development use only.
