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

    <section class="grid-section">
      <h2>Materi Terbaru</h2>

      <div class="grid">
        <CardKajian v-for="item in materi" :key="item.id" v-bind="item" />
      </div>
    </section>
  </PublicLayout>
</template>

<script setup>
import PublicLayout from "../layouts/PublicLayout.vue";
import CardKajian from "../components/CardKajian.vue";

const materi = [
  {
    id: 1,
    judul: "Iman kepada Hari Akhir",
    ustadz: "Ustadz A",
    tanggal: "12 Jan 2026",
    kategori: "Aqidah",
    deskripsi:
      "Pembahasan tentang makna iman kepada hari akhir dan dampaknya dalam kehidupan.",
    link: "/materi/1",
  },
  {
    id: 2,
    judul: "Adab Menuntut Ilmu",
    ustadz: "Ustadz B",
    tanggal: "10 Jan 2026",
    kategori: "Adab",
    deskripsi:
      "Bagaimana adab seorang penuntut ilmu menurut Al-Qur’an dan Sunnah.",
    link: "/materi/2",
  },
  {
    id: 3,
    judul: "Tauhid Rububiyah",
    ustadz: "Ustadz C",
    tanggal: "08 Jan 2026",
    kategori: "Tauhid",
    deskripsi: "Memahami tauhid rububiyah sebagai pondasi utama keimanan.",
    link: "/materi/3",
  },
];
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

.grid-section {
  margin-top: 80px;
}

.grid-section h2 {
  margin-bottom: 24px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}
</style>
