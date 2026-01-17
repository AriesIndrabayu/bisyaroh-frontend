<template>
  <Teleport to="body">
    <div v-if="show" class="overlay" @click.self="$emit('close')">
      <div class="modal">
        <!-- Header -->
        <header class="modal-header">
          <h2>{{ book?.category }}</h2>
          <button class="close" @click="$emit('close')">✕</button>
        </header>

        <!-- Body -->
        <div class="modal-body">
          <p class="subtitle">Daftar Bab / Halaqah</p>

          <ul class="chapter-list">
            <li
              v-for="chapter in book?.chapters"
              :key="chapter.id"
              @click="$emit('open', chapter)"
            >
              <span class="title">{{ chapter.title }}</span>

              <span class="icons">
                <span v-if="chapter.contents">📄</span>
                <span v-if="chapter.audio">🎧</span>
                <span v-if="chapter.video_youtube">▶️</span>
              </span>
            </li>
          </ul>

          <p v-if="!book?.chapters?.length" class="empty">
            Belum ada bab tersedia
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { watch } from "vue";
import { registerModal, unregisterModal } from "../utils/modalStack";

const MODAL_ID = "ChapterModal";

const props = defineProps({
  show: Boolean,
  book: Object,
});

const emit = defineEmits(["close", "open"]);

watch(
  () => props.show,
  (visible) => {
    if (visible) {
      registerModal(MODAL_ID, {
        onClose: () => emit("close"),
      });
    } else {
      unregisterModal(MODAL_ID);
    }
  },
);
</script>

<style scoped>
/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
}

/* Modal */
.modal {
  background: white;
  width: min(720px, 94%);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
}

/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
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

/* Body */
.modal-body {
  padding: 24px;
}

.subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
}

/* List */
.chapter-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.chapter-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-radius: 10px;
  background: #f9fafb;
  margin-bottom: 10px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;
}

.chapter-list li:hover {
  background: var(--gold-soft);
  transform: translateY(-1px);
}

.title {
  font-weight: 500;
  color: #111827;
}

.icons span {
  margin-left: 6px;
}

/* Empty */
.empty {
  color: #9ca3af;
  font-style: italic;
}
</style>
