/* nav.js — signed-in chrome for every page.
   Paints the nav avatar + Power accent from a small cache instantly (no flash),
   then reconciles with the real Firebase session + subscription tier.
   The cache (localStorage "eat.account") is written ONLY from a verified
   Firebase session; it never grants anything — entitlement is always re-checked
   by the worker with the user's ID token. */
import { auth, WORKER } from "./firebase-init.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

export const CACHE = "eat.account";

export function readCache() {
  try { return JSON.parse(localStorage.getItem(CACHE) || "null"); } catch (_) { return null; }
}
export function writeCache(a) {
  try { a ? localStorage.setItem(CACHE, JSON.stringify(a)) : localStorage.removeItem(CACHE); } catch (_) {}
  try { a && a.plan === "power" ? localStorage.setItem("eat_tier", "power") : localStorage.removeItem("eat_tier"); } catch (_) {}
}

export function applyPower(on) {
  const r = document.documentElement.style;
  ["accent", "deep", "tint", "light"].forEach(k => {
    if (on) r.setProperty("--" + k, "var(--power" + (k === "accent" ? "" : "-" + k) + ")");
    else r.removeProperty("--" + k);
  });
  const src = on ? "icon-power.png" : "icon-solo.png";
  document.querySelectorAll(".logo img, [data-plan-icon]").forEach(i => { if (i.getAttribute("src") !== src) i.src = src; });
  const fav = document.querySelector('link[rel="icon"]'); if (fav) fav.href = src;
}

export function paintNav(a) {
  const act = document.querySelector(".nav .actions");
  if (!act) return;
  if (!a) {
    if (act.dataset.signedIn) { act.innerHTML = act.dataset.signedOutHtml; delete act.dataset.signedIn; }
    return;
  }
  if (!act.dataset.signedOutHtml) act.dataset.signedOutHtml = act.innerHTML;
  const n = a.name || (a.email || "").split("@")[0] || "E";
  const l = n.charAt(0).toUpperCase();
  act.dataset.signedIn = "1";
  act.innerHTML = '<a class="nav-av" href="account.html" aria-label="Account"><span' +
    (a.photo ? ' class="photo" style="background-image:url(' + a.photo + ')"' : "") + ">" + l + "</span></a>";
  applyPower(a.plan === "power");
}

/** Real subscription state for a signed-in user: {active, tier, trialed}. */
export async function fetchStatus(user) {
  try {
    const token = await user.getIdToken();
    const r = await fetch(WORKER + "/subscription/status", { headers: { Authorization: "Bearer " + token } });
    return await r.json();
  } catch (_) { return { active: false, tier: null, trialed: false }; }
}

/** Build the cache record from a Firebase user + status. */
export function toCache(user, s) {
  return {
    name: user.displayName || "",
    email: user.email || "",
    photo: user.photoURL || "",
    plan: s && s.active ? (s.tier || "solo") : "free",
    active: !!(s && s.active),
    trialed: !!(s && s.trialed),
    period: (s && s.period) || null,
    pendingTier: (s && s.pendingTier) || null,
    source: (s && s.source) || null,
    since: user.metadata && user.metadata.creationTime ? Date.parse(user.metadata.creationTime) : Date.now(),
  };
}

// 1. instant paint from cache
paintNav(readCache());

// 2. reconcile with the real session
const listeners = [];
export function onUser(fn) { listeners.push(fn); }
// One page's listener failing must never stop the others (or hide the page).
const call = (user, s) => listeners.forEach(f => { try { const r = f(user, s); if (r && r.catch) r.catch(e => console.error("[nav] listener", e)); } catch (e) { console.error("[nav] listener", e); } });
onAuthStateChanged(auth, async (user) => {
  if (!user) { writeCache(null); paintNav(null); call(null, null); return; }
  const s = await fetchStatus(user);
  const a = toCache(user, s);
  writeCache(a); paintNav(a);
  call(user, s);
});
