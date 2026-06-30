# 🌌 FestFlow

**FestFlow** is a premium, type-safe college event management platform designed to streamline and elevate the campus event experience. It connects students, organizers, volunteers, and university administrators into a single, cohesive, real-time ecosystem.

Built with **Next.js 14 (App Router)** and **Tailwind CSS v4**, the interface implements the dark **Electric Aurora** design narrative, featuring frosted glassmorphism, responsive visual graphs, and glowing atmospheric layers.

---

## 🚀 Technology Stack

* **Frontend Framework**: Next.js 14 (React Server Components, nested layouts, folder-based dynamic routing)
* **Styling**: Tailwind CSS v4 (native CSS theme configuration, `@theme` directives, hardware-accelerated blurs)
* **Database & ORM**: PostgreSQL with Prisma ORM (relational schema, auto-generated TypeScript definitions)
* **Interactivity**: Next.js Server Actions (`"use server"` for form processing, live data mutation, and automatic route cache revalidation)
* **Libraries**:
  * `qrcode.react`: Secure client-side SVG QR code ticket generation
  * `lucide-react`: Lightweight vector icon system
  * `framer-motion`: Smooth UI transitions and bento grid load animations

---

## ✨ Feature Highlights

1. **Electric Aurora Design Narrative**: Sleek midnight UI (`#101221`) using Space Grotesk/Inter fonts, frosted cards, and glowing borders.
2. **Interactive Role Switcher**: A floating global quick-access control widget in the bottom-right corner of all views, allowing developers and evaluators to swap instantly between the 4 workspace contexts.
3. **Student Portal**:
   * Interactive **Explore Grid** with instant search inputs and category filter buttons.
   * **Simulated Payments Drawer**: Checkout button integrating a simulated 2-second Razorpay gateway load.
   * **Student Dashboard**: Renders active tickets. Clicking a ticket opens a modal displaying a fully scannable SVG QR Code.
4. **Organizer Analytics Hub**:
   * **Live KPI Bento Grid**: Computes total registered students, platform revenue, and active fests from the database.
   * **SVG Registrations Trend Line**: Lightweight vector area graph tracking registration spikes.
   * **Task Manager**: Check-box list saved directly to the database.
   * **4-Step Stepper Wizard**: Guide (Info ➔ Venue ➔ Tickets ➔ Review) to draft and submit fests for approval.
5. **Admin Console**:
   * **Moderation Board**: Shows newly created fests waiting in a `Pending` state. Admins can click "Approve" (makes it active/searchable) or "Reject".
   * **User Manager**: Directory table to edit user roles (promote a student to organizer/volunteer) instantly.
6. **Volunteer Gate Scanner**:
   * **Attendee Check-in**: Verification input where volunteers paste student Ticket IDs to check them in.
   * **Stats Tracker**: Compares tickets sold, scanned attendees, and remaining gate list counts.

---

## 🔄 End-to-End Test Workflows

The prototype implements a complete, closed-loop event cycle. Refer to **[WORKFLOW.md](./WORKFLOW.md)** for step-by-step test instructions:

1. **Organizer** creates a new fest via the creation wizard ➔ Event enters `Pending` state.
2. **Admin** logs into the moderation board ➔ Clicks **Approve Fest** ➔ Event status changes to `Active`.
3. **Student** searches for the event ➔ Registers and completes checkout ➔ Generates active registration and QR ticket.
4. **Volunteer** logs into the Gate Scanner ➔ Enters the student's Ticket ID ➔ Checks in the attendee.
5. **Organizer** dashboard analytics refresh automatically to show updated registration and checked-in attendance rates.

---

## 🛠️ Getting Started

### Prerequisites
* Node.js (v18.x or later recommended)
* npm or yarn

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Krati-orbit/FestFlow-.git
   cd FestFlow-
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Initialize the Prisma schema:
   ```bash
   npx prisma generate
   ```
4. Spin up the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## 📁 Key Directories & Documents

* **[FEATURES.md](./FEATURES.md)**: Exhaustive breakdown of visual and component design features.
* **[WORKFLOW.md](./WORKFLOW.md)**: Illustrated Mermaid flowcharts and instructions to test the platform.
* **[TECH_RATIONALE.md](./TECH_RATIONALE.md)**: Architectural documentation explaining stack choices.
* `src/data/db.json`: Local JSON persistence store database.
* `src/utils/db.ts`: Filesystem query handler.
* `src/app/actions.ts`: Middlewares linking server state and components.
