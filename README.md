# 📘 Code Review Analyzer Tool

## 🔍 About the Project

**Code Review Analyzer** is an AI-powered tool that automates the process of analyzing pull requests and code review comments from GitHub.  
It fetches merged PRs and their review comments directly from a GitHub repository, and uses OpenAI to extract meaningful insights:  
recurring issues, context, and clear recommendations — all grouped and tagged for easy analysis.


---

## 🚀 1. Clone the Project

```bash
git clone https://github.com/OfekSagiv/code-review-analyzer.git
cd code-review-analyzer
```

---

## 🛠 2. Install Dependencies

```bash
npm install
```

---

## ⚙️ 3. Create Environment File

Create a `.env` file in the root directory and add the following variables:

```env
OPENAI_API_KEY=your_openai_key_here
GITHUB_TOKEN=your_github_token_here
GITHUB_REPO=username/repo-name
DATABASE_URL="postgresql://name:password@localhost:5433/code_reviewer"
```

> Ensure `DATABASE_URL` matches the Docker setup below: user `name`, password `password`, and port `5433`

---

## 🔑 4. Generate API Tokens

### 🔐 OpenAI API Key:
1. Go to https://platform.openai.com/account/api-keys
2. Click "Create new secret key"
3. Copy and paste it into your `.env` as `OPENAI_API_KEY`

### 🐙 GitHub Token:
1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes:
    - `repo` (for accessing PRs and comments)
4. Copy and paste it into `.env` as `GITHUB_TOKEN`

---

## 🐳 5. Run PostgreSQL with Docker

To run the local database safely, use `docker-compose.yml`:

> ✅ This configuration ensures PostgreSQL is accessible **only from your machine (localhost)** and **not exposed to the network or internet**.

Start the container:

```bash
docker compose up -d
```

---
## 🧱 Prisma Setup

To connect Prisma to the local PostgreSQL database and create the necessary tables, follow these steps:

```bash
1. Generate Prisma client
npx prisma generate

2. Push the schema to the database
npx prisma db push
```

> This will sync the schema defined in `prisma/schema.prisma` with the local database.
---
## 🧠 6. Run All Scripts Automatically

This command pulls data from GitHub, tags comments using GPT, and generates an insights report:

```bash
node scripts/runAll.js
```


---

## 📂 7. Output Files

After running the scripts, you'll get:

- `insights_report.txt` – a grouped and readable summary of all tagged insights from review comments.

---

## ✅ Done!

Your insights report is ready – fully sorted, grouped by tags, and clearly documented, making it easy to review patterns and improve code quality. You can use this file as input for chat-based advisors, integrate it into documentation, or build tools that learn from recurring code review insights.
