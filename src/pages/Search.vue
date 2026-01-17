<template>
  <PublicLayout>
    <!-- HERO -->
    <section class="search-hero">
      <h1>Pencarian Konten</h1>

      <input
        v-model="search"
        placeholder="Cari ustadz, buku, atau materi..."
        class="search-input"
      />
    </section>

    <!-- RESULT -->
    <section class="search-results">
      <!-- Loading -->
      <div v-if="loading">Memuat...</div>

      <!-- Hasil pencarian -->
      <template v-else-if="hasSearched">
        <div v-if="ustadzList.length === 0" class="empty">Tidak ada hasil</div>

        <div
          v-for="ustadz in ustadzList"
          :key="ustadz.id"
          class="ustadz-card"
          @click="openUstadz(ustadz)"
        >
          <!-- USTADZ -->
          <div class="ustadz-header">
            <img :src="`${BASE_URL}/storage/${ustadz.logo}`" />
            <h3>{{ ustadz.name }}</h3>
          </div>

          <!-- BOOKS -->
          <div v-if="ustadz.books?.length">
            <strong>Buku:</strong>
            <ul>
              <li
                v-for="book in ustadz.books"
                :key="book.id"
                class="clickable"
                @click.stop="openBook(book)"
              >
                {{ book.category }}
              </li>
            </ul>
          </div>

          <!-- KELAS -->
          <div v-if="ustadz.class_registrations?.length">
            <strong>Kelas:</strong>
            <ul>
              <li
                v-for="kelas in ustadz.class_registrations"
                :key="kelas.id"
                class="clickable"
                @click.stop="openClass(kelas)"
              >
                Pembukaan Kelas
              </li>
            </ul>
          </div>
        </div>
      </template>
    </section>

    <!-- ================= MODALS ================= -->

    <!-- USTADZ -->
    <UstadzModal
      v-if="showUstadz"
      :show="showUstadz"
      :ustadz="selectedUstadz"
      @close="showUstadz = false"
    />

    <!-- BOOK -->
    <BookModal
      v-if="showBook"
      :show="showBook"
      :book="selectedBook"
      :BASE_URL="BASE_URL"
      @close="showBook = false"
      @read="openChapter"
    />

    <!-- CHAPTER LIST -->
    <ChapterModal
      v-if="showChapter"
      :show="showChapter"
      :book="selectedChapterBook"
      @close="showChapter = false"
      @open="openReader"
    />

    <!-- READER -->
    <ChapterReaderModal
      v-if="showReader"
      :show="showReader"
      :chapter="selectedChapter"
      :book="selectedChapterBook"
      :BASE_URL="BASE_URL"
      @close="showReader = false"
      @change="openReader"
    />

    <!-- CLASS -->
    <ClassRegistrationModal
      v-if="showClass"
      :show="showClass"
      :kelas="selectedClass"
      :BASE_URL="BASE_URL"
      @close="showClass = false"
    />
  </PublicLayout>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import PublicLayout from "../layouts/PublicLayout.vue";
import api, { baseURL } from "../services/api";

import UstadzModal from "../components/UstadzModal.vue";
import BookModal from "../components/BookModal.vue";
import ChapterModal from "../components/ChapterModal.vue";
import ChapterReaderModal from "../components/ChapterReaderModal.vue";
import ClassRegistrationModal from "../components/ClassRegistrationModal.vue";

const BASE_URL = baseURL;

/* ================= STATE ================= */
const search = ref("");
const ustadzList = ref([]);
const loading = ref(false);
const hasSearched = ref(false);

// modal flags
const showUstadz = ref(false);
const showBook = ref(false);
const showChapter = ref(false);
const showReader = ref(false);
const showClass = ref(false);

// selected data
const selectedUstadz = ref(null);
const selectedBook = ref(null);
const selectedChapterBook = ref(null);
const selectedChapter = ref(null);
const selectedClass = ref(null);

/* ================= FETCH ================= */
const fetchUstadz = async () => {
  if (!search.value.trim()) return;

  loading.value = true;
  hasSearched.value = true;
  try {
    const res = await api.get("/fe/ustadz", {
      params: {
        search: search.value || undefined,
      },
    });
    ustadzList.value = res.data?.data?.data || [];
  } catch (err) {
    console.error("Gagal memuat pencarian:", err);
    ustadzList.value = [];
  } finally {
    loading.value = false;
  }
};

// debounce search
let timer = null;
watch(search, () => {
  clearTimeout(timer);
  timer = setTimeout(fetchUstadz, 400);
});

onMounted(fetchUstadz);

/* ================= ACTIONS ================= */
const openUstadz = (ustadz) => {
  selectedUstadz.value = ustadz;
  showUstadz.value = true;
};

const openBook = (book) => {
  selectedBook.value = book;
  showBook.value = true;
};

// 🔑 Book → Chapter list
const openChapter = (book) => {
  selectedChapterBook.value = book;
  showChapter.value = true;
};

// 🔑 Chapter → Reader
const openReader = (chapter) => {
  selectedChapter.value = chapter;
  showReader.value = true;
};

const openClass = (kelas) => {
  selectedClass.value = kelas;
  showClass.value = true;
};
</script>

<style scoped>
.search-hero {
  text-align: center;
  padding: 48px 16px;
}

.search-input {
  margin-top: 20px;
  padding: 12px;
  width: 100%;
  max-width: 420px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.ustadz-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.ustadz-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ustadz-header img {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
}

.clickable {
  cursor: pointer;
  color: var(--navy);
}

.clickable:hover {
  text-decoration: underline;
}
</style>
