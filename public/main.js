(function () {
  "use strict";

  const data = window.__BRAND__ || {};
  const $ = (s, sc) => (sc || document).querySelector(s);
  const $$ = (s, sc) => Array.from((sc || document).querySelectorAll(s));
  function safe(fn, name) { try { fn(); } catch (e) { console.warn("[" + name + "]", e); } }
  const wa = (num, text) => "https://wa.me/" + num + "?text=" + encodeURIComponent(text);

  function initMaker() {
    $$("[data-maker]").forEach(a => { a.href = wa(data.makerWhatsapp, data.makerText); a.target = "_blank"; a.rel = "noopener"; });
    $$("[data-wa-contacto]").forEach(a => { a.href = wa(data.whatsapp, "Hola, quiero hacer una consulta al estudio."); a.target = "_blank"; a.rel = "noopener"; });
  }

  function initConsulta() {
    const form = $("[data-consulta]");
    if (!form) return;
    const err = $("[data-form-error]", form);
    form.addEventListener("submit", e => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const tipo = form.tipo.value;
      if (!nombre || !tipo) { err.hidden = false; (nombre ? form.tipo : form.nombre).focus(); return; }
      err.hidden = true;
      const urg = (form.querySelector("[name=urg]:checked") || {}).value;
      let t = "Hola, soy " + nombre + ". Necesito: " + tipo + ".";
      if (form.act.value.trim()) t += " Me dedico a: " + form.act.value.trim() + ".";
      t += " Urgencia: " + urg + ".";
      window.open(wa(data.whatsapp, t), "_blank", "noopener");
    });
  }

  function boot() {
    document.documentElement.classList.remove("no-js");
    safe(initMaker, "initMaker");
    safe(initConsulta, "initConsulta");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
