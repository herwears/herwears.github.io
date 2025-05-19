---
layout: default
title: Koleksi
permalink: /collection/
---

<h1>Daftar Koleksi</h1>

<ul>
  {% assign labels = site.collection | map: "label" | uniq | sort %}
  {% for label in labels %}
    <li><a href="/collection/{{ label | slugify }}/">{{ label | capitalize }}</a></li>
  {% endfor %}
</ul>
