---
layout: default
title: Beranda
permalink: /
---

<h1>Beranda</h1>
<p>Pilih koleksi:</p>

<ul>
  {% assign labels = site.collection | map: "label" | uniq | sort %}
  {% for label in labels %}
    <li><a href="/collection/{{ label | slugify }}/">{{ label | capitalize }}</a></li>
  {% endfor %}
</ul>
