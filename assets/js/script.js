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

  document.querySelectorAll("[data-js='product:modal']").forEach(item => {
    const content = JSON.parse(item.dataset.content);

    item.addEventListener("click", function (event) {
      console.log({ content })
      
      const checkbox = document.getElementById("inModal--product");
      checkbox.checked = !checkbox.checked;

      $("modal:product__header-image").src = content.image;
      $("modal:product__header-image").alt = content.name;
      $("modal:product__header-title").textContent = content.name;
      $("modal:product__header-sales").textContent = setting.messages.quantitySold.replace("[NUMBER]", String(content.sales));
      $("modal:product__header-rating").textContent = content.rating;
      
      $("modal:product__content").innerHTML = generateProductModalHTML(content.link);
      
      $("modal:product__footer-link").setAttribute('onclick', `navigator.clipboard.writeText('${urlLink}#${id}')`);
      // document.querySelector(".inModal.--product .inModal__header").innerHTML
      // document.querySelector(".inModal.--product .inModal__content").innerHTML = generateProductModalHTML(link);
      // document.querySelector(".inModal.--product .inModal__footer").innerHTML = `<div class="text-center">
      //   <p class="text-sm text-gray-500 mb-2">Bagikan produk ini:</p>
      //   <div class="flex justify-center gap-4">
      //     <button class="text-blue-500 hover:text-blue-700" onclick="navigator.clipboard.writeText('${urlLink}#${id}')">Salin Link</button>
      //   </div>
      // </div>`;

      event.preventDefault();
    });
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
  const ELEMENT_PROFIL_FIRST_BUTTON__SEARCH = document.querySelector("[data-js='header_button--search']");
  
  const ELEMENT_CONTAINER_HEADER_PROFIL = document.querySelector("[data-js='header-profile']");
  const ELEMENT_CONTAINER_HEADER_SEARCH = document.querySelector("[data-js='header-search']");

  const isElementBottomTouching = () => ELEMENT_CONTAINER_BACKGROUND.getBoundingClientRect().bottom >= ELEMENT_CONTAINER_HEADER.getBoundingClientRect().bottom;
  const updateHeaderState = (isActive) => {
    ELEMENT_CONTAINER_HEADER.classList.toggle("border-transparent", !isActive);
    ELEMENT_CONTAINER_HEADER.classList.toggle("bg-white/80", isActive);
    ELEMENT_CONTAINER_HEADER.classList.toggle("border-gray-200", isActive);
    ELEMENT_CONTAINER_HEADER.classList.toggle("backdrop-blur-xs", isActive);
    ELEMENT_PROFIL_FIRST_BUTTON__PROFILE.classList.toggle("hidden", !isActive);
  };
  const updateFromScroll = () => {
    if (!ELEMENT_CONTAINER_HEADER_SEARCH.classList.contains("hidden")) return;
    updateHeaderState(!isElementBottomTouching());
  };

  if (ELEMENT_PROFIL_FIRST_BUTTON__BACK) {
    ELEMENT_PROFIL_FIRST_BUTTON__BACK.addEventListener("click", () => {
      history.length > 1 && document.referrer.startsWith(location.origin) ? history.back() : (location.href = "/");
    });
  }
  
  ELEMENT_PROFIL_FIRST_BUTTON__SEARCH.addEventListener("click", () => {
    ELEMENT_CONTAINER_HEADER_PROFIL.classList.add("hidden");
    ELEMENT_CONTAINER_HEADER_SEARCH.classList.remove("hidden");
    updateHeaderState(true);
  });

  document.querySelector("[data-js='header_search--button']").addEventListener("click", () => {
    ELEMENT_CONTAINER_HEADER_PROFIL.classList.remove("hidden");
    ELEMENT_CONTAINER_HEADER_SEARCH.classList.add("hidden");
    updateHeaderState(!isElementBottomTouching());
  });
  // ELEMENT_PROFIL_SECOND_FORM__CLEAR.addEventListener("click", () => {
  //   ELEMENT_PROFIL_SECOND_FORM__INPUT.value = "";
  //   ELEMENT_PROFIL_SECOND_FORM__CLEAR.classList.add("hidden");
  //   ELEMENT_PROFIL_SECOND_FORM__INPUT.focus(); // Optional: fokus lagi ke input setelah clear
  // });
  // ELEMENT_PROFIL_SECOND_FORM__INPUT.addEventListener("input", () => {
  //   ELEMENT_PROFIL_SECOND_FORM__CLEAR.classList.toggle("hidden", !ELEMENT_PROFIL_SECOND_FORM__INPUT.value.trim());
  // });
  // ELEMENT_PROFIL_SECOND_FORM.addEventListener("submit", function (e) {
  //   e.preventDefault(); // hindari submit default
  //   const keyword = ELEMENT_PROFIL_SECOND_FORM__INPUT.value.trim().replace(/\s+/g, "-");
  //   if (keyword) {
  //     // Ubah URL jadi seperti: ?search/keyword
  //     window.location.href = `?search/${keyword}`;
  //   }
  // });
  updateFromScroll();
  window.addEventListener("scroll", updateFromScroll);
});
