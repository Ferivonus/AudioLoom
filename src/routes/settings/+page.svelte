<script lang="ts">
  import { settingsStore } from '$lib/stores/settings';
  import { open } from '@tauri-apps/plugin-dialog';

  const audioFormats = [
    { id: 'wav', name: 'WAV (Kayıpsız, Yüksek Kalite)', color: 'text-emerald-400' },
    { id: 'mp3', name: 'MP3 (Standart, Düşük Boyut)', color: 'text-cyan-400' },
    { id: 'flac', name: 'FLAC (Sıkıştırılmış Kayıpsız)', color: 'text-purple-400' },
    { id: 'ogg', name: 'OGG (Web için Optimize)', color: 'text-amber-400' },
    { id: 'aac', name: 'AAC (Gelişmiş Ses)', color: 'text-rose-400' }
  ];

  const dateFormats = [
    { id: 'DD-MM-YYYY', label: 'Gün-Ay-Yıl (Örn: 24-03-2026)' },
    { id: 'MM-DD-YYYY', label: 'Ay-Gün-Yıl (Örn: 03-24-2026)' },
    { id: 'YYYY-MM-DD', label: 'Yıl-Ay-Gün (Örn: 2026-03-24)' }
  ];

  // YENİ: Tema Seçenekleri
  const themes = [
    { id: 'dark', name: 'Karanlık (Varsayılan)', icon: '🌙' },
    { id: 'light', name: 'Aydınlık', icon: '☀️' },
    { id: 'midnight', name: 'Gece Yarısı', icon: '🌌' }
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
    
    let dateStr = '24-03-2026';
    if ($settingsStore.folderFormat === 'MM-DD-YYYY') dateStr = '03-24-2026';
    else if ($settingsStore.folderFormat === 'YYYY-MM-DD') dateStr = '2026-03-24';

    const folderName = $settingsStore.customPrefix ? `${$settingsStore.customPrefix}_${dateStr}` : dateStr;
    const subFolder = $settingsStore.subFolder ? `${sep}${$settingsStore.subFolder}` : '';
    
    return `${base}${sep}${folderName}${subFolder}${sep}Miks_Dosyasi.${$settingsStore.exportFormat}`;
  })();
</script>

<svelte:head>
  <title>Ayarlar - AudioLoom</title>
</svelte:head>

