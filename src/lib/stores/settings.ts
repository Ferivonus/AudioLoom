import { writable } from 'svelte/store';

export interface Settings {
    exportFormat: string;
    baseExportDir: string;
    folderFormat: string;
    customPrefix: string;
    subFolder: string;
    askEveryTime: boolean;
    theme: string;
}

// Varsayılan ayarlar
const defaultSettings: Settings = {
    exportFormat: 'wav',
    baseExportDir: '',
    folderFormat: 'DD-MM-YYYY',
    customPrefix: 'AudioLoom',
    subFolder: 'Mixler',
    askEveryTime: true,
    theme: 'dark' // Varsayılan tema
};

// Tarayıcı (localStorage) kontrolü ve veriyi çekme
const stored = typeof window !== 'undefined' ? localStorage.getItem('audioloom_settings') : null;
const initialValue: Settings = stored ? JSON.parse(stored) : defaultSettings;

export const settingsStore = writable<Settings>(initialValue);

// Herhangi bir ayar değiştiğinde otomatik olarak LocalStorage'a kaydet
settingsStore.subscribe(value => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('audioloom_settings', JSON.stringify(value));
    }
});