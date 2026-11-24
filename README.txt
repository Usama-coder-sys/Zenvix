ZENVIX IT Solutions - Website
=============================

Files
- index.html : poora website
- styles.css : design aur rang
- script.js  : reviews add karne ka code

Kholne ka tareeqa
index.html par double click karein, woh browser mein khul jayegi.
Fonts ke liye internet chahiye, warna system ke fonts nazar aayenge.

Online dalne ka tareeqa
Teeno files (index.html, styles.css, script.js) ko apni hosting ke public folder
mein upload karein (cPanel ka public_html, Netlify, GitHub Pages ya koi bhi
static hosting).

Jo cheezein aap ko khud badalni hain
index.html mein square brackets [ ] wali jagah dhoondein:
- Prices: PKR [YOUR PRICE]
- Portfolio: project ke naam aur tafseel
- Contact: email, phone/WhatsApp, address, working hours

Reviews kaise kaam karte hain
- Visitor form mein review likhe to woh usi browser mein save hota hai, yaani
  sirf usi device par nazar aata hai. Doosre visitors ko nazar nahi aata, kyun
  ke is website ke saath koi server ya database nahi hai.
- Aap ke approved reviews har visitor ko dikhane ke liye script.js mein
  FEATURED_REVIEWS ki list mein daalein, is tarah:
    { name: 'Client ka naam', business: 'Business, shehar', text: 'Unka review.' }
- Agar chahte hain ke visitors ke reviews sab ko nazar aayein, to server aur
  database chahiye. Us ke liye alag se kaam karna hoga.
