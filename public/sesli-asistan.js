/*! Uos Media · Sesli asistan (ElevenLabs) · v2
 * Sitenin sağ altına yuvarlak sesli asistan ekler. Butona basınca pencere alttan büyür;
 * ortadaki küreye (telefon) basıp konuşabilir ya da alttan yazabilirsiniz.
 *
 * Kurulum: bu kodu sitenizde body etiketi kapanmadan hemen önce bir script etiketinin içine yapıştırın
 * (bu sitede public/sesli-asistan.js olarak duruyor ve app/layout.tsx içinden next/script ile yükleniyor).
 * Ayar değiştirmek için bu kodun önüne ayrı bir script içinde şunu yazabilirsiniz:
 *   window.UosSesliAsistanAyar = { kvkkLinki: 'https://firma.com/kvkk' };
 * Sayfadaki bir butondan açmak için: UosSesliAsistan.ac()  ·  doğrudan konuşma başlatmak için: UosSesliAsistan.konus()
 * Google Tag Manager için dataLayer'a "sesli_asistan" olayı gönderir (sesli_asistan_eylem: acildi,
 * sesli_basladi, yazili_basladi, basvuru_gonderildi, bitti).
 */
(() => {
  'use strict';
  if (window.UosSesliAsistan || document.getElementById('uos-sesli-asistan')) return;

  const AYAR = Object.assign({
    ajanId: 'agent_3601m789a961es0srge797chb1dz',
    firma: 'uosmedya',
    firmaAdi: 'UOS Medya',
    dil: 'Türkçe',
    karsilama: 'Reklam, video, sosyal medya ve dijital pazarlama sorularınızı sesli ya da yazılı sorabilirsiniz.',
    yerTutucu: 'Ya da mesaj yazın…',
    renk: '#d4af37',
    ikinciRenk: '#141414',
    kvkkLinki: '',
    onayIste: true
  }, window.UosSesliAsistanAyar || {});

  const HEX = /^#[0-9a-f]{6}$/i;
  const RENK = HEX.test(AYAR.renk) ? AYAR.renk : '#f26a1b';
  const IKINCI = HEX.test(AYAR.ikinciRenk) ? AYAR.ikinciRenk : '#2b3036';
  const rgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const karistir = (h, hedef, oran) => {
    const a = rgb(h), b = rgb(hedef);
    return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * oran).toString(16).padStart(2, '0')).join('');
  };
  const parlaklik = h => {
    const [r, g, b] = rgb(h).map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const kontrast = (a, b) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  // Ana rengin üstündeki yazı: beyaz yeterince okunuyorsa beyaz, değilse koyu
  const RENK_YAZI = kontrast(parlaklik(RENK), 1) >= 3 ? '#ffffff' : '#17191c';
  // Beyaz zemin üstünde okunacak ton (bağlantı, odak çizgisi)
  let RENK_METIN = RENK;
  for (let i = 1; i <= 10 && kontrast(parlaklik(RENK_METIN), 1) < 4.5; i++) RENK_METIN = karistir(RENK, '#000000', i * 0.08);
  const RENK_RGB = rgb(RENK).join(',');
  const KURE = 'conic-gradient(from 0deg, ' + [
    RENK, karistir(RENK, '#ffffff', 0.25) + ' 14%', karistir(RENK, '#ffffff', 0.6) + ' 26%', karistir(RENK, '#ffffff', 0.9) + ' 34%',
    karistir(RENK, '#ffffff', 0.4) + ' 46%', RENK + ' 58%', karistir(RENK, '#000000', 0.45) + ' 70%', IKINCI + ' 80%',
    karistir(RENK, '#000000', 0.2) + ' 90%', RENK
  ].join(', ') + ')';

  const SDK = [
    'https://cdn.jsdelivr.net/npm/@elevenlabs/client@1.36.0/+esm',
    'https://esm.sh/@elevenlabs/client@1.36.0'
  ];
  const ONAY_ANAHTARI = 'uos_sesli_asistan_onay';

  const IKON = {
    telefon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>',
    kapat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85a1 1 0 0 1-1.41-.02L.29 13.08a1 1 0 0 1 0-1.41C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67a1 1 0 0 1 0 1.41l-2.48 2.48a1 1 0 0 1-1.41.02 11.3 11.3 0 0 0-2.67-1.85 1 1 0 0 1-.56-.9v-3.1A15 15 0 0 0 12 9z"/></svg>',
    kucult: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 14h6v6"/><path d="M20 10h-6V4"/><path d="M14 10l7-7"/><path d="M3 21l7-7"/></svg>',
    gonder: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z"/></svg>',
    bekle: '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-dasharray="40 60" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur=".9s" repeatCount="indefinite"/></circle></svg>',
    bayrak: '<svg width="21" height="14" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" rx="3" fill="#e30a17"/><circle cx="10.5" cy="10" r="5" fill="#fff"/><circle cx="11.75" cy="10" r="4" fill="#e30a17"/><polygon fill="#fff" points="13.7,10 15.43,9.44 15.43,7.62 16.5,9.09 18.22,8.53 17.16,10 18.22,11.47 16.5,10.91 15.43,12.38 15.43,10.56"/></svg>'
  };

  const STIL = `
:host { all: initial; }
*, *::before, *::after { box-sizing: border-box; }
.kok { position: fixed; right: 24px; bottom: 24px; z-index: 2147483000; color: #17191c;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased; line-height: 1.4; }
button, input { font: inherit; color: inherit; margin: 0; }
button { -webkit-tap-highlight-color: transparent; }
:focus-visible { outline: 3px solid ${RENK_METIN}; outline-offset: 3px; }
.tetik:focus-visible { outline-color: ${RENK}; }

.kure { position: absolute; inset: 0; border-radius: 50%; overflow: hidden; background: ${RENK}; isolation: isolate; pointer-events: none; }
.kure::before { content: ""; position: absolute; inset: -35%; background: ${KURE};
  filter: blur(9px); animation: uos-don 9s linear infinite; }
.kure::after { content: ""; position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(circle at 32% 26%, rgba(255,255,255,.72), rgba(255,255,255,0) 40%),
              radial-gradient(circle at 72% 80%, rgba(23,25,28,.36), rgba(23,25,28,0) 55%);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.22); }
.kok.canli .kure::before { animation-duration: 3.2s; }
@keyframes uos-don { to { transform: rotate(360deg); } }

.tetik { position: relative; display: block; width: 64px; height: 64px; padding: 0; border: 0; border-radius: 50%;
  background: transparent; cursor: pointer; box-shadow: 0 10px 28px rgba(0,0,0,.35); transition: transform .25s ease, opacity .2s ease; }
.tetik:hover { transform: scale(1.06); }
.halka { position: absolute; inset: -5px; border-radius: 50%; border: 2px solid ${RENK}; opacity: 0; pointer-events: none; }
.kok.canli .halka { animation: uos-nabiz 1.6s ease-out infinite; }
@keyframes uos-nabiz { 0% { transform: scale(.92); opacity: .9; } 100% { transform: scale(1.4); opacity: 0; } }
.kok.acik .tetik { transform: scale(.4); opacity: 0; pointer-events: none; }

.panel { position: absolute; right: 0; bottom: 0; width: 380px; height: 600px; max-height: calc(100vh - 48px);
  display: flex; flex-direction: column; overflow: hidden; background: #fff; border-radius: 28px;
  box-shadow: 0 24px 70px rgba(0,0,0,.3), 0 0 0 1px rgba(23,25,28,.06);
  transform-origin: 100% 100%; transform: translateY(16px) scale(.3); opacity: 0; visibility: hidden;
  transition: transform .34s cubic-bezier(.2,.9,.25,1), opacity .2s ease, visibility 0s linear .34s; }
.kok.acik .panel { transform: none; opacity: 1; visibility: visible;
  transition: transform .34s cubic-bezier(.2,.9,.25,1), opacity .2s ease, visibility 0s; }

.ust { display: flex; align-items: center; justify-content: space-between; padding: 16px 16px 0; }
.dil { display: inline-flex; align-items: center; gap: 8px; height: 40px; padding: 0 14px; border: 1px solid #e8e5e1;
  border-radius: 999px; font-size: 14px; color: #3a3f45; }
.kucult { display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border: 0; border-radius: 50%;
  background: #f3f2f0; color: #3a3f45; cursor: pointer; }
.kucult:hover { background: #e9e7e4; }

.sahne { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 22px; padding: 8px 28px; }
.buyuk { position: relative; flex: 0 0 auto; width: 180px; height: 180px; border-radius: 50%; cursor: pointer;
  transition: width .3s ease, height .3s ease; }
.ara { position: absolute; left: 50%; top: 50%; display: grid; place-items: center; width: 60px; height: 60px; padding: 0;
  transform: translate(-50%, -50%); border: 0; border-radius: 50%; background: #fff; color: #17191c;
  box-shadow: 0 6px 18px rgba(23,25,28,.25); cursor: pointer; transition: background .2s, color .2s, width .3s, height .3s; }
.ara:hover { background: #f7f6f4; }
.ara.bitir { background: #e5484d; color: #fff; }
.ara.bitir:hover { background: #d93d42; }
.ara[disabled] { cursor: progress; }
.durum { max-width: 300px; font-size: 14.5px; line-height: 1.5; color: #62686f; text-align: center; }

.sohbet { display: none; flex-direction: column; gap: 8px; padding: 12px 16px; overflow-y: auto; overscroll-behavior: contain; scroll-behavior: smooth; }
.kok.mesajli .sohbet { display: flex; flex: 1 1 auto; min-height: 0; }
.kok.mesajli .sahne { flex: 0 0 auto; flex-direction: row; justify-content: flex-start; gap: 14px; padding: 14px 20px 12px;
  border-bottom: 1px solid #f0eeeb; }
.kok.mesajli .buyuk { width: 64px; height: 64px; }
.kok.mesajli .ara { width: 36px; height: 36px; }
.kok.mesajli .ara svg { width: 17px; height: 17px; }
.kok.mesajli .durum { text-align: left; font-size: 13.5px; }
.balon { max-width: 85%; padding: 9px 13px; border-radius: 18px; font-size: 14.5px; line-height: 1.45;
  white-space: pre-wrap; overflow-wrap: anywhere; animation: uos-belir .2s ease; }
.balon.asistan { align-self: flex-start; background: #f3f2f0; border-bottom-left-radius: 6px; }
.balon.musteri { align-self: flex-end; background: ${RENK}; color: ${RENK_YAZI}; border-bottom-right-radius: 6px; }
.balon.yaziyor { display: inline-flex; gap: 4px; padding: 13px 14px; }
.balon.yaziyor i { width: 6px; height: 6px; border-radius: 50%; background: #9aa0a6; animation: uos-zipla 1s ease-in-out infinite; }
.balon.yaziyor i:nth-child(2) { animation-delay: .15s; }
.balon.yaziyor i:nth-child(3) { animation-delay: .3s; }
@keyframes uos-belir { from { opacity: 0; transform: translateY(4px); } }
@keyframes uos-zipla { 0%, 80%, 100% { transform: translateY(0); opacity: .45; } 40% { transform: translateY(-4px); opacity: 1; } }

.alt { margin: 0; padding: 10px 16px 14px; }
.giris { display: flex; align-items: center; gap: 4px; padding: 5px 5px 5px 18px; border: 1px solid #e8e5e1; border-radius: 999px;
  background: #fff; transition: border-color .2s, box-shadow .2s; }
.giris:focus-within { border-color: ${RENK}; box-shadow: 0 0 0 3px rgba(${RENK_RGB},.18); }
.giris input { flex: 1; min-width: 0; padding: 9px 0; border: 0; outline: 0; background: transparent; font-size: 15px; color: #17191c; }
.giris input::placeholder { color: #9aa0a6; }
.giris input:focus-visible { outline: none; }
.gonder { display: grid; place-items: center; flex: 0 0 auto; width: 40px; height: 40px; padding: 0; border: 0; border-radius: 50%;
  background: transparent; color: #b7bcc1; cursor: pointer; transition: color .2s, background .2s; }
.gonder.aktif { color: ${RENK_YAZI}; background: ${RENK}; }
.not { margin-top: 8px; font-size: 11.5px; color: #8f959b; text-align: center; }
.not a { color: inherit; }

.onay { position: absolute; left: 12px; right: 12px; bottom: 12px; z-index: 2; padding: 16px; border-radius: 22px; background: #fff;
  box-shadow: 0 12px 40px rgba(23,25,28,.22), 0 0 0 1px rgba(23,25,28,.06);
  transform: translateY(14px); opacity: 0; visibility: hidden;
  transition: transform .22s ease, opacity .18s ease, visibility 0s linear .22s; }
.onay.gorunur { transform: none; opacity: 1; visibility: visible; transition: transform .22s ease, opacity .18s ease, visibility 0s; }
.onay p { margin: 0 0 12px; font-size: 13.5px; line-height: 1.5; color: #3a3f45; }
.onay a { color: ${RENK_METIN}; }
.onay .dugmeler { display: flex; justify-content: flex-end; gap: 8px; }
.onay button { padding: 10px 16px; border: 0; border-radius: 999px; font-size: 14px; cursor: pointer; }
.onay .vazgec { background: #f3f2f0; color: #3a3f45; }
.onay .kabul { background: ${RENK}; color: ${RENK_YAZI}; font-weight: 600; }

@media (max-width: 480px) {
  .kok { right: 14px; bottom: 14px; }
  .panel { width: calc(100vw - 28px); height: calc(100vh - 28px); height: calc(100dvh - 28px); max-height: none; border-radius: 24px; }
  .giris input { font-size: 16px; }
}
@media (prefers-reduced-motion: reduce) {
  .kure::before, .halka, .balon, .balon.yaziyor i { animation: none !important; }
  .panel, .tetik, .onay { transition: none; }
}`;

  const HTML = `
<div class="kok">
  <button class="tetik" type="button" aria-label="Sesli asistanı aç" aria-expanded="false" title="Sesli asistan"><span class="kure"></span><span class="halka"></span></button>
  <div class="panel" role="dialog" aria-label="Sesli asistan">
    <div class="ust">
      <span class="dil">${IKON.bayrak}<span class="dil-ad"></span></span>
      <button class="kucult" type="button" aria-label="Küçült" title="Küçült">${IKON.kucult}</button>
    </div>
    <div class="sahne">
      <div class="buyuk"><span class="kure"></span><button class="ara" type="button" aria-label="Sesli görüşmeyi başlat">${IKON.telefon}</button></div>
      <div class="durum" aria-live="polite"></div>
    </div>
    <div class="sohbet" role="log" aria-live="polite"></div>
    <form class="alt" autocomplete="off">
      <div class="giris"><input type="text" maxlength="1000" aria-label="Mesajınız" enterkeyhint="send"><button class="gonder" type="submit" aria-label="Gönder">${IKON.gonder}</button></div>
      <div class="not"></div>
    </form>
    <div class="onay" role="alertdialog" aria-label="Kayıt bilgilendirmesi">
      <p></p>
      <div class="dugmeler"><button class="vazgec" type="button">Vazgeç</button><button class="kabul" type="button">Kabul et</button></div>
    </div>
  </div>
</div>`;

  let golge, kok, tetik, ara, buyuk, durumYazi, sohbet, form, girdi, gonderBtn, onayKutu;
  let gorusme = null, tur = null, oturum = 0, baglaniyor = false;
  let sonGonderilen = '', yaziyorBalon = null, ilkMesajCoz = null, onayCoz = null;
  let sdkSozu = null, yumusak = 0, onayVerildi = false, acildiBildirildi = false;
  try { onayVerildi = localStorage.getItem(ONAY_ANAHTARI) === '1'; } catch { /* depolama kapalı olabilir */ }

  function olay(eylem) {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'sesli_asistan', sesli_asistan_eylem: eylem, sesli_asistan_firma: AYAR.firma });
    } catch { /* analitik yoksa önemli değil */ }
  }

  function sdkYukle() {
    if (!sdkSozu) {
      sdkSozu = (async () => {
        let sonHata;
        for (const adres of SDK) {
          try {
            const m = await import(adres);
            if (m && m.Conversation) return m;
          } catch (e) { sonHata = e; }
        }
        throw sonHata || new Error('ElevenLabs istemcisi yüklenemedi');
      })();
      sdkSozu.catch(() => { sdkSozu = null; });
    }
    return sdkSozu;
  }

  function guvenliLink(adres) {
    if (!adres || typeof adres !== 'string') return '';
    try {
      const u = new URL(adres, location.href);
      return /^https?:$/.test(u.protocol) ? u.href : '';
    } catch { return ''; }
  }

  function linkEkle(kap, metin) {
    const adres = guvenliLink(AYAR.kvkkLinki);
    if (!adres) return;
    const a = document.createElement('a');
    a.href = adres; a.target = '_blank'; a.rel = 'noopener'; a.textContent = metin;
    kap.appendChild(a);
  }

  function durum(metin) { durumYazi.textContent = metin; }

  function asagiKaydir() { sohbet.scrollTop = sohbet.scrollHeight; }

  function balonEkle(kim, metin) {
    metin = String(metin || '').trim();
    if (!metin) return null;
    kok.classList.add('mesajli');
    const b = document.createElement('div');
    b.className = 'balon ' + kim;
    b.textContent = metin;
    if (yaziyorBalon && yaziyorBalon.parentNode === sohbet) sohbet.insertBefore(b, yaziyorBalon);
    else sohbet.appendChild(b);
    asagiKaydir();
    return b;
  }

  function yaziyor(goster) {
    if (goster) {
      if (!yaziyorBalon) {
        yaziyorBalon = document.createElement('div');
        yaziyorBalon.className = 'balon asistan yaziyor';
        yaziyorBalon.setAttribute('aria-label', 'Yazıyor');
        yaziyorBalon.innerHTML = '<i></i><i></i><i></i>';
      }
      kok.classList.add('mesajli');
      sohbet.appendChild(yaziyorBalon);
      asagiKaydir();
    } else if (yaziyorBalon) {
      yaziyorBalon.remove();
    }
  }

  function araGuncelle() {
    const sesli = !!(gorusme && tur === 'ses');
    if (baglaniyor && tur === 'ses') {
      ara.innerHTML = IKON.bekle; ara.disabled = true; ara.classList.remove('bitir'); ara.setAttribute('aria-label', 'Bağlanıyor');
    } else if (sesli) {
      ara.innerHTML = IKON.kapat; ara.disabled = false; ara.classList.add('bitir'); ara.setAttribute('aria-label', 'Görüşmeyi bitir');
    } else {
      ara.innerHTML = IKON.telefon; ara.disabled = baglaniyor; ara.classList.remove('bitir'); ara.setAttribute('aria-label', 'Sesli görüşmeyi başlat');
    }
    kok.classList.toggle('canli', sesli);
  }

  function gonderGuncelle() { gonderBtn.classList.toggle('aktif', girdi.value.trim().length > 0); }

  function hareket(no) {
    if (no !== oturum || !gorusme || tur !== 'ses') { yumusak = 0; buyuk.style.transform = ''; return; }
    let v = 0;
    try { v = Math.max(gorusme.getOutputVolume() || 0, gorusme.getInputVolume() || 0); } catch { v = 0; }
    yumusak = yumusak * 0.75 + Math.min(1, v * 1.6) * 0.25;
    buyuk.style.transform = 'scale(' + (1 + yumusak * 0.14).toFixed(3) + ')';
    requestAnimationFrame(() => hareket(no));
  }

  function dinamikDegiskenler() {
    const q = new URLSearchParams(location.search);
    return { firma_kodu: AYAR.firma, sayfa: location.pathname || '/', utm_source: q.get('utm_source') || '' };
  }

  function bitisMetni(secilen, ayrinti) {
    if (ayrinti && ayrinti.reason === 'error') return 'Bağlantı kesildi. Tekrar denemek için telefona basın ya da yazın.';
    if (secilen === 'ses') return 'Görüşme bitti. Yeniden konuşmak için telefona basın.';
    return 'Sohbet kapandı. Yeni bir mesaj yazarak devam edebilirsiniz.';
  }

  function hataMetni(e, secilen) {
    const ad = (e && e.name) || '';
    const ileti = String((e && e.message) || e || '');
    if (secilen === 'ses' && (ad === 'NotAllowedError' || /permission|denied|izin/i.test(ileti))) {
      return 'Mikrofon izni verilmedi. Tarayıcıdan izin verin ya da aşağıya yazarak sorun.';
    }
    if (secilen === 'ses' && (ad === 'NotFoundError' || /device not found|no microphone/i.test(ileti))) {
      return 'Mikrofon bulunamadı. Aşağıya yazarak sorabilirsiniz.';
    }
    return 'Bağlanılamadı. Lütfen biraz sonra tekrar deneyin.';
  }

  function onayAl() {
    if (!AYAR.onayIste || onayVerildi) return Promise.resolve(true);
    if (onayCoz) onayKapat(false);
    return new Promise(coz => {
      onayCoz = coz;
      onayKutu.classList.add('gorunur');
      setTimeout(() => { try { onayKutu.querySelector('.kabul').focus({ preventScroll: true }); } catch { /* yok */ } }, 50);
    });
  }

  function onayKapat(sonuc) {
    onayKutu.classList.remove('gorunur');
    if (onayCoz) { const c = onayCoz; onayCoz = null; c(sonuc); }
  }

  async function baslat(secilen) {
    if (baglaniyor) return false;
    const no = ++oturum; // önceki oturumun geri çağırmaları bundan sonra yok sayılır
    const benim = () => no === oturum;
    const eski = gorusme;
    gorusme = null; tur = secilen; baglaniyor = true;
    yaziyor(false); araGuncelle(); durum('Bağlanıyor…');
    if (eski) { try { await eski.endSession(); } catch { /* zaten kapalı */ } }
    try {
      const { Conversation } = await sdkYukle();
      if (!benim()) return false;
      const secenek = {
        agentId: AYAR.ajanId,
        dynamicVariables: dinamikDegiskenler(),
        stripAudioTags: true,
        onConnect: () => {
          if (!benim()) return;
          durum(secilen === 'ses' ? 'Dinliyorum' : 'Sohbet açık. Sorunuzu yazabilirsiniz.');
          olay(secilen === 'ses' ? 'sesli_basladi' : 'yazili_basladi');
        },
        onDisconnect: (ayrinti) => {
          if (!benim()) return;
          gorusme = null; tur = null; baglaniyor = false;
          yaziyor(false); araGuncelle(); durum(bitisMetni(secilen, ayrinti));
          if (ilkMesajCoz) { const c = ilkMesajCoz; ilkMesajCoz = null; c(); }
          olay('bitti');
        },
        onError: (ileti) => { if (benim()) console.warn('[Sesli asistan]', ileti); },
        onModeChange: (m) => {
          if (!benim() || tur !== 'ses') return;
          durum(m && m.mode === 'speaking' ? 'Konuşuyor…' : 'Dinliyorum');
        },
        onMessage: (m) => {
          if (!benim() || !m) return;
          const kim = (m.role === 'user' || m.source === 'user') ? 'musteri' : 'asistan';
          const metin = String(m.message || '').trim();
          if (!metin) return;
          if (kim === 'musteri' && sonGonderilen && metin === sonGonderilen) { sonGonderilen = ''; return; }
          if (kim === 'asistan') yaziyor(false);
          balonEkle(kim, metin);
          if (kim === 'asistan' && ilkMesajCoz) { const c = ilkMesajCoz; ilkMesajCoz = null; c(); }
        },
        onAgentResponseCorrection: (d) => {
          if (!benim() || !d || !d.original_agent_response) return;
          const eskiMetin = String(d.original_agent_response).trim();
          const yeniMetin = String(d.corrected_agent_response || '').trim();
          const balonlar = sohbet.querySelectorAll('.balon.asistan:not(.yaziyor)');
          for (let i = balonlar.length - 1; i >= 0; i--) {
            if (balonlar[i].textContent === eskiMetin) {
              if (yeniMetin) balonlar[i].textContent = yeniMetin; else balonlar[i].remove();
              break;
            }
          }
        },
        onAgentToolResponse: (r) => {
          if (benim() && r && r.tool_name === 'basvuru_kaydet' && !r.is_error) olay('basvuru_gonderildi');
        }
      };
      if (secilen === 'yazi') secenek.textOnly = true;
      else secenek.connectionType = 'webrtc';
      const g = await Conversation.startSession(secenek);
      if (!benim()) { try { await g.endSession(); } catch { /* yok */ } return false; }
      if (typeof g.isOpen === 'function' && !g.isOpen()) return false; // açılır açılmaz kapandıysa durum zaten yazıldı
      gorusme = g;
      if (secilen === 'ses') requestAnimationFrame(() => hareket(no));
      return true;
    } catch (e) {
      if (!benim()) return false;
      console.warn('[Sesli asistan] başlatılamadı:', e);
      gorusme = null; tur = null;
      durum(hataMetni(e, secilen));
      return false;
    } finally {
      if (benim()) { baglaniyor = false; araGuncelle(); }
    }
  }

  async function sesliTikla() {
    if (baglaniyor) return;
    if (gorusme && tur === 'ses') {
      const g = gorusme;
      try { await g.endSession(); } catch { /* yok */ }
      return;
    }
    if (!(await onayAl())) return;
    await baslat('ses');
  }

  async function mesajGonder(e) {
    e.preventDefault();
    const metin = girdi.value.trim();
    if (!metin || baglaniyor) return;
    if (!(await onayAl())) return;
    girdi.value = ''; gonderGuncelle();
    if (!gorusme) {
      const ilk = new Promise(coz => { ilkMesajCoz = coz; setTimeout(coz, 4000); });
      const tamam = await baslat('yazi');
      if (!tamam || !gorusme) { ilkMesajCoz = null; girdi.value = metin; gonderGuncelle(); return; }
      await ilk; // karşılama mesajı önce görünsün
      ilkMesajCoz = null;
      if (!gorusme) { girdi.value = metin; gonderGuncelle(); return; }
    }
    sonGonderilen = metin;
    balonEkle('musteri', metin);
    try {
      gorusme.sendUserMessage(metin);
      if (tur === 'yazi') yaziyor(true);
    } catch (err) {
      console.warn('[Sesli asistan] mesaj gönderilemedi:', err);
      durum('Mesaj gönderilemedi. Lütfen tekrar deneyin.');
    }
  }

  function ac() {
    if (!kok) return;
    kok.classList.add('acik');
    tetik.setAttribute('aria-expanded', 'true');
    sdkYukle().catch(() => { /* görüşme başlarken yeniden denenir */ });
    if (!acildiBildirildi) { acildiBildirildi = true; olay('acildi'); }
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      setTimeout(() => { try { girdi.focus({ preventScroll: true }); } catch { /* yok */ } }, 320);
    }
  }

  function kapat() {
    if (!kok) return;
    kok.classList.remove('acik');
    tetik.setAttribute('aria-expanded', 'false');
    onayKapat(false);
    try { tetik.focus({ preventScroll: true }); } catch { /* yok */ }
  }

  function kur() {
    const ev = document.createElement('div');
    ev.id = 'uos-sesli-asistan';
    document.body.appendChild(ev);
    golge = ev.attachShadow({ mode: 'open' });
    golge.innerHTML = '<style>' + STIL + '</style>' + HTML;

    const $ = s => golge.querySelector(s);
    kok = $('.kok'); tetik = $('.tetik'); ara = $('.ara'); buyuk = $('.buyuk');
    durumYazi = $('.durum'); sohbet = $('.sohbet'); form = $('.alt');
    girdi = $('.giris input'); gonderBtn = $('.gonder'); onayKutu = $('.onay');

    $('.dil-ad').textContent = AYAR.dil;
    girdi.placeholder = AYAR.yerTutucu;
    durum(AYAR.karsilama);

    const not = $('.not');
    not.textContent = 'Görüşmeler kayıt altına alınır.';
    if (guvenliLink(AYAR.kvkkLinki)) { not.appendChild(document.createTextNode(' · ')); linkEkle(not, 'Aydınlatma metni'); }

    const onayP = onayKutu.querySelector('p');
    onayP.textContent = 'Bu görüşme, sorularınızı yanıtlamak ve talebinizi almak için ' + AYAR.firmaAdi +
      ' adına kaydedilir; ses ve yazışmalar yurt dışındaki hizmet sağlayıcımız ElevenLabs üzerinden işlenir. Devam ederek bunu kabul edersiniz.';
    if (guvenliLink(AYAR.kvkkLinki)) { onayP.appendChild(document.createTextNode(' ')); linkEkle(onayP, 'Aydınlatma metni'); }

    tetik.addEventListener('click', ac);
    $('.kucult').addEventListener('click', kapat);
    buyuk.addEventListener('click', sesliTikla);
    form.addEventListener('submit', mesajGonder);
    girdi.addEventListener('input', gonderGuncelle);
    onayKutu.querySelector('.kabul').addEventListener('click', () => {
      onayVerildi = true;
      try { localStorage.setItem(ONAY_ANAHTARI, '1'); } catch { /* yok */ }
      onayKapat(true);
    });
    onayKutu.querySelector('.vazgec').addEventListener('click', () => onayKapat(false));
    golge.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      if (onayKutu.classList.contains('gorunur')) onayKapat(false);
      else if (kok.classList.contains('acik')) kapat();
    });
    window.addEventListener('pagehide', () => { if (gorusme) { try { gorusme.endSession(); } catch { /* yok */ } } });
    araGuncelle();
  }

  window.UosSesliAsistan = {
    ac,
    kapat,
    konus: async () => { ac(); if (!(gorusme && tur === 'ses')) await sesliTikla(); },
    bitir: async () => { if (gorusme) { try { await gorusme.endSession(); } catch { /* yok */ } } }
  };

  if (document.body) kur();
  else document.addEventListener('DOMContentLoaded', kur, { once: true });
})();
