// js to load the projects from json file
document.addEventListener("DOMContentLoaded", function () {
  fetch("project.json")
    .then((response) => response.json())

    .then((data) => {
      const projectContainer = document.getElementById("project-list");
      data.project.forEach((project) => {
        const courseElement = document.createElement("div");

        courseElement.innerHTML = `
      <div class="box" onclick="navigateTo('')">
          <img src="resources/site/${project.image}" alt="image">
              <div class="box-in">
                          <h3>
                              ${project.title}
                  </h3>
                  <p>
                      ${project.description}
                  </p>
              </div>  
              <a href="${project.url}" target="_blank" class="btn-3 log-btn">
                  Visit
              </a>

          </div>  

      `;
        projectContainer.appendChild(courseElement);
      });
    })
    .catch((error) => console.error("Error loading the projects:", error));
});

// js for theme toggle
document.querySelectorAll(".cb").forEach(function (cb) {
  cb.addEventListener("change", function () {
    const html = document.documentElement;
    const theme = cb.checked ? "dark" : "light";

    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });
});

// Check local storage for theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}
var typed = new Typed(".autotype", {
  strings: ["Designer.", "Web Devloper.", "Blogger."],
  typeSpeed: 150,
  backSpeed: 150,
  loop: true,
});

// js for getting all repo form github
const username = "girdharagrawalbro";
const url = `https://api.github.com/users/${username}/repos`;

fetch(url)
  .then(response => response.json())
  .then(repos => {
    const repoList = document.getElementById('repo-list');
    repos.forEach(repo => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      repoList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Error fetching repos:', error));
