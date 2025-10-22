document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('lang-selector');
    const hiddenLangField = document.getElementById('form_language');
    let currentLang = 'es'; // Idioma por defecto

    // --- INICIO: BASE DE DATOS DE TRADUCCIONES (CORREGIDA) ---
    const translations = {
        "es": {
            "main_title": "Diagnóstico Retórico-Judicial Gratuito",
            "subtitle": "Descubra el mapa estratégico de su caso en minutos.",
            "section_essential_title": "Información Esencial",
            "badge_mandatory": "Obligatorio",
            "badge_optional": "Opcional",
            "q_email": "1. Su Email (para recibir el diagnóstico):",
            "ph_email": "Su correo electrónico...",
            "q_doc_type": "2. ¿Qué documento necesita preparar?",
            "ph_doc_type": "Ej: Demanda, Contestación...",
            "q_pretension": "3. ¿Qué le pide exactamente al tribunal?",
            "ph_pretension": "Ej: Condenar a pagar 100.000 €, la absolución...",
            "q_facts": "4. Enumere los 3 hechos clave que le dan la razón:",
            "ph_facts": "1. [Hecho A]...\n2. [Hecho B]...",
            "q_refutation": "5. ¿Cuál es el argumento MÁS fuerte que usará la parte contraria?",
            "section_canvas_title": "El Lienzo en Blanco",
            "q_canvas": "\"Cuénteme el caso\":",
            "desc_canvas": "Explique el caso con sus propias palabras. Cuanto más detalle, más preciso será el diagnóstico.",
            "ph_canvas": "Ej: Mi cliente firmó un contrato el...",
            "section_additional_title": "Preguntas Adicionais",
            "q_audience": "1. ¿Quién decide? (La audiencia clave):",
            "ph_audience": "Ej: Juez de 1ª Instancia, Jurado...",
            "q_evidence": "2. Para cada uno de sus hechos clave, ¿cuál es su prueba principal?",
            "ph_evidence": "Para Hecho A: [Prueba A]...",
            "q_legal_basis": "3. ¿Qué normas o artículos principales sustentan su petición?",
            "ph_legal_basis": "Ej: Artículo 1902 del Código Civil...",
            "q_status_causae": "4. Si tuviera que resumir la disputa principal en una sola pregunta, ¿cuál sería?",
            "ph_status_causae": "Ej: ¿Sucedió X? / ¿Es legal el contrato?",
            "q_genus_causae": "5. ¿Cuál es la \"primera impresión\" que genera su caso?",
            "opt_select": "-- Seleccione una --",
            "opt_honestum": "Caso sólido, la razón es clara.",
            "opt_turpe": "Caso impopular, el cliente genera antipatía.",
            "opt_humile": "Caso menor, difícil de captar la atención.",
            "opt_anceps": "Caso complejo, muy dudoso.",
            "opt_obscurum": "Caso muy técnico, árido.",
            "q_ethos": "6. ¿Qué imagen quiere proyectar usted como abogado?",
            "opt_ethos_expert": "Experto técnico, riguroso.",
            "opt_ethos_just": "Defensor razonable, buscando justicia.",
            "opt_ethos_fighter": "Luchador incansable por el cliente.",
            "opt_ethos_conciliator": "Conciliador, mostrando cooperación.",
            "q_pathos": "7. Al terminar de leer, ¿qué emoción o pensamiento principal debe tener el juez?",
            "ph_pathos": "Ej: Indignación, Confianza...",
            "q_other": "8. ¿Hay algo más que debamos saber?",
            "privacy_notice": "Al hacer clic en \"Completar\", acepta que los datos anónimos de su caso (sin emails ni nombres) se utilicen para fines de investigación y mejora de este modelo de IA experimental. Sus datos se tratan con confidencialidad.",
            "btn_complete_form": "Completar el Formulario"
        },
        "gl": {
            "main_title": "Diagnóstico Retórico-Xudicial Gratuíto",
            "subtitle": "Descubra o mapa estratéxico do seu caso en minutos.",
            "section_essential_title": "Información Esencial",
            "badge_mandatory": "Obrigatorio",
            "badge_optional": "Opcional",
            "q_email": "1. O seu Email (para recibir o diagnóstico):",
            "ph_email": "O seu correo electrónico...",
            "q_doc_type": "2. Que documento necesita preparar?",
            "ph_doc_type": "Ex: Demanda, Contestación...",
            "q_pretension": "3. Que lle pide exactamente ao tribunal?",
            "ph_pretension": "Ex: Condenar a pagar 100.000 €, a absolución...",
            "q_facts": "4. Enumere os 3 feitos clave que lle dan a razón:",
            "ph_facts": "1. [Feito A]...\n2. [Feito B]...",
            "q_refutation": "5. Cal é o argumento MÁIS forte que usará a parte contraria?",
            "section_canvas_title": "O Lenzo en Branco",
            "q_canvas": "\"Cónteme o caso\":",
            "desc_canvas": "Explique o caso coas súas propias palabras. Canto máis detalle, máis preciso será o diagnóstico.",
            "ph_canvas": "Ex: O meu cliente asinou un contrato o...",
            "section_additional_title": "Preguntas Adicionais",
            "q_audience": "1. Quen decide? (A audiencia clave):",
            "ph_audience": "Ex: Xuíz de 1ª Instancia, Xurado...",
            "q_evidence": "2. Para cada un dos seus feitos clave, cal é a súa proba principal?",
            "ph_evidence": "Para Feito A: [Proba A]...",
            "q_legal_basis": "3. Que normas ou artigos principais sustentan a súa petición?",
            "ph_legal_basis": "Ex: Artigo 1902 do Código Civil...",
            "q_status_causae": "4. Se tivese que resumir a disputa principal nunha soa pregunta, cal sería?",
            "ph_status_causae": "Ex: Sucedeu X? / É legal o contrato?",
            "q_genus_causae": "5. Cal é a \"primeira impresión\" que xera o seu caso?",
            "opt_select": "-- Seleccione unha --",
            "opt_honestum": "Caso sólido, a razón é clara.",
            "opt_turpe": "Caso impopular, o cliente xera antipatía.",
            "opt_humile": "Caso menor, difícil de captar a atención.",
            "opt_anceps": "Caso complexo, moi dubidoso.",
            "opt_obscurum": "Caso moi técnico, árido.",
            "q_ethos": "6. Que imaxe quere proxectar vostede como abogado?",
            "opt_ethos_expert": "Experto técnico, rigoroso.",
            "opt_ethos_just": "Defensor razoable, buscando xustiza.",
            "opt_ethos_fighter": "Loitador incansable polo cliente.",
            "opt_ethos_conciliator": "Conciliador, amosando cooperación.",
            "q_pathos": "7. Ao rematar de ler, que emoción ou pensamento principal debe ter o xuíz?",
            "ph_pathos": "Ex: Indignación, Confianza...",
            "q_other": "8. Hai algo máis que debamos saber?",
            "privacy_notice": "Ao facer clic en \"Completar\", acepta que os datos anónimos do seu caso (sen emails nin nomes) se utilicen para fins de investigación e mellora deste modelo de IA experimental. Os seus datos trátanse con confidencialidade.",
            "btn_complete_form": "Completar o Formulario"
        },
        "pt": {
            "main_title": "Diagnóstico Retórico-Judicial Gratuito",
            "subtitle": "Descubra o mapa estratégico do seu caso em minutos.",
            "section_essential_title": "Informações Essenciais",
            "badge_mandatory": "Obrigatório",
            "badge_optional": "Opcional",
            "q_email": "1. Seu Email (para receber o diagnóstico):",
            "ph_email": "Seu e-mail...",
            "q_doc_type": "2. Que documento precisa preparar?",
            "ph_doc_type": "Ex: Petição Inicial, Contestação...",
            "q_pretension": "3. O que pede exatamente ao tribunal?",
            "ph_pretension": "Ex: Condenação ao pagamento de 100.000 €, a absolvição...",
            "q_facts": "4. Liste os 3 fatos principals que lhe dão razão:",
            "ph_facts": "1. [Fato A]...\n2. [Fato B]...",
            "q_refutation": "5. Qual é o argumento MAIS forte que a parte contrária usará?",
            "section_canvas_title": "A Tela em Branco",
            "q_canvas": "\"Conte-me o caso\":",
            "desc_canvas": "Explique o caso por suas próprias palavras. Quanto mais detalhes, mais preciso será o diagnóstico.",
            "ph_canvas": "Ex: O meu cliente assinou um contrato em...",
            "section_additional_title": "Perguntas Adicionais",
            "q_audience": "1. Quem decide? (A audiência-chave):",
            "ph_audience": "Ex: Juiz de 1ª Instância, Júri...",
            "q_evidence": "2. Para cada um desses fatos, qual é a sua prova principal?",
            "ph_evidence": "Para Fato A: [Prova A]...",
            "q_legal_basis": "3. Que normas ou artigos principais sustentam o seu pedido?",
            "ph_legal_basis": "Ex: Artigo 1902 do Código Civil...",
            "q_status_causae": "4. Se tivesse que resumir a disputa principal numa única pergunta, qual seria?",
            "ph_status_causae": "Ex: Ocorreu X? / O contrato é legal?",
            "q_genus_causae": "5. Qual é a \"primeira impressão\" que o seu caso gera?",
            "opt_select": "-- Selecione uma --",
            "opt_honestum": "Caso sólido, a razão é clara.",
            "opt_turpe": "Caso impopular, o cliente gera antipatia.",
            "opt_humile": "Caso menor, difícil de captar a atenção.",
            "opt_anceps": "Caso complexo, muito duvidoso.",
            "opt_obscurum": "Caso muito técnico, árido.",
            "q_ethos": "6. Que imagem você quer projetar como advogado?",
            "opt_ethos_expert": "Especialista técnico, rigoroso.",
            "opt_ethos_just": "Defensor razoável, buscando justiça.",
            "opt_ethos_fighter": "Lutador incansável pelo cliente.",
            "opt_ethos_conciliator": "Conciliador, mostrando cooperação.",
            "q_pathos": "7. Ao terminar de ler, que emoção ou pensamento principal o juiz deve ter?",
            "ph_pathos": "Ex: Indignação, Confiança...",
            "q_other": "8. Há algo mais que devamos saber?",
            "privacy_notice": "Ao clicar em \"Completar\", você aceita que os dados anônimos do seu caso (sem emails ou nomes) sejam usados para fins de pesquisa e melhoria deste modelo de IA experimental. Seus dados são tratados com confidencialidade.",
            "btn_complete_form": "Completar o Formulário"
        },
        "fr": {
            "main_title": "Diagnostic Rhétorique-Judiciaire Gratuit",
            "subtitle": "Découvrez la carte stratégique de votre dossier en quelques minutes.",
            "section_essential_title": "Informations Essentielles",
            "badge_mandatory": "Obligatoire",
            "badge_optional": "Optionnel",
            "q_email": "1. Votre Email (pour recevoir le diagnostic) :",
            "ph_email": "Votre adresse e-mail...",
            "q_doc_type": "2. Quel document devez-vous préparer ?",
            "ph_doc_type": "Ex: Assignation, Conclusions...",
            "q_pretension": "3. Que demandez-vous exactement au tribunal ?",
            "ph_pretension": "Ex: Condamner la partie adverse à payer 100 000 €, la relaxe...",
            "q_facts": "4. Énumérez les 3 faits clés qui vous donnent raison :",
            "ph_facts": "1. [Fait A]...\n2. [Fait B]...",
            "q_refutation": "5. Quel est l'argument le PLUS fort que la partie adverse utilisera ?",
            "section_canvas_title": "La Toile Blanche",
            "q_canvas": "\"Racontez-moi l'affaire\" :",
            "desc_canvas": "Expliquez l'affaire avec vos propres mots. Plus il y a de détails, plus le diagnostic sera précis.",
            "ph_canvas": "Ex: Mon client a signé un contrat le...",
            "section_additional_title": "Questions Supplémentaires",
            "q_audience": "1. Qui décide ? (L'audience clé) :",
            "ph_audience": "Ex: Juge de première instance, Jury...",
            "q_evidence": "2. Pour chacun de ces faits, quelle est votre preuve principale ?",
            "ph_evidence": "Pour Fait A : [Preuve A]...",
            "q_legal_basis": "3. Quelles normes ou articles principaux soutiennent votre demande ?",
            "ph_legal_basis": "Ex: Article 1240 du Code civil...",
            "q_status_causae": "4. Si vous deviez résumer le litige principal en une seule question, ce serait :",
            "ph_status_causae": "Ex: X s'est-il produit ? / Le contrat est-il légal ?",
            "q_genus_causae": "5. Quelle est la \"première impression\" que génère votre affaire ?",
            "opt_select": "-- Sélectionnez une option --",
            "opt_honestum": "Dossier solide, la raison est claire.",
            "opt_turpe": "Dossier impopulaire, le client génère de l'antipathie.",
            "opt_humile": "Dossier mineur, difficile de capter l'attention.",
            "opt_anceps": "Dossier complexe, très incertain.",
            "opt_obscurum": "Dossier très technique, aride.",
            "q_ethos": "6. Quelle image voulez-vous projeter en tant qu'avocat ?",
            "opt_ethos_expert": "Expert technique, rigoureux.",
            "opt_ethos_just": "Défenseur raisonnable, cherchant la justice.",
            "opt_ethos_fighter": "Combattant infatigable pour le client.",
            "opt_ethos_conciliator": "Conciliateur, montrant de la coopération.",
            "q_pathos": "7. À la fin de la lecture, quelle émotion ou pensée principale le juge doit-il avoir ?",
            "ph_pathos": "Ex: Indignation, Confiance...",
            "q_other": "8. Y a-t-il autre chose que nous devrions savoir ?",
            "privacy_notice": "En cliquant sur \"Compléter\", vous acceptez que les données anonymes de votre dossier (sans emails ni noms) soient utilisées à des fins de recherche et d'amélioration de ce modèle d'IA expérimental. Vos données sont traitées confidentiellement.",
            "btn_complete_form": "Compléter le Formulaire"
        },
        "it": {
            "main_title": "Diagnosi Retorico-Giudiziale Gratuita",
            "subtitle": "Scopri la mappa strategica del tuo caso in pochi minuti.",
            "section_essential_title": "Informazioni Essenziali",
            "badge_mandatory": "Obbligatorio",
            "badge_optional": "Opzionale",
            "q_email": "1. La tua Email (per ricevere la diagnosi):",
            "ph_email": "Il tuo indirizzo e-mail...",
            "q_doc_type": "2. Quale documento devi preparare?",
            "ph_doc_type": "Es: Atto di citazione, Comparsa di risposta...",
            "q_pretension": "3. Cosa chiedi esattamente al tribunale?",
            "ph_pretension": "Es: Condannare la controparte a pagare 100.000 €, l'assoluzione...",
            "q_facts": "4. Elenca i 3 fatti chiave che ti danno ragione:",
            "ph_facts": "1. [Fatto A]...\n2. [Fatto B]...",
            "q_refutation": "5. Qual è l'argomento PIÙ forte che userà la controparte?",
            "section_canvas_title": "La Tela Bianca",
            "q_canvas": "\"Mi racconti il caso\":",
            "desc_canvas": "Spiega il caso con parole tue. Più dettagli fornisci, più precisa sarà la diagnosi.",
            "ph_canvas": "Es: Il mio cliente ha firmato un contratto il...",
            "section_additional_title": "Domande Aggiuntive",
            "q_audience": "1. Chi decide? (Il pubblico chiave):",
            "ph_audience": "Es: Giudice di primo grado, Giuria...",
            "q_evidence": "2. Per ciascuno di questi fatti, qual è la tua prova principale?",
            "ph_evidence": "Per il Fatto A: [Prova A]...",
            "q_legal_basis": "3. Quali norme o articoli principali sostengono la tua richiesta?",
            "ph_legal_basis": "Es: Articolo 2043 del Codice Civile...",
            "q_status_causae": "4. Se dovessi riassumere la controversia principale in una sola domanda, quale sarebbe?",
            "ph_status_causae": "Es: È successo X? / Il contratto è legale?",
            "q_genus_causae": "5. Qual è la \"prima impressione\" che genera il tuo caso?",
            "opt_select": "-- Seleziona un'opzione --",
            "opt_honestum": "Caso solido, la ragione è chiara.",
            "opt_turpe": "Caso impopolare, il cliente genera antipatia.",
            "opt_humile": "Caso minore, difficile catturare l'attenzione.",
            "opt_anceps": "Caso complesso, molto incerto.",
            "opt_obscurum": "Caso molto tecnico, arido.",
            "q_ethos": "6. Quale immagine vuoi proiettare come avvocato?",
            "opt_ethos_expert": "Esperto tecnico, rigoroso.",
            "opt_ethos_just": "Difensore ragionevole, in cerca di giustizia.",
            "opt_ethos_fighter": "Lottatore instancabile per il cliente.",
            "opt_ethos_conciliator": "Conciliante, che mostra cooperazione.",
            "q_pathos": "7. Al termine della lettura, quale emozione o pensiero principale deve avere il giudice?",
            "ph_pathos": "Es: Indignazione, Fiducia...",
            "q_other": "8. C'è qualcos'altro che dovremmo sapere?",
            "privacy_notice": "Cliccando su \"Completa\", accetti che i dati anonimi del tuo caso (senza email o nomi) vengano utilizzati per scopi di ricerca e miglioramento di questo modello di IA sperimentale. I tuoi dati sono trattati con riservatezza.",
            "btn_complete_form": "Completa il Modulo"
        },
        "en": {
            "main_title": "Free Rhetorical-Judicial Diagnosis",
            "subtitle": "Discover the strategic map for your case in minutes.",
            "section_essential_title": "Essential Information",
            "badge_mandatory": "Required",
            "badge_optional": "Optional",
            "q_email": "1. Your Email (to receive the diagnosis):",
            "ph_email": "Your email address...",
            "q_doc_type": "2. What document do you need to prepare?",
            "ph_doc_type": "Ex: Complaint, Answer, Appeal...",
            "q_pretension": "3. What exactly are you asking the court for?",
            "ph_pretension": "Ex: To order the counterparty to pay €100,000, acquittal...",
            "q_facts": "4. List the 3 key facts that support your position:",
            "ph_facts": "1. [Fact A]...\n2. [Fact B]...",
            "q_refutation": "5. What is the STRONGEST argument the opposing party will use?",
            "section_canvas_title": "The Blank Canvas",
            "q_canvas": "\"Tell me the case\":",
            "desc_canvas": "Explain the case in your own words. The more detail, the more accurate the diagnosis.",
            "ph_canvas": "Ex: My client signed a contract on...",
            "section_additional_title": "Additional Questions",
            "q_audience": "1. Who decides? (The key audience):",
            "ph_audience": "Ex: Judge, Jury, Arbitral Tribunal...",
            "q_evidence": "2. For each of those facts, what is your primary evidence?",
            "ph_evidence": "For Fact A: [Proof A]...",
            "q_legal_basis": "3. What main statutes or articles support your petition?",
            "ph_legal_basis": "Ex: Article 1902 of the Civil Code...",
            "q_status_causae": "4. If you had to summarize the main dispute in one question, what would it be?",
            "ph_status_causae": "Ex: Did X happen? / Is the contract legal?",
            "q_genus_causae": "5. What is the \"first impression\" your case generates?",
            "opt_select": "-- Select one --",
            "opt_honestum": "Solid case, the reasoning is clear.",
            "opt_turpe": "Unpopular case, the client generates antipathy.",
            "opt_humile": "Minor case, difficult to capture attention.",
            "opt_anceps": "Complex case, very doubtful.",
            "opt_obscurum": "Very technical case, arid.",
            "q_ethos": "6. What image do you want to project as the lawyer?",
            "opt_ethos_expert": "Technical expert, rigorous.",
            "opt_ethos_just": "Reasonable defender, seeking justice.",
            "opt_ethos_fighter": "Tireless fighter for the client.",
            "opt_ethos_conciliator": "Conciliator, showing cooperation.",
            "q_pathos": "7. After reading, what main emotion or thought should the judge have?",
            "ph_pathos": "Ex: Indignation, Confidence...",
            "q_other": "8. Is there anything else we should know?",
            "privacy_notice": "By clicking \"Complete Form\", you agree that anonymized data from your case (without emails or names) will be used for research and improvement of this experimental AI model. Your data is treated confidentially.",
            "btn_complete_form": "Complete Form"
        },
        "zh-tw": {
            "main_title": "免費修辭與司法診斷",
            "subtitle": "在幾分鐘內發現您案件的策略地圖。",
            "section_essential_title": "基本資訊",
            "badge_mandatory": "必填",
            "badge_optional": "選填",
            "q_email": "1. 您的電子郵件（用於接收診斷）：",
            "ph_email": "您的電子郵件地址...",
            "q_doc_type": "2. 您需要準備什麼文件？",
            "ph_doc_type": "例如：起訴狀、答辯狀、上訴狀...",
            "q_pretension": "3. 您對法庭的具體訴求是什麼？",
            "ph_pretension": "例如：判令對方支付10萬歐元、無罪釋放...",
            "q_facts": "4. 列出支持您立場的 3 個關鍵事實：",
            "ph_facts": "1. [事實 A]...\n2. [事實 B]...",
            "q_refutation": "5. 對方將使用的最強有力的論點是什麼？",
            "section_canvas_title": "空白畫布",
            "q_canvas": "「請告訴我案件詳情」：",
            "desc_canvas": "請用您自己的話解釋案件。細節越詳細，診斷就越準確。",
            "ph_canvas": "例如：我的客戶在...簽署了一份合約...",
            "section_additional_title": "補充問題",
            "q_audience": "1. 誰是裁決者？（關鍵聽眾）：",
            "ph_audience": "例如：一審法官、陪審團、仲裁庭...",
            "q_evidence": "2. 對於上述的每個事實，您的主要證據是什麼？",
            "ph_evidence": "對於事實 A：[證據 A]...",
            "q_legal_basis": "3. 支持您請求的主要法規或條款是什麼？",
            "ph_legal_basis": "例如：民法第1902條...",
            "q_status_causae": "4. 如果您必須用一個問題總結主要爭議，那會是什麼？",
            "ph_status_causae": "例如：X是否發生了？ / 合同是否合法？",
            "q_genus_causae": "5. 您的案件給人的「第一印象」是什麼？",
            "opt_select": "-- 請選擇一項 --",
            "opt_honestum": "案情紮實，理由明確。",
            "opt_turpe": "案件不受歡迎，客戶引起反感。",
            "opt_humile": "小案件，難以引起注意。",
            "opt_anceps": "案件複雜，充滿疑點。",
            "opt_obscurum": "案件技術性強，枯燥難懂。",
            "q_ethos": "6. 作為律師，您希望展現什麼形象？",
            "opt_ethos_expert": "嚴謹的技術專家。",
            "opt_ethos_just": "尋求正義的理性辯護者。",
            "opt_ethos_fighter": "為客戶不懈奮鬥的鬥士。",
            "opt_ethos_conciliator": "展現合作態度的協調者。",
            "q_pathos": "7. 讀完後，法官應產生什麼主要情緒或想法？",
            "ph_pathos": "例如：憤慨、信任...",
            "q_other": "8. 還有其他我們需要知道的嗎？",
            "privacy_notice": "點擊「完成表格」，即表示您同意您案件的匿名資料（不含電子郵件或姓名）將用於本實驗性AI模型的研究與改進。您的資料將被保密處理。",
            "btn_complete_form": "完成表格"
        }
    };
    // --- FIN: BASE DE DATOS DE TRADUCCIONES ---


    // Función para APLICAR las traducciones (ya no carga nada)
    function applyTranslations(langData) {
        if (!langData) {
            console.error(`No translation data found for lang: ${currentLang}`);
            return;
        }
        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.dataset.i18nKey;
            if (langData[key]) {
                // Comprueba si es un placeholder
                if (element.hasAttribute('data-i18n-placeholder') || element.placeholder) {
                    element.placeholder = langData[key];
                } else {
                    element.textContent = langData[key];
                }
            } else {
                // Advierte en la consola si falta una clave, pero no detiene el script
                console.warn(`Missing translation key: ${key} for lang: ${currentLang}`);
            }
        });
    }

    // Función principal para cambiar el idioma
    function setLanguage(lang) {
        // Previene la recarga si el idioma ya está activo
        if (lang === currentLang && document.documentElement.lang === lang) return; 
        
        currentLang = lang;
        const langData = translations[lang]; // Obtiene la traducción directamente del objeto
        
        if (!langData) {
            console.error(`Failed to set language: No translations found for '${lang}'`);
            return; // No hace nada si el idioma no existe en la base de datos
        }

        applyTranslations(langData);
        document.documentElement.lang = lang; // Actualiza el lang del HTML

        if (hiddenLangField) {
            hiddenLangField.value = lang;
        }

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
    setLanguage(currentLang);
});
