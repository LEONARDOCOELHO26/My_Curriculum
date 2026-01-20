/* =====================
   GLOBAL STATE
===================== */
const DEFAULT_LANG = "pt";

/* =====================
   TRANSLATIONS
===================== */
const translations = {
    pt: {
        locale: "pt-BR",
        title: "Bem-vindo ao meu currículo",
        hint: "para uma melhor imersão coloque em tela cheia (F11 ou Fn + F11)",
        enter: "Entrar",
        download: "Baixar Currículo"
    },
    en: {
        locale: "en-US",
        title: "Welcome to my resume",
        hint: "for a better experience, use fullscreen mode (F11 or Fn + F11)",
        enter: "Enter",
        download: "Download Resume"
    }
};

/* =====================
   CLOCK (LANG AWARE)
===================== */
function updateClock() {
    const lang = localStorage.getItem("lang") || DEFAULT_LANG;
    const locale = translations[lang].locale;

    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");

    const options = { weekday: "long", day: "numeric", month: "long" };
    const date = now.toLocaleDateString(locale, options);

    const clockEl = document.getElementById("clock");
    const dateEl = document.getElementById("date");

    if (clockEl) clockEl.innerText = `${h}:${m}`;
    if (dateEl) dateEl.innerText = date;
}

setInterval(updateClock, 1000);

/* =====================
   APPLY LANGUAGE
===================== */
function applyLanguage(lang) {
    const t = translations[lang];

    if (!t) return;

    const title = document.getElementById("title");
    const hint = document.getElementById("hint");
    const enterBtn = document.getElementById("enterBtn");
    const downloadBtn = document.getElementById("downloadBtn");

    if (title) title.innerText = t.title;
    if (hint) hint.innerText = t.hint;
    if (enterBtn) enterBtn.innerText = t.enter;
    if (downloadBtn) downloadBtn.innerText = t.download;

    document.querySelectorAll(".lang-btn").forEach(btn =>
        btn.classList.remove("active")
    );

    const activeBtn = document.querySelector(
        `.lang-btn[data-lang="${lang}"]`
    );
    if (activeBtn) activeBtn.classList.add("active");
}

/* =====================
   SET LANGUAGE (SAVE)
===================== */
function setLanguage(lang) {
    localStorage.setItem("lang", lang);
    applyLanguage(lang);
    updateClock(); // atualiza data no idioma correto
}

/* =====================
   LOCKSCREEN CLICK
===================== */
function initLockscreen() {
    const lockscreen = document.getElementById("lockscreen");
    const login = document.getElementById("login");

    if (!lockscreen || !login) return;

    lockscreen.addEventListener("click", () => {
        lockscreen.style.transform = "translateY(-100%)";

        setTimeout(() => {
            lockscreen.classList.add("hidden");
            login.classList.remove("hidden");
        }, 500);
    });
}

/* =====================
   LOGIN ACTION
===================== */
function entrar() {
    window.location.href = "inicial_pag.html";
}

/* =====================
   INIT
===================== */
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("lang") || DEFAULT_LANG;

    applyLanguage(savedLang);
    updateClock();
    initLockscreen();
});

async function baixarCurriculo() {
    const lang = localStorage.getItem("lang") || "pt";

    let arquivo = "";
    let nomeDownload = "";

    if (lang === "en") {
        arquivo = "arquivos/Leonardo_Coelho_Resume_2026_EN.pdf";
        nomeDownload = "Leonardo_Coelho_Resume_2026_EN.pdf";
    } else {
        arquivo = "arquivos/Curriculum-Completo.pdf";
        nomeDownload = "Curriculum-Completo.pdf";
    }

    try {
        const response = await fetch(arquivo);
        if (!response.ok) throw new Error("Erro ao baixar");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = nomeDownload;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

    } catch (err) {
        alert("Não foi possível baixar o currículo.");
        console.error(err);
    }
}

