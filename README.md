<div align="center">

<img src="https://img.shields.io/badge/Complynt-v1.0.0-4A90D9?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPjwvc3ZnPg==" alt="Complynt" />

# 🛡️ Complynt

### Unified Customer Complaint Communication Dashboard

**Gen-AI powered complaint management that aggregates, categorises, and resolves customer issues at scale**

[![Java](https://img.shields.io/badge/Java-17+-ED8B00?style=flat-square&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=flat-square&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?style=flat-square&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![HTML5](https://img.shields.io/badge/HTML5-CSS3-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Railway](https://img.shields.io/badge/Hosted_on-Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)](https://ubi.dpdns.org)
[![Cloudflare](https://img.shields.io/badge/Network-Cloudflared-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://ubi.dpdns.org)

---

[**🌐 Live Site**](https://ubi.dpdns.org) · [**📽️ Demo**](#-demo) · [**✨ Features**](#-features) · [**🏗️ Architecture**](#️-architecture) · [**⚙️ Quick Start**](#️-quick-start) · [**🤝 Contributing**](#-contributing)

</div>

---

## 🌐 Live Deployment

> **The app is live!** Complynt is hosted on **Railway** with the backend network secured and tunneled via **Cloudflared**:
>
> ### 👉 [https://ubi.dpdns.org](https://ubi.dpdns.org)
>
> No setup required — visit the link to explore the Admin Dashboard and Customer Portal directly.

---

## 📽️ Demo

[![Demo Video](https://img.youtube.com/vi/8ubigranyyE/maxresdefault.jpg)](https://www.youtube.com/watch?v=8ubigranyyE)

> 🎬 **[Watch the full demo on YouTube →](https://www.youtube.com/watch?v=8ubigranyyE)**

---

## 🌟 Overview

**Complynt** is a full-stack, Gen-AI powered Customer Complaint Communication Dashboard built to solve a core enterprise challenge: complaint chaos across multiple channels. It aggregates complaints from all sources into a **single, unified platform** and uses NLP and Generative AI to automatically handle classification, prioritisation, routing, deduplication, and resolution — leaving agents free to focus on what actually matters.

Inspired by **SAP Fiori design principles**, Complynt delivers a polished, enterprise-grade UX out of the box.

```
Customer submits complaint  →  AI classifies & routes  →  Agent resolves  →  Compliance report generated
      (any channel)              (auto, instant)           (guided by AI)       (one click)
```

---

## 📬 Contact & Support Channels

Customers can raise complaints through the following channels:

| Channel | Details |
|---|---|
| 🌐 **Web Portal** | [https://ubi.dpdns.org/new-complaint.html](https://ubi.dpdns.org/new-complaint) |
| 💬 **WhatsApp** | Send a message to **+1 (415) 523-8886** *(See instructions below)* |
| 📧 **Email** | [ubi.customer.help@gmail.com](mailto:ubi.customer.help@gmail.com) |

### WhatsApp Setup Instructions

To submit a complaint via WhatsApp:

1. **First**, send the joining code to activate the sandbox:
   ```
   join congress-buffalo
   ```
   Send this message to **+1 (415) 523-8886** on WhatsApp.

2. Once joined, you can send your complaint message directly to the same number.

> ⚠️ **Note:** The joining code step is required only once per device to connect to the WhatsApp sandbox. After that, you can message directly.

---

## ✨ Features

### 🤖 Gen-AI & NLP Engine
- **Auto-classification** by complaint type, product, severity, and sentiment
- **Key issue extraction** from free-form customer text
- **Duplicate & related complaint detection** across channels
- **AI-drafted response templates** for agent review before sending
- **Root cause identification** across historical complaint data
- **Trend analysis** to surface emerging issues before they escalate

### 🎛️ Admin Dashboard
| Module | Description |
|---|---|
| **Dashboard** (`index.html`) | Real-time KPIs: total complaints, SLA breaches, severity distribution, daily trends |
| **Complaints** (`complaints.html`) | Filterable master list across products, severities, and statuses |
| **Complaint Detail** (`complaint-detail.html`) | SAP Object Page-style deep dive — tabs for Details, Actions, Communications, SLA, Customer 360 |
| **Agent Management** (`agents.html`) | Team structure, workload visibility, and auto-routing logic |
| **Customer 360°** (`customers.html`) | Unified customer profiles linking all complaints to a single identity |
| **SLA Monitor** (`sla.html`) | Overdue ticket tracking with configurable SLA rules per severity |
| **Reports & Compliance** (`reports.html`) | One-click CSV export for regulatory reporting (e.g., RBI Ombudsman) |

### 🌐 Customer Portal
- Clean, distraction-free complaint submission form (`new-complaint.html`)
- Auto ticket number generation
- Severity and channel auto-assigned on ingestion
- No login required — designed for zero friction

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│   Admin Dashboard (HTML/CSS/JS)  |  Customer Portal         │
│   SAP Fiori-inspired Design System (style.css)              │
│   Async REST Client (api.js) | UI Helpers (common.js)       │
└───────────────────────────┬─────────────────────────────────┘
                            │ REST /api/*
┌───────────────────────────▼─────────────────────────────────┐
│                    SPRING BOOT BACKEND                       │
│                                                             │
│  ┌─────────────────┐    ┌──────────────────┐               │
│  │ ComplaintService│    │  IngestionService │               │
│  │ (core CRUD &    │    │  (dedup + C360    │               │
│  │  orchestration) │    │   identity merge) │               │
│  └────────┬────────┘    └────────┬─────────┘               │
│           │                      │                          │
│  ┌────────▼────────┐    ┌────────▼─────────┐               │
│  │  RoutingService │    │    SlaService     │               │
│  │ (auto-assign to │    │  (dynamic SLA     │               │
│  │  least-loaded   │    │   deadlines &     │               │
│  │   agent)        │    │   breach flags)   │               │
│  └─────────────────┘    └──────────────────┘               │
│                                                             │
│  ┌─────────────────┐    ┌──────────────────┐               │
│  │ AuditLogService │    │  AiGatewayService │ ─── AI stub  │
│  │ (immutable      │    │  (NLP, sentiment, │    awaiting  │
│  │  ledger for     │    │   entity extract, │    Python    │
│  │  compliance)    │    │   auto-response)  │    service   │
│  └─────────────────┘    └──────────────────┘               │
└───────────────────────────┬─────────────────────────────────┘
                            │ JPA
┌───────────────────────────▼─────────────────────────────────┐
│                        MySQL 8.0+                           │
│         Complaints | Agents | Customers | SLA Rules         │
│         Audit Logs | Actions | Communication History        │
└───────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                  RAILWAY (App Hosting)                      │
│              Spring Boot JAR — built from GitHub            │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│           CLOUDFLARED (Backend Network / Tunnel)            │
│         Secure tunnel → Cloudflare DNS → ubi.dpdns.org      │
└─────────────────────────────────────────────────────────────┘
```

### Backend Services (Spring Boot — Controller → Service → Repository → Entity)

| Service | Responsibility |
|---|---|
| `ComplaintService` | Core orchestrator for creation, filtering, and status updates |
| `IngestionService` | Handles deduplication and Customer 360 identity resolution (email/phone/account) |
| `RoutingService` | Auto-assigns complaints to the least-loaded agent in the correct product team |
| `SlaService` | Dynamically calculates deadlines from `SlaRule` config; flags breaches |
| `AuditLogService` | Immutable change ledger for every status change, assignment, and action |
| `AiGatewayService` | Gateway to the AI/NLP pipeline — classification, sentiment, draft responses *(stub, pending Python microservice)* |

---

## ☁️ Deployment

Complynt uses a **dual-layer deployment setup**:

```
User Browser
    │
    ▼
Cloudflare DNS (ubi.dpdns.org)
    │
    ▼
Railway (Frontend / Spring Boot App)
    │
    ▼
Cloudflared Tunnel (Backend / Network Layer)
    │
    ▼
MySQL Database
```

| Layer | Platform | Role |
|---|---|---|
| **App Hosting** | [Railway](https://railway.app) | Builds and runs the Spring Boot application from GitHub |
| **Network / Backend** | [Cloudflared](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) | Secure tunnel exposing the backend — no open ports needed |
| **DNS** | Cloudflare | Routes `ubi.dpdns.org` to the live deployment |

### Environment Variables on Railway

Configure these in your Railway project's **Variables** tab instead of `application.properties`:

| Variable | Value |
|---|---|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://<host>:<port>/complynt_db` |
| `SPRING_DATASOURCE_USERNAME` | *(from your DB provider)* |
| `SPRING_DATASOURCE_PASSWORD` | *(from your DB provider)* |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | `update` |
| `SERVER_PORT` | `8080` |

> 💡 Cloudflared sits in front of the backend network layer, giving you DDoS protection, HTTPS, and a stable public endpoint — without exposing any ports directly.

---

## ⚙️ Quick Start

### Prerequisites

| Requirement | Version |
|---|---|
| Java (JDK) | 17 or higher |
| MySQL Server | 8.0+ (running on `localhost:3306`) |
| Maven | Bundled via `mvnw` wrapper — no install needed |

### 1. Clone the Repository

```bash
git clone https://github.com/Swaraj1657/Complynt.git
cd Complynt
```

### 2. Configure the Database

Create a MySQL database, then update `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/complynt_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD_HERE
spring.jpa.hibernate.ddl-auto=update
```

> ⚠️ **Important:** Do not commit real credentials. Add `application.properties` to `.gitignore` or use environment variables for production.

### 3. Run the Application

**On Windows:**
```cmd
.\mvnw.cmd spring-boot:run
```

**On macOS / Linux:**
```bash
./mvnw spring-boot:run
```

### 4. Open in Browser

| Portal | URL |
|---|---|
| 🖥️ **Admin Dashboard** | http://localhost:8080/ |
| 🌐 **Customer Complaint Portal** | http://localhost:8080/new-complaint.html |
| ☁️ **Live (Cloudflare)** | https://ubi.dpdns.org |

---

## 📁 Project Structure

```
Complynt/
├── src/
│   └── main/
│       ├── java/
│       │   └── .../
│       │       ├── controller/        # REST API controllers
│       │       ├── service/           # Business logic (see Architecture)
│       │       ├── repository/        # JPA repositories
│       │       └── entity/            # JPA entities (Complaint, Agent, Customer, etc.)
│       └── resources/
│           ├── static/
│           │   ├── index.html         # Admin Dashboard
│           │   ├── complaints.html    # Complaint list
│           │   ├── complaint-detail.html  # Complaint deep-dive
│           │   ├── agents.html        # Agent management
│           │   ├── customers.html     # Customer 360 view
│           │   ├── sla.html           # SLA monitor
│           │   ├── reports.html       # Compliance reporting
│           │   ├── new-complaint.html # Customer portal
│           │   ├── style.css          # SAP Fiori-inspired design system
│           │   └── js/
│           │       ├── api.js         # Async REST client
│           │       └── common.js      # UI helpers & layout init
│           └── application.properties # App configuration
├── pom.xml
└── mvnw / mvnw.cmd                    # Maven wrapper
```

---

## 🗺️ Roadmap

- [x] Core complaint CRUD and status management
- [x] Auto-routing to least-loaded agent
- [x] Dynamic SLA calculation and breach detection
- [x] Customer 360 identity resolution (email/phone/account)
- [x] Immutable audit log for compliance
- [x] CSV export for regulatory reporting
- [x] AI Gateway service stub (classification, sentiment, draft responses)
- [x] Live deployment on Railway (app) + Cloudflared (backend network) at [ubi.dpdns.org](https://ubi.dpdns.org)
- [x] WhatsApp complaint channel (+1 415-523-8886)
- [x] Email complaint channel (ubi.customer.help@gmail.com)
- [ ] Python AI microservice integration (NLP pipeline)
- [ ] Real-time notifications (WebSocket)
- [ ] Multi-channel ingestion (Email, WhatsApp, Twitter/X)
- [ ] Trend analysis and root cause dashboard
- [ ] Role-based access control (RBAC)
- [ ] Docker / Docker Compose setup

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open a Pull Request** — describe what you've done and why

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages.

---

## 👤 Author

**Swaraj** · [@Swaraj1657](https://github.com/Swaraj1657)

---

<div align="center">

Made with ❤️ for better customer experiences

⭐ **Star this repo if you find it useful!**

</div>
