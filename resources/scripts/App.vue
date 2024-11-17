<template>
  <router-view />
  <BaseDialog v-if="isLocaleLoaded" />
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const isLocaleLoaded = ref(false)
router.isReady().then(() => {
  isLocaleLoaded.value = true
})
</script>
