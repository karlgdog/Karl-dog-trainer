// Site language, sent with every event: Hebrew by default, or ?lang=en / ?lang=ru, or the last language picked on the site
(function (w, d) {
  var langs = ['he', 'en', 'ru'], lang = 'he';
  try {
    var q = new URLSearchParams(location.search).get('lang'), saved = localStorage.getItem('site_lang');
    if (langs.indexOf(q) > -1) { lang = q; localStorage.setItem('site_lang', q); }
    else if (langs.indexOf(saved) > -1) lang = saved;
  } catch (e) {}
  w.SITE_LANG = lang;
  d.documentElement.lang = lang;
  d.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  (w.dataLayer = w.dataLayer || []).push({ site_language: lang });
})(window, document);

// Google Tag Manager. Paste your container ID between the quotes, for example 'GTM-AB12CD3'.
// While it is empty, nothing is tracked.
window.GTM_ID = 'GTM-PS2XG7G7';

(function (w, d, id) {
  w.dataLayer = w.dataLayer || [];
  if (!id) return;
  w.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  var s = d.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtm.js?id=' + id;
  d.head.appendChild(s);
})(window, document, window.GTM_ID);
