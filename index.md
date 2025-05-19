---
layout: default
title: Beranda
permalink: /
---

<h1>Beranda</h1>
<p>Pilih koleksi:</p>

{% for collection in site.data.collections %}
  {% assign matched_product = site.data.products | where: "id", collection.id | first %}
  
  {% if matched_product %}
    {% include collections_list.html product=matched_product %}
  {% endif %}
{% endfor %}

