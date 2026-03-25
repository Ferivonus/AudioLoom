<script lang="ts">
  import '../app.css'; // Tailwind CSS dosyanızın yolu
  import { page } from '$app/stores';
</script>

<!-- Uygulamanın En Dış İskeleti (Tüm ekranı kaplar) -->
<div class="h-screen w-screen flex flex-col bg-zinc-950 text-zinc-200 font-sans overflow-hidden">
  
  <!-- Global Navigasyon (Her sayfada sabit kalır) -->
  <nav class="h-12 bg-zinc-950 border-b border-zinc-800 flex items-center px-6 shrink-0 z-50 shadow-sm">
    <div class="flex items-center gap-8 w-full">
      
      <!-- Logo -->
      <div class="flex items-center gap-2 cursor-default select-none">
         <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path></svg>
         <h1 class="text-lg font-semibold tracking-wide text-zinc-200">Audio<span class="text-emerald-500">Loom</span></h1>
      </div>
      
      <!-- Menü Linkleri -->
      <div class="flex items-center gap-1">
        <a href="/" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors {$page.url.pathname === '/' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}">
          Editör
        </a>
        <a href="/settings" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors {$page.url.pathname.startsWith('/settings') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}">
          Ayarlar
        </a>
        <a href="/help" class="px-3 py-1.5 rounded-md text-sm font-medium transition-colors {$page.url.pathname.startsWith('/help') ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'}">
          Yardım
        </a>
      </div>

    </div>
  </nav>

  <!-- Sayfaların (Editör, Ayarlar vs.) Geleceği Yer -->
  <div class="flex-1 flex flex-col relative overflow-hidden">
    <slot />
  </div>

</div>