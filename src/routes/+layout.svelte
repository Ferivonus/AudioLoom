<script lang="ts">
  import '../app.css';
  import { page } from '$app/stores';
  import { settingsStore } from '$lib/stores/settings';
</script>

<div class="h-screen w-screen flex flex-col bg-background text-text-main font-sans overflow-hidden transition-colors duration-300" data-theme={$settingsStore.theme}>
  
  <nav class="h-12 bg-background border-b border-border flex items-center px-6 shrink-0 z-50 shadow-sm transition-colors duration-300">
    <div class="flex items-center gap-8 w-full">
      
      <div class="flex items-center gap-2 cursor-default select-none">
         <svg class="w-5 h-5 text-primary transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
         <h1 class="text-lg font-semibold tracking-wide text-text-main transition-colors duration-300">Audio<span class="text-primary transition-colors duration-300">Loom</span></h1>
      </div>
      
      <div class="flex items-center gap-1">
        <a href="/" class="px-3 py-1.5 rounded-md text-sm font-medium border transition-all {$page.url.pathname === '/' ? 'bg-surface text-primary border-border shadow-sm' : 'border-transparent text-text-muted hover:text-text-main hover:bg-surface'}">
          Editör
        </a>
        <a href="/settings" class="px-3 py-1.5 rounded-md text-sm font-medium border transition-all {$page.url.pathname.startsWith('/settings') ? 'bg-surface text-primary border-border shadow-sm' : 'border-transparent text-text-muted hover:text-text-main hover:bg-surface'}">
          Ayarlar
        </a>
        <a href="/help" class="px-3 py-1.5 rounded-md text-sm font-medium border transition-all {$page.url.pathname.startsWith('/help') ? 'bg-surface text-primary border-border shadow-sm' : 'border-transparent text-text-muted hover:text-text-main hover:bg-surface'}">
          Yardım
        </a>
      </div>

    </div>
  </nav>

  <div class="flex-1 flex flex-col relative overflow-hidden">
    <slot />
  </div>

</div>