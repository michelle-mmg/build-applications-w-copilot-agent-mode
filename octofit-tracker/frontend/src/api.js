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

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'data']) {
      const value = payload[key];

      if (Array.isArray(value)) {
        return value;
      }

      if (value && typeof value === 'object' && Array.isArray(value.results)) {
        return value.results;
      }
    }
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
