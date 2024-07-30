<script setup lang="ts">
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const platform = ref("windows");
onMounted(async () => {
  const platform_data = await window.ipcRenderer.invoke("app_platform");
  platform.value = platform_data;
});
</script>

<template>
  <Menubar
    :class="
      cn('rounded-none border-b border-none px-2 lg:px-4', platform === 'darwin' && 'ml-[50px]')
    "
  >
    <MenubarMenu>
      <MenubarTrigger class="font-bold"> Music </MenubarTrigger>
      <MenubarContent>
        <MenubarItem>About Music</MenubarItem>
        <MenubarSeparator />
        <MenubarItem> Preferences... <MenubarShortcut>⌘,</MenubarShortcut> </MenubarItem>
        <MenubarSeparator />
        <MenubarItem> Hide Music... <MenubarShortcut>⌘H</MenubarShortcut> </MenubarItem>
        <MenubarItem> Hide Others... <MenubarShortcut>⇧⌘H</MenubarShortcut> </MenubarItem>
        <MenubarShortcut />
        <MenubarItem> Quit Music <MenubarShortcut>⌘Q</MenubarShortcut> </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger class="relative"> File </MenubarTrigger>
      <MenubarContent>
        <MenubarSub>
          <MenubarSubTrigger>New</MenubarSubTrigger>
          <MenubarSubContent class="w-[230px]">
            <MenubarItem> Playlist <MenubarShortcut>⌘N</MenubarShortcut> </MenubarItem>
            <MenubarItem disabled>
              Playlist from Selection <MenubarShortcut>⇧⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem> Smart Playlist... <MenubarShortcut>⌥⌘N</MenubarShortcut> </MenubarItem>
            <MenubarItem>Playlist Folder</MenubarItem>
            <MenubarItem disabled> Genius Playlist </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarItem> Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut> </MenubarItem>
        <MenubarItem> Close Window <MenubarShortcut>⌘W</MenubarShortcut> </MenubarItem>
        <MenubarSeparator />
        <MenubarSub>
          <MenubarSubTrigger>Library</MenubarSubTrigger>
          <MenubarSubContent>
            <MenubarItem>Update Cloud Library</MenubarItem>
            <MenubarItem>Update Genius</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Organize Library...</MenubarItem>
            <MenubarItem>Export Library...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Import Playlist...</MenubarItem>
            <MenubarItem disabled> Export Playlist... </MenubarItem>
            <MenubarItem>Show Duplicate Items</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Get Album Artwork</MenubarItem>
            <MenubarItem disabled> Get Track Names </MenubarItem>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarItem> Import... <MenubarShortcut>⌘O</MenubarShortcut> </MenubarItem>
        <MenubarItem disabled> Burn Playlist to Disc... </MenubarItem>
        <MenubarSeparator />
        <MenubarItem> Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut> </MenubarItem>
        <MenubarItem>Convert</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Page Setup...</MenubarItem>
        <MenubarItem disabled> Print... <MenubarShortcut>⌘P</MenubarShortcut> </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>Edit</MenubarTrigger>
      <MenubarContent>
        <MenubarItem disabled> Undo <MenubarShortcut>⌘Z</MenubarShortcut> </MenubarItem>
        <MenubarItem disabled> Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut> </MenubarItem>
        <MenubarSeparator />
        <MenubarItem disabled> Cut <MenubarShortcut>⌘X</MenubarShortcut> </MenubarItem>
        <MenubarItem disabled> Copy <MenubarShortcut>⌘C</MenubarShortcut> </MenubarItem>
        <MenubarItem disabled> Paste <MenubarShortcut>⌘V</MenubarShortcut> </MenubarItem>
        <MenubarSeparator />
        <MenubarItem> Select All <MenubarShortcut>⌘A</MenubarShortcut> </MenubarItem>
        <MenubarItem disabled> Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut> </MenubarItem>
        <MenubarSeparator />
        <MenubarItem>
          Smart Dictation...
          <MenubarShortcut>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
              <circle cx="17" cy="7" r="5" />
            </svg>
          </MenubarShortcut>
        </MenubarItem>
        <MenubarItem>
          Emoji & Symbols
          <MenubarShortcut>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              class="h-4 w-4"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path
                d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              />
            </svg>
          </MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem>Show Playing Next</MenubarCheckboxItem>
        <MenubarCheckboxItem checked> Show Lyrics </MenubarCheckboxItem>
        <MenubarSeparator />
        <MenubarItem inset disabled> Show Status Bar </MenubarItem>
        <MenubarSeparator />
        <MenubarItem inset> Hide Sidebar </MenubarItem>
        <MenubarItem disabled inset> Enter Full Screen </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger class="hidden md:block"> Account </MenubarTrigger>
      <MenubarContent>
        <MenubarLabel inset> Switch Account </MenubarLabel>
        <MenubarSeparator />
        <MenubarRadioGroup value="benoit">
          <MenubarRadioItem value="andy"> Andy </MenubarRadioItem>
          <MenubarRadioItem value="benoit"> Benoit </MenubarRadioItem>
          <MenubarRadioItem value="Luis"> Luis </MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarItem inset> Manage Family... </MenubarItem>
        <MenubarSeparator />
        <MenubarItem inset> Add Account... </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <MenubarMenu>
      <MenubarTrigger class="md:block"> demo </MenubarTrigger>
      <MenubarContent>
        <MenubarItem inset @click="router.push({ path: '/trading' })"> trading </MenubarItem>
        <MenubarSeparator />
        <MenubarLabel inset> examples </MenubarLabel>
        <MenubarSeparator />
        <MenubarItem inset @click="router.push({ path: '/examples/mail' })"> mail </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/examples/authentication' })">
          authentication
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/examples/cards' })"> cards </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/examples/dashboard' })">
          dashboard
        </MenubarItem>

        <MenubarRadioGroup value="forms">
          <MenubarRadioItem
            value="Profile"
            @click="router.push({ path: '/examples/forms/Profile' })"
          >
            Profile
          </MenubarRadioItem>
          <MenubarRadioItem
            value="Account"
            @click="router.push({ path: '/examples/forms/Account' })"
          >
            Account
          </MenubarRadioItem>
          <MenubarRadioItem
            value="Appearance"
            @click="router.push({ path: '/examples/forms/Appearance' })"
          >
            Appearance
          </MenubarRadioItem>
          <MenubarRadioItem
            value="Notifications"
            @click="router.push({ path: '/examples/forms/Notifications' })"
          >
            Notifications
          </MenubarRadioItem>
          <MenubarRadioItem
            value="Display"
            @click="router.push({ path: '/examples/forms/Display' })"
          >
            Display
          </MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarLabel inset> block </MenubarLabel>
        <MenubarSeparator />
        <MenubarItem inset @click="router.push({ path: '/block/Authentication01' })">
          Authentication01
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Authentication02' })">
          Authentication02
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Authentication03' })">
          Authentication03
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Authentication04' })">
          Authentication04
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Dashboard01' })">
          Dashboard01
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Dashboard02' })">
          Dashboard02
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Dashboard03' })">
          Dashboard03
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Dashboard04' })">
          Dashboard04
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Dashboard05' })">
          Dashboard05
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Dashboard06' })">
          Dashboard06
        </MenubarItem>
        <MenubarItem inset @click="router.push({ path: '/block/Dashboard07' })">
          Dashboard07
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
    <div class="flex-1 draggable h-full"></div>
  </Menubar>
</template>
