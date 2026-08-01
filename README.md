# Damietta IP Portal

بوابة تسجيل الملكية الفكرية لجامعة دمياط — نظام كامل بوردات لوحة تحكم (طالب، مراجع، أدمن) مع مساعد ذكاء اصطناعي مبني على Groq.

## Live Demo

[https://damietta-blockchain.vercel.app](https://damietta-blockchain.vercel.app)

## التقنيات

- **React 19** + **TypeScript** + **Vite 8**
- **React Router v7**
- **Tailwind CSS** + **lucide-react** للأيقونات
- **Groq SDK** (Llama 3.3 70B) للمساعد الذكي
- **Vercel** للنشر

## التشغيل محليًا

1. تثبيت الاعتماديات:

   ```bash
   npm install
   ```

2. إعداد متغيرات البيئة — أنشئ ملف `.env` في جذر المشروع:

   ```env
   VITE_GROQ_API_KEY=your_groq_api_key
   ```

   احصل على المفتاح من [console.groq.com](https://console.groq.com).

3. تشغيل خادم التطوير:

   ```bash
   npm run dev
   ```

   افتح المتصفح على `http://localhost:5173`.

## الأوامر المتاحة

| الأمر | الوصف |
| --- | --- |
| `npm run dev` | تشغيل خادم التطوير مع HMR |
| `npm run build` | بناء نسخة الإنتاج (`tsc -b && vite build`) |
| `npm run preview` | معاينة نسخة الإنتاج محليًا |
| `npm run lint` | فحص الكود بـ Oxlint |

## النشر

```bash
npx vercel --prod
```

## بنية المشروع

```
src/
├── components/       # Navbar, Footer, Layout, AIAssistant, UI مكونات
│   └── ui/           # مكونات UI عامة
├── lib/              # groq.ts (تكامل الذكاء الاصطناعي), utils.ts
└── pages/            # الصفحات واللوحات (Student, Reviewer, Admin...)
```
