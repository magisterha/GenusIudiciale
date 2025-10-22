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
            showQuestion(sections[index], 0, index); 
        }
    }

    // Función para mostrar una pregunta específica *dentro* de una sección
    function showQuestion(section, questionIndex, sectionIndex) {
        const questions = section.querySelectorAll('.question-group');
        const nextQuestionBtn = section.querySelector('.next-question');
        const prevQuestionBtn = section.querySelector('.prev-question');
        const submitFinalBtn = section.querySelector('.submit-final');

        // Oculta todas, luego muestra la activa
        questions.forEach((q, i) => {
            q.classList.toggle('active', i === questionIndex);
        });

        const isLastQuestion = (questionIndex === questions.length - 1);
        const isLastSection = (sectionIndex === sections.length - 1);

        if (prevQuestionBtn) {
            prevQuestionBtn.style.display = (questionIndex === 0) ? 'none' : 'inline-block';
        }
        
        if (nextQuestionBtn) {
            nextQuestionBtn.style.display = (isLastQuestion && isLastSection) ? 'none' : 'inline-block';
        }
        
        if (submitFinalBtn) {
            submitFinalBtn.style.display = (isLastQuestion && isLastSection) ? 'inline-block' : 'none';
        }
    }

    // Función para validar la pregunta actual
    function validateCurrentQuestion() {
        const currentSection = sections[currentSectionIndex];
        const currentQuestion = currentSection.querySelector('.question-group.active');
        const input = currentQuestion.querySelector('input, textarea, select');
        
        if (input && input.hasAttribute('required') && !input.value.trim()) {
            const alertMsg = (document.documentElement.lang === 'es') ? 'Por favor, complete esta pregunta obligatoria.' : 'Please complete this mandatory question.';
            alert(alertMsg);
            input.focus();
            return false;
        }
        return true;
    }

    // --- Event Listeners para toda la navegación ---
    // Este único 'click' listener maneja TODO
    form.addEventListener('click', (e) => {
        
        const currentSection = sections[currentSectionIndex];
        const questions = currentSection.querySelectorAll('.question-group');
        let currentQuestionIndex = Array.from(questions).findIndex(q => q.classList.contains('active'));

        // Botón "Siguiente Pregunta"
        if (e.target.classList.contains('next-question')) {
            if (!validateCurrentQuestion()) {
                return; // Detiene si la validación falla
            }
            
            if (currentQuestionIndex < questions.length - 1) {
                showQuestion(currentSection, currentQuestionIndex + 1, currentSectionIndex);
            } 
            else if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                showSection(currentSectionIndex);
            }
        }

        // Botón "Anterior Pregunta"
        if (e.target.classList.contains('prev-question')) {
            if (currentQuestionIndex > 0) {
                showQuestion(currentSection, currentQuestionIndex - 1, currentSectionIndex);
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

        // Botón "Completar el Formulario" (Final)
        if (e.target.classList.contains('submit-final')) {
            // Esta es la validación final.
            // La validación de campos opcionales no es necesaria, 
            // pero la mantenemos por si acaso.
            if (!validateCurrentQuestion()) {
                e.preventDefault(); // Si falla, DETIENE el envío del formulario.
            }
            // Si pasa, no hace NADA, y el botón (que es type="submit")
            // envía el formulario de forma natural.
        }

        // Botón "Saltar y Completar" (del Lienzo)
        if (e.target.classList.contains('submit-now')) {
            // No necesita validación. Simplemente deja que el botón
            // (que es type="submit") envíe el formulario.
        }
    });

    // ¡HEMOS ELIMINADO EL form.addEventListener('submit')!
    // Esto evita el conflicto con Netlify.

    // Inicializa la primera sección y la primera pregunta
    showSection(0);
});
