<script lang="ts">
import { Youtube } from '../libs';
</script>

<script setup lang="ts">

const removeAd = {
  youtube: Youtube.removeAd,
}

</script>

<template>
<h1> Ads Remover (UI)</h1>
  <button @click="removeAd.youtube()">Remove ads</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
