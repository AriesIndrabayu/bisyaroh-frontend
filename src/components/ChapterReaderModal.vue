<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <!-- Header -->
        <header class="modal-header">
          <h2>{{ chapter?.title }}</h2>
          <button class="close" @click="$emit('close')">✕</button>
        </header>

        <!-- Tabs -->
        <div class="tabs">
          <button
            :class="{ active: tab === 'pdf' }"
            @click="tab = 'pdf'"
            v-if="chapter?.contents"
          >
            📄 PDF
          </button>

          <button
            :class="{ active: tab === 'audio' }"
            @click="tab = 'audio'"
            v-if="chapter?.audio"
          >
            🎧 Audio
          </button>

          <button
            :class="{ active: tab === 'video' }"
            @click="tab = 'video'"
            v-if="chapter?.video_youtube"
          >
            ▶️ Video
          </button>
        </div>

        <!-- Content -->
        <div class="modal-body">
          <!-- PDF -->
          <iframe
            v-if="tab === 'pdf' && chapter?.contents"
            :src="pdfUrl"
            class="pdf"
          />

          <!-- Audio -->
          <div v-if="tab === 'audio' && chapter?.audio" class="audio-wrapper">
            <div class="audio-meta">
              <strong>🎧 {{ chapter.title }}</strong>
              <span>Audio Kajian</span>
            </div>
            <audio :src="audioUrl" controls />
          </div>

          <!-- Video -->
          <iframe
            v-if="tab === 'video' && chapter?.video_youtube"
            :src="youtubeEmbed"
            class="video"
            allowfullscreen
          />
        </div>
        <!-- ✅ NAVIGASI DI DALAM MODAL -->
        <footer class="reader-nav">
          <button class="nav-btn" :disabled="!hasPrev" @click="prevChapter">
            ← Bab Sebelumnya
          </button>

          <button
            class="nav-btn primary"
            :disabled="!hasNext"
            @click="nextChapter"
          >
            Bab Selanjutnya →
          </button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { registerModal, unregisterModal } from "../utils/modalStack";

const MODAL_ID = "ChapterReaderModal";

const props = defineProps({
  chapter: Object,
  book: Object, // ⬅️ penting (berisi chapters)
  show: Boolean,
  BASE_URL: String,
});

const emit = defineEmits(["close", "change"]);

const tab = ref("pdf");

/* reset tab setiap buka */
watch(
  () => props.chapter,
  () => {
    tab.value = "pdf";
  },
);

/* register modal ke stack */
watch(
  () => props.show,
  (visible) => {
    if (!visible) {
      unregisterModal(MODAL_ID);
      return;
    }

    registerModal(MODAL_ID, {
      onClose: () => emit("close"),
      onPrev: prevChapter,
      onNext: nextChapter,

      onTabSelect: (tabName) => {
        if (tabs.value.includes(tabName)) {
          tab.value = tabName;
        }
      },

      onTabCycle: (dir) => {
        if (!tabs.value.length) return;

        const index = currentTabIndex.value;
        const next =
          dir === "next"
            ? (index + 1) % tabs.value.length
            : (index - 1 + tabs.value.length) % tabs.value.length;

        tab.value = tabs.value[next];
      },
    });
  },
);

/* ========================
   URL COMPUTED
======================== */
const pdfUrl = computed(() =>
  props.chapter?.contents
    ? `${props.BASE_URL}/storage/${props.chapter.contents}`
    : "",
);

const audioUrl = computed(() =>
  props.chapter?.audio
    ? `${props.BASE_URL}/storage/${props.chapter.audio}`
    : "",
);

const youtubeEmbed = computed(() => {
  if (!props.chapter?.video_youtube) return "";
  const id = props.chapter.video_youtube.split("v=")[1];
  return `https://www.youtube.com/embed/${id}`;
});

/* ========================
   CHAPTER NAVIGATION
======================== */
const currentIndex = computed(() => {
  if (!props.book || !props.chapter) return -1;
  return props.book.chapters.findIndex((c) => c.id === props.chapter.id);
});

const hasPrev = computed(() => currentIndex.value > 0);
const hasNext = computed(
  () => props.book && currentIndex.value < props.book.chapters.length - 1,
);

