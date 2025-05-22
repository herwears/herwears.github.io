document.addEventListener("DOMContentLoaded", function () {
  const urlLink = window.location.origin + window.location.pathname;

  function generateProductModalHTML(productLinks) {
    console.log({productLinks})
    const platforms = {
      tiktok: { name: "TikTok", color: "bg-black hover:bg-gray-800" },
      shopee: { name: "Shopee", color: "bg-orange-500 hover:bg-orange-600" },
      tokopedia: { name: "Tokopedia", color: "bg-green-500 hover:bg-green-600" },
    };

    let platformButtons = "";

    for (const key in platforms) {
      const { name, color } = platforms[key];
      const link = productLinks[key];

      if (link) {
        platformButtons += `
        <a href="${link}" target="_blank"
           class="block w-full text-center text-white py-2 rounded-lg transition ${color}">
          Lihat di ${name}
        </a>
      `;
      } else {
        platformButtons += `
        <button disabled
                class="block w-full text-center bg-gray-300 text-gray-500 py-2 rounded-lg cursor-not-allowed">
          Belum tersedia di ${name}
        </button>
      `;
      }
    }
    return platformButtons
  }

  document.querySelectorAll("[data-js='product:modal']").forEach(item => {
    const link = JSON.parse(item.dataset.link);
    const id = item.dataset.id;

    item.addEventListener("click", function (event) {
      
      const checkbox = document.getElementById("inModal--product");
      checkbox.checked = !checkbox.checked;
      
      document.querySelector(".inModal.--product .inModal__content").innerHTML = generateProductModalHTML(link);
      document.querySelector(".inModal.--product .inModal__footer").innerHTML = `<div class="text-center">
        <p class="text-sm text-gray-500 mb-2">Bagikan produk ini:</p>
        <div class="flex justify-center gap-4">
          <button class="text-blue-500 hover:text-blue-700" onclick="navigator.clipboard.writeText('${urlLink}#${id}')">Salin Link</button>
        </div>
      </div>`;

      event.preventDefault();
    });
  });

  function uniqueLink(duration = 3000, highlightClass = 'highlight') {
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

  uniqueLink()
});
