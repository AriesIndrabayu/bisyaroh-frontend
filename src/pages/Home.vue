<template>
  <PublicLayout>
    <section class="hero">
      <h1>Arsip Ilmu & Pembelajaran Islam</h1>
      <p>
        Media publik untuk mengakses kajian, materi, dan dokumentasi
        pembelajaran Islam berdasarkan Al-Qur’an dan Sunnah.
      </p>

      <RouterLink to="/pencarian" class="cta"> Cari Materi </RouterLink>
    </section>
  </PublicLayout>
</template>

<script setup>
import PublicLayout from "../layouts/PublicLayout.vue";
</script>

<style scoped>
.hero {
  text-align: center;
  margin-top: 60px;
}

.cta {
  display: inline-block;
  margin-top: 32px;
  padding: 14px 28px;
  background: var(--gold);
  color: var(--navy);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
</style>
