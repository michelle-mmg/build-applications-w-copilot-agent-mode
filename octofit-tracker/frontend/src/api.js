const normalizePath = (path) => {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed.startsWith('api/') ? trimmed : `api/${trimmed}`;
};

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
}

export function buildApiUrl(component) {
  const path = normalizePath(component);
  return `${getApiBaseUrl()}/${path}/`;
}

export function extractItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
}

export async function fetchJson(component) {
  const response = await fetch(buildApiUrl(component));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return extractItems(payload);
}
