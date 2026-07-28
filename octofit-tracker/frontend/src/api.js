const normalizeComponent = (component) => component.replace(/^\/+|\/+$/g, '');

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

export function buildApiUrl(component) {
  const normalizedComponent = normalizeComponent(component);
  return `${getApiBaseUrl()}/api/${normalizedComponent}/`;
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
