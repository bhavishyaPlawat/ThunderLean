# Contributing to ProjectName

Thank you for your interest in contributing! We’re excited to have you on board.  
With our backend shifting from a custom API to **Supabase**, this guide will help you contribute effectively.

---

## 📜 Table of Contents
1. [Code of Conduct](#-code-of-conduct)
2. [How to Contribute](#-how-to-contribute)
3. [Setting Up the Project](#setting-up-the-project)
4. [Branching Strategy](#-branching-strategy)
5. [Coding Guidelines](#-coding-guidelines)
6. [Commit Message Guidelines](#-commit-message-guidelines)
7. [Testing](#-testing)
8. [Pull Request Process](#-pull-request-process)
9. [Backend Migration Notes (Supabase)](#-backend-migration-notes-supabase)
10. [Community & Support](#-community--support)

---

## 💬 Code of Conduct
Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) to maintain a respectful and welcoming environment for all contributors.

---

## 🚀 How to Contribute
1. **Fork the repository** and create your branch from `main`.
2. **Work on an issue** — either pick an existing one or create a new one with details.
3. **Commit changes** following our commit message guidelines.
4. **Push your branch** and submit a Pull Request (PR).

---

## Setting Up the Project

### 1. Clone the repository
```bash
git clone https://github.com/YourOrg/ProjectName.git
cd ProjectName
``` 
### 2. Install dependencies
Frontend:

```bash

cd frontend
npm install
Backend (Supabase setup):
```
```bash

cd backend
# Ensure you have Supabase CLI installed
supabase start
```
3. Configure environment variables
Create a .env file in both frontend and backend folders using .env.example as reference.

## 🌿 Branching Strategy
We follow Git Flow:

main → Stable production-ready branch.

develop → Active development branch.

Feature branches → feature/feature-name

Bugfix branches → fix/bug-description

Release branches → release/version-number

## 🖋 Coding Guidelines
Use ESLint and Prettier for formatting.

Follow component-driven development for frontend.

Use async/await instead of .then() for promises.

Write meaningful function and variable names.

## 📝 Commit Message Guidelines
Follow the format:

php-template
```
<type>(scope): <short summary>
```
Types:

feat — New feature

fix — Bug fix

docs — Documentation changes

style — Code style changes

refactor — Code restructuring without functional change

test — Adding/Updating tests

chore — Maintenance tasks

Example:
```
pgsql
feat(auth): add login with Supabase
```
## 🧪 Testing
All new features must include unit and/or integration tests.

Run tests before pushing:
```
bash
npm run test
```
## 🔄 Pull Request Process
Ensure your branch is up-to-date with develop.

Write clear PR titles and descriptions.

Request reviews from relevant team members.

All checks must pass before merging.

Squash commits if possible to keep history clean.

## 🗄 Backend Migration Notes (Supabase)
We are migrating from a custom API to Supabase.

New contributions should:

Use Supabase client SDK for database interactions.

Avoid writing direct SQL queries unless necessary.

Follow Supabase authentication and Row Level Security (RLS) guidelines.

Any old API references should be replaced with Supabase equivalents.

## 🤝 Community & Support
Join our Slack/Discord for discussions.

Tag @maintainers for urgent queries.

Refer to the Wiki for in-depth documentation.

## Happy Coding! 🚀
Your contributions make this project better.

