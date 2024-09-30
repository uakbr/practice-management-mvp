# Practice Management MVP

A web-based application aimed at streamlining administrative tasks for healthcare practices, specifically dental clinics.

## Project Structure

GitHub repository architecture for the Practice Management MVP:

```bash
practice-management-mvp/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js          # Handles user authentication and authorization logic
│   │   │   ├── userController.js          # Manages user-related operations (profile, insurance info, etc.)
│   │   │   ├── appointmentController.js   # Handles appointment scheduling and management
│   │   │   ├── invoiceController.js       # Manages invoice generation and payment processing
│   │   ├── models/
│   │   │   ├── userModel.js               # Defines the schema for User documents in MongoDB
│   │   │   ├── insuranceModel.js          # Defines the schema for Insurance documents in MongoDB
│   │   │   ├── appointmentModel.js        # Defines the schema for Appointment documents in MongoDB
│   │   │   ├── invoiceModel.js            # Defines the schema for Invoice documents in MongoDB
│   │   ├── services/
│   │   │   ├── ocrService.js              # Integrates with Google Cloud Vision API for OCR
│   │   │   ├── paymentService.js          # Integrates with Stripe API for payment processing
│   │   │   ├── insuranceService.js        # Handles insurance verification via API
│   │   ├── routes/
│   │   │   ├── authRoutes.js              # Routes related to user authentication
│   │   │   ├── userRoutes.js              # Routes related to user operations (profile, insurance)
│   │   │   ├── appointmentRoutes.js       # Routes for appointment-related operations
│   │   │   ├── invoiceRoutes.js           # Routes for invoice and payment-related operations
│   │   ├── config/
│   │   │   ├── dbConfig.js                # Database connection configuration (MongoDB)
│   │   │   ├── cloudConfig.js             # Configuration for Google Cloud Vision API
│   │   │   ├── stripeConfig.js            # Configuration for Stripe API
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js          # JWT authentication middleware
│   │   │   ├── errorMiddleware.js         # Centralized error handling middleware
│   │   ├── app.js                         # Initializes Express server and loads middleware
│   │   ├── server.js                      # Starts the server and listens for requests
│   ├── test/
│   │   ├── unit/
│   │   │   ├── authController.test.js     # Unit tests for auth controller
│   │   │   ├── appointmentController.test.js # Unit tests for appointment controller
│   │   ├── integration/
│   │   │   ├── ocrService.test.js         # Integration tests for OCR service
│   │   │   ├── paymentService.test.js     # Integration tests for payment service
│   ├── package.json                       # Dependencies and scripts for backend
│   ├── README.md                          # Backend-specific documentation
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js                   # Login component for user authentication
│   │   │   ├── Register.js                # Registration component for new users
│   │   │   ├── Dashboard.js               # User dashboard showing appointments and invoices
│   │   │   ├── UploadInsurance.js         # Insurance upload form with OCR functionality
│   │   │   ├── AppointmentList.js         # Displays a list of upcoming and past appointments
│   │   │   ├── InvoiceList.js             # Displays outstanding and paid invoices
│   │   ├── pages/
│   │   │   ├── HomePage.js                # Homepage with navigation to login/register
│   │   │   ├── AdminDashboard.js          # Admin panel overview (appointments, invoices, etc.)
│   │   ├── services/
│   │   │   ├── authService.js             # API calls related to authentication (login, registration)
│   │   │   ├── appointmentService.js      # API calls related to appointments
│   │   │   ├── invoiceService.js          # API calls related to invoice management
│   │   │   ├── insuranceService.js        # API calls related to insurance upload and OCR
│   │   ├── state/
│   │   │   ├── authContext.js             # Context for managing authentication state
│   │   │   ├── appointmentContext.js      # Context for managing appointment data
│   │   │   ├── invoiceContext.js          # Context for managing invoice data
│   ├── public/
│   │   ├── index.html                     # Main HTML file for React app
│   ├── package.json                       # Dependencies and scripts for frontend
│   ├── README.md                          # Frontend-specific documentation
├── docs/
│   ├── API.md                             # API documentation for backend services
│   ├── UI_Mockups/
│   │   ├── patient_portal_mockup.png      # Mockups for the patient portal
│   │   ├── admin_panel_mockup.png         # Mockups for the admin panel
├── README.md                              # Root-level documentation describing the project
├── .gitignore                             # Files and directories to ignore in version control
└── docker-compose.yml                     # Docker configuration for development environment
```

### Breakdown of Files and Directories

