/* Eat website i18n — English + Arabic (RTL).
   Elements opt in with data-i18n / data-i18n-html / data-i18n-ph.
   Language: ?lang= → saved choice → English default. A [data-lang-btn] toggles it. */
(function () {
  const T = {
    // ── shared nav / footer ──
    "nav.pricing": { en: "Pricing", ar: "الأسعار" },
    "nav.faq":     { en: "FAQ", ar: "الأسئلة الشائعة" },
    "nav.signin":  { en: "Sign in", ar: "تسجيل الدخول" },
    "nav.getEat":  { en: "Get Eat", ar: "حمّل Eat" },

    // ── home hero ──
    "hero.available": { en: "Available on iOS", ar: "متاح على iOS" },
    "hero.h1":   { en: "Meals<br/>built <em>around you.</em>", ar: "وجبات<br/>مصمّمة <em>من أجلك.</em>" },
    "hero.lede": {
      en: "Tell Eat what you like, what you don't, and what's in your fridge. We'll plan the week, write your grocery list, and walk you through cooking, so you can stop thinking about food and just eat.",
      ar: "أخبر Eat بما تحب، وما لا تحب، وما يوجد في ثلاجتك. سنخطّط أسبوعك، ونكتب قائمة تسوّقك، ونرشدك خطوة بخطوة في الطبخ، حتى تتوقف عن التفكير في الطعام وتأكل فقط."
    },
    "hero.ctaSmall":  { en: "Your first week is free", ar: "أسبوعك الأول مجاني" },
    "hero.ctaStrong": { en: "Start your free week", ar: "ابدأ أسبوعك المجاني" },
    "hero.see":       { en: "See how it works", ar: "شاهد كيف يعمل" },
    "hero.metaTrial": { en: "7-day free trial", ar: "تجربة مجانية ٧ أيام" },
    "hero.metaFrom":  { en: "Solo from £4.99/mo", ar: "‏Solo يبدأ من ٤٫٩٩£ شهريًا" },

    // ── footer ──
    "foot.blurb":   { en: "Meals built around you. Less waste, less thinking, more eating. Available now on iOS.", ar: "وجبات مصمّمة من أجلك. هدر أقل، تفكير أقل، أكل أكثر. متاح الآن على iOS." },
    "foot.product": { en: "Product", ar: "المنتج" },
    "foot.company": { en: "Company", ar: "الشركة" },
    "foot.legal":   { en: "Legal", ar: "قانوني" },
    "foot.pricing": { en: "Pricing", ar: "الأسعار" },
    "foot.faq":     { en: "FAQ", ar: "الأسئلة الشائعة" },
    "foot.manage":  { en: "Manage subscription", ar: "إدارة الاشتراك" },
    "foot.support": { en: "Support", ar: "الدعم" },
    "foot.contact": { en: "Contact us", ar: "تواصل معنا" },
    "foot.privacy": { en: "Privacy policy", ar: "سياسة الخصوصية" },
    "foot.terms":   { en: "Terms of use", ar: "شروط الاستخدام" },
  };

  function pickLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q === "ar" || q === "en") { try { localStorage.setItem("eat_lang", q); } catch (e) {} return q; }
    try { const s = localStorage.getItem("eat_lang"); if (s) return s; } catch (e) {}
    return "en";
  }
  let lang = pickLang();

  function apply() {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const t = T[el.getAttribute("data-i18n")]; if (t && t[lang] != null) el.textContent = t[lang];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const t = T[el.getAttribute("data-i18n-html")]; if (t && t[lang] != null) el.innerHTML = t[lang];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      const t = T[el.getAttribute("data-i18n-ph")]; if (t && t[lang] != null) el.setAttribute("placeholder", t[lang]);
    });
    document.querySelectorAll("[data-lang-btn]").forEach((b) => { b.textContent = lang === "ar" ? "English" : "عربي"; });
  }

  window.EatLang = {
    get: () => lang,
    set: (l) => { lang = l; try { localStorage.setItem("eat_lang", l); } catch (e) {} apply(); },
    toggle: () => window.EatLang.set(lang === "ar" ? "en" : "ar"),
    t: (k) => (T[k] ? T[k][lang] : k),
    apply,
  };

  function init() {
    apply();
    document.querySelectorAll("[data-lang-btn]").forEach((b) =>
      b.addEventListener("click", (e) => { e.preventDefault(); window.EatLang.toggle(); }));
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
