export const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/portfolyo", label: "Portfolyo" },
  { href: "/iletisim", label: "İletişim" },
];

export type Service = {
  slug: string;
  icon: string;
  title: string;
  summary: string;
  description: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "dijital-pazarlama",
    icon: "🎯",
    title: "Dijital Pazarlama",
    summary:
      "Marka bilinirliğinizi artıran, dönüşüm odaklı dijital pazarlama stratejileri.",
    description:
      "Markanızın dijital dünyada görünürlüğünü ve etkisini artıran kapsamlı pazarlama stratejileri sunuyoruz. Arama motoru optimizasyonu, performans pazarlaması ve marka stratejisi çalışmalarıyla dijital varlığınızı güçlendiriyoruz.",
    items: [
      "Dijital strateji danışmanlığı",
      "Marka konumlandırma",
      "İçerik pazarlaması",
      "Performans pazarlaması",
    ],
  },
  {
    slug: "video-produksiyon",
    icon: "🎥",
    title: "Video Prodüksiyon",
    summary: "Reklam filmi, tanıtım videosu ve kurumsal video çekimleri.",
    description:
      "Reklam filmlerinden kurumsal tanıtım videolarına, sosyal medya içeriklerinden etkinlik çekimlerine kadar profesyonel video prodüksiyon hizmetleri sunuyoruz.",
    items: [
      "Reklam filmi çekimi",
      "Kurumsal tanıtım videosu",
      "Sosyal medya video içerikleri",
      "Kurgu ve post prodüksiyon",
    ],
  },
  {
    slug: "fotograf-urun-cekimi",
    icon: "📷",
    title: "Fotoğraf & Ürün Çekimi",
    summary: "Markanızı en iyi şekilde yansıtan profesyonel fotoğraf çalışmaları.",
    description:
      "Markanızı ve ürünlerinizi en etkileyici şekilde görselleştiren profesyonel fotoğraf çekimleri gerçekleştiriyoruz.",
    items: [
      "Ürün fotoğrafçılığı",
      "Kurumsal fotoğraf çekimi",
      "Katalog çekimleri",
      "E-ticaret görselleri",
    ],
  },
  {
    slug: "drone-cekimi",
    icon: "🚁",
    title: "Drone Çekimi",
    summary: "Havadan etkileyici görseller ve sinematik reklam çekimleri.",
    description:
      "Havadan sinematik ve etkileyici görüntülerle markanızın reklam içeriklerine farklı bir boyut katıyoruz.",
    items: [
      "Havadan reklam filmi çekimi",
      "Tesis ve mekan tanıtım çekimleri",
      "Etkinlik drone çekimi",
    ],
  },
  {
    slug: "sosyal-medya-yonetimi",
    icon: "📱",
    title: "Sosyal Medya Yönetimi",
    summary:
      "İçerik üretiminden paylaşım stratejisine, sosyal medya hesaplarınızın profesyonel yönetimi.",
    description:
      "Sosyal medya hesaplarınızı stratejik bir içerik planı ile profesyonel şekilde yönetiyoruz.",
    items: [
      "İçerik takvimi oluşturma",
      "Görsel ve video içerik üretimi",
      "Topluluk yönetimi",
      "Marka sesi ve dil geliştirme",
    ],
  },
  {
    slug: "sosyal-medya-reklamlari",
    icon: "📈",
    title: "Sosyal Medya Reklamları",
    summary: "Hedef kitlenize ulaşan, performansı ölçülen reklam kampanyaları.",
    description:
      "Hedef kitlenize doğru mesajla ulaşan, veriye dayalı reklam kampanyaları planlıyor ve yönetiyoruz.",
    items: [
      "Meta (Instagram/Facebook) reklamları",
      "Google Ads yönetimi",
      "Hedef kitle analizi",
      "Kampanya performans raporlama",
    ],
  },
  {
    slug: "360-derece-reklam-cozumleri",
    icon: "🌐",
    title: "360 Derece Reklam Çözümleri",
    summary:
      "Tüm bu hizmetlerin bütünleşik biçimde markanız için tasarlanmış hali.",
    description:
      "Tüm hizmetlerimizi bütünleşik bir strateji altında birleştirerek markanız için uçtan uca reklam çözümleri sunuyoruz: konseptten yayına, üretimden ölçümlemeye kadar.",
    items: [],
  },
];

export const process = [
  {
    title: "Keşif & Analiz",
    text: "Markanızı ve hedeflerinizi anlıyoruz.",
  },
  {
    title: "Strateji & Planlama",
    text: "Size özel reklam ve içerik stratejisi oluşturuyoruz.",
  },
  {
    title: "Üretim",
    text: "Video, foto, drone ve dijital içerik üretimini gerçekleştiriyoruz.",
  },
  {
    title: "Yayın & Yönetim",
    text: "İçerikleri doğru platformlarda, doğru zamanda yayınlıyoruz.",
  },
  {
    title: "Ölçümleme & Optimizasyon",
    text: "Sonuçları analiz edip sürekli iyileştiriyoruz.",
  },
];

export const testimonials = [
  {
    quote:
      "UOS Medya ile çalışmaya başladıktan sonra sosyal medya varlığımız tamamen değişti. Profesyonel ve çözüm odaklı bir ekip.",
    name: "[Müşteri Adı]",
    company: "[Firma Adı]",
  },
  {
    quote:
      "Tek bir ekipten tüm reklam sürecimizi yönetmek işimizi inanılmaz kolaylaştırdı.",
    name: "[Müşteri Adı]",
    company: "[Firma Adı]",
  },
  {
    quote:
      "Drone ve video prodüksiyon kalitesi beklentimizin çok üzerindeydi.",
    name: "[Müşteri Adı]",
    company: "[Firma Adı]",
  },
];

export const portfolioCategories = [
  "Tümü",
  "Video",
  "Fotoğraf",
  "Drone",
  "Sosyal Medya",
  "Dijital Pazarlama",
] as const;

export const portfolioItems = [
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Video" },
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Fotoğraf" },
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Drone" },
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Sosyal Medya" },
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Dijital Pazarlama" },
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Video" },
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Fotoğraf" },
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Drone" },
  { title: "[Proje Adı]", brand: "[Marka Adı]", category: "Sosyal Medya" },
];

export const contactServiceOptions = [
  "Dijital Pazarlama",
  "Video Çekimi",
  "Fotoğraf Çekimi",
  "Drone Çekimi",
  "Sosyal Medya Yönetimi",
  "Sosyal Medya Reklamları",
  "360 Derece Paket",
];

export const siteConfig = {
  name: "UOS Medya",
  tagline: "360 Derece Reklamcılık. Tek Adres.",
  email: "info@uosmedya.com",
  phone: "[Telefon numarası eklenecek]",
  address: "[Adres bilgisi eklenecek]",
  social: {
    instagram: "#",
    linkedin: "#",
    youtube: "#",
  },
};
