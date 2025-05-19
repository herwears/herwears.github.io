---
layout: default
title: Beranda
permalink: /
---

<h1>Beranda</h1>
<p>Pilih koleksi:</p>

{% for collection in site.data.homepage %}
  {% assign matched_product = site.data.products | where: "id", collection.id | first %}
  
  <p>Koleksi ID: {{ collection.id }}</p>

  {% if matched_product %}
    {% include collections_list.html products=matched_product %}
  {% else %}
    <p><em>Produk tidak ditemukan untuk koleksi ini.</em></p>
  {% endif %}
{% endfor %}
