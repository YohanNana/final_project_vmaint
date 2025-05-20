# final_project_vmaint

---

````markdown
# Vehicle Maintenance System with Prediction and Analytics

A full-featured web application for vehicle owners and administrators to manage vehicle maintenance, receive intelligent predictions for upcoming services, visualize analytics, and control user data through a role-based dashboard.

---

## 📌 Features

### 👤 User (Vehicle Owner)
- Register/Login securely
- Add / Edit / Delete vehicle records
- Track maintenance history with dates, costs, and mileage
- Receive predictions on upcoming maintenance based on input data
- View prediction reports and download them as PDF
- Visual analytics: service frequency, costs, mileage trends
- Notification system for upcoming services and alerts

### 🧠 Machine Learning Integration
- Prediction model using `RandomForest + SMOTE`
- Inputs: mileage, engine temperature, battery voltage, tire pressure, speed
- Output: Maintenance required (YES/NO) + confidence score
- Trigger notifications if maintenance is predicted as required

### 📊 Admin Dashboard (admin@gmail.com only)
- View all registered users
- View all vehicles
- Delete or ban users
- View platform-wide statistics

---

## 🛠️ Technologies Used

| Layer        | Tech Stack                              |
|--------------|------------------------------------------|
| Frontend     | Angular 16, Tailwind CSS, Chart.js       |
| Backend      | Node.js, Express.js                      |
| Database     | MongoDB + Mongoose                       |
| ML Model     | Trained externally (Python + RandomForest) |
| Other        | JWT, LocalStorage, REST API, PDFKit      |

---

## 📂 Project Structure

```bash
final_project_vmaint/
├── backend/                 # Express + MongoDB API
├── frontend/                # Angular frontend app
├── ML/                      # Python scripts for prediction model (optional)
├── README.md
````

---

## ⚙️ Installation & Setup

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

> The backend will run on: **[http://localhost:5000](http://localhost:5000)**

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Start the Angular development server:

```bash
ng serve
```

> The frontend will run on: **[http://localhost:4200](http://localhost:4200)**

---

### 3️⃣ Environment Notes

* ⚠️ Make sure MongoDB is running locally or use MongoDB Atlas
* Backend must run on `localhost:5000` to align with Angular API calls
* Admin login uses:
  **Email:** `admin@gmail.com`
  **Password:** *(Set this during manual seeding or registration)*

---

## 📈 Machine Learning Model (Optional)

* The trained model uses RandomForest + SMOTE
* Model runs in Python and integrates via prediction API or can be simulated
* Sample prediction result stored and consumed by Angular frontend

---

## 📷 Screenshots

| Dashboard                      | Maintenance History          | Prediction                      |
| ------------------------------ | ---------------------------- | ------------------------------- |
| ![](screenshots/dashboard.png) | ![](screenshots/history.png) | ![](screenshots/prediction.png) |

---

## 📚 Future Improvements

* Push/email/SMS notification integration
* Role-based access (e.g., service providers)
* OBD-based real-time data sync via Bluetooth
* Payment logs and invoice generation
* Cloud deployment (Render, Netlify, MongoDB Atlas)

---

## 👨‍💻 Author

**Yohan Nanayakkara**
Final Year Project – NSBM Green University
Dept. of Computer Science
Mentored by \[Your Supervisor's Name Here]

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

---

## ✅ Tips for Uploading

1. Place the `README.md` file in the **root** of your Git repo.
2. Include optional screenshots in a `screenshots/` folder for GitHub rendering.
3. If you're using GitHub Pages or Firebase later, I can help with deployment steps too.

Would you like a `LICENSE` file or `.gitignore` for this too?
```
