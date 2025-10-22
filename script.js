document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('organon-form');
    const sections = document.querySelectorAll('.form-step');
    let currentSectionIndex = 0; // Empieza en la Sección 0 (Esenciales)

    // Función para mostrar una sección específica
    function showSection(index) {
        sections.forEach((section, i) => {
            section.classList.toggle('active', i === index);
        });
        // Al mostrar una nueva sección, activa su *primera* pregunta
        if (sections[index]) {
            showQuestion(sections[index], 0);
        }
    }

    // Función para mostrar una pregunta específica *dentro* de una sección
    function showQuestion(section, questionIndex) {
        const questions = section.querySelectorAll('.question-group');
        const nextQuestionBtn = section.querySelector('.next-question');
        const prevQuestionBtn = section.querySelector('.prev-question');
        const submitFinalBtn = section.querySelector('.submit-final');

        // Oculta todas, luego muestra la activa
        questions.forEach((q, i) => {
            q.classList.toggle('active', i === questionIndex);
        });

        // Lógica de visibilidad de botones DENTRO de la sección
        if (prevQuestionBtn) {
            prevQuestionBtn.style.display = (questionIndex === 0) ? 'none' : 'inline-block';
        }
        if (nextQuestionBtn) {
            nextQuestionBtn.style.display = (questionIndex === questions.length - 1) ? 'none' : 'inline-block';
        }
        if (submitFinalBtn) {
            submitFinalBtn.style.display = (questionIndex === questions.length - 1) ? 'inline-block' : 'none';
        }
    }

    // Función para validar la pregunta actual
    function validateCurrentQuestion() {
        const currentSection = sections[currentSectionIndex];
        const currentQuestion = currentSection.querySelector('.question-group.active');
        const input = currentQuestion.querySelector('input, textarea, select');
        
        if (input && input.hasAttribute('required') && !input.value.trim()) {
            alert('Por favor, complete esta pregunta obligatoria.');
            input.focus();
            return false;
        }
        return true;
    }

    // --- Event Listeners para toda la navegación ---
    form.addEventListener('click', (e) => {
        const currentSection = sections[currentSectionIndex];
        const questions = currentSection.querySelectorAll('.question-group');
        let currentQuestionIndex = Array.from(questions).findIndex(q => q.classList.contains('active'));

        // Botón "Siguiente Pregunta"
        if (e.target.classList.contains('next-question')) {
            if (!validateCurrentQuestion()) {
                return;
            }
            if (currentQuestionIndex < questions.length - 1) {
                showQuestion(currentSection, currentQuestionIndex + 1);
            } else {
                // Si es la última pregunta, avanza a la siguiente sección
                currentSectionIndex++;
                showSection(currentSectionIndex);
            }
        }

        // Botón "Anterior Pregunta"
        if (e.target.classList.contains('prev-question')) {
            if (currentQuestionIndex > 0) {
                showQuestion(currentSection, currentQuestionIndex - 1);
            }
        }
        
        // Botón "Continuar con Preguntas Adicionales" (del Lienzo)
        if (e.target.classList.contains('next-section')) {
            currentSectionIndex++;
            showSection(currentSectionIndex);
        }

        // Botón "Anterior Sección" (del Lienzo)
        if (e.target.classList.contains('prev-section')) {
            currentSectionIndex--;
            showSection(currentSectionIndex);
        }

        // Botón "Saltar y Completar" (del Lienzo)
        if (e.target.classList.contains('submit-now')) {
            // No necesita validación, simplemente envía
            form.submit();
        }

        // Botón "Completar Formulario" (Final)
        if (e.target.classList.contains('submit-final')) {
            // Este botón es de tipo 'submit' por defecto en el HTML (o debería serlo)
            // No se necesita JS extra si la validación final se hace al enviar
        }
    });

    // Validar el formulario ANTES de enviarlo
    form.addEventListener('submit', (e) => {
        // Si el envío NO vino del botón "submit-now" (del lienzo)
        // Y estamos en la última sección
        if (!e.submitter || !e.submitter.classList.contains('submit-now')) {
            if (currentSectionIndex === sections.length - 1) {
                // Validar la última pregunta visible
                if (!validateCurrentQuestion()) {
                    e.preventDefault(); // Detiene el envío si la última pregunta es inválida
                }
            }
        }
        // Si es "submit-now", deja que se envíe sin validar opcionales.
    });

    // Inicializa la primera sección y la primera pregunta
    showSection(0);
});
