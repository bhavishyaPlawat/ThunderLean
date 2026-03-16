# Contributing to ThunderLean

First and foremost, thank you for your interest in contributing to ThunderLean!  
We're excited to build a community around this project, and every contribution, no matter how small, is highly valued.

This document provides guidelines for contributing to the project.  
Please read it carefully to ensure a smooth and effective collaboration process.

---

## 💬 Code of Conduct
We have adopted a Code of Conduct that we expect all contributors to adhere to.  
Please read the full text in our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file so that you can understand what actions will and will not be tolerated.

---

## 🤔 How to Contribute
There are many ways to contribute to the project. Here are a few ideas:

- **🐛 Reporting Bugs**: Find and report bugs to help us improve stability.
- **💡 Suggesting Enhancements**: Propose new features or improvements to existing functionality.
- **📝 Writing Documentation**: Help improve our README, guides, and inline code comments.
- **💻 Writing Code**: Fix bugs, implement new features, or refactor the codebase.
- **🎨 Improving UI/UX**: Suggest or implement design improvements to make the app more intuitive.

---

## 🐞 Bug Reports
If you encounter a bug, please help us by submitting an issue to our [GitHub Issues page](https://github.com/your-username/thunderlean/issues).

A great bug report should include:

- **A clear and descriptive title**.
- **A detailed description of the problem** — Explain the issue and what you expected to happen.
- **Steps to reproduce the behavior**.
- **Screenshots or screen recordings**, if applicable.
- **Details about your environment** — such as the browser, operating system, and Node.js version.

---

## ✨ Feature Requests
We love hearing new ideas! If you have a suggestion for a new feature or an enhancement, please open an issue and use the `enhancement` label.

Please provide:

- **A clear and descriptive title**.
- **A detailed description of the proposed feature** — Explain the problem it solves and how it would work.
- **Mockups or wireframes**, if possible, to help visualize the feature.

---

## 🚀 Pull Request Process
Ready to contribute code? Here’s how to set up your development environment and submit a pull request.

1. **Fork the repository** on GitHub.

2. **Clone your fork** to your local machine:
   ```sh
   git clone https://github.com/YOUR_USERNAME/thunderlean.git
   cd thunderlean
   ```
3. Install dependencies
Frontend:
   ```sh
    cd frontend
    npm install
   ```
4. Install Supabase CLI (for backend)
    We are migrating to Supabase, so you'll need the CLI for local development:

    - macOS (Homebrew):
    ```sh
    brew install supabase/tap/supabase
    ```
    - Windows (Scoop):
    ```sh
    scoop install supabase
    ```
    - Linux (via Shell):
    ```sh
    curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    npm install -g supabase
    ```
    Verify installation:
    ```sh
    supabase --version
    ```
5. Create a new branch for your changes:
   ```sh
   git checkout -b your-branch-name
   ```
   Use descriptive names like:
    - fix/login-bug
    - feature/add-dark-mode

6. Make your changes:
- Write clean, readable, and well-commented code.
- Follow the existing code style.
- Run the linter (frontend):
```sh
npm run lint
```
7. Commit your changes using Conventional Commits:
- feat: A new feature.
- fix: A bug fix.
- docs: Documentation only changes.
- style: Changes that do not affect meaning of the code.
- refactor: Code change that neither fixes a bug nor adds a feature.
- chore: Maintenance tasks.
example:
```sh
git commit -m "feat(auth): add login with Supabase"
```
8. Push your branch:
   ```sh
   git push origin your-branch-name
    ```
9. Open a Pull Request:

- Link to the related issue.
- Describe the changes you made.
- Request reviews from relevant team members.
- Ensure all checks pass before merging.
- Squash commits if possible to keep history clean.

## 🗄 Backend Migration Notes (Supabase)
- Use the Supabase client SDK for all database interactions.
- Avoid writing raw SQL unless absolutely necessary.
- Follow Supabase Authentication and Row Level Security (RLS) guidelines.
- Replace any old API references with Supabase equivalents.
## 🤝 Community & Support
- Join our Slack/Discord for discussions.
- Tag @maintainers for urgent queries.
- Refer to the Wiki for in-depth documentation.

## Happy Coding! 🚀
Your contributions make this project better.



