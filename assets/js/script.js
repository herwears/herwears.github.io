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

  document.body.addEventListener("click", function (event) {
    const item = event.target.closest("[data-js='product:modal']");
    if (item) {
      const content = JSON.parse(item.dataset.content);
      // lakukan sesuatu dengan `content`
      console.log(content);

      const checkbox = document.getElementById("inModal--product");
      checkbox.checked = !checkbox.checked;

      $("modal:product__header-image").src = content.image;
      $("modal:product__header-image").alt = content.name;
      $("modal:product__header-title").textContent = content.name;
      $("modal:product__header-sales").textContent = setting.messages.quantitySold.replace("[NUMBER]", String(content.sales));
      $("modal:product__header-rating").textContent = content.rating;

      $("modal:product__content").innerHTML = generateProductModalHTML(content.link);

      $("modal:product__footer-link").setAttribute('onclick', `navigator.clipboard.writeText('${urlLink}#${content.code}')`);

      event.preventDefault();
    }
  });

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






  // HEADER
  const ELEMENT_CONTAINER_BACKGROUND = document.querySelector("[data-js='container-background']");
  const ELEMENT_CONTAINER_HEADER = document.querySelector("[data-js='container-header']");
  
  const ELEMENT_PROFIL_FIRST_BUTTON__BACK = document.querySelector("[data-js='header_button--back']");
  const ELEMENT_PROFIL_FIRST_BUTTON__PROFILE = document.querySelector("[data-js='header_button--profile']");

  const isElementBottomTouching = () => ELEMENT_CONTAINER_BACKGROUND.getBoundingClientRect().bottom >= ELEMENT_CONTAINER_HEADER.getBoundingClientRect().bottom;
  const updateHeaderState = (isActive) => {
    ELEMENT_CONTAINER_HEADER.classList.toggle("border-transparent", !isActive);
    ELEMENT_CONTAINER_HEADER.classList.toggle("bg-white/80", isActive);
    ELEMENT_CONTAINER_HEADER.classList.toggle("border-gray-200", isActive);
    ELEMENT_CONTAINER_HEADER.classList.toggle("backdrop-blur-xs", isActive);
    ELEMENT_PROFIL_FIRST_BUTTON__PROFILE.classList.toggle("hidden", !isActive);
  };
  const updateFromScroll = () => {
    updateHeaderState(!isElementBottomTouching());
  };

  if (ELEMENT_PROFIL_FIRST_BUTTON__BACK) {
    ELEMENT_PROFIL_FIRST_BUTTON__BACK.addEventListener("click", () => {
      history.length > 1 && document.referrer.startsWith(location.origin) ? history.back() : (location.href = "/");
    });
  }

  updateFromScroll();
  window.addEventListener("scroll", updateFromScroll);
});
