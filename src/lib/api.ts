export type ApiFetchOptions = RequestInit & {
  token?: string | null;
};

const API_PREFIX = "/api/v1";

export function apiBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

  if (configuredUrl.endsWith(API_PREFIX)) {
    return configuredUrl.slice(0, -API_PREFIX.length);
  }

  return configuredUrl;
}

export function apiPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath.startsWith(API_PREFIX)) {
    return `${apiBaseUrl()}${normalizedPath}`;
  }

  return `${apiBaseUrl()}${API_PREFIX}${normalizedPath}`;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { token, headers, ...init } = options;
  const response = await fetch(apiPath(path), {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Elshbiny API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
