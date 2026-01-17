<template>
  <PublicLayout>
    <ClassSlider
      :kelasList="kelasList"
      :BASE_URL="BASE_URL"
      @show-detail="openDetail"
    />
    <ClassDetailModal
      :show="showModal"
      :kelasId="selectedKelasId"
      :BASE_URL="BASE_URL"
      @close="showModal = false"
    />

    <UstadzLogoStrip
      :ustadz="ustadzList"
      :BASE_URL="BASE_URL"
      @select="openUstadz"
    />
    <UstadzModal
      :ustadz="selectedUstadz"
      :show="showUstadz"
      @close="showUstadz = false"
      @open-book="openBook"
      @open-class="openClass"
    />

    <BookModal
      :book="selectedBook"
      :show="showBook"
      :BASE_URL="BASE_URL"
      @close="showBook = false"
      @read="openChapter"
    />

    <ChapterModal
      :book="selectedChapterBook"
      :show="showChapter"
      @close="showChapter = false"
      @open="openReader"
    />

    <ChapterReaderModal
      :chapter="selectedChapter"
      :book="selectedChapterBook"
      :show="showReader"
      :BASE_URL="BASE_URL"
      @close="showReader = false"
      @change="openReader"
    />
    <ClassRegistrationModal
      :show="showClass"
      :kelas="selectedClass"
      :BASE_URL="BASE_URL"
      @close="showClass = false"
    />

    <!-- <section class="hero">
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
    </section> -->
  </PublicLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api, { baseURL } from "../services/api";
import PublicLayout from "../layouts/PublicLayout.vue";
import CardKajian from "../components/CardKajian.vue";
import ClassSlider from "../components/ClassSlider.vue";
import ClassDetailModal from "../components/ClassDetailModal.vue";
import UstadzLogoStrip from "../components/UstadzLogoStrip.vue";
import UstadzModal from "../components/UstadzModal.vue";
import BookModal from "../components/BookModal.vue";
import ChapterModal from "../components/ChapterModal.vue";
import ChapterReaderModal from "../components/ChapterReaderModal.vue";
import ClassRegistrationModal from "../components/ClassRegistrationModal.vue";

const kelasList = ref([]);
const BASE_URL = baseURL;
const showModal = ref(false);
const selectedKelasId = ref(null);

const openDetail = (id) => {
  selectedKelasId.value = id;
  showModal.value = true;
};

onMounted(async () => {
  try {
    const res = await api.get("/fe/kelas");
    kelasList.value = res.data.data.data;
  } catch (err) {
    console.error("Gagal load kelas:", err);
  }
});

// State ustadz
const ustadzList = ref([]);
const showUstadz = ref(false);
const selectedUstadz = ref(null);

const openUstadz = (u) => {
  selectedUstadz.value = u;
  showUstadz.value = true;
};

onMounted(async () => {
  const res = await api.get("/fe/ustadz");
  ustadzList.value = res.data.data.data;
});

// State Kelas
const showClass = ref(false);
const selectedClass = ref(null);

const openClass = (kelas) => {
  console.log(kelas);
  selectedClass.value = kelas;
  showClass.value = true;
};

// State buku
const showBook = ref(false);
const selectedBook = ref(null);

const openBook = (book) => {
  selectedBook.value = book;
  showBook.value = true;
};

// State halaqah
const showChapter = ref(false);
const selectedChapterBook = ref(null);

const openChapter = (book) => {
  selectedChapterBook.value = book;
  showChapter.value = true;
};

// seleksi halaqoh
const selectedChapter = ref(null);
const showReader = ref(false);

const openReader = (chapter) => {
  selectedChapter.value = chapter;
  showReader.value = true;
};
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
