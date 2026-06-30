# FestFlow Features Overview

This file lists all the functional, visual, and architectural features currently implemented in the **FestFlow** college event management prototype.

---

## 🎨 1. Electric Aurora Design System
* **Advanced Glassmorphism**: High-translucency containers (`rgba(28, 31, 46, 0.7)`) with frosted glass backdrop-blur (`backdrop-blur-xl`) and border glows (`0.5px` border with `10%` white opacity).
* **Atmospheric Elevation & Glows**: Radial glows catching the corners of pages and linear gradient glows behind interactive buttons to simulate bioluminescence against a deep midnight background (`#101221`).
* **Modern Typography Pairing**: 
  * **Space Grotesk**: A geometric, technical font used for all display headings and CAPS labels to establish a technical dashboard aesthetic.
  * **Inter**: A highly legible sans-serif font used for descriptions, inputs, and tables.
* **Tactile Interactions**: Micro-animations on buttons (scaling-down on click, glowing border transitions) and hover magnification on cards.

---

## 📂 2. Database & State Persistence
* **JSON File-Based Store (`src/data/db.json`)**: Persists events, registrations, tasks, and users locally across server restarts.
* **Database Utility API (`src/utils/db.ts`)**: Handles asynchronous file operations for reading, appending new fests, registering student check-ins, and managing organizer checklists.
* **Next.js Server Actions (`src/app/actions.ts`)**: Serves as the interactive middleware between client components and the filesystem. Includes automatic cache invalidation (`revalidatePath`) to refresh page views instantly when database states change.

---

## 🌐 3. Interactive Web Pages

### Landing Page (`/`)
* **Hero Branding**: Showcase area featuring "Trusted by 50+ Universities" badge, headline, and primary call-to-actions.
* **Bento Grid Features**: Interactive showcases of platform capabilities (Streamlined Registration, QR Attendance scanning tracker, Automatic Certificates, Real-time Analytics).
* **Upcoming Fests Grid**: Dynamically queries the database to show the earliest 3 upcoming events.
* **Responsive Bottom Nav**: Navigation drawer for mobile layouts.

### Explore Page (`/events`)
* **Dynamic Search**: Instant client-side search input filtering by title or description.
* **Category Filters**: Hot-swap button filters (All, Tech, Cultural, Sports, Business) with active state borders.
* **Responsive Layout**: Adjusts from single column on mobile to 3 columns on wide screens.

### Event Detail Page (`/events/[id]`)
* **Banner and Metadata**: Displays date, time, venue, description, price, and category.
* **Razorpay Simulation Checkout**: Simulates a credit card payment check-out on click. On success, writes a new registration to the database and provides a direct path to view the student ticket.

### Organizer Dashboard (`/dashboard/organizer`)
* **KPI Metrics Bento**: Live updates showing Total Events, Total Registrations, and Gross Revenue (calculated by summing up tickets sold in `db.json`).
* **SVG Trend Graph**: A custom, responsive vector area chart tracking registrations trend over time.
* **Persisted To-do List**: A tasks panel where checks/unchecks are saved directly into the database.
* **Managed Events Directory**: Displays a complete directory of fests with progress bars tracking registration capacity (`Registered / Total Capacity`) and status badges (Active, Draft, Selling Fast).

### Create Event Wizard (`/dashboard/organizer/create`)
* **Multi-Step Form**: Stepper-based creation flow (Basic Info ➔ Venues ➔ Tickets ➔ Review).
* **Interactive Category Picker**: Button-based tag selector.
* **Mock Poster Upload Zone**: A dashed drag-and-drop region with upload tips.
* **Review Summary**: Form summary card displaying a layout of all fields before final submission.
* **Server Action Sync**: Triggers `createEventAction` to immediately insert the fest into the database and dashboard.

### Student Dashboard (`/dashboard/student`)
* **Live QR Ticket Drawer**: Renders active registrations. Clicking "View QR Ticket" opens a modal displaying a client-side generated SVG QR Code containing the ticket's verification ID.
* **Certificates Vault**: Lists completed past fests with mock PDF download options.

### Admin Dashboard (`/dashboard/admin`)
* **Platform KPIs**: Displays live metrics (Total Users, Active Fests, Pending Review approvals, Platform Revenue) dynamically fetched from the database.
* **Event Moderation Queue**: Lists organizer-submitted events that are `Pending`. Allows admins to "Approve" (instantly updates status to `Active` and exposes event to discovery search) or "Reject" them.
* **User Management Directory**: Displays a table of all campus users. Includes a role-modifier selector allowing admins to promote/demote user roles (Student, Organizer, Volunteer, Admin) in real-time.

### Volunteer Dashboard (`/dashboard/volunteer`)
* **Check-in Gateway Stats**: Tracks check-in metrics (Total tickets, Checked-in count, Pending check-ins).
* **Verify Ticket Console**: Includes an interactive verification entry where volunteers can type or paste student Ticket IDs to record check-ins. On verification, it sets the ticket as `scanned` and flashes student names.
* **Student Registry Directory**: Interactive table listing all campus registrations with search options and checked-in badges.

### Sign In Page (`/auth/signin`)
* **Role Switcher**: Integrated tabs allowing users to choose between Student or Organizer workspaces.
* **Credential Form**: Responsive email/password inputs with validation icons.

---

## 🎛️ 4. Floating Workspace Role Switcher
* **Global Access Overlay**: A fixed, floating glassmorphic widget (`src/components/RoleSwitcher.tsx`) active on the bottom-right corner of all routes.
* **Hot-Swap Viewports**: Lets developers and evaluators easily swap between Student, Organizer, Admin, and Volunteer views instantly.

---

## 🔁 5. End-to-End User Workflows

### Student Path (Event Discovery to Ticket QR code)
1. **Browse Fests**: Student explores and searches campus events on the `/events` page.
2. **Details Page**: Click an event card to read date, time, venue, description, and ticket cost.
3. **Simulated Payment**: Click "Register for Fest" which mocks Razorpay gateway transactions for 2 seconds.
4. **Instant Ticketing**: Redirection to the Student Dashboard `/dashboard/student` where a scan-ready SVG QR Code containing the ticket ID is created.

### Organizer Path (Fest Creation to Dashboard Analytics)
1. **Analytics Dashboard**: Organizer reviews real-time calculated KPIs and checklist todo lists on `/dashboard/organizer`.
2. **Form Stepper**: Click "Create New Event" to launch the 4-step event creator `/dashboard/organizer/create`.
3. **Draft Sync**: Form inputs are validated and saved into `db.json`.
4. **Dashboard Updates**: The newly published event displays inside the dashboard managed list table and automatically feeds into the student search grid.
