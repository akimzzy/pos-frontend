<script lang="ts" setup></script>

<template>
  <div>
    <Header />
    <UContainer class="flex gap-8">
      <PageNavigation />
      <UContainer class="flex-1">
        <slot />
      </UContainer>
    </UContainer>
  </div>
</template>

<style></style>
