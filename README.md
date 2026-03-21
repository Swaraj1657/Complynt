# Unified Customer Complaint Dashboard

A comprehensive, SAP Fiori-inspired dashboard for managing customer complaints, auto-assigning tasks, tracking SLA breaches, and building a Customer 360° view.

## 🚀 Features

### **Admin Dashboard (Backend Core & Operations)**
- **Dashboard (`index.html`)**: Real-time overview of complaint operations. Total complaints, SLA breaches, status distribution, daily trends, and severity visualizations.
- **Complaints (`complaints.html`)**: Filterable data table of all complaints across products, severities, and statuses.
- **Complaint Detail (`complaint-detail.html`)**: Deep dive into individual complaints. SAP Object Page style with tabs for Details, Actions, Communication history, SLA tracking, and Customer 360 profile. Ability to change status, assign agents, and add internal/external comments.
- **Agent Management (`agents.html`)**: View team structure and agent workloads to understand auto-routing.
- **Customer 360° (`customers.html`)**: View unified customer profiles that link multiple complaints to a single identity, preventing duplicate work.
- **SLA Monitor (`sla.html`)**: Track overdue tickets and view configurable SLA timeframes based on severity.
- **Reports & Compliance (`reports.html`)**: Export operational data to CSV for regulatory compliance (e.g., RBI Ombudsman reporting).

### **User Portal (Customer Facing)**
- **Submit Complaint (`new-complaint.html`)**: A clean, distraction-free external form for customers. Automatically handles ticket number generation.
  - *Note: Customer input goes straight into the ingestion service, where the backend automatically assigns priority (severity) and origin channel.*

## 🏗️ Architecture & Services

The application follows a standard layered Spring Boot architecture (Controller -> Service -> Repository -> Entity) with a vanilla JavaScript + HTML/CSS static frontend.

### **Key Backend Services (`src/main/java/.../service`)**
1. **`ComplaintService`**: The core orchestrator. Handles creation, filtering, status updates.
2. **`IngestionService`**: Manages incoming complaints from the User Portal. Features deduplication logic (checking if a customer submitted the same issue recently) and Customer 360 identity resolution (linking by email/phone/account number).
3. **`RoutingService`**: Auto-assigns newly created complaints to the least-loaded agent within the correct product team.
4. **`SlaService`**: Calculates deadlines dynamically based on `SlaRule` configurations (e.g., P1 issues have tighter deadlines than P4). Flags breached SLAs.
5. **`AuditLogService`**: Maintains an immutable ledger of every status change, assignment, or action taken on a complaint for compliance reporting.
6. **`AiGatewayService`**: Interface for the AI Classification pipeline (Sentiment Analysis, Entity Extraction, Auto-Resolution suggestions). *Currently acts as a stub pointing to `app.ai-service-url` awaiting the Python microservice integration.*

### **Frontend Implementation (`src/main/resources/static`)**
- **`style.css`**: The core design system. Custom CSS written from scratch to mimic SAP Fiori aesthetics (Shell bars, Object Headers, KPI Tiles).
- **`js/api.js`**: A clean asynchronous wrapper class for all backend REST endpoints (`/api/...`).
- **`js/common.js`**: UI helpers, data formatters, and the `initLayout` function which dynamically injects the admin sidebars and headers into the administrative pages.

## ⚙️ How to Run

### **Prerequisites**
- Java 17+
- MySQL Server (running on localhost:3306)

### **Setup & Start**
1. Create a MySQL database (or let Spring Boot auto-create it via properties).
   _Note: Ensure credentials in `application.properties` match your local MySQL setup (Default: `root` / `Swaraj1675@`)._
2. Run the application using the Maven Wrapper:
   ```bash
   .\mvnw.cmd spring-boot:run
   ```
3. The application will start on port `8080`.

### **Navigation URLs**
- **Admin Dashboard**: [http://localhost:8080/](http://localhost:8080/)
- **Customer Complaint Portal**: [http://localhost:8080/new-complaint.html](http://localhost:8080/new-complaint.html)
