/* Mesure d’audience : gtag n’est chargé qu’après acceptation (CNIL).
   Consent mode : défaut « denied », puis « granted » uniquement si l’utilisateur accepte. */
(function () {
  var MEASUREMENT_ID = "G-SKJ8T88HPR";
  var STORAGE_KEY = "tb-consent-analytics";
  if (!MEASUREMENT_ID) return;

  var decided = null;
  try { decided = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  function loadGtagAfterAccept() {
    if (window.__tbGtagLoaded) return;
    window.__tbGtagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { dataLayer.push(arguments); };
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      wait_for_update: 500
    });
    gtag("consent", "update", { analytics_storage: "granted" });
    gtag("js", new Date());
    gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(s);
  }

  function syncBannerOffset() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) {
      document.documentElement.style.removeProperty("--cookie-banner-h");
      return;
    }
    document.documentElement.style.setProperty("--cookie-banner-h", banner.offsetHeight + "px");
  }

  function setChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    var banner = document.getElementById("cookie-banner");
    if (banner) banner.remove();
    document.documentElement.classList.remove("has-cookie-banner");
    document.documentElement.style.removeProperty("--cookie-banner-h");
    window.removeEventListener("resize", syncBannerOffset);
    if (value === "granted") loadGtagAfterAccept();
  }

  function showBanner() {
    if (document.getElementById("cookie-banner")) return;
    document.documentElement.classList.add("has-cookie-banner");
    var el = document.createElement("div");
    el.id = "cookie-banner";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-live", "polite");
    el.setAttribute("aria-label", "Choix des cookies de mesure d’audience");
    el.innerHTML =
      '<div class="cookie-banner-inner">' +
      "<p>Nous utilisons Google Analytics uniquement pour mesurer la fréquentation du site, et seulement si vous acceptez. Aucun traceur n’est déposé avant votre choix. " +
      '<a href="/confidentialite/">En savoir plus</a>.</p>' +
      '<div class="cookie-banner-actions">' +
      '<button type="button" class="cookie-refuse" data-cookie-choice="denied">Refuser</button>' +
      '<button type="button" class="cookie-accept" data-cookie-choice="granted">Accepter</button>' +
      "</div></div>";
    el.addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-cookie-choice]");
      if (btn) setChoice(btn.getAttribute("data-cookie-choice"));
    });
    document.body.appendChild(el);
    syncBannerOffset();
    window.addEventListener("resize", syncBannerOffset);
  }

  window.tbResetAnalyticsConsent = function () {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    showBanner();
  };

  if (decided === "granted") loadGtagAfterAccept();
  else if (decided !== "denied") {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", showBanner);
    else showBanner();
  }

  document.addEventListener("click", function (ev) {
    var t = ev.target.closest("[data-reset-consent]");
    if (t) { ev.preventDefault(); window.tbResetAnalyticsConsent(); }
  });
})();
