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
  position: relative;
  padding-bottom: 4px;
  transition: color 0.3s;
}
.menu a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background: var(--gold);
  transition: width 0.3s ease;
}

.menu a:hover {
  color: var(--gold-soft);
}

.menu a:hover::after {
  width: 100%;
}

.menu a.router-link-active {
  color: var(--gold);
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 12px;
  }

  .menu {
    gap: 16px;
  }
}
</style>
