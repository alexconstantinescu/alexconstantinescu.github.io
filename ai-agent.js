/* AI Agent for Alexandru Constantinescu's academic homepage */
(function () {
  'use strict';

  /* ── Knowledge base ───────────────────────────────────────────────── */
  var KB = {
    greeting: {
      patterns: [/^h(i|ello|ey|owdy)/i, /^good (morning|afternoon|evening)/i, /^sup\b/i, /^greet/i],
      responses: [
        'Hello! I\'m the AI assistant for this page. You can ask me about Alexandru\'s research, publications, teaching, or background. How can I help?'
      ]
    },
    who: {
      patterns: [/who (are|is) (you|this|alex|alexandru)/i, /about (you|this page|alex|alexandru)/i, /tell me about/i, /introduce/i],
      responses: [
        'Alexandru Constantinescu is an associate professor at the <strong>Politecnico di Milano</strong> (since April 2025), working in the Department of Mathematics. His research spans commutative algebra, algebraic geometry, and combinatorics. Feel free to ask about his publications, teaching, or biography!'
      ]
    },
    position: {
      patterns: [/position|current(ly)?|where (does|do|is|work)|affiliation|institution|polimi|politecnico|university/i],
      responses: [
        'Alexandru is currently an <strong>associate professor</strong> at the Politecnico di Milano (Dipartimento di Matematica, Ed. 14 (Nave), ufficio 225, Via Edoardo Bonardi 9, 20133 Milano, Italy), a position he has held since April 2025.'
      ]
    },
    contact: {
      patterns: [/contact|email|e-mail|mail|phone|tel|reach|address|office/i],
      responses: [
        'You can reach Alexandru by email at <a href="mailto:alexandru.constantinescu@polimi.it">alexandru.constantinescu@polimi.it</a> or by phone at <a href="tel:+390223994572">+39 02 2399 4572</a>. His office is at Politecnico di Milano, Dipartimento di Matematica, Ed. 14 (Nave), ufficio 225.'
      ]
    },
    research: {
      patterns: [/research|work on|study|stud(ies|y)|interest|topic|field|area|subject/i],
      responses: [
        'Alexandru\'s research sits at the intersection of <strong>commutative algebra</strong>, <strong>algebraic geometry</strong>, and <strong>combinatorics</strong>. Specific topics include: Hilbert schemes of points, deformation theory, Gr&ouml;bner bases, Stanley-Reisner rings, toric geometry, free resolutions, Castelnuovo-Mumford regularity, Hilbert functions, matroids, h-vectors &amp; f-vectors, Gorenstein liaison, Lefschetz properties, and Coxeter groups.'
      ]
    },
    publications: {
      patterns: [/pub(lication|lished|lish)|paper|article|journal|preprint|work(s)?/i],
      responses: [
        'Alexandru has <strong>20 published papers</strong> and 2 in preparation. Recent highlights include:<ul style="margin:6px 0 2px 18px;padding:0"><li><em>Simplicial Complexes and Matroids with Vanishing T²</em> — Electronic Journal of Combinatorics (2025)</li><li><em>The First Cotangent Cohomology Module for Matroids</em> — Journal of Combinatorial Algebra (2023)</li><li><em>Polyhedra, Lattice Structures, and Extensions of Semigroups</em> — Journal of the London Mathematical Society (2022)</li><li><em>Linear Syzygies, Hyperbolic Coxeter Groups, and Regularity</em> — Compositio Mathematica (2019)</li></ul>See the <a href="#publications" target="_self">full publications list</a> on this page.'
      ]
    },
    teaching: {
      patterns: [/teach(ing|es|er)?|course|class|lecture|stud(ent|ents)|polimi|analisi|geometria|algebra lineare|webeep/i],
      responses: [
        'In the <strong>1st semester of 2025/26</strong> Alexandru taught:<ul style="margin:6px 0 2px 18px;padding:0"><li><a href="https://webeep.polimi.it/course/view.php?id=20866" target="_blank">Analisi e Geometria 1</a></li><li><a href="https://webeep.polimi.it/course/view.php?id=19244" target="_blank">Geometria e Algebra Lineare</a></li></ul>He does <em>not</em> have courses in the 2nd semester 2025/26. Office hours are by appointment — contact him by email.'
      ]
    },
    cv: {
      patterns: [/cv|curriculum|biograph|background|history|education|degree|phd|ph\.d|doctorate|habilit/i],
      responses: [
        'Alexandru was born in 1981 in Bucharest. Key milestones:<ul style="margin:6px 0 2px 18px;padding:0"><li><strong>2004</strong> — Bachelor in Mathematics, University of Bucharest</li><li><strong>2009</strong> — Ph.D., University of Genova (advisor: Aldo Conca)</li><li><strong>2020</strong> — German Habilitation, Freie Universität Berlin (Thesis: <em>Hilbert Functions: a connection between algebra, geometry and combinatorics</em>)</li><li><strong>2023</strong> — Italian Habilitation as Associate Professor for Algebra and Geometry</li><li><strong>2025–</strong> — Associate Professor, Politecnico di Milano</li></ul>'
      ]
    },
    coauthors: {
      patterns: [/coauthor|collaborat|colleague|work(ed)? with/i],
      responses: [
        'Some of Alexandru\'s coauthors include Klaus Altmann, Bruno Benedetti, Giulio Caviglia, Emanuela De Negri, Matej Filip, Elisa Gorla, Joachim Jelisiejew, Thomas Kahle, Patricia Klein, Nam Le Dinh, Matey Mateev, and Matteo Varbaro.'
      ]
    },
    languages: {
      patterns: [/language|speak|romanian|german|italian|french|english/i],
      responses: [
        'Alexandru speaks <strong>Romanian</strong> (native), <strong>English</strong>, <strong>German</strong> (both fluent), <strong>Italian</strong>, and <strong>French</strong>.'
      ]
    },
    thanks: {
      patterns: [/thank|thanks|thx|cheers|appreciate|great|perfect|helpful/i],
      responses: [
        'You\'re welcome! Feel free to ask if you have more questions.',
        'Happy to help! Is there anything else you\'d like to know?'
      ]
    },
    bye: {
      patterns: [/bye|goodbye|ciao|see you|later|that.?s all/i],
      responses: [
        'Goodbye! Feel free to return anytime you have questions about Alexandru\'s work.'
      ]
    }
  };

  var FALLBACK = [
    'I\'m not sure about that. You can ask me about Alexandru\'s research, publications, teaching, background, contact details, or coauthors.',
    'I don\'t have information on that specific topic. Try asking about his research areas, publications, or CV.',
    'Good question! I\'m best at answering questions about Alexandru\'s academic work and background. What would you like to know?'
  ];

  var fallbackIdx = 0;

  function getResponse(input) {
    var text = input.trim();
    for (var key in KB) {
      if (!Object.prototype.hasOwnProperty.call(KB, key)) continue;
      var entry = KB[key];
      for (var i = 0; i < entry.patterns.length; i++) {
        if (entry.patterns[i].test(text)) {
          var resps = entry.responses;
          return resps[Math.floor(Math.random() * resps.length)];
        }
      }
    }
    var fb = FALLBACK[fallbackIdx % FALLBACK.length];
    fallbackIdx++;
    return fb;
  }

  /* ── Build UI ─────────────────────────────────────────────────────── */
  function buildWidget() {
    /* Floating button */
    var btn = document.createElement('button');
    btn.id = 'ai-agent-btn';
    btn.setAttribute('aria-label', 'Open AI assistant');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('title', 'Ask the AI assistant');
    btn.innerHTML = '&#x1F4AC;'; /* 💬 */

    /* Panel */
    var panel = document.createElement('div');
    panel.id = 'ai-agent-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'AI assistant');
    panel.classList.add('hidden');

    /* Header */
    var header = document.createElement('div');
    header.id = 'ai-agent-header';
    header.innerHTML =
      '<div class="ai-avatar">&#x1F916;</div>' +
      '<div class="ai-title">AI Assistant<span class="ai-subtitle">Ask me about Alexandru\'s work</span></div>';

    var closeBtn = document.createElement('button');
    closeBtn.id = 'ai-agent-close';
    closeBtn.setAttribute('aria-label', 'Close AI assistant');
    closeBtn.innerHTML = '&times;';
    header.appendChild(closeBtn);

    /* Messages area */
    var messages = document.createElement('div');
    messages.id = 'ai-agent-messages';
    messages.setAttribute('aria-live', 'polite');
    messages.setAttribute('aria-atomic', 'false');

    /* Input row */
    var inputRow = document.createElement('div');
    inputRow.id = 'ai-agent-input-row';

    var input = document.createElement('input');
    input.id = 'ai-agent-input';
    input.type = 'text';
    input.placeholder = 'Ask something…';
    input.setAttribute('aria-label', 'Your message');
    input.maxLength = 300;

    var sendBtn = document.createElement('button');
    sendBtn.id = 'ai-agent-send';
    sendBtn.setAttribute('aria-label', 'Send message');
    sendBtn.innerHTML =
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">' +
      '<path d="M1 8L15 1L10 8L15 15L1 8Z" fill="white"/>' +
      '</svg>';

    inputRow.appendChild(input);
    inputRow.appendChild(sendBtn);

    panel.appendChild(header);
    panel.appendChild(messages);
    panel.appendChild(inputRow);

    document.body.appendChild(panel);
    document.body.appendChild(btn);

    /* Welcome message with suggestions */
    addBotMessage(
      'Hi there! 👋 I\'m the AI assistant for this page. Ask me anything about Alexandru\'s research, publications, teaching, or background.',
      messages,
      ['Research areas', 'Publications', 'Teaching', 'Contact', 'CV']
    );

    /* ── Event listeners ── */
    btn.addEventListener('click', function () {
      var isOpen = !panel.classList.contains('hidden');
      if (isOpen) {
        closePanel(panel, btn);
      } else {
        openPanel(panel, btn, input);
      }
    });

    closeBtn.addEventListener('click', function () {
      closePanel(panel, btn);
    });

    sendBtn.addEventListener('click', function () {
      sendMessage(input, messages);
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage(input, messages);
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !panel.classList.contains('hidden')) {
        closePanel(panel, btn);
      }
    });
  }

  function openPanel(panel, btn, input) {
    panel.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML = '&#x2715;'; /* × */
    setTimeout(function () { input.focus(); }, 120);
    scrollMessages(panel.querySelector('#ai-agent-messages'));
  }

  function closePanel(panel, btn) {
    panel.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '&#x1F4AC;';
  }

  function scrollMessages(container) {
    setTimeout(function () {
      container.scrollTop = container.scrollHeight;
    }, 30);
  }

  function addBotMessage(html, container, suggestions) {
    var msg = document.createElement('div');
    msg.className = 'ai-msg bot';
    msg.innerHTML = html;
    container.appendChild(msg);

    if (suggestions && suggestions.length) {
      var suggestDiv = document.createElement('div');
      suggestDiv.className = 'ai-suggestions';
      suggestions.forEach(function (s) {
        var sBtn = document.createElement('button');
        sBtn.className = 'ai-suggestion-btn';
        sBtn.textContent = s;
        sBtn.addEventListener('click', function () {
          var inputEl = document.getElementById('ai-agent-input');
          inputEl.value = s;
          sendMessage(inputEl, container);
        });
        suggestDiv.appendChild(sBtn);
      });
      container.appendChild(suggestDiv);
    }

    scrollMessages(container);
  }

  function addUserMessage(text, container) {
    var msg = document.createElement('div');
    msg.className = 'ai-msg user';
    msg.textContent = text;
    container.appendChild(msg);
    scrollMessages(container);
  }

  function sendMessage(input, messages) {
    var text = input.value.trim();
    if (!text) return;
    input.value = '';

    addUserMessage(text, messages);

    /* Typing indicator */
    var typing = document.createElement('div');
    typing.className = 'ai-msg typing';
    typing.textContent = '• • •';
    messages.appendChild(typing);
    scrollMessages(messages);

    setTimeout(function () {
      messages.removeChild(typing);
      var response = getResponse(text);
      addBotMessage(response, messages);
    }, 420 + Math.random() * 260);
  }

  /* ── Init ─────────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
