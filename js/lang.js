let translations = {};

async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        translations = await response.json();

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[key]) {
                el.innerText = translations[key];
            }
        });

        // 🔹 აქტიური ენის ღილაკის მონიშვნა
        document.querySelectorAll(".lang-btn").forEach(btn => {
            btn.classList.remove("active");
        });

        const activeBtn = document.querySelector(`.lang-btn[data-lang="${lang}"]`);
        if (activeBtn) activeBtn.classList.add("active");

        localStorage.setItem("siteLanguage", lang);

    } catch (error) {
        console.error("Language load error:", error);
    }
}

// init
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("siteLanguage") || "en";
    loadLanguage(savedLang);
});
