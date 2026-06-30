# Tech Stack & Architectural Rationale

This document explains **why** we chose specific technologies, patterns, and design systems for the **FestFlow** platform, and what benefits they bring to the developer and student experience.

---

## 🛠️ 1. Next.js 14 (App Router)
Next.js is the core React framework used for building both the user interface and handling server-side rendering.

* **Server Components (RSC) by Default**:
  * *Why*: Pages like the Landing Page (`page.tsx`) fetch events directly on the server. This means zero loading spinners on load, faster page loads, and native search engine optimization (SEO).
* **Client Components where Needed**:
  * *Why*: Interactive pages like search filters (`/events`) and dashboard tabs declare `"use client"`. This allows us to use React state (`useState`, `useEffect`) for micro-interactions while still benefit from server-side hydration.
* **Layout Nesting (`layout.tsx`)**:
  * *Why*: We declare global components (like the `<Navbar />` and `<RoleSwitcher />`) and ambient glow backgrounds once in the root layout, so they persist smoothly during page transitions without re-rendering.
* **Dynamic Folder Routing (`[id]`)**:
  * *Why*: We use dynamic routes like `/events/[id]` to automatically parse event IDs from the URL path.

---

## 🎨 2. Tailwind CSS v4 (Electric Aurora Aesthetic)
Tailwind CSS v4 is used for styling the entire user interface.

* **Tailwind v4 `@theme` Directives**:
  * *Why*: In v4, we define custom tokens (like the Space Grotesk font and midnight background color) directly in the CSS file (`globals.css`) instead of creating a Javascript config file. This compiles faster and keeps styles cohesive.
* **Backdrop Filters (Glassmorphism)**:
  * *Why*: Features frosted borders (`border-white/10`) and background blurs (`backdrop-blur-xl`) that make widgets float elegantly above ambient colors.
* **Utility-First Classes**:
  * *Why*: Lets us adjust responsiveness, spacing, and hover scale transitions inline without writing separate CSS stylesheet code.

---

## 🗄️ 3. PostgreSQL & Prisma ORM
PostgreSQL is the production database, and Prisma ORM is the database interface.

* **Prisma Type Safety**:
  * *Why*: Auto-generates TypeScript definitions directly from your `schema.prisma` file, catching database syntax queries and parameter typos before compilation.
* **Relational Database (PostgreSQL)**:
  * *Why*: Event management requires structured relationships (e.g., a **User** registers for an **Event**, which generates a **Ticket** and logs a **Payment**). Relational tables guarantee data integrity.
* **Prisma Studio**:
  * *Why*: Exposes an administrative web interface (`npx prisma studio`) to explore, modify, and manage database records visually without writing SQL scripts.

---

## ⚡ 4. Next.js Server Actions (`"use server"`)
Server Actions are used to handle interactive data mutations directly between the frontend and the server database.

* **No API Route Boilerplate**:
  * *Why*: Instead of writing separate `fetch()` API calls, endpoints, and controller files, we declare async functions in `actions.ts`. React calls them directly from button clicks or forms, and they run safely on the server.
* **Instant Revalidation (`revalidatePath`)**:
  * *Why*: When an event is approved or checked in, Server Actions call `revalidatePath` to purge the Next.js cache. This updates all connected page views immediately.

---

## 📦 5. Core Libraries

### `qrcode.react`
* *Why*: Generates check-in codes entirely on the client side using SVGs. This avoids sending network requests to external QR generation APIs, keeping student data secure and loading instantly.

### `lucide-react`
* *Why*: Exposes a large library of lightweight, responsive vector icons (calendars, checkmarks, scanners, profiles) that scale cleanly and support Tailwind classes.

### `framer-motion` (Configured for animations)
* *Why*: Handles page transitions, bento grid fades, and modal overlays smoothly.