- **`backend/`**: Contains all server-side logic, including routes, controllers, models, and services. It manages API endpoints, database interactions, and third-party integrations (OCR, payment, insurance verification).
  
  - **`controllers/`**: Handle requests and responses for different functionalities (e.g., user management, appointments, invoices).
  - **`models/`**: Define MongoDB schemas for entities like users, appointments, and invoices.
  - **`services/`**: Implement third-party integrations (e.g., Google Cloud Vision, Stripe).
  - **`routes/`**: Define HTTP routes and map them to the appropriate controller methods.
  - **`config/`**: Store configuration settings for services like Stripe and Google Cloud Vision.
  - **`middleware/`**: Implement middleware for request validation, authentication, and error handling.
  - **`test/`**: Contains unit and integration tests for both controllers and services.
  
- **`frontend/`**: Contains the client-side React application for both patients and admins. It manages UI components, state, and API calls.
  
  - **`components/`**: Reusable React components like forms, tables, and dashboards.
  - **`pages/`**: Page components for different routes (e.g., homepage, login, admin dashboard).
  - **`services/`**: Handles API communication between frontend and backend.
  - **`state/`**: Context API or Redux store management for frontend state (e.g., authentication, appointments).
  
- **`docs/`**: Documentation for the project, including API specs and UI mockups for reference.

- **`docker-compose.yml`**: Defines Docker services for local development and testing environments.

This architecture lays the foundation for a modular, scalable application, with clear separation of concerns between backend and frontend components. Each major feature is isolated in its own directory, and the architecture is designed for easy extension and testing.

## 2. Functional Requirements

### 2.1 Patient Portal (Consumer-Facing Interface)
- **User Registration and Authentication:**
  - Email/password-based registration and social media login (optional).
  - Role-based access control (patient, admin).
  
- **Profile Management:**
  - Update personal information (name, address, insurance).
  - Upload and manage insurance information.

- **Insurance Card Upload with OCR:**
  - Upload insurance card images (JPG, PNG, PDF).
  - Use OCR to auto-fill insurance forms.

- **Appointment Management:**
  - View, request, or cancel appointments.
  - Check-in and check-out functionality.

- **Invoice and Payment Processing:**
  - View outstanding invoices and transaction history.
  - Integrated secure payment processing (via Stripe).
  - Download invoices and receipts.

### 2.2 Admin Panel (Server-Side Interface)
- **Dashboard:**
  - Overview of appointments, payments, and key statistics.
  
- **Patient Management:**
  - Access and update patient profiles.
  - Verify insurance cards and information.

- **Appointment Scheduling:**
  - Manage patient appointments and reminders (email/SMS).
  
- **Invoice Management:**
  - Generate, edit, and track invoices.
  - Monitor outstanding payments and payment status.

- **Reporting and Analytics:**
  - Generate reports on patient visits, revenue, etc.
  - Data export in CSV or PDF.

### 2.3 Integration Features
- **Existing Practice Software Integration:**
  - APIs for syncing data with existing practice management software.
  
- **Payment Gateway Integration:**
  - Secure payment processing via Stripe API.
  
- **OCR and Insurance Verification:**
  - OCR via Google Cloud Vision API for insurance card data extraction.
  - Integrate insurance verification APIs or enable manual review.

---

## 3. Non-Functional Requirements
- **Security and Compliance:**
  - SSL encryption and HIPAA compliance for patient data security.
  
- **Performance:**
  - Page load times under 2 seconds.
  - OCR processing within 5 seconds.
  
- **Scalability:**
  - Modular architecture to handle growing users and new features.

- **Usability:**
  - Intuitive, mobile-friendly design with WCAG 2.1 accessibility compliance.

---

## 4. System Architecture

- **Client-Server Architecture**: Separation of frontend (React) and backend (Node.js).
- **Three-Tier Structure**: Presentation (UI), Application (business logic), Data Layer (database).
- **API-First Approach**: All features exposed via RESTful APIs, future-proofing for mobile app extensions.
- **Monolithic MVP**: Future transition to microservices as the system scales.

---

## 5. Technology Stack

### 5.1 Frontend
- **Framework**: React.js
- **State Management**: Redux or Context API
- **UI Libraries**: Material-UI for reusable components
- **Routing**: React Router
- **Testing**: Jest, React Testing Library

### 5.2 Backend
- **Runtime Environment**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: Passport.js (JWT strategy)
- **API Documentation**: Swagger
- **Testing**: Mocha, Chai, Sinon

### 5.3 OCR and Payment Processing
- **OCR**: Google Cloud Vision API
- **Payment Gateway**: Stripe API

