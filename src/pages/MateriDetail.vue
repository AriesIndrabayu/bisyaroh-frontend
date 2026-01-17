<template>
  <PublicLayout>
    <article v-if="materi">
      <span class="badge">{{ materi.kategori }}</span>

      <h1>{{ materi.judul }}</h1>

      <p class="meta">{{ materi.ustadz }} · {{ materi.tanggal }}</p>

      <div class="content">
        <p>Ini adalah konten detail materi. Nanti bisa diisi:</p>
        <ul>
          <li>Ringkasan kajian</li>
          <li>Audio / video</li>
          <li>Kitab rujukan</li>
        </ul>
      </div>
    </article>

    <p v-else>Materi tidak ditemukan</p>
  </PublicLayout>
</template>

<script setup>
import { useRoute } from "vue-router";
import PublicLayout from "../layouts/PublicLayout.vue";

const route = useRoute();

const data = [
  {
    id: 1,
    judul: "Iman kepada Hari Akhir",
    ustadz: "Ustadz A",
    tanggal: "12 Jan 2026",
    kategori: "Aqidah",
  },
  {
    id: 2,
    judul: "Adab Menuntut Ilmu",
    ustadz: "Ustadz B",
    tanggal: "10 Jan 2026",
    kategori: "Adab",
  },
];

const materi = data.find((m) => m.id === Number(route.params.id));
</script>

<style scoped>
.badge {
  display: inline-block;
  background: var(--gold);
  color: var(--navy);
  padding: 4px 12px;
  border-radius: 999px;
  font-weight: 600;
  margin-bottom: 16px;
}

.meta {
  color: var(--muted);
  margin-bottom: 24px;
}

.content {
  max-width: 720px;
}
</style>
