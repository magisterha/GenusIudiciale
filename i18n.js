document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('lang-selector');
    const hiddenLangField = document.getElementById('form_language');
    let translations = {}; // Caché para las traducciones

    // Función para cargar las traducciones
    async function loadTranslations(lang) {
        if (translations[lang]) {
            return translations[lang]; // Usar caché
        }
        try {
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`Could not load ${lang}.json`);
            }
            translations[lang] = await response.json();
            return translations[lang];
        } catch (error) {
            console.error(error);
            // Fallback a español si falla la carga
            if (!translations['es']) {
                const esResponse = await fetch(`locales/es.json`);
                translations['es'] = await esResponse.json();
            }
            return translations['es'];
        }
    }

    // Función para aplicar las traducciones al DOM
    function applyTranslations(langData) {
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.dataset.i18nKey;
            if (langData[key]) {
                // Decide si traducir el texto, un placeholder, o una opción
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    if (element.hasAttribute('data-i18n-placeholder') || element.placeholder) {
                        element.placeholder = langData[key];
                    }
                } else {
                    element.textContent = langData[key];
                }
            }
        });
    }

    // Función principal para cambiar el idioma
    async function setLanguage(lang) {
        const langData = await loadTranslations(lang);
        applyTranslations(langData);
        document.documentElement.lang = lang; // Actualiza el lang del HTML

        // Actualizar el campo oculto del formulario
        if (hiddenLangField) {
            hiddenLangField.value = lang;
        }

        // Actualizar el botón activo
        langSelector.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    // Event Listeners para los botones
    langSelector.addEventListener('click', (e) => {
        if (e.target.classList.contains('lang-btn')) {
            const lang = e.target.dataset.lang;
            if (lang) {
                setLanguage(lang);
            }
        }
    });

    // Cargar el idioma por defecto (español) al iniciar
    setLanguage('es');
});
