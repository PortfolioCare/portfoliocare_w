<script setup lang="ts">
import Example from "@/views/mail/Example.vue";
import axios from "@/services/axios";
import { onMounted, ref } from "vue";
console.log(import.meta.env);
const env = import.meta.env;
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production" && env.VITE_MOCK === "true") {
  import("./mock/mockProdServer").then(({ setupProdMockServer }) => {
    setupProdMockServer();
  });
}
const user = ref({ name: "", age: 0 });
onMounted(async () => {
  const response = await axios.get("/getUser");
  user.value = response.data;
});
</script>

<template>
  <div>
    <Example />
  </div>
</template>
