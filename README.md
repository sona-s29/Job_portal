# Job Portal

A full-stack job portal application (using MERN) where users can register, update their profiles (including uploading resumes and skills), and apply for jobs. Companies can post jobs and manage applicants.

---

## Features

- **User Registration & Login**
- **Profile Management**: Update bio, skills, and upload resume (PDF via Cloudinary)
- **Job Listings**: View, apply, and save jobs
- **Company Management**: Register, post jobs, view applicants
- **Admin Features**: Manage jobs and applications
- **Secure Authentication**: JWT-based, with cookie support
- **Responsive Frontend**: Built with React and Redux Toolkit
- **File Uploads**: Resume uploads handled via Cloudinary
- **MongoDB Database**: Mongoose ODM

---

## Tech Stack

- **Frontend**: React.js (with Vite ) , Redux Toolkit 
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **File Uploads**: Multer, Cloudinary
- **Authentication**: JWT, cookie-parser
- **Styling**: Tailwind CSS / Shadcn UI 
- **Other**: dotenv, cors

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/yourusername/job_portal.git
cd job_portal
```

### 2. Install dependencies

```sh
npm install
cd client
npm install
cd ..
```

### 3. Set up environment variables

Create a `.env` file in the root and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 4. Run the development server

```sh
npm run dev
```

The backend will start on the port specified in your `.env` (default: 3000).

### 5. Build and run the frontend

```sh
cd client
npm run build
```
Or for development:
```sh
npm run dev
```

---

## Folder Structure

```
job_portal/
├── client/                 # React frontend
├── server/
│   ├── controllers/        # Express controllers
│   ├── routes/             # Express routes
│   ├── middlewares/        # Auth, multer
│   ├── utils/              # Cloudinary, DataUri, DB connection
│   ├── models/             # Mongoose models
│   ├── index.js            # Express entry point
│   └── ...                 
├── .env
├── package.json
└── README.md
```

---

## Cloudinary PDF Handling

- Resumes are uploaded to Cloudinary.

---

