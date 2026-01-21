# Chronicle - Modern Cron Job Management

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

Chronicle is a visual interface designed to simplify the creation, management, and for the visualisation of cron jobs for DevOps teams and System Administrators.

**Live Application**: [Chronicle](https://chronicle-lake.vercel.app)  
**Docker Hub**: [yashashavgoyal/chronicle](https://hub.docker.com/repository/docker/yashashavgoyal/chronicle/)

---

## 🏗️ System Architecture

Our production environment runs on **AWS EC2** instances, orchestrated via **Docker Compose**. We utilize a containerized architecture where each EC2 instance hosts a **reverse proxy (Nginx)** and multiple application containers (`chronicle`).

### Logic
1.  **AWS ALB (Application Load Balancer)**: Distributes incoming traffic across multiple EC2 instances.
2.  **AWS EC2 Instances**: Each instance runs the application stack.
3.  **Docker Compose Network**: Inside each EC2, we run:
    -   **Nginx**: Listens on Host Port 80. Acts as a load balancer and reverse proxy for the internal app containers.
    -   **App Containers (x2)**: Two replicas of the Next.js application (`chronicle-e1`, `chronicle-e2`) running on internal port 3000.
4.  **Internal Routing**: Nginx routes traffic to the apps using Docker's internal DNS resolution (`http://chronicle-e1:3000` & `http://chronicle-e2:3000`).

```mermaid
flowchart TD
    subgraph "AWS Cloud"
        ALB[AWS Application Load Balancer]
        
        subgraph "EC2 Instance (n instances)"
            direction TB
            HostPort80[Host Port 80]
            
            subgraph "Docker Network"
                Nginx[Nginx Container]
                App1["App Container 1 (chronicle-e1)"]
                App2["App Container 2 (chronicle-e2)"]
            end
        end
    end

    Internet(("User / Internet")) --> ALB
    ALB -- "Traffic Distribution" --> HostPort80
    HostPort80 --> Nginx
    Nginx -- "Round Robin / Failover" --> App1
    Nginx -- "Round Robin / Failover" --> App2
```

### Resource Map
Below is the visualization of our AWS ALB Listener directing traffic to the Target Group containing our EC2 instances.

![AWS ALB Resource Map](screenshots/AWS-ALB-Resource-Map.png)

---

## 🔄 CI/CD Pipeline

We use **GitHub Actions** for a complete Continuous Integration and Continuous Deployment pipeline.

### Pipeline Workflow (`test-build-deploy.yaml`)

1.  **Test**: Runs `npm run lint` to ensure code quality.
2.  **Build & Push**:
    -   Builds a multi-stage Docker image.
    -   Injects **Build Args** (e.g., `NEXT_PUBLIC_SITE_URL`) during the build process to bake environment-specific configurations into the static assets.
    -   Pushes the image to Docker Hub with tags: `latest`, `short-sha`, and `semver` (if tagged).
3.  **Deploy**:
    -   **Dynamic Discovery**: Uses AWS CLI to find all running EC2 instances with the tag `app: chronicle`.
    -   **SSH & Update**: SSHs into each identified instance, pulls the new configuration/scripts, and executes the deployment script.

![GitHub Action Workflow](screenshots/Github-Action-Worflows.png)

### Build Arguments
We utilize Docker `ARG` to pass build-time variables like `NEXT_PUBLIC_SITE_URL`. This allows our Next.js application to be aware of its environment (Production vs Staging) at build time, optimizing the static generation process.

---

## ✅ Runtime Verification

### Deployment Success
Verification that the GitHub Action pipeline successfully executed and deployed the application.

### Container Status (EC2)
A view from the terminal (tmux) of our EC2 instances showing `docker ps`. You can see the **Nginx** container and the **two App containers** up and running.

![EC2 Docker Process Status](screenshots/Tmux-EC2-Shows-Docker-ps.png)

### Live Access
The application is accessible via the AWS ALB DNS, confirming the entire networking stack (ALB -> Target Group -> EC2 -> Nginx -> App) is healthy.

![Chronicle Live on ALB](screenshots/Chronicle-Home-From-ALB-DNS.png)

---

## 🚀 Deployment Strategy

We employ a **Pull-Based Deployment with Central orchestration**:

1.  **Push to Code**: Developer pushes to `main`.
2.  **CI Trigger**: GitHub Actions starts the pipeline.
3.  **Artifact Creation**: Docker image is built and pushed to the registry.
4.  **Orchestrator**: The GitHub Action runner acts as the orchestrator.
    -   It queries AWS API: *"Give me the IPs of all servers tagged `app: chronicle`"*
    -   It iterates through the list and triggers the update on each server.
5.  **Node Update**: On the EC2 node, a script copies the latest `docker-compose.yaml` and restarts the containers using the new image tag.

This allows us to scale simply by launching more EC2 instances with the correct tag, without changing our deployment pipeline configuration.

---

## 🛠️ Tech Stack & Links

*   **Framework**: [Next.js 15](https://nextjs.org/)
*   **Container**: [Docker](https://www.docker.com/)
*   **Orchestration**: Docker Compose
*   **Reverse Proxy**: Nginx
*   **Cloud**: AWS (EC2, ALB)
*   **CI/CD**: GitHub Actions

### Important Links
*   [GitHub Repository](https://github.com/YashashavGoyal/crontab.ui)
*   [Docker Hub Repository](https://hub.docker.com/repository/docker/yashashavgoyal/chronicle/)

---

## 👤 Author

**Yashashav Goyal**

<a href="https://github.com/YashashavGoyal">
  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
</a>
<a href="https://linkedin.com/in/yashashavgoyal">
  <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
</a>
<a href="https://twitter.com/YashashavGoyal">
  <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
</a>

## 📄 License

This project is licensed under the **MIT License**.