<!-- Arka planı Tailwind değişkenleri ile kontrol edilecek şekilde (bg-background) güncelledik -->
<div class="flex-1 overflow-y-auto p-8 bg-background font-sans transition-colors duration-300">
  <div class="max-w-4xl mx-auto">
    <div class="mb-10">
      <h2 class="text-3xl font-bold text-text-main tracking-tight">Tercihler ve Dışa Aktarma</h2>
      <p class="text-text-muted text-sm mt-2">Ses formatlarınızı, klasör dizilimlerinizi ve arayüz temanızı yönetin.</p>
    </div>

    <div class="grid gap-8">
      
      <!-- 1. Görünüm (Tema) Ayarları -->
      <section class="bg-surface border border-border rounded-xl p-6 shadow-sm transition-colors duration-300">
        <h3 class="text-lg font-semibold text-primary mb-5">Görünüm (Tema)</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          {#each themes as theme}
            <button 
              type="button"
              on:click={() => $settingsStore.theme = theme.id}
              class="p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center gap-2 {$settingsStore.theme === theme.id ? 'bg-surface border-primary shadow-md' : 'bg-background border-border hover:border-text-muted opacity-70'}"
            >
              <span class="text-2xl">{theme.icon}</span>
              <span class="text-sm text-text-main font-medium">{theme.name}</span>
            </button>
          {/each}
        </div>
      </section>

      <!-- 2. Dosya Formatı Ayarı -->
      <section class="bg-surface border border-border rounded-xl p-6 shadow-sm transition-colors duration-300">
        <h3 class="text-lg font-semibold text-primary mb-5">Varsayılan Ses Formatı</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each audioFormats as format}
            <button 
              type="button"
              on:click={() => $settingsStore.exportFormat = format.id}
              class="w-full text-left p-4 rounded-lg border-2 cursor-pointer transition-all flex flex-col gap-2 {$settingsStore.exportFormat === format.id ? 'bg-surface border-primary shadow-md' : 'bg-background border-border hover:border-text-muted opacity-70'}"
            >
              <span class="text-xl font-black {format.color} uppercase tracking-wider">{format.id}</span>
              <span class="text-xs text-text-muted font-medium">{format.name}</span>
            </button>
          {/each}
        </div>
      </section>

      <!-- 3. Klasör ve Otomasyon Ayarları -->
      <section class="bg-surface border border-border rounded-xl p-6 shadow-sm transition-colors duration-300">
        <h3 class="text-lg font-semibold text-primary mb-5">Klasör Dizilimi ve Otomasyon</h3>
        
        <div class="space-y-6">
          <div class="flex flex-col gap-2">
            <label for="baseExportDir" class="text-sm font-medium text-text-main">Ana Kayıt Klasörü</label>
            <div class="flex gap-2">
              <input id="baseExportDir" type="text" readonly value={$settingsStore.baseExportDir || 'Lütfen bir klasör seçin...'} class="flex-1 bg-background border border-border text-text-main rounded-md px-3 py-2 outline-none text-sm opacity-70 cursor-not-allowed">
              <button on:click={pickDirectory} class="px-4 py-2 bg-primary hover:opacity-80 text-white rounded-md text-sm font-medium transition-all whitespace-nowrap">Klasör Seç</button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex flex-col gap-2">
              <label for="customPrefix" class="text-sm font-medium text-text-main">Proje / Kök İsim</label>
              <input id="customPrefix" type="text" bind:value={$settingsStore.customPrefix} placeholder="Örn: AudioLoom" class="bg-background border border-border focus:border-primary text-text-main rounded-md px-3 py-2 outline-none text-sm transition-colors">
            </div>
            
            <div class="flex flex-col gap-2">
              <label for="folderFormat" class="text-sm font-medium text-text-main">Tarih Formatı</label>
              <select id="folderFormat" bind:value={$settingsStore.folderFormat} class="bg-background border border-border focus:border-primary text-text-main rounded-md px-3 py-2 outline-none text-sm transition-colors appearance-none">
                {#each dateFormats as df}
                  <option value={df.id}>{df.label}</option>
                {/each}
              </select>
            </div>

            <div class="flex flex-col gap-2">
              <label for="subFolder" class="text-sm font-medium text-text-main">Alt Klasör (İsteğe Bağlı)</label>
              <input id="subFolder" type="text" bind:value={$settingsStore.subFolder} placeholder="Örn: Bitenler" class="bg-background border border-border focus:border-primary text-text-main rounded-md px-3 py-2 outline-none text-sm transition-colors">
            </div>
          </div>

          <div class="pt-4 border-t border-border flex items-center justify-between">
            <div>
              <h4 class="text-text-main font-medium">Hızlı Dışa Aktarma (Diyalog Penceresiz)</h4>
              <p class="text-text-muted text-xs mt-1">Açıksa doğrudan yukarıdaki klasöre sormadan kaydeder.</p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" bind:checked={$settingsStore.askEveryTime} class="sr-only peer">
              <div class="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:left-[calc(100%-2px)] peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:right-5.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all {!$settingsStore.askEveryTime ? 'bg-primary after:translate-x-5' : ''}"></div>
            </label>
          </div>
        </div>
      </section>

      <!-- 4. Klasör Önizlemesi -->
      <section class="bg-background border border-primary/30 rounded-xl p-5 shadow-inner transition-colors duration-300">
        <h4 class="text-xs font-bold text-primary uppercase tracking-wider mb-2">Çıktı Yolu Önizlemesi</h4>
        <div class="font-mono text-xs text-text-main break-all leading-relaxed">
          {previewPath}
        </div>
      </section>

    </div>
  </div>
</div>