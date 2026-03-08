import { useMemo, useState, type CSSProperties } from "react";
import AccountsWorkspace from "./modules/AccountsWorkspace";

type ThemeKey = "default" | "graphite" | "sunset" | "mint";
type LayoutKey = "classic" | "compact" | "focus";

const themes: { key: ThemeKey; label: string }[] = [
  { key: "default", label: "Default Blue" },
  { key: "graphite", label: "Graphite Dark" },
  { key: "sunset", label: "Sunset Warm" },
  { key: "mint", label: "Mint Fresh" },
];

const layouts: { key: LayoutKey; label: string; sidebar: string; grid: string }[] = [
  { key: "classic", label: "Classic", sidebar: "w-64", grid: "grid-cols-1 xl:grid-cols-3" },
  { key: "compact", label: "Compact", sidebar: "w-56", grid: "grid-cols-1 2xl:grid-cols-4" },
  { key: "focus", label: "Focus", sidebar: "w-72", grid: "grid-cols-1 xl:grid-cols-2" },
];

const metrics = [
  { title: "Revenue", value: "$128,420", delta: "+12.4%" },
  { title: "Orders", value: "1,284", delta: "+8.1%" },
  { title: "Active Users", value: "5,942", delta: "+15.0%" },
  { title: "Tickets", value: "42", delta: "-4.9%" },
];

type ModuleItem = { label: string; type: "doctype" | "dashboard" | "report" };
type ModuleGroup = { module: string; icon: string; items: ModuleItem[] };

const moduleGroups: ModuleGroup[] = [
  {
    module: "Accounts",
    icon: "A",
    items: [
      { label: "Accounts Workspace", type: "dashboard" },
      { label: "Account", type: "doctype" },
      { label: "GL Entry", type: "doctype" },
      { label: "Journal Entry", type: "doctype" },
      { label: "Print Formats", type: "report" },
    ],
  },
  {
    module: "Sales",
    icon: "S",
    items: [
      { label: "Sales Dashboard", type: "dashboard" },
      { label: "Sales Order", type: "doctype" },
      { label: "Sales Invoice", type: "doctype" },
      { label: "Revenue Report", type: "report" },
    ],
  },
  {
    module: "Stock",
    icon: "I",
    items: [
      { label: "Inventory Dashboard", type: "dashboard" },
      { label: "Item", type: "doctype" },
      { label: "Stock Entry", type: "doctype" },
      { label: "Warehouse Summary", type: "report" },
    ],
  },
  {
    module: "CRM",
    icon: "C",
    items: [
      { label: "CRM Dashboard", type: "dashboard" },
      { label: "Lead", type: "doctype" },
      { label: "Opportunity", type: "doctype" },
      { label: "Pipeline Report", type: "report" },
    ],
  },
  {
    module: "System",
    icon: "G",
    items: [
      { label: "Control Center", type: "dashboard" },
      { label: "User", type: "doctype" },
      { label: "Role", type: "doctype" },
      { label: "Audit Trail", type: "report" },
    ],
  },
];
const orders = [
  { id: "SO-1001", customer: "Nexus Retail", amount: "$1,420", status: "Paid" },
  { id: "SO-1002", customer: "Acme Group", amount: "$940", status: "Pending" },
  { id: "SO-1003", customer: "Blue Peak", amount: "$2,180", status: "Paid" },
  { id: "SO-1004", customer: "Orbit Labs", amount: "$310", status: "Draft" },
];

