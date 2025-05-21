document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-js='product:modal']").forEach(item => {
    const link = item.dataset.link;

    item.addEventListener("click", function (event) {
      document.querySelector(".inModal.--product").classList.add("--open")
      event.preventDefault();
    });
  });
});
