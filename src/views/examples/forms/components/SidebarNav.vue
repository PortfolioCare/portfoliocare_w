<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";
const router = useRouter();
interface Item {
  title: string;
  href: string;
}

const sidebarNavItems: Item[] = [
  {
    title: "Profile",
    href: "/examples/forms",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];
</script>

<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <Button
      v-for="item in sidebarNavItems"
      :key="item.title"
      variant="ghost"
      :class="
        cn(
          'w-full text-left justify-start',
          $route.path === `${item.href}.html` && 'bg-muted hover:bg-muted'
        )
      "
      @click="router.push({ path: item.href })"
    >
      {{ item.title }}
    </Button>
  </nav>
</template>
