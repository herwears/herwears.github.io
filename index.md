---
layout: default
title: Beranda
permalink: /
---

<h1>Beranda</h1>
<p>Pilih koleksi:</p>

{% for collection in site.data.collections %}
  <p>1</p>
  {% assign matched_product = site.data.products | where: "id", collection.id | first %}
  <p>2</p>
  {% if matched_product %}
    <p>3</p>
    {% include collections_list.html product=matched_product %}
  {% endif %}
{% endfor %}

