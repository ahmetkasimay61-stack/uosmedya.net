import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Partial<ContactPayload>;

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "Ad Soyad, e-posta ve mesaj alanları zorunludur." },
      { status: 400 }
    );
  }

  if (!isValidEmail(body.email)) {
    return NextResponse.json(
      { error: "Geçerli bir e-posta adresi girin." },
      { status: 400 }
    );
  }

  // TODO: Bir e-posta sağlayıcısına (Resend/SendGrid) veya Airtable/Google
  // Sheets'e bağlanıp gönderim burada yapılacak. Şimdilik sunucu loguna yazılır.
  console.log("Yeni iletişim formu gönderimi:", body);

  return NextResponse.json({ ok: true });
}
