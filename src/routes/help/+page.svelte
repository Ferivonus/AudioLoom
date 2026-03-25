<script lang="ts">
</script>

<svelte:head>
  <title>Yardım - AudioLoom</title>
</svelte:head>

<div class="flex-1 overflow-y-auto p-8 bg-zinc-950 font-sans">
  <div class="max-w-4xl mx-auto">
    <div class="mb-10">
      <h2 class="text-3xl font-bold text-white tracking-tight">Kullanım Kılavuzu ve Yardım</h2>
      <p class="text-zinc-400 text-sm mt-2">AudioLoom'un tüm özelliklerini keşfedin ve miksinizi bir profesyonel gibi yönetin.</p>
    </div>
    
    <div class="grid gap-8">
      
      <!-- 1. Kısayollar -->
      <section class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-emerald-400 mb-5 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          Temel Kısayollar ve İpuçları
        </h3>
        
        <ul class="space-y-4 text-sm text-zinc-300">
          <li class="flex justify-between items-center border-b border-zinc-800/50 pb-3">
            <span>Oynat / Duraklat</span>
            <kbd class="bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-700 font-mono text-xs text-emerald-400 shadow-inner">Space (Boşluk)</kbd>
          </li>
          <li class="flex justify-between items-center border-b border-zinc-800/50 pb-3">
            <div class="flex flex-col">
              <span>Sesi Varsayılana Sıfırla (%80)</span>
              <span class="text-[10px] text-zinc-500">Ses çubuğunun yanındaki VOL etiketine uygulanır</span>
            </div>
            <span class="text-zinc-400 font-medium">Çift Tıkla</span>
          </li>
          <li class="flex justify-between items-center border-b border-zinc-800/50 pb-3">
            <div class="flex flex-col">
              <span>Sesi Merkeze (Center) Al</span>
              <span class="text-[10px] text-zinc-500">L-C-R yazan buton grubuna uygulanır</span>
            </div>
            <span class="text-zinc-400 font-medium">Çift Tıkla</span>
          </li>
          <li class="flex justify-between items-center">
            <div class="flex flex-col">
              <span>Sol Menüyü Genişlet / Daralt</span>
              <span class="text-[10px] text-zinc-500">Kanallar menüsünün sağ kenarından ayarlayabilirsiniz (Ok tuşları ile de desteklenir)</span>
            </div>
            <span class="text-zinc-400 font-medium">Kenarı Sürükle</span>
          </li>
        </ul>
      </section>

      <!-- 2. Kanal (Track) İşlemleri -->
      <section class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-emerald-400 mb-5 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
          Kanal (Track) Yönetimi
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div class="space-y-2">
            <h4 class="text-zinc-200 font-medium flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> İsim Değiştirme
            </h4>
            <p class="text-zinc-400">Kanalların ismini değiştirmek için sol taraftaki isim alanına tıklamanız ve yeni ismi yazmanız yeterlidir.</p>
          </div>
          <div class="space-y-2">
            <h4 class="text-zinc-200 font-medium flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Sıralama (Taşıma)
            </h4>
            <p class="text-zinc-400">Kanalın en solundaki Yukarı <svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7"></path></svg> ve Aşağı <svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 9l-7 7-7-7"></path></svg> oklarını kullanarak seslerin sırasını değiştirebilirsiniz.</p>
          </div>
          <div class="space-y-2">
            <h4 class="text-zinc-200 font-medium flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Solo (S) ve Mute (M)
            </h4>
            <p class="text-zinc-400"><strong class="text-amber-400">S (Solo)</strong> tuşu sadece o kanalı duymanızı sağlar. <strong class="text-red-400">M (Mute)</strong> tuşu ise o kanalı tamamen sessize alır.</p>
          </div>
          <div class="space-y-2">
            <h4 class="text-zinc-200 font-medium flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Pan (Sağ - Sol Ayarı)
            </h4>
            <p class="text-zinc-400">Sesin hangi kulaklıktan/hoparlörden geleceğini ayarlayabilirsiniz. (L: Sol, C: Merkez, R: Sağ).</p>
          </div>
        </div>
      </section>

      <!-- 3. Kesme ve Kırpma İşlemleri -->
      <section class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-emerald-400 mb-5 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"></path></svg>
          Kesme (Cut), Kırpma (Trim) ve Renk Kodları
        </h3>
        
        <div class="space-y-6 text-sm">
          <div>
            <h4 class="text-zinc-200 font-medium mb-1">Seçim Yapmak ve Hassas Ayar</h4>
            <p class="text-zinc-400">Sağ taraftaki dalga formu üzerinde farenizle <strong class="text-zinc-200">tıklayıp sürükleyerek</strong> bir alan seçebilirsiniz. Seçim yaptıktan sonra ekranın altında beliren kutucuktaki saniye değerlerini klavye ile manuel olarak değiştirerek (Örn: <code class="bg-zinc-800 px-1 rounded">12.5</code>) milisaniyelik hassas seçimler yapabilirsiniz. <em>Not: Bitiş süresi, başlangıç süresinden küçük olamaz.</em></p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
              <h4 class="font-medium text-rose-400 flex items-center gap-2 mb-2">
                <span class="w-3 h-3 rounded bg-rose-500"></span> Kes (Ortayı At)
              </h4>
              <p class="text-zinc-400 text-xs">Seçtiğiniz alanı siler ve dışta kalan iki parçayı birleştirir. İşlem gören dosyanın rengi arayüzde <strong class="text-rose-400">Kırmızı (Gül)</strong> tonunda belirtilir.</p>
            </div>
            
            <div class="p-4 bg-zinc-950 rounded-lg border border-zinc-800">
              <h4 class="font-medium text-cyan-400 flex items-center gap-2 mb-2">
                <span class="w-3 h-3 rounded bg-cyan-500"></span> Kırp (Kenarları At)
              </h4>
              <p class="text-zinc-400 text-xs">Sadece seçtiğiniz alanı tutar, sağ ve solunda kalan fazlalıkları siler. İşlem gören dosyanın rengi arayüzde <strong class="text-cyan-400">Mavi (Camgöbeği)</strong> tonunda belirtilir.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Dışa Aktarma -->
      <section class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
          Kaydetme ve Dışa Aktarma (Export)
        </h3>
        <div class="space-y-4 text-sm">
          <div class="border-l-2 border-emerald-500 pl-4 py-1">
            <h4 class="text-zinc-200 font-medium">Bireysel Kanalı Dışa Aktar</h4>
            <p class="text-zinc-400 mt-1">Sadece tek bir sesi (kestiğiniz, sesini kıstığınız veya sağa/sola yönlendirdiğiniz ayarlarıyla birlikte) dışa aktarmak için o kanalın adının yanındaki <strong>Aşağı Ok</strong> ikonuna tıklayabilirsiniz.</p>
          </div>
          <div class="border-l-2 border-emerald-500 pl-4 py-1">
            <h4 class="text-zinc-200 font-medium">Tüm Miksi Dışa Aktar</h4>
            <p class="text-zinc-400 mt-1">Ekrandaki tüm sesleri (Solo ve Mute durumları dikkate alınarak) tek bir <code>.wav</code> dosyası olarak birleştirmek için sağ üstteki <strong class="text-white bg-emerald-600 px-2 py-0.5 rounded text-xs">Mix'i Dışa Aktar</strong> butonunu kullanın.</p>
          </div>
        </div>
      </section>

    </div>
  </div>
</div>