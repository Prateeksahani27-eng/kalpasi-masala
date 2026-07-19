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

async function readBlobJson<T>(filename: string, fallback: T): Promise<T> {
  try {
    const result = await get(blobPath(filename), {
      access: "private",
      token: process.env.BLOB_READ_WRITE_TOKEN,
      useCache: false,
    });
    if (!result || result.statusCode !== 200 || !result.stream) {
      return fallback;
    }
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch {
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
  } catch {
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
