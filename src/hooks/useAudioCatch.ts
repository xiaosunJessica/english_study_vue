import { reactive } from "vue";

const cache = reactive(new Map<string, string>());
const apiUrl = import.meta.env.VITE_API_URL;

async function batchRequest<T>(
  urls: string[],
  handler: (url: string) => Promise<T>,
  limit: number = 5,
): Promise<T[]> {
  const results: T[] = [];
  let i = 0;

  // 启动limi个并罚
  const workers = Array.from({ length: limit }).map(async () => {
    while (i < urls.length) {
      const cur = i++;
      try {
        results[cur] = await handler(urls[cur]);
      } catch (e) {
        results[cur] = null as any;
      }
    }
  });

  await Promise.all(workers);
  return results;
}

async function fetchAndCacheAudio(url: string) {
  if (cache.has(url) || !url) return;
  try {
    const resp = await fetch(`${apiUrl}/commonApi/audio-proxy?url=${url}`, {
      method: "GET",
      mode: "cors",
    });
    console.log(resp, "00000");
    const blob = await resp.blob();
    console.log(blob, "111");
    const blobUrl = URL.createObjectURL(blob);
    cache.set(url, blobUrl);
  } catch (error) {
    console.error(`预加载音频失败: ${url}`, error);
  }
}

export function useAudioCache() {
  const preloadAudios = (urls: string[]) => {
    urls.forEach((url) => fetchAndCacheAudio(url));
  };

  const batchLoadAudios = (urls: string[]) => {
    batchRequest(urls, fetchAndCacheAudio, 3);
  };

  const getAudioUrl = (url: string) => {
    return cache.get(url) || url; // 优先从缓存取，否则返回原始 url
  };

  return { preloadAudios, batchLoadAudios, getAudioUrl };
}
