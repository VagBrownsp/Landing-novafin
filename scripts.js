(function () {
  'use strict';

  /**
   * Revela os elementos .reveal ao entrarem na viewport.
   * Sem suporte a IntersectionObserver, exibe tudo imediatamente.
   */
  function initScrollReveal() {
    var items = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  }

  /**
   * FAQ em acordeão: apenas um item aberto por vez.
   */
  function initFaq() {
    var items = document.querySelectorAll('.faq-item');

    function closeAll() {
      items.forEach(function (item) {
        item.classList.remove('open');
        item.querySelector('.faq-a').style.maxHeight = 0;
        item.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });
    }

    items.forEach(function (item) {
      var question = item.querySelector('.faq-q');
      var answer = item.querySelector('.faq-a');

      question.addEventListener('click', function () {
        var wasOpen = item.classList.contains('open');
        closeAll();

        if (!wasOpen) {
          item.classList.add('open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /**
   * Se a foto do especialista não carregar, exibe o placeholder.
   */
  function initPhotoFallback() {
    var img = document.querySelector('.about-photo img');
    if (!img) return;

    var container = img.parentElement;
    var showPlaceholder = function () { container.classList.add('no-photo'); };

    img.addEventListener('error', showPlaceholder);

    // Caso o erro tenha ocorrido antes de o listener ser registrado
    if (img.complete && img.naturalWidth === 0) showPlaceholder();
  }

  initScrollReveal();
  initFaq();
  initPhotoFallback();
})();
