---
layout: default
title: Semua Koleksi
permalink: /collections/
---

<h1>Semua Koleksi</h1>
<ul>
  {% for c in site.data.collections %}
    <li><a href="/collections/{{ c.label }}/">{{ c.name }}</a></li>
  {% endfor %}
</ul>
