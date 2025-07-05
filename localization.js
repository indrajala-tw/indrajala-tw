// localization.js
function setLanguage(lang) {
  console.log('[i18n] Switching to language:', lang);
  
  // Set data-lang attribute on body for CSS styling
  document.body.setAttribute('data-lang', lang);
  
  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'zh-TW');
  
  // Update all translatable elements
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value = translations[lang][key] || key;
    console.log(`[i18n] Updating key: ${key} => ${value}`);
    el.innerHTML = value;
  });
  
  // Store language preference
  localStorage.setItem('lang', lang);
  
  // Trigger font loading optimization
  if (lang === 'en') {
    // Preload Work Sans font for better performance
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap';
    link.as = 'style';
    if (!document.querySelector(`link[href="${link.href}"]`)) {
      document.head.appendChild(link);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('[i18n] DOMContentLoaded');
  
  // Get saved language or default to Chinese
  const savedLang = localStorage.getItem('lang') || 'zh';
  
  // Set initial language immediately
  setLanguage(savedLang);
  
  // Set up language switcher
  const switcher = document.getElementById('language-switcher');
  if (!switcher) {
    console.log('[i18n] Language switcher not found');
    return;
  }
  
  // Set switcher value
  switcher.value = savedLang;
  
  // Add event listener for language changes
  switcher.addEventListener('change', (e) => {
    console.log('[i18n] Language switcher changed:', e.target.value);
    setLanguage(e.target.value);
  });
});
