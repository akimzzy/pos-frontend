export default defineNuxtPlugin(async (nuxtApp) => {
  await fetchAuthUser();
});
