import { Octokit } from "https://esm.sh/@octokit/rest";

// Keep track of the current page number
let currentPage = 1;

/**
 * Fetches template repositories from GitHub using Octokit.
 * This function constructs a query to search for repositories with a 'template-repository' topic,
 * sorts them by stars in descending order, and displays the results.
 * @async
 */
async function fetchTemplateRepos() {
    try {
        const queryString = 'topic:template-repository';
        console.log("Query string: "+queryString);
        const octokit = new Octokit({ auth: token });
        const response = await octokit.request('GET /search/repositories', {
            q: queryString,
            sort: 'stars',
            order: 'desc',
            per_page: 100,
            page: currentPage // Specify the current page number
        });
        const { data } = response;
        const items = data.items;
        displayRepos(items);
        // Increment the current page number only if there are more templates available
            if (items.length === 100) {
            currentPage++;
            initIntersectionObserver();
        }
    } catch (error) {
        console.error('Error fetching template repositories:', error);
        document.getElementById('error').textContent = 'Failed to load template repositories: ' + error.message;
    }
}

/**
 * Initializes Intersection Observer to fetch more repositories when scrolling.
 * This is particularly useful for infinite scrolling scenarios.
 */
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            fetchTemplateRepos();
        }
    }, { threshold: 1 });

    const lastChild = document.querySelector('#repo-container div:last-child');
    if (lastChild) {
        observer.observe(lastChild);
    } else {
        console.error('Last child element not found');
    }
}

/**
 * Creates a repository from a template using the GitHub API.
 * This function prompts the user for a new repository name, fetches the user's GitHub username,
 * and uses Octokit.js to create a new repository from the specified template.
 * @async
 * @param {string} templateOwner - The GitHub username of the template repository owner.
 * @param {string} templateName - The name of the template repository.
 */
async function createRepo(templateOwner, templateName) {
    const repoName = prompt('Enter new repository name:');
    if (!repoName) return;

    console.log(`Template Owner: ${templateOwner}, Template Name: ${templateName}`);

    try {
        const userResponse = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!userResponse.ok) {
            throw new Error('Failed to fetch GitHub user information');
        }
        const { login } = await userResponse.json();

        const octokit = new Octokit({ auth: token });
        await octokit.request('POST /repos/{template_owner}/{template_repo}/generate', {
            template_owner: templateOwner,
            template_repo: templateName,
            owner: login,
            name: repoName,
            description: '',
            include_all_branches: false,
            'private': true,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        }).then(({ data }) => {
            alert(`Repository created successfully: ${data.html_url}`);
        }).catch((error) => {
            console.error('Error creating repository from template:', error);
            alert('Failed to create repository. See console for details.');
        });
    } catch (error) {
        console.error('Error creating repository from template:', error);
        alert('Failed to create repository. See console for details.');
    }
}

/**
 * Displays the fetched repositories in the UI.
 * Each repository is represented as a div element with its name, description,
 * and a button to create a new repository from the template.
 * @function displayRepos
 * @param {Array} repos - An array of repository objects to display.
 */
// Keep track of repository IDs that have been displayed
const displayedRepoIds = new Set();

// Function to display repositories in the UI
function displayRepos(repos) {
    const container = document.getElementById('repo-container');
    repos.forEach(repo => {
        // Check if the repository ID has already been displayed
        if (!displayedRepoIds.has(repo.id)) {
            // Creating a div for each repository
            const repoElement = document.createElement('div');
            repoElement.className = 'repo';
            // Setting inner HTML to display repo details and a button to create from the template
            repoElement.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description}</p>
                <button class="button" onclick="createRepo('${repo.owner.login}', '${repo.name}')">Create from template</button>
            `;
            // Adding the repo element to the container
            container.appendChild(repoElement);
            // Add the repository ID to the set of displayed IDs
            displayedRepoIds.add(repo.id);
        }
    });
}

// GitHub token for authorization, fetched from a meta tag in the HTML template.
const token = document.querySelector('meta[name="github-token"]').getAttribute('content');

// Fetching template repositories on window load to display them in the UI.
window.onload = fetchTemplateRepos;

// Attaching the createRepo function to the window object to make it accessible from the HTML template.
window.createRepo = createRepo;
// End of script.js file. Added detailed comments for clarity.
