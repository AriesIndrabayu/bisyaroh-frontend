<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import { onMounted, onUnmounted } from "vue";
import { getTopModal } from "./utils/modalStack";

const handleKeydown = (e) => {
  const top = getTopModal();
  if (!top || !top.handlers) return;

  const h = top.handlers;

  if (e.key === "Escape" && h.onClose) {
    e.preventDefault();
    h.onClose();
    return;
  }

  if (e.key === "ArrowLeft" && h.onPrev) h.onPrev();
  if (e.key === "ArrowRight" && h.onNext) h.onNext();

  if (h.onTabSelect) {
    if (e.key === "1") h.onTabSelect("pdf");
    if (e.key === "2") h.onTabSelect("audio");
    if (e.key === "3") h.onTabSelect("video");
  }

  if (e.key === "Tab" && h.onTabCycle) {
    e.preventDefault();
    h.onTabCycle(e.shiftKey ? "prev" : "next");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>
