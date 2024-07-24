<script lang="ts" setup>
import Mail from "./components/Mail.vue";
import { accounts, mails } from "./data/mails";
</script>

<template>
  <div class="flex-col md:flex w-dvh h-dvh">
    <Mail :accounts="accounts" :mails="mails" :nav-collapsed-size="4" />
  </div>
</template>
