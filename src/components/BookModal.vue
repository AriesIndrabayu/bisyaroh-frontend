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
          <div class="book-layout">
            <!-- Cover -->
            <div class="cover-wrapper">
              <img
                v-if="book?.cover"
                :src="`${BASE_URL}/storage/${book.cover}`"
                alt="Cover Buku"
              />
              <div v-else class="cover-placeholder">Tidak ada cover</div>
            </div>

            <!-- Info -->
            <div class="info">
              <p class="year">
                <strong>Tahun Rilis:</strong> {{ book?.release_year || "-" }}
              </p>

              <p class="resume">
                {{ book?.resume }}
              </p>

              <button class="btn-read" @click="$emit('read', book)">
                📖 Baca Buku
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { watch } from "vue";
import { registerModal, unregisterModal } from "../utils/modalStack";
const MODAL_ID = "BookModal";

const props = defineProps({
  show: Boolean,
  book: Object,
  BASE_URL: String,
});

const emit = defineEmits(["close", "read"]);

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
  z-index: 1000;
}

/* Modal */
.modal {
  background: #fff;
  width: min(900px, 94%);
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
  font-size: 20px;
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

/* Layout */
.book-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 28px;
}

/* Cover */
.cover-wrapper img {
  width: 100%;
  border-radius: 14px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.cover-placeholder {
  height: 360px;
  border-radius: 14px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
}

/* Info */
.info {
  display: flex;
  flex-direction: column;
}

.year {
  margin-bottom: 12px;
  color: #374151;
}

.resume {
  line-height: 1.8;
  color: #374151;
  margin-bottom: auto;
  white-space: pre-line;
}

/* Button */
.btn-read {
  align-self: flex-start;
  margin-top: 24px;
  padding: 14px 28px;
  background: var(--gold);
  color: var(--navy);
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s,
    box-shadow 0.15s;
}

.btn-read:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
}

/* Mobile */
@media (max-width: 768px) {
  .book-layout {
    grid-template-columns: 1fr;
  }

  .btn-read {
    width: 100%;
    text-align: center;
  }
}
</style>
