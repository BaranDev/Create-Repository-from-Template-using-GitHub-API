# GitHub Template Repo Explanation

This GitHub template repository provides functionality to fetch template repositories from GitHub, display them in the UI, and create new repositories from selected templates using the GitHub API.

## How to Use

1. **Setup GitHub Token:**
   - Before using this template, ensure you have a GitHub personal access token with sufficient permissions. You can generate a token [here](https://github.com/settings/tokens/new).
   - Add your GitHub token as an environment variable named `GITHUB_TOKEN` in your environment or provide it directly in the HTML template.

2. **File Structure:**
   - **script.js**: Contains JavaScript code for fetching template repositories, displaying them in the UI, and creating new repositories from templates.
   - **main.py**: Includes a Flask application to serve the HTML template and handle API requests.

3. **Customization:**
   - **script.js:**
     - Modify the `fetchTemplateRepos` function to customize the search query for template repositories.
     - Adjust UI elements and styles in the `displayRepos` function to match your project's design.
   - **main.py:**
     - Update routes or add additional functionality as per your requirements.
     - Adjust environment variable usage for the GitHub token if needed.
4. **Integration:**
   - Integrate this template into your project by forking or cloning the repository.
   - Customize the HTML template (`template.html`) to include additional elements or styles as required.

## Additional Features
- **Intersection Observer:** Implements infinite scrolling to fetch more repositories as the user scrolls down.
- **Create from Template:** Allows users to create new repositories from selected templates with a custom name.

## Get Started

To get started, follow these steps:
1. Fork or clone this repository.
2. Customize the template according to your project's requirements.
3. Ensure you have set up the necessary environment variables, especially the GitHub token.
4. Run the Flask application using `python main.py`.
5. Access the application in your browser and start exploring template repositories.

[![GitHub issues](https://img.shields.io/github/issues/barandev/Create-Repository-from-Template)](https://github.com/barandev/Create-Repository-from-Template/issues)
[![GitHub stars](https://img.shields.io/github/stars/barandev/Create-Repository-from-Template)](https://github.com/barandev/Create-Repository-from-Template/stargazers)