### 5.4 Deployment
- **Cloud Provider**: AWS (Elastic Beanstalk, S3, DocumentDB)
- **CI/CD**: GitHub Actions
- **Monitoring**: AWS CloudWatch

---

## 6. Database Design

### 6.1 User Model
- `userId`, `firstName`, `lastName`, `email`, `passwordHash`, `roles`

### 6.2 Insurance Model
- `insuranceId`, `userId`, `providerName`, `policyNumber`, `scannedDocuments`, `verificationStatus`

### 6.3 Appointment Model
- `appointmentId`, `userId`, `appointmentDate`, `status`

### 6.4 Invoice Model
- `invoiceId`, `userId`, `amountDue`, `amountPaid`, `dueDate`

---

This document serves as the guiding blueprint for building out the MVP in a structured, scalable, and efficient manner.

## Deployment Instructions

To simplify the deployment process, you can now deploy the entire application with a single command.

### Prerequisites

- **Docker** and **Docker Compose** installed on your machine.
- **Git** installed to clone the repository.

### One-Command Deployment

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/practice-management-mvp.git
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd practice-management-mvp
   ```

3. **Run the Deployment Script:**

   For Unix/Linux/macOS systems:

   ```bash
   ./deploy.sh
   ```

   For Windows systems:

   ```bash
   deploy.bat
   ```

   This script will:

   - Build Docker images for the backend and frontend.
   - Start the MongoDB service.
   - Run all services defined in `docker-compose.yml` in detached mode.

4. **Access the Application:**

   - **Frontend:** Open `http://localhost:3000` in your browser.
   - **Backend API:** Accessible at `http://localhost:5000`.

### Stopping the Application

To stop all running containers, execute:

```bash
docker-compose down
```

### Additional Information

- **Environment Variables:**

  Ensure that all required environment variables are set. You can define them in the `docker-compose.yml` file or create separate `.env` files for the backend and frontend if needed.

- **Persistent Data:**

  The application uses Docker volumes to persist MongoDB data across restarts.

- **Scripts Overview:**

  - **`deploy.sh` / `deploy.bat`:**
    - Automates the deployment process using Docker Compose.
  - **`setup.sh`:**
    - Installs all necessary npm dependencies for both backend and frontend.
  - **`Makefile`:**
    - Provides a `make deploy` command as an alternative to the deployment script.
    - Usage:
      ```bash
      make deploy
      ```

### Prerequisites for Cloud Deployment (Optional)

If you plan to deploy the application to a cloud provider:

- **Docker Hub Account:**

  - Required if you intend to push Docker images to Docker Hub.
  - Update GitHub Actions workflows with your Docker Hub credentials.

- **AWS Account:**

  - Necessary for deploying to AWS services like Elastic Beanstalk and S3.
  - Ensure AWS credentials are configured in GitHub Secrets for CI/CD pipelines.

### Deployment via GitHub Actions (CI/CD)

The project includes GitHub Actions workflows that automate the build and deployment process upon pushing code to the `main` branch.

- **Backend Workflow:** [`.github/workflows/backend.yml`](./.github/workflows/backend.yml)
- **Frontend Workflow:** [`.github/workflows/frontend.yml`](./.github/workflows/frontend.yml)
- **Combined Deployment Workflow:** [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)

To utilize these workflows:

1. **Configure Secrets:**

   - Add necessary secrets to your GitHub repository settings (e.g., `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `DOCKER_HUB_USERNAME`, `DOCKER_HUB_ACCESS_TOKEN`).

2. **Modify Workflows:**

   - Update placeholder values in the workflow files with your specific configurations, such as environment names and bucket names.

### Environment Variables Configuration

Ensure that the following environment variables are properly set in your deployment environment:

- **Backend:**

  - `MONGO_URI`
  - `JWT_SECRET`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `GOOGLE_APPLICATION_CREDENTIALS`

- **Frontend:**

  - `REACT_APP_BACKEND_URL`

### Directory Structure

For a detailed explanation of the project structure, refer to the [Project Structure](#project-structure) section above.

## Documentation

Further documentation is available in the `docs/` directory:

- **API Documentation:** [`docs/API.md`](./docs/API.md)
- **User Manuals and Developer Guides:** [`docs/`](./docs/)
- **UI Mockups:** [`docs/UI_Mockups/`](./docs/UI_Mockups/)

## Contributing

Contributions are welcome! Please see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for guidelines.

## License

This project is licensed under the [MIT License](./LICENSE).