<script lang="ts">
import { Youtube } from '../libs';
</script>

<script setup lang="ts">

const removeAd = {
  youtube: Youtube.removeAd,
}

</script>

<template>
<h3>#OGS Ads Remover</h3>
  <button @click="removeAd.youtube()">Youtube</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
