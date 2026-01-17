<template>
  <PublicLayout>
    <h1>Pencarian Konten</h1>

    <div class="filter">
      <input v-model="keyword" type="text" placeholder="Cari judul materi..." />

      <select v-model="kategori">
        <option value="">Semua Kategori</option>
        <option v-for="k in kategoriList" :key="k" :value="k">
          {{ k }}
        </option>
      </select>
    </div>

    <div class="grid">
      <CardKajian v-for="item in filteredMateri" :key="item.id" v-bind="item" />
    </div>

    <p v-if="filteredMateri.length === 0" class="empty">
      Materi tidak ditemukan
    </p>
  </PublicLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import PublicLayout from "../layouts/PublicLayout.vue";
import CardKajian from "../components/CardKajian.vue";

const keyword = ref("");
const kategori = ref("");

const materi = [
  {
    id: 1,
    judul: "Iman kepada Hari Akhir",
    ustadz: "Ustadz A",
    tanggal: "12 Jan 2026",
    kategori: "Aqidah",
    deskripsi: "Pembahasan iman kepada hari akhir.",
    link: "/materi/1",
  },
  {
    id: 2,
    judul: "Adab Menuntut Ilmu",
    ustadz: "Ustadz B",
    tanggal: "10 Jan 2026",
    kategori: "Adab",
    deskripsi: "Adab penuntut ilmu menurut sunnah.",
    link: "/materi/2",
  },
  {
    id: 3,
    judul: "Tauhid Rububiyah",
    ustadz: "Ustadz C",
    tanggal: "08 Jan 2026",
    kategori: "Tauhid",
    deskripsi: "Tauhid sebagai pondasi iman.",
    link: "/materi/3",
  },
];

const kategoriList = [...new Set(materi.map((m) => m.kategori))];

const filteredMateri = computed(() => {
  return materi.filter((m) => {
    const cocokJudul = m.judul
      .toLowerCase()
      .includes(keyword.value.toLowerCase());
    const cocokKategori = !kategori.value || m.kategori === kategori.value;

    return cocokJudul && cocokKategori;
  });
});
</script>

<style scoped>
.filter {
  display: flex;
  gap: 16px;
  margin: 24px 0 32px;
}

input,
select {
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 100%;
  max-width: 320px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
}

.empty {
  margin-top: 40px;
  color: var(--muted);
}
</style>
