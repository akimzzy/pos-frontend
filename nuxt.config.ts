// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/apollo"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:3001/graphql",
        httpLinkOptions: {
          credentials: "include",
        },
      },
    },
  },
  ssr: true,
});
