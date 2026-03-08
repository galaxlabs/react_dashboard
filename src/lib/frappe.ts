export async function callFrappe<T = unknown>(
  method: string,
  args?: Record<string, unknown>
): Promise<T> {
  const search = new URLSearchParams(window.location.search);
  const fromQuery = (search.get("frappe_base") || "").trim().replace(/\/+$/, "");
  const fromEnv = String(import.meta.env.VITE_FRAPPE_BASE_URL || "")
    .trim()
    .replace(/\/+$/, "");
  const base = fromQuery || fromEnv || window.location.origin;
  const url = `${base}/api/method/${method}`;
  const body = new URLSearchParams();
  if (args) {
    for (const [key, value] of Object.entries(args)) {
      body.set(key, typeof value === "string" ? value : JSON.stringify(value));
    }
  }

  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Accept: "application/json",
      "X-Frappe-CSRF-Token": (window as { csrf_token?: string }).csrf_token || "",
    },
    body: body.toString(),
  });

  const json = (await res.json()) as { message?: T; exc?: string; _server_messages?: string };
  if (!res.ok || json.exc) {
    throw new Error(json.exc || json._server_messages || `Request failed: ${res.status}`);
  }
  return (json.message ?? (json as unknown)) as T;
}
