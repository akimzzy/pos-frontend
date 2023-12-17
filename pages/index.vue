<script lang="ts" setup>
definePageMeta({ layout: "dashboard", middleware: "auth" });
const user = useUser();
</script>

<template>
  <UContainer>
    <h1>Home</h1>
    {{ user }}
  </UContainer>
</template>
