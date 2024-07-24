<template>
  <div
    :class="
      cn(
        'flex flex-shrink-0 h-[35px] w-full z-9999 items-center select-none draggable text-sm pl-3 bg-primary text-primary-foreground',
        platform === 'darwin' && 'justify-center',
        platform === 'linux' && 'hidden'
      )
    "
  >
    自定义标题栏
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

import { cn } from "@/lib/utils";

const platform = ref("windows");
onMounted(async () => {
  const platform_data = await window.ipcRenderer.invoke("app_platform");
  platform.value = platform_data;
});
</script>
