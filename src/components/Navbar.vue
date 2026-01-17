<template>
  <nav class="navbar">
    <div class="container">
      <div class="brand">
        <span class="logo-text">Bisyaroh</span>
      </div>

      <ul class="menu">
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/tentang-kami">Tentang Kami</RouterLink></li>
        <li><RouterLink to="/pencarian">Pencarian Konten</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.navbar {
  background: #0b1c2d; /* biru dongker */
  color: white;
}

.container {
  max-width: 1100px;
  margin: auto;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-text {
  font-weight: bold;
  font-size: 20px;
  color: #d4af37; /* emas */
}

.menu {
  display: flex;
  gap: 24px;
  list-style: none;
}

.menu a {
  color: white;
  text-decoration: none;
}

.menu a.router-link-active {
  color: #d4af37;
}
</style>
