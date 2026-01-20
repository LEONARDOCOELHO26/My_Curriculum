/* =====================
   START MENU
===================== */
function toggleStart() {
    const menu = document.getElementById("start-menu");
    if (!menu) return;
    menu.classList.toggle("show");
}

/* Fecha menu iniciar ao clicar fora */
document.addEventListener("click", (e) => {
    const menu = document.getElementById("start-menu");
    const startBtn = document.querySelector(".task-icon.active");

    if (!menu || !menu.classList.contains("show")) return;
    if (menu.contains(e.target)) return;
    if (startBtn && startBtn.contains(e.target)) return;

    menu.classList.remove("show");
});

/* =====================
   OPEN WINDOW
===================== */
function abrir(tipo) {
    const win = document.getElementById("window");
    const title = document.getElementById("title");
    const content = document.getElementById("content");

    if (!win || !title || !content) return;

    const lang = localStorage.getItem("lang") || "pt";

    // remove indicadores ativos
    document.querySelectorAll(".task-icon")
        .forEach(icon => icon.classList.remove("active"));

    win.classList.remove("hidden");

    if (tipo === "projetos") {
        carregarProjetosGitHub(lang);
        return;
    }

    const pages = {
        curriculo: {
            pt: {
                title: "Currículo",
                content: `<p>Técnico em Informática com foco em infraestrutura, suporte e desenvolvimento.</p>`
            },
            en: {
                title: "Resume",
                content: `<p>IT Technician focused on infrastructure, support and development.</p>`
            }
        },
        sobre: {
            pt: {
                title: "Sobre Mim",
                content: `<p>Profissional de TI com experiência em suporte, automação e sistemas.</p>`
            },
            en: {
                title: "About Me",
                content: `<p>IT professional with experience in support, automation and systems.</p>`
            }
        },
        explorer: {
            pt: {
                title: "Explorador",
                content: `<p>Nenhum arquivo disponível.</p>`
            },
            en: {
                title: "Explorer",
                content: `<p>No files available.</p>`
            }
        }
    };

    if (!pages[tipo]) return;

    title.innerText = pages[tipo][lang].title;
    content.innerHTML = pages[tipo][lang].content;

    marcarExplorerAtivo();
}

/* =====================
   GITHUB PROJECTS
===================== */
async function carregarProjetosGitHub(lang) {
    const title = document.getElementById("title");
    const content = document.getElementById("content");

    title.innerText = lang === "pt" ? "Projetos" : "Projects";
    content.innerHTML = `<p>${lang === "pt" ? "Carregando projetos..." : "Loading projects..."}</p>`;

    try {
        const response = await fetch(
            "https://api.github.com/users/LEONARDOCOELHO26/repos?sort=updated"
        );

        const repos = await response.json();
        if (!Array.isArray(repos)) throw new Error();

        const html = repos
            .filter(repo => !repo.fork)
            .map(repo => `
                <div class="repo">
                    <div class="repo-header">
                        <strong>${repo.name}</strong>
                        <span class="stars">⭐ ${repo.stargazers_count}</span>
                    </div>

                    <p class="repo-desc">
                        ${repo.description || (lang === "pt" ? "Sem descrição" : "No description")}
                    </p>

                    <div class="repo-footer">
                        <span class="lang">
                            🛠 ${repo.language || (lang === "pt" ? "Não definido" : "Not defined")}
                        </span>

                        <a href="${repo.html_url}" target="_blank">
                            ${lang === "pt" ? "Ver no GitHub" : "View on GitHub"}
                        </a>
                    </div>
                </div>
            `)
            .join("");

        content.innerHTML = `
            <div class="repo-list">
                ${html || `<p>${lang === "pt" ? "Nenhum projeto encontrado." : "No projects found."}</p>`}
            </div>
        `;

        marcarExplorerAtivo();

    } catch (err) {
        content.innerHTML = `
            <p>${lang === "pt" ? "Erro ao carregar projetos." : "Failed to load projects."}</p>
        `;
    }
}


/* =====================
   TASKBAR STATE
===================== */
function marcarExplorerAtivo() {
    const explorerIcon = document.querySelector(
        `.task-icon[data-tooltip="Explorer"]`
    );
    if (explorerIcon) explorerIcon.classList.add("active");
}

/* =====================
   CLOSE WINDOW
===================== */
function fechar() {
    const win = document.getElementById("window");
    if (win) win.classList.add("hidden");

    document.querySelectorAll(".task-icon")
        .forEach(icon => icon.classList.remove("active"));
}

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
    // aplica idioma global
    if (typeof applyI18n === "function") {
        applyI18n();
    }

    // ativa relógio
    if (typeof updateClock === "function") {
        updateClock();
        setInterval(updateClock, 1000);
    }
});
