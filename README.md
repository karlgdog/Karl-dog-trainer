# האתר של קרל אילוף כלבים

אתר סטטי (HTML, CSS, JavaScript) בלי שלב בנייה. Vercel מעלה אותו כמו שהוא.

| קובץ | מה יש בו |
|---|---|
| `content.json` | כל התוכן: טקסטים, שירותים, שאלות, ביקורות, תמונות וקישורים (בעברית) |
| `content.en.json`, `content.ru.json` | התרגום לאנגלית ולרוסית. רק טקסטים: תמונות, טלפון וקישורים נלקחים מ-`content.json` |
| `index.html`, `services.html`, `faq.html` | שלושת העמודים |
| `assets/style.css` | העיצוב |
| `assets/site.js` | הקוד שבונה את העמודים מתוך `content.json` |
| `assets/analytics.js` | Google Tag Manager. כאן מדביקים את מזהה ה-GTM |
| `media/` | תמונות, סרטונים ולוגו |
| `.pages.yml` | הגדרות מסך העריכה של Pages CMS |
| `vercel.json` | כתובות נקיות (`/services` במקום `/services.html`) |

## צפייה מקומית
האתר טוען את `content.json`, ולכן פתיחה ישירה של `index.html` מהמחשב לא תעבוד. מריצים בתיקייה:

```
npx serve .
```

ופותחים את הכתובת שמופיעה.

## טופס יצירת קשר
הטופס שולח מייל דרך Web3Forms. מדביקים את המפתח בשדה `contact.web3formsKey` בקובץ `content.json`. כל עוד השדה ריק, הטופס מציע לשלוח את הפרטים בוואטסאפ.

## אירועים שנשלחים ל-Google Tag Manager
- `whatsapp_click`: לחיצה על כל קישור לוואטסאפ
- `email_click`: לחיצה על המייל
- `social_click`: לחיצה על אינסטגרם, פייסבוק, איזי או במדים (`link_label` אומר על מה)
- `generate_lead`: טופס יצירת קשר שנשלח בהצלחה
- `language_change`: מבקר החליף שפה (`language_from` השפה הקודמת, `site_language` החדשה)

## שפות
ברירת המחדל היא עברית. הכפתור עב / EN / RU בראש העמוד מחליף שפה, והאתר זוכר את הבחירה. אפשר גם לשלוח קישור ישיר: `/?lang=en` או `/?lang=ru`.
כל טקסט שחסר בתרגום יוצג בעברית. שירותים וקישורים מותאמים לפי המזהה, ביקורות לפי התאריך, ושאלות ותמונות בגלריה לפי הסדר. לכן כשמוסיפים, מוחקים או מזיזים שאלה או שירות בעברית, צריך לעדכן גם את "תוכן באנגלית" ו"תוכן ברוסית" ב-Pages CMS.
פנייה מהטופס באנגלית או ברוסית מגיעה לגיליון עם השפה בעמודת העמוד, למשל `/services (en)`.

## מעקב שפה ב-Google Analytics
בכל עמוד נשלח ל-dataLayer הערך `site_language` (he / en / ru), עוד לפני ש-GTM נטען. כדי שיופיע ב-GA4 ובדשבורד:
1. ב-GTM: Variables > New > Data Layer Variable, שם המשתנה `site_language`. שמירה בשם `DLV - site_language`.
2. בתג Google Tag (GA4): Configuration settings (או Shared event settings) > Add parameter, שם `site_language`, ערך `{{DLV - site_language}}`. אפשר להוסיף אותו גם לתגי האירועים.
3. ב-GA4: Admin > Custom definitions > Create custom dimension, Scope: Event, Event parameter: `site_language`.
4. Submit ב-GTM. אחרי 24 עד 48 שעות הממד "site_language" זמין בדוחות וב-Looker Studio, למשל טבלה של צפיות בעמוד לפי שפה.

שימו לב: הממד המובנה "Language" ב-GA4 הוא שפת הדפדפן של המבקר, ולא השפה שבה הוא צפה באתר.
