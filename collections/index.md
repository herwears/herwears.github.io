---
layout: default
title: Semua Koleksi
permalink: /collections/
---

<h1>Semua Koleksi</h1>

<ul>
  {% assign all_items = site.collections | where_exp: "item", "item.name" %}
  {% for item in all_items %}
    <li style="margin-bottom: 2em;">
      <img src="{{ item.image }}" alt="{{ item.name }}" width="150" />
      <h2>{{ item.name }}</h2>
      <p>Kode: {{ item.code }}</p>
      <p>Label: {{ item.label }}</p>
      <p>Rating: {{ item.rating }} ⭐</p>
      <p>Harga: {{ item.price }}</p>
      <p>Terjual: {{ item.sales }}</p>
      <a href="{{ item.link }}">Lihat Produk</a>
    </li>
  {% endfor %}
</ul>
