<template>
  <article class="card">
    <div class="badge">{{ kategori }}</div>

    <h3 class="title">{{ judul }}</h3>

    <p class="meta">{{ ustadz }} · {{ tanggal }}</p>

    <p class="desc">
      {{ deskripsi }}
    </p>

    <RouterLink :to="link" class="read-more"> Lihat Materi → </RouterLink>
  </article>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  judul: String,
  ustadz: String,
  tanggal: String,
  kategori: String,
  deskripsi: String,
  link: String,
});
</script>

<style scoped>
.card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  position: relative;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.12);
}

.badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--gold);
  color: var(--navy);
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 600;
}

.title {
  font-size: 18px;
  margin-bottom: 6px;
}

.meta {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 12px;
}

.desc {
  font-size: 14px;
  margin-bottom: 18px;
}

.read-more {
  font-weight: 600;
  color: var(--gold);
  text-decoration: none;
}

.read-more:hover {
  text-decoration: underline;
}
</style>
