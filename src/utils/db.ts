import fs from "fs/promises";
import path from "path";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "STUDENT" | "ORGANIZER" | "ADMIN" | "VOLUNTEER";
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  capacity: number;
  status: "Draft" | "Active" | "Selling Fast" | "Pending" | "Rejected";
  organizerId: string;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  ticketId: string;
  studentName: string;
  amount: number;
  createdAt: string;
  scanned: boolean;
}

export interface Task {
  id: number;
  text: string;
  event: string;
  completed: boolean;
}

interface DbData {
  users: User[];
  events: Event[];
  registrations: Registration[];
  tasks: Task[];
}

const dbFilePath = path.join(process.cwd(), "src/data/db.json");

// Helper to read DB file
async function readDb(): Promise<DbData> {
  try {
    const fileContent = await fs.readFile(dbFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    // If file doesn't exist, return empty template
    return {
      users: [],
      events: [],
      registrations: [],
      tasks: [],
    };
  }
}

// Helper to write DB file
async function writeDb(data: DbData): Promise<void> {
  await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), "utf-8");
}

// Export database operations
export async function getEvents(): Promise<Event[]> {
  const db = await readDb();
  return db.events;
}

export async function getEventById(id: string): Promise<Event | undefined> {
  const db = await readDb();
  return db.events.find((e) => e.id === id);
}

export async function addEvent(event: Omit<Event, "id" | "status" | "organizerId">): Promise<Event> {
  const db = await readDb();
  const newEvent: Event = {
    ...event,
    id: `event-${Date.now()}`,
    status: "Pending", // Default status is Pending for admin approval
    organizerId: "sarah-jones", // Default mock organizer
  };
  db.events.push(newEvent);
  await writeDb(db);
  return newEvent;
}

export async function getRegistrations(userId: string): Promise<Registration[]> {
  const db = await readDb();
  return db.registrations.filter((r) => r.userId === userId);
}

export async function addRegistration(eventId: string, userId: string): Promise<Registration> {
  const db = await readDb();
  const event = db.events.find((e) => e.id === eventId);
  if (!event) throw new Error("Event not found");

  const existingReg = db.registrations.find(
    (r) => r.eventId === eventId && r.userId === userId
  );
  if (existingReg) return existingReg; // Already registered

  const user = db.users.find((u) => u.id === userId);
  const studentName = user ? user.name : "Alex Mercer";

  const newReg: Registration = {
    id: `reg-${Date.now()}`,
    userId,
    eventId,
    ticketId: `TICKET-${event.category.substring(0, 4).toUpperCase()}-${Math.floor(
      1000 + Math.random() * 9000
    )}-XX`,
    studentName: studentName || "Alex Mercer",
    amount: event.price,
    createdAt: new Date().toISOString(),
    scanned: false,
  };

  db.registrations.push(newReg);
  await writeDb(db);
  return newReg;
}

export async function getTasks(): Promise<Task[]> {
  const db = await readDb();
  return db.tasks;
}

export async function toggleTask(id: number): Promise<Task[]> {
  const db = await readDb();
  db.tasks = db.tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  await writeDb(db);
  return db.tasks;
}

// ADMIN & VOLUNTEER DB HELPER OPERATIONS
export async function getUsers(): Promise<User[]> {
  const db = await readDb();
  return db.users;
}

export async function updateUserRole(userId: string, role: "STUDENT" | "ORGANIZER" | "ADMIN" | "VOLUNTEER"): Promise<User[]> {
  const db = await readDb();
  db.users = db.users.map((u) => (u.id === userId ? { ...u, role } : u));
  await writeDb(db);
  return db.users;
}

export async function updateEventStatus(eventId: string, status: "Active" | "Rejected" | "Draft"): Promise<Event[]> {
  const db = await readDb();
  db.events = db.events.map((e) => (e.id === eventId ? { ...e, status } : e));
  await writeDb(db);
  return db.events;
}

export async function getRegistrationsAll(): Promise<Registration[]> {
  const db = await readDb();
  return db.registrations;
}

export async function checkInTicket(ticketId: string): Promise<Registration> {
  const db = await readDb();
  const reg = db.registrations.find((r) => r.ticketId.toLowerCase() === ticketId.toLowerCase());
  if (!reg) throw new Error("Ticket code not found");
  
  reg.scanned = true;
  await writeDb(db);
  return reg;
}
