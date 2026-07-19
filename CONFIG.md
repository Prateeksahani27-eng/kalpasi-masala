# Kalpasi site configuration

Set these in `.env.local` for local development. On Vercel, add the same variables under **Project → Settings → Environment Variables**.

See `.env.example` for a template.

## Site URL

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap, Open Graph, robots). Example: `https://kalpasimasala.com` |

## Social & marketplace links

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram profile |
| `NEXT_PUBLIC_WHATSAPP_URL` | Full WhatsApp chat URL (used by floating button & footer) |
| `NEXT_PUBLIC_AMAZON_STORE_URL` | Amazon storefront |
| `NEXT_PUBLIC_FLIPKART_STORE_URL` | Flipkart storefront |
| `NEXT_PUBLIC_MEESHO_STORE_URL` | Meesho storefront |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook page (footer) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Fallback digits if `WHATSAPP_URL` is empty |

## Newsletter

| Variable | Description |
|----------|-------------|
| `NEWSLETTER_RECEIVER_EMAIL` | Admin email for new subscriber & review notifications |
| `RESEND_API_KEY` | Optional — sends email via [Resend](https://resend.com) |

Subscribers are stored in `data/newsletter-subscribers.json` locally (gitignored).

## Admin

| Variable | Description |
|----------|-------------|
| `ADMIN_SECRET` | Password for `/admin/reviews` moderation |

Customer reviews are stored in `data/reviews.json` locally (gitignored).

## Production storage (Vercel)

Vercel serverless functions cannot persist files to disk. For reviews and newsletter subscribers to survive in production:

1. In the Vercel dashboard, open your project → **Storage** → **Create Database** → **Blob**
2. Connect the Blob store to your project — Vercel adds `BLOB_READ_WRITE_TOKEN` automatically
3. Redeploy

Without `BLOB_READ_WRITE_TOKEN`, the site still deploys and all pages work, but review submissions and newsletter sign-ups will not persist on Vercel.

---

## Deploy to GitHub + Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare Kalpasi site for production deployment"
git push -u origin main
```

### 2. Import on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Framework preset: **Next.js** (auto-detected)
4. Build command: `npm run build` (default)
5. Output: default

### 3. Set environment variables

In Vercel → **Settings → Environment Variables**, add at minimum:

| Variable | Required | Notes |
|----------|----------|-------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your live domain |
| `ADMIN_SECRET` | Yes | Strong random string for review moderation |
| `NEXT_PUBLIC_WHATSAPP_URL` | Recommended | Customer contact |
| `NEWSLETTER_RECEIVER_EMAIL` | Recommended | Admin notifications |
| `BLOB_READ_WRITE_TOKEN` | Recommended | Auto-added when Blob store is linked |
| `RESEND_API_KEY` | Optional | Email notifications for reviews/subscribers |

All `NEXT_PUBLIC_*` variables must also be set for **Production** (and Preview if you want previews to work fully).

### 4. Deploy

Click **Deploy**. Vercel builds and hosts the site. Future pushes to `main` trigger automatic redeploys.

### 5. Post-deploy checks

- Homepage, products, contact, and reviews pages load
- WhatsApp links open correctly
- Submit a test review → moderate at `/admin/reviews`
- Subscribe to newsletter → export CSV from admin panel
- Visit `/sitemap.xml` and `/robots.txt`

### Custom domain

In Vercel → **Settings → Domains**, add your domain (e.g. `kalpasimasala.com`) and update DNS as instructed. Then set `NEXT_PUBLIC_SITE_URL` to that domain and redeploy.