const prevChapter = () => {
  if (!hasPrev.value) return;
  emit("change", props.book.chapters[currentIndex.value - 1]);
};

const nextChapter = () => {
  if (!hasNext.value) return;
  emit("change", props.book.chapters[currentIndex.value + 1]);
};

/* ========================
   TAB HANDLING (NO ESC)
======================== */
const tabs = computed(() => {
  const t = [];
  if (props.chapter?.contents) t.push("pdf");
  if (props.chapter?.audio) t.push("audio");
  if (props.chapter?.video_youtube) t.push("video");
  return t;
});

const currentTabIndex = computed(() => tabs.value.indexOf(tab.value));

const nextTab = () => {
  const next = (currentTabIndex.value + 1) % tabs.value.length;
  tab.value = tabs.value[next];
};

const prevTab = () => {
  const prev =
    (currentTabIndex.value - 1 + tabs.value.length) % tabs.value.length;
  tab.value = tabs.value[prev];
};

// const handleKeydown = (e) => {
//   if (!props.show) return;
//   if (!isTopModal(MODAL_ID)) return;

//   switch (e.key) {
//     case "Escape":
//       emit("close");
//       break;

//     case "ArrowLeft":
//       prevChapter();
//       break;

//     case "ArrowRight":
//       nextChapter();
//       break;

//     case "1":
//       if (tabs.value.includes("pdf")) tab.value = "pdf";
//       break;

//     case "2":
//       if (tabs.value.includes("audio")) tab.value = "audio";
//       break;

//     case "3":
//       if (tabs.value.includes("video")) tab.value = "video";
//       break;

//     case "Tab":
//       e.preventDefault(); // penting!

//       if (e.shiftKey) {
//         // mundur
//         const prev =
//           (currentTabIndex.value - 1 + tabs.value.length) % tabs.value.length;
//         tab.value = tabs.value[prev];
//       } else {
//         // maju
//         const next = (currentTabIndex.value + 1) % tabs.value.length;
//         tab.value = tabs.value[next];
//       }
//       break;
//   }
// };

// onMounted(() => {
//   registerModal(MODAL_ID);
//   window.addEventListener("keydown", handleKeydown);
// });

// onUnmounted(() => {
//   unregisterModal(MODAL_ID);
//   window.removeEventListener("keydown", handleKeydown);
// });
</script>

<style scoped>
/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
}

/* Modal */
.modal {
  background: white;
  width: min(1100px, 96%);
  height: 90vh;
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.35);
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: var(--navy);
}

.close {
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 8px;
  padding: 12px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.tabs button {
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: #f3f4f6;
  cursor: pointer;
  font-weight: 600;
  color: #374151;
}

.tabs button.active {
  background: var(--gold);
  color: var(--navy);
}

/* Content */
.modal-body {
  flex: 1;
  background: #f9fafb;
}

.pdf,
.video {
  width: 100%;
  height: 100%;
  border: none;
}

.audio {
  width: 100%;
  padding: 24px;
}

/* Audio wrapper */
.audio-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
  padding: 32px;
  gap: 16px;
}

/* Audio player */
.audio-wrapper audio {
  width: 100%;
  max-width: 720px;
  height: 54px;
}
/* Info audio */
.audio-meta {
  text-align: center;
  color: #374151;
}

.audio-meta strong {
  display: block;
  font-size: 16px;
  font-weight: 700;
}

.audio-meta span {
  font-size: 13px;
  color: #6b7280;
}

/* Navigasi */
.reader-nav {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  background: #fff;

  position: sticky;
  bottom: 0;
  z-index: 5;
  box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.08);
}

.nav-btn {
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid #d1d5db;
  background: #fff;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

/* Hover default */
.nav-btn:hover:not(:disabled) {
  background: #f3f4f6;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* Primary button */
.nav-btn.primary {
  background: var(--gold);
  color: var(--navy);
  border: none;
}

/* Hover primary */
.nav-btn.primary:hover:not(:disabled) {
  background: #e6c14f;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(212, 175, 55, 0.45);
}

/* Disabled */
.nav-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}
</style>
