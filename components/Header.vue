<script setup lang="ts">
const links = [
  {
    label: "Documentation",
    icon: "i-heroicons-book-open",
    to: "/getting-started",
  },
  {
    label: "Pro",
    icon: "i-heroicons-square-3-stack-3d",
    to: "/pro",
  },
  {
    label: "Releases",
    icon: "i-heroicons-rocket-launch",
    to: "https://github.com/nuxt/ui/releases",
    target: "_blank",
  },
];
</script>

<template>
  <UContainer class="flex justify-between my-10 mx-0">
    <div>Logo</div>
    <div>
      <UAvatar alt="Benjamin Canac" size="sm" />
      <ULink
        to="/elements/link"
        active-class="text-primary"
        inactive-class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
      >
        Link
      </ULink>
    </div>
  </UContainer>
</template>
