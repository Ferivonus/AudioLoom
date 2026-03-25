<script lang="ts">
  import { settingsStore } from '$lib/stores/settings';
  import { open } from '@tauri-apps/plugin-dialog';
  import { fade, fly } from 'svelte/transition';

  const audioFormats = [
    { id: 'wav', name: 'WAV', desc: 'Kayıpsız Yüksek Kalite', color: 'text-primary' },
    { id: 'mp3', name: 'MP3', desc: 'Standart Düşük Boyut', color: 'text-primary-sec' },
    { id: 'flac', name: 'FLAC', desc: 'Sıkıştırılmış Kayıpsız', color: 'text-text-main' },
    { id: 'ogg', name: 'OGG', desc: 'Web Optimize', color: 'text-text-muted' },
    { id: 'aac', name: 'AAC', desc: 'Gelişmiş Ses Bloğu', color: 'text-primary' }
  ];

  const dateFormats = [
    { id: 'DD-MM-YYYY', label: 'Gün-Ay-Yıl', preview: '25-03-2026' },
    { id: 'MM-DD-YYYY', label: 'Ay-Gün-Yıl', preview: '03-25-2026' },
    { id: 'YYYY-MM-DD', label: 'Yıl-Ay-Gün', preview: '2026-03-25' }
  ];

  const themes = [
    { id: 'modern', name: 'Modern Dark', desc: 'Profesyonel denge', reklam: 'VARSAYILAN', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>` },
    { id: 'orkun-favori', name: 'Orkun Favori', desc: 'Neon enerji', reklam: 'FAVORİ', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>` },
    { id: 'lofi', name: 'Lofi Aesthetic', desc: 'Sakin mod', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Z"/><path d="M18 14h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-3a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3Z"/><path d="M9 17V9a9 9 0 1 1 18 0v8"/></svg>` },
    { id: 'ghibli', name: 'Ghibli Forest', desc: 'Doğa estetiği', reklam: 'DEV CHOICE', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 20h5"/><path d="M2 20h5"/><path d="M7 20v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2"/><path d="M12 14v-4"/></svg>` },
    { id: 'retro', name: 'Retro Synth', desc: '80ler arcade', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/></svg>` },
    { id: 'ocean', name: 'Deep Ocean', desc: 'Huzurlu derinlik', reklam: 'POPÜLER', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>` },
    { id: 'sakura', name: 'Night Sakura', desc: 'Zarif tonlar', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 12s.5-1.5.5-3.5S11 5 11 5s-1.5.5-3.5.5-3.5-1.5-3.5-1.5.5 1.5.5 3.5S5 13 5 13s1.5-.5 3.5-.5 3.5 1.5 3.5 1.5Z"/></svg>` },
    { id: 'oled', name: 'True OLED', desc: 'Maksimum siyah', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>` },
    { id: 'light', name: 'Pure Light', desc: 'Aydınlık ferahlık', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2m10-10h-2M4 12H2"/></svg>` },
    { id: 'nord', name: 'Arctic Nord', desc: 'Kuzey ışıkları', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" x2="12" y1="2" y2="22"/><line x1="20.24" x2="3.76" y1="7" y2="17"/><line x1="20.24" x2="3.76" y1="17" y2="7"/></svg>` },
    { id: 'cyberpunk', name: 'Cyber Neon', desc: 'Hacker modu', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/></svg>` }
  ];

  async function pickDirectory() {
    const selected = await open({
      directory: true,
      multiple: false,
      title: 'Ana Kayıt Klasörünü Seçin'
    });
    if (selected && typeof selected === 'string') {
      $settingsStore.baseExportDir = selected;
    }
  }

  $: previewPath = (() => {
    const sep = $settingsStore.baseExportDir.includes('\\') ? '\\' : '/';
    let base = $settingsStore.baseExportDir || '[SEÇİLMEDİ]';
    let dateStr = '25-03-2026';
    if ($settingsStore.folderFormat === 'MM-DD-YYYY') dateStr = '03-25-2026';
    else if ($settingsStore.folderFormat === 'YYYY-MM-DD') dateStr = '2026-03-25';
    const folderName = $settingsStore.customPrefix ? `${$settingsStore.customPrefix}_${dateStr}` : dateStr;
    const subFolder = $settingsStore.subFolder ? `${sep}${$settingsStore.subFolder}` : '';
    return `${base}${sep}${folderName}${subFolder}${sep}Miks_Dosyasi.${$settingsStore.exportFormat}`;
  })();
</script>

<svelte:head>
  <title>Ayarlar - AudioLoom</title>
</svelte:head>

<div class="p-8 lg:p-12 w-full min-h-full pb-32 flex flex-col relative max-w-6xl mx-auto bg-transparent text-text-main transition-colors duration-500 overflow-y-auto custom-scrollbar">
  
  <button 
    type="button"
    on:click={() => history.back()} 
    class="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group w-fit shrink-0"
    in:fly={{ x: -20, duration: 500 }}
  >
    <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
    <span class="text-[10px] font-black uppercase tracking-[0.2em]">Ana Sisteme Dön</span>
  </button>

  <header class="mb-12 shrink-0" in:fly={{ y: -20, duration: 600, delay: 100 }}>
    <div class="flex items-center gap-3 mb-4">
      <span class="flex h-2.5 w-2.5 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
      </span>
      <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary">System Configuration</span>
    </div>
    <h1 class="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic leading-none truncate drop-shadow-lg">Ayarlar</h1>
    <p class="text-text-muted mt-4 font-bold text-sm uppercase tracking-widest opacity-60">AudioLoom Terminal v4.0</p>
  </header>

  <div class="grid gap-12">
    
    <section class="space-y-8" in:fade={{ delay: 200 }}>
      <div class="flex items-end justify-between border-b border-border pb-4">
        <div>
          <h2 class="text-2xl font-black uppercase italic tracking-tight">Görünüm</h2>
          <p class="text-text-muted text-xs font-bold uppercase tracking-widest mt-1">Sistem arayüzü ve renk paletleri</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {#each themes as theme}
          <button 
            type="button"
            on:click={() => $settingsStore.theme = theme.id}
            class="theme-{theme.id} flex flex-col gap-3 group text-left relative transition-all duration-300 hover:-translate-y-1 active:scale-95 w-full"
          >
            <div 
              class="aspect-16/10 w-full rounded-2xl border-2 transition-all duration-500 relative overflow-hidden p-5 flex flex-col justify-between bg-background
              {$settingsStore.theme === theme.id 
                ? 'border-primary shadow-[0_15px_40px_rgba(0,0,0,0.4),0_0_20px_var(--accent)]' 
                : 'border-border opacity-70 hover:opacity-100 hover:shadow-xl'}"
            >
              {#if theme.reklam}
                <div class="absolute top-2 left-3 z-10 opacity-80">
                  <span class="text-[8px] font-black uppercase tracking-[0.2em] text-primary">{theme.reklam}</span>
                </div>
              {/if}

              <div class="relative z-20 space-y-2 mt-4">
                <div class="flex gap-1.5">
                  <div class="w-2.5 h-2.5 rounded-full shadow-lg shrink-0 bg-primary"></div>
                  <div class="w-8 h-2.5 rounded-full opacity-30 shrink-0 bg-primary"></div>
                </div>
                <div class="w-12 h-1 bg-primary opacity-10 rounded-full"></div>
              </div>

              <div class="absolute -bottom-4 -right-4 text-6xl font-black opacity-[0.04] italic select-none group-hover:opacity-[0.08] transition-opacity tracking-tighter text-primary">
                {theme.name.split(' ')[0]}
              </div>

              <div class="absolute top-4 right-4 text-primary opacity-40 group-hover:opacity-100 w-5 h-5 transition-all">
                {@html theme.svg}
              </div>

              {#if $settingsStore.theme === theme.id}
                <div class="absolute inset-0 flex items-center justify-center backdrop-blur-[1px] z-30 bg-primary/10" in:fade>
                  <div class="w-10 h-10 bg-text-main text-background rounded-full flex items-center justify-center shadow-2xl scale-110 shrink-0">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  </div>
                </div>
              {/if}
            </div>

            <div class="px-1">
              <span class="text-sm font-black uppercase tracking-widest block transition-colors {$settingsStore.theme === theme.id ? 'text-primary' : 'group-hover:text-primary'}">{theme.name}</span>
              <span class="text-[9px] text-text-muted font-bold uppercase tracking-tighter opacity-70 block">{theme.desc}</span>
            </div>
          </button>
        {/each}
      </div>
    </section>

    <section class="bg-surface border border-border rounded-4xl p-8 lg:p-10 shadow-2xl relative overflow-hidden" in:fade={{ delay: 300 }}>
      <div class="flex items-center gap-5 mb-10">
        <div class="p-4 bg-primary/10 rounded-2xl text-primary shadow-inner">
          <svg class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        </div>
        <div>
          <h2 class="text-2xl font-black uppercase italic tracking-tight text-text-main">Dışa Aktarma Protokolü</h2>
          <p class="text-text-muted text-[10px] uppercase tracking-widest font-bold mt-1">Sistem formatı ve dizin yapılandırması</p>
        </div>
      </div>

      <div class="space-y-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each audioFormats as format}
            <button 
              type="button" 
              on:click={() => $settingsStore.exportFormat = format.id}
              class="group relative flex flex-col p-6 bg-background border border-border rounded-2xl transition-all hover:border-primary/50 {$settingsStore.exportFormat === format.id ? 'ring-2 ring-primary border-transparent' : ''}"
            >
              <span class="text-3xl font-black uppercase tracking-tighter italic transition-colors {format.color} {$settingsStore.exportFormat === format.id ? '' : 'opacity-40 group-hover:opacity-100'}">{format.id}</span>
              <span class="text-[10px] font-black uppercase tracking-widest mt-1 text-text-muted">{format.desc}</span>
              {#if $settingsStore.exportFormat === format.id}
                <div class="absolute top-5 right-5 w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--accent)]"></div>
              {/if}
            </button>
          {/each}
        </div>

        <div class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="space-y-2">
              <label for="customPrefix" class="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-60">Kök İsim</label>
              <input id="customPrefix" type="text" bind:value={$settingsStore.customPrefix} class="w-full bg-background border border-border rounded-xl p-4 text-sm outline-none focus:border-primary transition-all font-bold text-text-main placeholder:opacity-20" />
            </div>
            <div class="space-y-2">
              <label for="folderFormat" class="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-60">Zaman Dizilimi</label>
              <select id="folderFormat" bind:value={$settingsStore.folderFormat} class="w-full bg-background border border-border rounded-xl p-4 text-sm outline-none focus:border-primary transition-all font-bold text-text-main appearance-none cursor-pointer">
                {#each dateFormats as df}
                  <option value={df.id}>{df.label} ({df.preview})</option>
                {/each}
              </select>
            </div>
            <div class="space-y-2">
              <label for="subFolder" class="text-[10px] font-black text-text-muted uppercase tracking-widest ml-1 opacity-60">Alt Dizin</label>
              <input id="subFolder" type="text" bind:value={$settingsStore.subFolder} class="w-full bg-background border border-border rounded-xl p-4 text-sm outline-none focus:border-primary transition-all font-bold text-text-main placeholder:opacity-20" />
            </div>
          </div>

          <div class="space-y-4 pt-4 border-t border-border/10">
            <p class="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] ml-1">Nihai Kayıt Yolu</p>
            <div class="flex flex-col md:flex-row items-center gap-4 bg-background p-3 rounded-2xl border border-border group hover:border-primary/30 transition-colors">
              <code class="text-primary text-xs truncate flex-1 font-mono px-4 select-all bg-black/40 py-4 rounded-xl block w-full tracking-tighter opacity-80">{$settingsStore.baseExportDir ? previewPath : 'SİSTEM DİZİNİ SEÇİLMEDİ'}</code>
              <button 
                type="button"
                on:click={pickDirectory}
                class="w-full md:w-auto bg-text-main text-background hover:bg-primary hover:text-text-main text-[10px] font-black py-4 px-10 rounded-xl transition-all active:scale-95 uppercase tracking-[0.2em] shrink-0 shadow-lg"
              >
                Dizini Protokolünü Değiştir
              </button>
            </div>
          </div>
        </div>

        <button 
          type="button"
          on:click={() => $settingsStore.askEveryTime = !$settingsStore.askEveryTime}
          class="flex items-center justify-between p-6 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all group w-full"
        >
          <div class="text-left">
            <p class="text-xs font-black uppercase tracking-widest text-text-main">Hızlı Otomatik Kayıt</p>
            <p class="text-[10px] text-text-muted mt-1 font-bold uppercase opacity-60">Her işlemde onay penceresini atla</p>
          </div>
          <div class="w-12 h-6 rounded-full relative transition-colors shrink-0 {!$settingsStore.askEveryTime ? 'bg-primary shadow-[0_0_10px_var(--accent)]' : 'bg-border'}">
            <div class="absolute top-1 w-4 h-4 bg-white rounded-full transition-all {!$settingsStore.askEveryTime ? 'left-7' : 'left-1'}"></div>
          </div>
        </button>
      </div>
    </section>

    <footer class="flex flex-col items-center justify-center py-20 group shrink-0" in:fade={{ delay: 500 }}>
      <div class="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mb-6 rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-[0_15px_40px_rgba(0,0,0,0.4),0_0_20px_var(--accent)]">
        <svg class="w-8 h-8 text-background" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
      </div>
      <h3 class="text-3xl font-black tracking-[0.4em] uppercase italic drop-shadow-2xl text-text-main">AudioLoom</h3>
      <div class="mt-8 flex flex-col items-center gap-2">
        <p class="text-[11px] font-black text-primary uppercase tracking-[0.5em] animate-pulse px-4 text-center">Fahrettin Baştürk tarafından yapıldı</p>
        <div class="flex items-center justify-center gap-3 mt-1 opacity-30">
          <span class="h-px w-8 bg-text-muted"></span>
          <p class="text-[9px] font-mono text-text-muted font-bold uppercase tracking-widest">System v4.0 Stable Build</p>
          <span class="h-px w-8 bg-text-muted"></span>
        </div>
      </div>
    </footer>

  </div>
</div>

<style>
  .custom-scrollbar::-webkit-scrollbar { width: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--accent); }

  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2371717a'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.25rem;
  }
</style>