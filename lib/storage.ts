import { get, put } from "@vercel/blob";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOB_PREFIX = "kalpasi-data";

function blobPath(filename: string): string {
  return `${BLOB_PREFIX}/${filename}`;
}

function useBlobStorage(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function ensureDataDir() {
  if (useBlobStorage()) return;
  await mkdir(DATA_DIR, { recursive: true });
}

function warnStorageFallback(filename: string, reason: string): void {
  console.warn(`[kalpasi-storage] Using fallback for "${filename}": ${reason}`);
}

async function readBlobJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const result = await get(blobPath(filename), {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      warnStorageFallback(
        filename,
        result?.statusCode
          ? `blob read returned status ${result.statusCode}`
          : "blob object not found"
      );
      return fallback;
    }
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch (error) {
    warnStorageFallback(
      filename,
      error instanceof Error ? error.message : "blob read failed"
    );
    return fallback;
  }
}

async function writeBlobJson<T>(filename: string, data: T): Promise<void> {
  await put(blobPath(filename), JSON.stringify(data, null, 2), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

export async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  if (useBlobStorage()) {
    return readBlobJson(filename, fallback);
  }

  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (error) {
    const reason =
      error instanceof Error && "code" in error && error.code === "ENOENT"
        ? "local file not found"
        : error instanceof Error
          ? error.message
          : "local read failed";
    warnStorageFallback(filename, reason);
    return fallback;
  }
}

export async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  if (useBlobStorage()) {
    await writeBlobJson(filename, data);
    return;
  }

  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}
