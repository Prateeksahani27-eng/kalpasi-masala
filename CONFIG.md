# Kalpasi Site Configuration

## Environment Variables

Set these in `.env.local` for local development.

On Vercel:

Project → Settings → Environment Variables

See `.env.example` for a template.

---

# Site URL

| Variable | Description |

|----------|-------------|

| NEXT_PUBLIC_SITE_URL | Canonical site URL used for Sitemap, Open Graph, Robots and SEO. Example: [https://www.kalpasispices.com](https://www.kalpasispices.com) |

---

# Social & Marketplace Links

| Variable | Description |

|----------|-------------|

| NEXT_PUBLIC_INSTAGRAM_URL | Instagram profile |

| NEXT_PUBLIC_WHATSAPP_URL | Full WhatsApp chat URL |

| NEXT_PUBLIC_AMAZON_STORE_URL | Amazon storefront |

| NEXT_PUBLIC_FLIPKART_STORE_URL | Flipkart storefront |

| NEXT_PUBLIC_MEESHO_STORE_URL | Meesho storefront |

| NEXT_PUBLIC_FACEBOOK_URL | Facebook page |

| NEXT_PUBLIC_WHATSAPP_NUMBER | Fallback phone number |

---



# Newsletter

| Variable | Description |

|----------|-------------|

| NEWSLETTER_RECEIVER_EMAIL | Email to receive subscriber notifications |

| RESEND_API_KEY | Optional email sending service |

Subscribers are stored locally in:

```

data/newsletter-subscribers.json

```

(gitignored)

---



# Admin

| Variable | Description |

|----------|-------------|

| ADMIN_SECRET | Password for /admin/reviews |

Reviews are stored locally in:

```

data/reviews.json

```

(gitignored)

---



# Production Storage (Vercel)

Because Vercel Serverless Functions cannot permanently write files:

1. Go to

```

Vercel

→ Storage

→ Create Database

→ Blob

```

1. Connect Blob Storage
2. Vercel automatically adds

```

BLOB_READ_WRITE_TOKEN

```

1. Redeploy

Without Blob Storage, the website still works, but:

- Reviews won't persist
- Newsletter subscribers won't persist

---



# Deploying



## Push to GitHub

```bash

git add .

git commit -m "Prepare production deployment"

git push origin main

```

---



## Import into Vercel

- Create New Project
- Import GitHub Repository
- Framework: Next.js
- Build Command:

```bash

npm run build

```

Leave all other defaults.

---



# Required Environment Variables

| Variable | Required |

|----------|----------|

| NEXT_PUBLIC_SITE_URL | ✅ |

| ADMIN_SECRET | ✅ |

| NEXT_PUBLIC_WHATSAPP_URL | Recommended |

| NEWSLETTER_RECEIVER_EMAIL | Recommended |

| BLOB_READ_WRITE_TOKEN | Recommended |

| RESEND_API_KEY | Optional |

Remember to add all `NEXT_PUBLIC_*` variables for both:

- Production
- Preview

---



# After Deployment

Check:

- Homepage
- Products
- Reviews
- Contact Page
- WhatsApp links
- Newsletter
- Admin Panel
- robots.txt
- sitemap.xml

---



# Custom Domain

After adding your custom domain:

```

Vercel

→ Settings

→ Domains

```

Set

```

NEXT_PUBLIC_SITE_URL

```

to

```

[https://www.kalpasispices.com](https://www.kalpasispices.com)

```

Redeploy the project afterwards.