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
    "foot.howitworks": { en: "How it works", ar: "كيف يعمل" },
    "foot.features": { en: "Features", ar: "المميزات" },

    // ── home: "built for" strip ──
    "strip.builtFor":      { en: "Built for", ar: "مصمّم لـ" },
    "strip.students":      { en: "Students", ar: "الطلاب" },
    "strip.lifters":       { en: "Lifters", ar: "رافعي الأثقال" },
    "strip.families":      { en: "Families", ar: "العائلات" },
    "strip.professionals": { en: "Busy professionals", ar: "المحترفون المشغولون" },
    "strip.homecooks":     { en: "Home cooks", ar: "طهاة المنزل" },

    // ── home: how it works ──
    "how.eyebrow": { en: "How it works", ar: "كيف يعمل" },
    "how.h2":  { en: "Three minutes to<br/><em>a full week</em> of meals.", ar: "ثلاث دقائق تكفي<br/>لـ<em>أسبوع كامل</em> من الوجبات." },
    "how.p":   { en: "No spreadsheet. No paywalls hiding the good stuff. Just a quick conversation, and a plan that feels like it was made for you. Because it was.", ar: "بلا جداول. وبلا حجبٍ للمميزات خلف الدفع. مجرّد محادثة سريعة، وخطة تشعر أنها صُمّمت لك. لأنها كذلك فعلاً." },
    "how.s1h": { en: "Tell us about <em class=\"serif-i\">you</em>", ar: "أخبرنا <em class=\"serif-i\">عنك</em>" },
    "how.s1p": { en: "Your goals, your taste, your dislikes, your schedule. Even what's already in your fridge. We listen first, plan second.", ar: "أهدافك، وذوقك، وما لا تحب، وجدولك. وحتى ما يوجد في ثلاجتك. نستمع أولاً، ونخطّط ثانياً." },
    "how.s2h": { en: "Get a plan that <em class=\"serif-i\">fits</em>", ar: "احصل على خطة <em class=\"serif-i\">تناسبك</em>" },
    "how.s2p": { en: "A full week of meals tailored to your goal, your cooking level, and the time you actually have. Swap anything in one tap.", ar: "أسبوع كامل من الوجبات مُفصّل على هدفك، ومستوى طبخك، والوقت المتاح لك فعلاً. بدّل أي وجبة بنقرة واحدة." },
    "how.s3h": { en: "Shop, cook, <em class=\"serif-i\">enjoy</em>", ar: "تسوّق، اطبخ، <em class=\"serif-i\">استمتع</em>" },
    "how.s3p": { en: "Auto-built grocery lists. Step-by-step cook mode. Smart leftovers. The boring parts of eating well, finally automated.", ar: "قوائم تسوّق تُبنى تلقائياً. وضع طبخ خطوة بخطوة. بقايا ذكية. أخيراً، أصبحت الأجزاء المملّة من الأكل الصحي تلقائية." },

    // ── home: features ──
    "f1.eyebrow": { en: "Personal · Not generic", ar: "شخصي · ليس عاماً" },
    "f1.h": { en: "A plan that knows the <em class=\"serif-i\">difference</em> between Tuesday and Saturday.", ar: "خطة تعرف <em class=\"serif-i\">الفرق</em> بين الثلاثاء والسبت." },
    "f1.p": { en: "Most meal apps give you the same seven recipes everyone else gets. Eat builds a plan around your real life. Quick lunches on workdays, something slower on weekends, lighter when you said you wanted lighter.", ar: "معظم تطبيقات الوجبات تمنحك نفس الوصفات السبع التي يحصل عليها الجميع. أما Eat فيبني خطة حول حياتك الحقيقية: غداء سريع في أيام العمل، وشيء على مهل في العطلة، وأخفّ حين تطلب الأخفّ." },
    "f1.b1": { en: "Adapts to your goals: fat loss, muscle, just feel better", ar: "يتكيّف مع أهدافك: خسارة الدهون، أو بناء العضلات، أو مجرد الشعور بتحسّن" },
    "f1.b2": { en: "Remembers what you loved and hated", ar: "يتذكّر ما أحببته وما كرهته" },
    "f1.b3": { en: "Respects your schedule and energy", ar: "يحترم جدولك وطاقتك" },
    "f1.cardLabel": { en: "Lose 5lb · 12 weeks", ar: "خسارة ٥ أرطال · ١٢ أسبوعاً" },
    "f1.cardMeta": { en: "On track this week", ar: "على المسار هذا الأسبوع" },

    "f2.eyebrow": { en: "Less waste · Lower cost", ar: "هدر أقل · تكلفة أقل" },
    "f2.h": { en: "Use what you <em class=\"serif-i\">already have</em> first.", ar: "استخدم ما <em class=\"serif-i\">لديك</em> أولاً." },
    "f2.p": { en: "Half a bag of rice. Three eggs. That sad bunch of spinach. Tell Eat what's already in your fridge, and your plan starts there, saving you the average household's £1,200 in annual food waste.", ar: "نصف كيس أرز. ثلاث بيضات. تلك الحزمة الذابلة من السبانخ. أخبر Eat بما في ثلاجتك، فتبدأ خطتك من هناك، موفّراً ما يعادل ١٢٠٠£ من هدر الطعام السنوي لمتوسط الأسرة." },
    "f2.b1": { en: "Auto-generated grocery list, store-aware", ar: "قائمة تسوّق تلقائية، تراعي متاجرك" },
    "f2.b2": { en: "Smart leftovers, one cook two meals", ar: "بقايا ذكية، طبخة واحدة لوجبتين" },
    "f2.b3": { en: "Optional pantry scan", ar: "مسح اختياري للمؤن" },
    "f2.cardLabel": { en: "Saved £42", ar: "وفّرت ٤٢£" },
    "f2.cardMeta": { en: "this week", ar: "هذا الأسبوع" },

    "f3.eyebrow": { en: "Save · Remake · Share", ar: "احفظ · أعِد · شارك" },
    "f3.h": { en: "The meals you loved, <em class=\"serif-i\">one tap</em> away.", ar: "الوجبات التي أحببتها، على <em class=\"serif-i\">بُعد نقرة</em>." },
    "f3.p": { en: "Save anything you love and it stays in your library forever. Remake any meal in one tap, with the macros and grocery list automatically pulled forward. Share favourites with anyone in your household.", ar: "احفظ أي وجبة تحبها وتبقى في مكتبتك للأبد. أعِد تحضير أي وجبة بنقرة واحدة، مع جلب الماكروز وقائمة التسوّق تلقائياً. وشارك المفضّلة مع أي فرد في منزلك." },
    "f3.b1": { en: "Unlimited saved meals · no caps", ar: "وجبات محفوظة بلا حدود · بلا قيود" },
    "f3.b2": { en: "Smart \"Remake\" pulls forward the shop", ar: "‏«إعادة» ذكية تجلب قائمة التسوّق تلقائياً" },
    "f3.b3": { en: "Family share, one library multiple cooks", ar: "مشاركة عائلية، مكتبة واحدة لعدة طهاة" },
    "f3.cardLabel": { en: "62 saved", ar: "٦٢ محفوظة" },
    "f3.cardMeta": { en: "Across 4 categories", ar: "في ٤ فئات" },

    // ── home: closing CTA ──
    "cta.h2":   { en: "Ready to <em>eat well?</em>", ar: "جاهز <em>لتأكل جيداً؟</em>" },
    "cta.p":    { en: "Start planning in minutes. Your first week is on us.", ar: "ابدأ التخطيط في دقائق. أسبوعك الأول علينا." },
    "cta.meta": { en: "7-day free trial · Cancel anytime · Solo from £4.99/mo", ar: "تجربة مجانية ٧ أيام · ألغِ في أي وقت · Solo من ٤٫٩٩£ شهرياً" },
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