export default function App() {
  const [theme, setTheme] = useState<ThemeKey>("default");
  const [layout, setLayout] = useState<LayoutKey>("classic");
  const [radius, setRadius] = useState(16);
  const [accentGlow, setAccentGlow] = useState(true);
  const [activeNav, setActiveNav] = useState("Accounts Workspace");
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    Accounts: true,
    Sales: true,
    Stock: true,
    CRM: false,
    System: false,
  });

  const selectedLayout = useMemo(() => layouts.find((l) => l.key === layout) ?? layouts[0], [layout]);
  const accountsNavSet = useMemo(
    () => new Set((moduleGroups.find((m) => m.module === "Accounts")?.items || []).map((i) => i.label)),
    []
  );
  const isAccountsModule = accountsNavSet.has(activeNav);

  return (
    <div
      data-theme={theme}
      style={{ "--radius": `${radius}px` } as CSSProperties}
      className="min-h-full bg-bg transition-colors duration-300"
    >
      <div className="relative min-h-full">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-16 top-10 h-60 w-60 rounded-full bg-accent/15 blur-3xl" />
        </div>

        <div className="relative flex min-h-screen">
          {isDrawerOpen && (
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-20 bg-black/20 backdrop-blur-[1px] md:hidden"
            />
          )}

          <aside
            className={`${
              selectedLayout.sidebar
            } fixed inset-y-0 left-0 z-30 border-r border-border bg-card/90 p-5 backdrop-blur transition-transform duration-300 md:sticky md:top-0 md:h-screen md:translate-x-0 ${
              isDrawerOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="h-10 w-10 rounded-panel bg-gradient-to-br from-primary to-accent shadow-soft" />
              <div>
                <p className="text-sm text-muted">Galaxy UI</p>
                <h1 className="text-lg font-bold">Admin Panel</h1>
              </div>
            </div>
            <nav className="space-y-3 overflow-auto pr-1">
              {moduleGroups.map((group) => {
                const isOpen = !!openGroups[group.module];
                return (
                  <div key={group.module} className="rounded-panel border border-border bg-bg/60">
                    <button
                      onClick={() =>
                        setOpenGroups((prev) => ({
                          ...prev,
                          [group.module]: !prev[group.module],
                        }))
                      }
                      className="flex w-full items-center justify-between px-3 py-2 text-left"
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/15 text-[11px] text-primary">
                          {group.icon}
                        </span>
                        {group.module}
                      </span>
                      <span className="text-xs text-muted">{isOpen ? "▾" : "▸"}</span>
                    </button>
                    {isOpen && (
                      <div className="space-y-1 border-t border-border px-2 py-2">
                        {group.items.map((item) => (
                          <button
                            key={`${group.module}-${item.label}`}
                            onClick={() => {
                              setActiveNav(item.label);
                              if (window.innerWidth < 768) setIsDrawerOpen(false);
                            }}
                            className={`w-full rounded-panel px-3 py-2 text-left text-sm transition ${
                              activeNav === item.label
                                ? "bg-primary text-white shadow-soft"
                                : "hover:bg-primary/10"
                            }`}
                          >
                            <span className="mr-2 inline-block rounded bg-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                              {item.type}
                            </span>
                            {item.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
            <div className="mt-auto rounded-panel border border-border bg-bg p-3 text-sm text-muted">
              Connected Site
              <p className="mt-1 font-semibold text-text">erp.galaxy.local</p>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-6">
            <header className="mb-6 flex flex-col gap-4 rounded-panel border border-border bg-card p-4 shadow-soft md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDrawerOpen((s) => !s)}
                  className="rounded-panel border border-border px-3 py-2 text-sm hover:bg-bg"
                >
                  ☰
                </button>
                <div>
                  <p className="text-sm text-muted">Welcome back</p>
                  <h2 className="text-2xl font-bold">{activeNav}</h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="rounded-panel border border-border px-3 py-2 text-sm hover:bg-bg">Export</button>
                <button className="rounded-panel bg-primary px-4 py-2 text-sm font-semibold text-white">New Action</button>
              </div>
            </header>

            <section className="mb-5 rounded-panel border border-border bg-card p-3 shadow-soft">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <span className="rounded bg-primary/10 px-2 py-1 text-primary">Module Navigation</span>
                <span>Grouped by module definition</span>
                <span className="rounded bg-border px-2 py-1">DocTypes</span>
                <span className="rounded bg-border px-2 py-1">Dashboards</span>
                <span className="rounded bg-border px-2 py-1">Reports</span>
              </div>
            </section>

            {isAccountsModule ? (
              <AccountsWorkspace />
            ) : (
              <>
                <section className={`mb-6 grid gap-4 ${selectedLayout.grid}`}>
                  {metrics.map((m) => (
                    <article key={m.title} className="rounded-panel border border-border bg-card p-4 shadow-soft">
                      <p className="text-sm text-muted">{m.title}</p>
                      <p className="mt-2 text-2xl font-bold">{m.value}</p>
                      <p className={`mt-2 text-sm ${m.delta.startsWith("-") ? "text-red-500" : "text-emerald-500"}`}>
                        {m.delta}
                      </p>
                    </article>
                  ))}
                </section>

                <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                  <article className="rounded-panel border border-border bg-card p-4 shadow-soft xl:col-span-2">
                    <h3 className="text-lg font-semibold">Revenue Activity</h3>
                    <div className="mt-4 grid grid-cols-12 gap-2">
                      {[35, 62, 48, 71, 55, 88, 64, 74, 68, 82, 78, 92].map((h, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                          <div
                            className={`w-full rounded-t-md bg-gradient-to-t from-primary to-accent ${
                              accentGlow ? "shadow-[0_6px_18px_rgba(14,165,233,.28)]" : ""
                            }`}
                            style={{ height: `${h * 1.5}px` }}
                          />
                          <span className="text-[10px] text-muted">{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </article>

                  <article className="rounded-panel border border-border bg-card p-4 shadow-soft">
                    <h3 className="text-lg font-semibold">Live Feed</h3>
                    <ul className="mt-4 space-y-3 text-sm">
                      {["Invoice INV-443 posted", "Theme switched to Mint", "Workflow rule deployed", "2 users invited"].map(
                        (event) => (
                          <li key={event} className="rounded-panel border border-border bg-bg px-3 py-2 text-muted">
                            {event}
                          </li>
                        )
                      )}
                    </ul>
                  </article>
                </section>

                <section className="mt-6 rounded-panel border border-border bg-card p-4 shadow-soft">
                  <h3 className="text-lg font-semibold">Recent Orders</h3>
                  <div className="mt-4 overflow-auto">
                    <table className="w-full min-w-[620px] border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-muted">
                          <th className="py-2">Order</th>
                          <th className="py-2">Customer</th>
                          <th className="py-2">Amount</th>
                          <th className="py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((o) => (
                          <tr key={o.id} className="border-b border-border/60">
                            <td className="py-3 font-medium">{o.id}</td>
                            <td className="py-3">{o.customer}</td>
                            <td className="py-3">{o.amount}</td>
                            <td className="py-3">
                              <span className="rounded-full bg-primary/15 px-2 py-1 text-xs font-semibold text-primary">
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}
          </main>

          <aside className="hidden w-80 border-l border-border bg-card/80 p-5 backdrop-blur xl:block">
            <h3 className="text-lg font-semibold">Design Controls</h3>
            <p className="mt-1 text-sm text-muted">Live customization for theming and layout presets.</p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">Theme</label>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTheme(t.key)}
                      className={`rounded-panel border px-2 py-2 text-xs ${
                        theme === t.key ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-bg"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Layout</label>
                <div className="space-y-2">
                  {layouts.map((l) => (
                    <button
                      key={l.key}
                      onClick={() => setLayout(l.key)}
                      className={`w-full rounded-panel border px-3 py-2 text-left text-sm ${
                        layout === l.key ? "border-primary bg-primary/10" : "border-border hover:bg-bg"
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Corner Radius: {radius}px</label>
                <input
                  type="range"
                  min={8}
                  max={28}
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <label className="flex items-center gap-3 rounded-panel border border-border bg-bg p-3 text-sm">
                <input type="checkbox" checked={accentGlow} onChange={(e) => setAccentGlow(e.target.checked)} />
                Enable chart glow accents
              </label>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
