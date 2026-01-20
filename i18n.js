/* =====================
   I18N CONFIG
===================== */
const DEFAULT_LANG = "pt";

/* =====================
   TRANSLATIONS
===================== */
const i18n = {
    pt: {
        // Desktop icons
        curriculo: "Currículo",
        sobre: "Sobre Mim",
        projetos: "Projetos",

        // Start menu
        pinned: "Fixados",
        explorer: "Explorador",
        config: "Configurações",

        recommended: "Recomendados",
        no_recent: "Nenhum item recente",

        // Window titles / generic
        welcome: "Bem-vindo",
        close: "Fechar"
    },
    en: {
        // Desktop icons
        curriculo: "Resume",
        sobre: "About Me",
        projetos: "Projects",

        // Start menu
        pinned: "Pinned",
        explorer: "Explorer",
        config: "Settings",

        recommended: "Recommended",
        no_recent: "No recent items",

        // Window titles / generic
        welcome: "Welcome",
        close: "Close"
    }
};

/* =====================
   GET CURRENT LANGUAGE
===================== */
function getCurrentLang() {
    return localStorage.getItem("lang") || DEFAULT_LANG;
}

/* =====================
   APPLY I18N
===================== */
function applyI18n() {
    const lang = getCurrentLang();
    const dict = i18n[lang];

    if (!dict) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.innerText = dict[key];
    });

    // Atualiza idioma ativo no tray
    document.querySelectorAll(".lang-option").forEach(el => {
        el.style.opacity = "0.6";
        if (el.innerText.toLowerCase() === lang) {
            el.style.opacity = "1";
            el.style.fontWeight = "600";
        } else {
            el.style.fontWeight = "400";
        }
    });
}


/* =====================
   CHANGE LANGUAGE
===================== */
function changeLanguage(lang) {
    if (!i18n[lang]) return;

    localStorage.setItem("lang", lang);
    applyI18n();

    // Atualiza relógio se existir (index / desktop)
    if (typeof updateClock === "function") {
        updateClock();
    }
}

/* =====================
   AUTO INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
    applyI18n();
});
