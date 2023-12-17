<template>
  <UContainer>
    <h1>Transactions</h1>
  </UContainer>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "dashboard" });

// const query = gql`
//   query transactions {
//     transactions {
//       amount
//       createdDate
//       transactionItems {
//         quantity
//         amount
//         id
//       }
//       password
//     }
//   }
// `;
// // const { result } = useQuery(query);
// const { data } = await useAsyncQuery(query);
// const counter = useCounter();
</script>

<style></style>
