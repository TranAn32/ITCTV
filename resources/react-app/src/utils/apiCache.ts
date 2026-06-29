// Client-side API Caching system with Stale-While-Revalidate (SWR) support

const cache: Record<string, any> = {};
const pendingRequests: Record<string, Promise<any>> = {};

/**
 * Deep compare helper for JSON response data
 */
export function areResponseDataEqual(a: any, b: any): boolean {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch (e) {
    return false;
  }
}

/**
 * Get data from memory cache synchronously
 */
export function getCachedData<T = any>(url: string): T | null {
  return cache[url] !== undefined ? cache[url] : null;
}

/**
 * Fetch data using Stale-While-Revalidate strategy.
 * If data exists in cache, it immediately calls onUpdate with the cached data.
 * It will then perform a fetch in the background. If the background fetch
 * returns different data from the cache, it updates the cache and calls onUpdate with the new data.
 */
export async function fetchWithSWR<T = any>(
  url: string,
  onUpdate?: (data: T) => void
): Promise<T> {
  const cached = getCachedData<T>(url);

  // If we have cached data, trigger callback immediately for instant UI render
  if (cached !== null && onUpdate) {
    onUpdate(cached);
  }

  // Prevent multiple identical requests concurrently
  if (pendingRequests[url]) {
    try {
      const data = await pendingRequests[url];
      return data;
    } catch (err) {
      // If the pending request fails, we fall back to making our own or throwing
    }
  }

  const fetchPromise = fetch(url)
    .then(async (res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json() as Promise<T>;
    })
    .then((newData) => {
      // Clean up request from pending queue
      delete pendingRequests[url];

      // If data is different from cache, update cache and notify UI
      if (cached === null || !areResponseDataEqual(cached, newData)) {
        cache[url] = newData;
        if (onUpdate) {
          onUpdate(newData);
        }
      }
      return newData;
    })
    .catch((err) => {
      delete pendingRequests[url];
      throw err;
    });

  pendingRequests[url] = fetchPromise;
  return fetchPromise;
}

/**
 * Prefetch all critical endpoints on app startup to prime the cache
 */
export function prefetchAllData(): Promise<any> {
  const urls = [
    '/api/banner',
    '/api/news',
    '/api/partners',
    '/api/projects',
    '/api/services',
    '/api/gallery',
    '/api/recruitments'
  ];

  const prefetchPromises = urls.map(url =>
    fetch(url)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data !== null) {
          cache[url] = data;
        }
      })
      .catch(err => {
        console.warn(`Failed to prefetch ${url}:`, err);
      })
  );

  return Promise.all(prefetchPromises);
}
