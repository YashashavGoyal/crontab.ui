# Chronicle - Modern Cron Job Management

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

![License](https://img.shields.io/github/license/YashashavGoyal/crontab.ui?style=for-the-badge)
![GitHub stars](https://img.shields.io/github/stars/YashashavGoyal/crontab.ui?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/YashashavGoyal/crontab.ui?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/YashashavGoyal/crontab.ui?style=for-the-badge)

Chronicle is a visual interface designed to simplify the creation, management, and deployment of cron jobs for DevOps teams and System Administrators.

## 🔴 The Problem

Managing cron jobs via the command line (`crontab -e`) is often error-prone and opaque. The cryptographic `* * * * *` syntax lacks readability, and there is no built-in validation or "single pane of glass" to monitor scheduled tasks across different environments. Chronicle solves this by treating Cron Jobs as visual objects with instant validation and easy management.

## 🛠️ Tech Stack

*   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Utilities**: `cron-parser` for validation, `date-fns` for formatting.

## 📂 Modular Code Structure

```bash
├── app/
│   ├── (src)/               # Application Routes
│   ├── components/
│   │   ├── dashboard/       # Feature-specific components (Row, List)
│   │   └── ui/              # Reusable Design System components
│   ├── lib/
│   │   ├── cronImportExport.ts # Import/Export logic
│   │   └── saveCron.ts      # Persistence logic (LocalStorage)
│   └── hooks/               # Logic: React Custom Hooks (useCronJobs)
```

## 🌊 Application Flow

```mermaid
graph TD
    %% Nodes
    User([👤 User / DevOps Engineer])
    
    subgraph "Chronicle UI"
        direction TB
        Dashboard[Dashboard Interface]
        Editor[Job Editor & Validator]
        Importer[File Importer]
        Exporter[Crontab/JSON Generator]
    end
    
    subgraph "Client Side"
        Store[("💾 Local Storage")]
    end
    
    %% Edges
    User ==>|Manage Jobs| Dashboard
    Dashboard -->|Create/Update| Editor
    Editor -- "Validate" --> Editor
    Editor -->|Save| Store
    Store -.->|Hydrate| Dashboard
    
    User -->|Import| Importer
    Importer -->|Populate| Dashboard
    
    Dashboard -->|Export| Exporter
    Exporter -->|Download| User

    %% Styling
    classDef plain fill:#1a1a1a,stroke:#fff,color:#fff;
    classDef highlight fill:#22226e,stroke:#f2f0f0,stroke-width:2px,color:#fff;
    classDef secondary fill:#2d2d2d,stroke:#666,color:#eee;

    class User plain;
    class Dashboard,Editor,Importer,Exporter secondary;
    class Store highlight;
```

## 🚀 Features

*   **Visual Dashboard**: See all your jobs, their schedules, and commands in a clean table view.
*   **Instant Validation**: Ensure your cron schedules are valid before saving.
*   **Persistence**: Jobs are saved locally, so you don't lose your work on refresh.
*   **Import/Export**: Easily migrate existing crontabs or backup your configuration.

## 🔮 Product Scope

*   **Firebase Integration**: Moving state to the cloud (Firestore) for persistent access across devices.
*   **User Authentication**: Secure Login/Signup for team collaboration.
*   **Role-Based Access**: Granular permissions for viewing vs. editing production jobs.
*   **Server Sync**: Direct SSH integration to pull/push cron jobs to live servers.

## ♾️ DevOps Integration Roadmap

To professionalize the deployment pipeline, the following DevOps practices can be integrated:

1.  **CI/CD Pipeline (GitHub Actions)**:
    -   Automate linting (`npm run lint`) and type checking on every Pull Request.
    -   Automatically deploy to Vercel Preview environments.

2.  **Containerization (Docker)**:
    -   Create a `Dockerfile` for self-hosted deployments.
    -   Use multi-stage builds to keep the image size small.

3.  **Testing Strategy**:
    -   **Unit Tests**: Use **Jest** or **Vitest** to test the `lib` logic (validators).
    -   **E2E Tests**: Use **Playwright** to verify the user flow.

4.  **Monitoring**:
    -   Use **Vercel Analytics** for performance metrics.

## � Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/YashashavGoyal/crontab.ui.git
    cd crontab.ui
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the development server**:
    ```bash
    npm run dev
    ```

4.  **Open locally**:
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

**Author**: Yashashav Goyal

<a href="https://github.com/YashashavGoyal">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</a>
<a href="https://linkedin.com/in/yashashavgoyal">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://twitter.com/YashashavGoyal">
  <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
</a>

**License**: MIT
