# Elshbiny Storefront

Next.js frontend for the Elshbiny business storefront. It includes the catalog and product experience, fit-out questionnaire, quote journey, contact flow, FAQs, and customer account screens. The backend API is provided by [`elshbiny-core`](https://github.com/gemmey1020/elshbiny-core).

## Stack

- Next.js 14 App Router
- React 18 and TypeScript
- Tailwind CSS, Zustand, and Three.js
- Node.js and npm

## Local development

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`. Set `NEXT_PUBLIC_API_URL` to the local Elshbiny Core API. Business phone, WhatsApp, and Messenger contact values are intentionally blank in the public source; set them in `.env.local` when those details are approved for the deployment. Quote submission requires a configured WhatsApp number.

For a production build, run `npm run build` and then `npm start`. No production deployment or runtime verification is claimed by this repository snapshot.

## License

No project license has been selected. Public visibility does not grant permission to reuse or redistribute this code; all rights remain reserved by the copyright holder unless a license is added.
