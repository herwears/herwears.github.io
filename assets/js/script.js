const $ = (key) => document.querySelector(`[data-js="${key}"]`);

console.log({title});
console.log({ setting });

document.addEventListener("DOMContentLoaded", function () {
  const urlLink = window.location.origin + window.location.pathname;

  function generateProductModalHTML(productLinks) {
    const m = setting.modalProduct.messages;
    return Object.entries(setting.modalProduct.list).map(([k, { name, color }]) => `
    <a href="${productLinks[k] || '#'}" ${productLinks[k] ? 'target="_blank"' : 'onclick="return false"'} 
       class="block w-full text-center py-2 rounded-lg ${productLinks[k] ? `text-white transition ${color}` : 'bg-gray-300 text-gray-500 cursor-not-allowed'}">
      ${(productLinks[k] ? m.seeAt : m.notAvailable).replace('[TITLE]', name)}
    </a>
  `).join('');
  }

  function uniqueLink(duration = 3000, highlightClass = 'z-9') {
    const hash = window.location.hash; // contoh: #Kemeja_4a
    if (!hash) return;

    const id = hash.slice(1); // hapus #
    const targetEl = document.getElementById(id);

    if (targetEl) {
      // Tambahkan class ke body
      document.body.classList.add('has-unique-link');

      // Tambahkan class highlight ke elemen target
      targetEl.classList.add(highlightClass);

      // Scroll ke elemen
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'center' // atau 'start'
      });

      // Hapus class setelah durasi
      setTimeout(() => {
        document.body.classList.remove('has-unique-link');
        targetEl.classList.remove(highlightClass);
      }, duration);
    }
  }

  uniqueLink();

});
