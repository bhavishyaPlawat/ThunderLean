# Contributing to ThunderLean

First and foremost, thank you for your interest in contributing to ThunderLean! We're excited to build a community around this project, and every contribution, no matter how small, is highly valued.

This document provides guidelines for contributing to the project. Please read it carefully to ensure a smooth and effective collaboration process.

## 💬 Code of Conduct

We have adopted a Code of Conduct that we expect all contributors to adhere to. Please read the full text in our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file so that you can understand what actions will and will not be tolerated.

## 🤔 How to Contribute

There are many ways to contribute to the project. Here are a few ideas:

* **🐛 Reporting Bugs**: Find and report bugs to help us improve stability.
* **💡 Suggesting Enhancements**: Propose new features or improvements to existing functionality.
* **📝 Writing Documentation**: Help improve our README, guides, and inline code comments.
* **💻 Writing Code**: Fix bugs, implement new features, or refactor the codebase.
* **🎨 Improving UI/UX**: Suggest or implement design improvements to make the app more intuitive.

## 🐞 Bug Reports

If you encounter a bug, please help us by submitting an issue to our [GitHub Issues page](https://github.com/your-username/thunderlean/issues).

A great bug report should include:

* **A clear and descriptive title**.
* **A detailed description of the problem**. Explain the issue and what you expected to happen.
* **Steps to reproduce the behavior**.
* **Screenshots or screen recordings**, if applicable.
* **Details about your environment**, such as the browser, operating system, and Node.js version.

## ✨ Feature Requests

We love hearing new ideas! If you have a suggestion for a new feature or an enhancement, please open an issue and use the `enhancement` label.

Please provide:

* **A clear and descriptive title**.
* **A detailed description of the proposed feature**. Explain the problem it solves and how it would work.
* **Mockups or wireframes**, if possible, to help visualize the feature.

## 🚀 Pull Request Process

Ready to contribute code? Here’s how to set up your development environment and submit a pull request.

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** to your local machine:
    ```sh
    git clone [https://github.com/YOUR_USERNAME/thunderlean.git](https://github.com/YOUR_USERNAME/thunderlean.git)
    cd thunderlean
    ```
3.  **Create a new branch** for your changes. Choose a descriptive branch name (e.g., `fix/login-bug` or `feature/add-dark-mode`).
    ```sh
    git checkout -b your-branch-name
    ```
4.  **Make your changes**. Write clean, readable, and commented code where necessary.
    * Follow the existing code style.
    * Run the linter to check for style issues in the `frontend` directory:
        ```sh
        # from the 'frontend' directory
        npm run lint
        ```
5.  **Commit your changes** using a conventional commit message format. This helps us generate changelogs automatically.
    * `feat`: A new feature.
    * `fix`: A bug fix.
    * `docs`: Documentation only changes.
    * `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
    * `refactor`: A code change that neither fixes a bug nor adds a feature.
    * `chore`: Changes
