# 🧠 KnowledgeHub — Personal Knowledge Base & Interview Tracker

A modern, responsive, zero-database developer portfolio and interview preparation platform built with **React**, **Vite**, **Tailwind CSS v4**, and local **JSON** data storage. Tailored specifically for Java, Spring Boot, Distributed Systems, Kafka, Flink, and Backend Engineering interview prep.

---

## 🚀 Features

- **⚡ Blazing Fast**: Built with Vite and client-side rendering with 0ms database latency.
- **📁 Pure Local JSON Storage**: No backend or database required. Version control all your notes and interview prep in Git.
- **🔍 Intelligent Search**: Powered by **Fuse.js** for fuzzy full-text search across titles, tags, summaries, and Markdown body content.
- **🏷️ Multi-Faceted Filtering**: Filter seamlessly by Category, Difficulty (Easy, Medium, Hard, Expert), Study Status (Completed, In Progress, Needs Revision, Not Started), and specific tags.
- **📖 Rich Markdown & Code Modal**: Deep dive into any topic with syntax-highlighted code snippets, formatted tables, interview tips callouts, and external references.
- **⌨️ Keyboard Navigation**: Use `←` / `→` arrow keys to navigate between cards and `ESC` to close the modal.
- **📊 Real-time Progress Dashboard**: Track your completion percentage across topics and individual categories.
- **📱 Responsive UI**: Tailored for both desktop (collapsible sidebar) and mobile viewports.

---

## 📂 Project Architecture

```text
knowledge-hub/
├── public/
│   └── favicon.svg                 # Custom SVG branding
├── src/
│   ├── assets/                     # Static assets & logos
│   ├── components/
│   │   ├── cards/
│   │   │   ├── CardGrid.jsx        # Responsive 1-3 column grid
│   │   │   └── KnowledgeCard.jsx   # Interactive topic card
│   │   ├── common/
│   │   │   └── EmptyState.jsx      # Empty state with reset suggestions
│   │   ├── dashboard/
│   │   │   └── StatsBar.jsx        # High-level statistics summary
│   │   ├── detail/
│   │   │   └── DetailModal.jsx     # Markdown modal with syntax highlighting
│   │   ├── filters/
│   │   │   └── FilterBar.jsx       # Dropdowns & active tag pills
│   │   └── layout/
│   │       ├── Header.jsx          # Top bar with fuzzy search
│   │       └── Sidebar.jsx         # Category navigation & progress bars
│   ├── data/                       # 🗄️ JSON Data Store
│   │   ├── system-design.json
│   │   ├── java-spring.json
│   │   ├── data-engineering.json
│   │   ├── microservices.json
│   │   ├── dsa.json
│   │   ├── databases.json
│   │   ├── devops-cloud.json
│   │   └── interview-questions.json
│   ├── hooks/
│   │   └── useKnowledgeBase.js     # Unified data aggregation & Fuse.js hook
│   ├── utils/
│   │   └── helpers.js              # Categories, colors, stats, and configurations
│   ├── App.jsx                     # Application root
│   ├── index.css                   # Tailwind v4 setup & custom styling
│   └── main.jsx                    # Vite React entrypoint
├── index.html
├── package.json
└── vite.config.js
```

---

## 📝 Topic JSON Data Schema

To add a new topic or question, open the relevant JSON file in `src/data/` and add an object adhering to this schema:

```json
{
  "id": "java-005",
  "title": "Java Virtual Threads (Project Loom)",
  "category": "Java & Spring Boot",
  "subcategory": "Concurrency",
  "difficulty": "medium",
  "tags": ["java-21", "virtual-threads", "concurrency", "performance"],
  "summary": "Lightweight threads that reduce the effort of writing, maintaining, and throughput of high-throughput concurrent applications.",
  "content": "## Virtual Threads in Java 21\n\nVirtual threads are user-mode threads scheduled by the JVM rather than the OS kernel.\n\n### Code Example\n\n```java\ntry (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n    IntStream.range(0, 10_000).forEach(i -> {\n        executor.submit(() -> {\n            Thread.sleep(Duration.ofSeconds(1));\n            return i;\n        });\n    });\n}\n```",
  "references": [
    {
      "title": "JEP 444: Virtual Threads",
      "url": "https://openjdk.org/jeps/444"
    }
  ],
  "interviewTip": "Highlight that Virtual Threads are ideal for I/O-bound tasks, not CPU-bound computations.",
  "lastUpdated": "2026-10-22",
  "status": "completed"
}
```

### Supported Values:
- **`difficulty`**: `"easy"` | `"medium"` | `"hard"` | `"expert"`
- **`status`**: `"not-started"` | `"in-progress"` | `"completed"` | `"revision"`

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
cd knowledge-hub
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
This generates an optimized static bundle in the `dist/` directory.

---

## 🌐 Deployment to Portfolio (Static & Free)

### Option A: Vercel (Recommended)
1. Push your repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository, set the **Root Directory** to `knowledge-hub`, and click **Deploy**.
4. Any future `git push` will automatically trigger a rebuild and deploy!

### Option B: Netlify
1. Run `npm run build`.
2. Drag and drop the `dist/` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
3. Or link your GitHub repository with Build Command `npm run build` and Publish Directory `knowledge-hub/dist`.

### Option C: GitHub Pages
1. Install `gh-pages`: `npm install -D gh-pages`
2. Add `"base": "/your-repo-name/"` to `vite.config.js`.
3. Add deploy script to `package.json`: `"deploy": "gh-pages -d dist"`
4. Run `npm run build && npm run deploy`.
