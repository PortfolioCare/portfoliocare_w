<script setup lang="ts">
import axios from "@/services/axios";
import { onMounted, ref } from "vue";
console.log(import.meta.env);
console.log(process.env.NODE_ENV);

const user = ref({ name: "", age: 0 });
onMounted(async () => {
  const response = await axios.get("/getUser");
  user.value = response.data;
  console.log(response);
});
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
