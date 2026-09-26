/* Local fixture adapter for the real Tabby UI. This file is not a production SDK. */
(() => {
  const KEY = "tabby_portfolio_demo_v1";
  const user = { id: "portfolio-demo", email: "demo@example.com" };
  const cards = [
    ["klocky", "Klocky — Time, well spent.", "https://www.klocky.xyz/", "/work/klocky/meridian.webp", "Side projects"],
    ["vizzy", "Vizzy — Move your Figma comments", "https://www.figma.com/community/", "/work/vizzy/figma-ui.webp", "Side projects"],
    ["creativeos", "creativeOS — A creative workspace", "https://www.liarliarpantsontyler.com/work/creativeos/", "/work/creativeos-wide-poster.webp", "Side projects"],
    ["ratings", "Flavor Ratings — Every opinion counts", "https://www.liarliarpantsontyler.com/work/flavor-ratings/", "/home/ratings-cover.webp", "Product design"],
    ["teladoc", "Teladoc Health — Care, connected", "https://www.liarliarpantsontyler.com/work/teladoc-health/", "/work/teladoc-care-dashboard.webp", "Product design"],
    ["crosssell", "Cross-sell + Upsell", "https://www.liarliarpantsontyler.com/work/cross-sell-upsell/", "/home/cross-sell-cover.webp", "Product design"],
  ];
  const seed = {
    links: cards.map(([id, title, url, image, group], i) => ({
      id, title, url, domain: new URL(url).hostname.replace(/^www\./, ""),
      description: "", image_url: `/portfolio${image}`, group,
      position: 100 - i, user_id: user.id,
    })),
    user_spaces: [
      { id: "work", name: "Work", emoji: "💻", position: 0, user_id: user.id },
      { id: "personal", name: "Personal", emoji: "☀️", position: 1, user_id: user.id },
      { id: "research", name: "Research", emoji: "📚", position: 2, user_id: user.id },
    ],
    group_spaces: ["Side projects", "Product design"].map(group_name => ({ user_id: user.id, group_name, space_id: "work" })),
    subgroups: [],
    user_plans: [{ user_id: user.id, plan: "pro" }],
    pending_plans: [],
  };
  let db;
  try { db = JSON.parse(localStorage.getItem(KEY)); } catch { /* seed below */ }
  if (!db || !Array.isArray(db.links)) db = structuredClone(seed);
  const persist = () => localStorage.setItem(KEY, JSON.stringify(db));
  persist();

  function from(table) {
    let operation = "select", payload, sort, single = false;
    let conflict = ["id"];
    const filters = [];
    let result;
    const query = {
      select() { return query; },
      eq(key, value) { filters.push(row => row[key] === value); return query; },
      in(key, values) { filters.push(row => values.includes(row[key])); return query; },
      order(key, options = {}) { sort = { key, ascending: options.ascending !== false }; return query; },
      insert(rows) { operation = "insert"; payload = rows; return query; },
      update(fields) { operation = "update"; payload = fields; return query; },
      delete() { operation = "delete"; return query; },
      upsert(rows, options = {}) { operation = "upsert"; payload = rows; conflict = (options.onConflict || "id").split(","); return query; },
      single() { single = true; return query; },
      maybeSingle() { single = true; return query; },
      then(resolve, reject) {
        if (!result) result = Promise.resolve().then(() => {
          if (!Object.hasOwn(db, table)) throw new Error(`Unsupported demo table: ${table}`);
          const matches = row => filters.every(filter => filter(row));
          let selected = db[table].filter(matches);
          if (operation === "insert" || operation === "upsert") {
            selected = (Array.isArray(payload) ? payload : [payload]).map(row => structuredClone(row));
            for (const row of selected) {
              const index = operation === "upsert" ? db[table].findIndex(old => conflict.every(key => row[key] !== undefined && old[key] === row[key])) : -1;
              if (index < 0) db[table].push(row);
              else db[table][index] = { ...db[table][index], ...row };
            }
          } else if (operation === "update") selected.forEach(row => Object.assign(row, payload));
          else if (operation === "delete") db[table] = db[table].filter(row => !matches(row));
          if (operation !== "select") persist();
          if (sort) selected.sort((a, b) => (a[sort.key] < b[sort.key] ? -1 : a[sort.key] > b[sort.key] ? 1 : 0) * (sort.ascending ? 1 : -1));
          return { data: structuredClone(single ? selected[0] || null : selected), error: null };
        }).catch(error => ({ data: null, error: { message: error.message } }));
        return result.then(resolve, reject);
      },
    };
    return query;
  }

  window.supabase = { createClient: () => ({
    from,
    auth: {
      onAuthStateChange(callback) { setTimeout(() => callback("INITIAL_SESSION", { user }), 0); },
      async getSession() { return { data: { session: { user } } }; },
      async signOut() { alert("This is a local demo. Use Reset board to start fresh."); },
      async signInWithOtp() { return { error: { message: "Sign-in is disabled in this local demo." } }; },
      async verifyOtp() { return { error: { message: "Sign-in is disabled in this local demo." } }; },
    },
  }) };

  // Keep the sample artwork deterministic, and fetch real previews for other URLs.
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, options) => {
    const url = new URL(typeof input === "string" ? input : input.url, location.href);
    if (url.origin === "https://api.microlink.io") {
      const card = seed.links.find(link => link.url.replace(/\/$/, "") === (url.searchParams.get("url") || "").replace(/\/$/, ""));
      if (card) {
        return Promise.resolve(new Response(JSON.stringify({ status: "success", data: { title: card.title, image: { url: card.image_url } } }), { headers: { "Content-Type": "application/json" } }));
      }
      return originalFetch(input, { ...options, credentials: "omit" });
    }
    if (url.origin !== location.origin) return Promise.reject(new Error("External requests are disabled in this demo."));
    return originalFetch(input, options);
  };

  document.addEventListener("DOMContentLoaded", () => {
    const dock = document.createElement("aside");
    dock.setAttribute("aria-label", "Local demo controls");
    dock.style.cssText = "position:fixed;bottom:16px;right:16px;z-index:1000;display:flex;align-items:center;gap:12px;padding:10px 14px;border:1px solid #e4ddd4;border-radius:999px;background:#fffdf7;color:#1a1a1a;box-shadow:0 3px 18px #0001;font:12px system-ui";
    const label = document.createElement("span");
    label.textContent = "Local demo · Saved in this browser";
    const button = document.createElement("button");
    button.textContent = "Reset board";
    button.style.cssText = "font:inherit;border:0;background:#ff9932;color:#1a1a1a;padding:7px 10px;border-radius:999px;cursor:pointer";
    button.addEventListener("click", () => {
      if (!confirm("Restore the sample board and discard changes made in this local demo?")) return;
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith("tabs_") || key === "tabby_guest_v1" || key === KEY) localStorage.removeItem(key);
      }
      sessionStorage.removeItem("tabs_hidden_groups");
      location.reload();
    });
    dock.append(label, button);
    document.body.append(dock);
  });
})();
