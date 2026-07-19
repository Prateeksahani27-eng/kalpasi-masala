import { readJsonFile, writeJsonFile } from "@/lib/storage";
import { siteConfig } from "@/lib/site-config";

type Subscriber = {
  email: string;
  subscribedAt: string;
};

const FILE = "newsletter-subscribers.json";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function loadSubscribers(): Promise<Subscriber[]> {
  return readJsonFile<Subscriber[]>(FILE, []);
}

async function saveSubscribers(subscribers: Subscriber[]): Promise<void> {
  await writeJsonFile(FILE, subscribers);
}

export async function subscribeNewsletter(
  email: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const normalized = email.trim().toLowerCase();
  if (!isValidEmail(normalized)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const subscribers = await loadSubscribers();
  if (subscribers.some((s) => s.email === normalized)) {
    return { ok: false, error: "This email is already subscribed." };
  }

  subscribers.push({
    email: normalized,
    subscribedAt: new Date().toISOString(),
  });
  await saveSubscribers(subscribers);

  await notifyAdminNewSubscriber(normalized);

  return { ok: true };
}

export async function getAllSubscribers(): Promise<Subscriber[]> {
  return loadSubscribers();
}

async function notifyAdminNewSubscriber(email: string): Promise<void> {
  const to = siteConfig.newsletterReceiverEmail;
  if (!to) return;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    await appendAdminLog({
      type: "newsletter",
      email,
      at: new Date().toISOString(),
    });
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kalpasi Masala <onboarding@resend.dev>",
        to: [to],
        subject: "New Kalpasi newsletter subscriber",
        text: `New subscriber: ${email}`,
      }),
    });
  } catch {
    await appendAdminLog({
      type: "newsletter",
      email,
      at: new Date().toISOString(),
    });
  }
}

async function appendAdminLog(entry: Record<string, string>) {
  const logs = await readJsonFile<Record<string, string>[]>(
    "admin-notifications.json",
    []
  );
  logs.unshift(entry as Record<string, string>);
  await writeJsonFile("admin-notifications.json", logs);
}

export async function notifyAdminNewReview(review: {
  name: string;
  rating: number;
}): Promise<void> {
  const to = siteConfig.newsletterReceiverEmail;
  if (!to) return;

  const apiKey = process.env.RESEND_API_KEY;
  const body = `New review submitted by ${review.name} (${review.rating}/5). Log in to admin to moderate.`;

  if (!apiKey) {
    await appendAdminLog({
      type: "review",
      name: review.name,
      at: new Date().toISOString(),
    });
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kalpasi Masala <onboarding@resend.dev>",
        to: [to],
        subject: "New Kalpasi review pending moderation",
        text: body,
      }),
    });
  } catch {
    await appendAdminLog({ type: "review", name: review.name, at: new Date().toISOString() });
  }
}
