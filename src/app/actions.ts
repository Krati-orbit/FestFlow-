"use server";

import { revalidatePath } from "next/cache";
import * as db from "@/utils/db";
import fs from "fs/promises";
import path from "path";

export async function fetchEventsAction() {
  const events = await db.getEvents();
  return events.filter((e) => e.status !== "Pending" && e.status !== "Rejected");
}

export async function fetchEventDetailsAction(id: string) {
  return await db.getEventById(id);
}

export async function createEventAction(data: {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  capacity: number;
}) {
  const newEvent = await db.addEvent(data);
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/dashboard/organizer");
  return newEvent;
}

export async function registerForEventAction(eventId: string) {
  const userId = "alex-mercer"; // Mock student
  const reg = await db.addRegistration(eventId, userId);
  revalidatePath("/dashboard/student");
  revalidatePath("/dashboard/organizer");
  revalidatePath(`/events/${eventId}`);
  return reg;
}

export async function fetchStudentDashboardAction() {
  const userId = "alex-mercer"; // Mock student
  const registrations = await db.getRegistrations(userId);
  const events = await db.getEvents();
  
  // Combine registrations with event details
  const activeTickets = registrations.map((reg) => {
    const event = events.find((e) => e.id === reg.eventId);
    
    // Parse date nicely
    let formattedDate = "TBD";
    if (event?.date) {
      const dateParts = event.date.split("-");
      if (dateParts.length === 3) {
        const dObj = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
        formattedDate = dObj.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } else {
        formattedDate = event.date;
      }
    }

    return {
      id: reg.eventId,
      title: event?.title || "Unknown Event",
      date: formattedDate,
      time: event?.time || "TBD",
      venue: event?.venue || "TBD",
      ticketId: reg.ticketId,
      studentName: reg.studentName,
      status: "Active",
    };
  });

  return { activeTickets };
}

export async function fetchOrganizerDashboardAction() {
  const events = await db.getEvents();
  
  // Read raw DB directly to fetch ALL registrations
  const dbFilePath = path.join(process.cwd(), "src/data/db.json");
  const fileContent = await fs.readFile(dbFilePath, "utf-8");
  const rawDb = JSON.parse(fileContent);
  const registrationsList = rawDb.registrations || [];

  const totalEvents = events.length;
  const totalRegistrations = registrationsList.length;
  
  // Compute total revenue
  let grossRevenue = 0;
  registrationsList.forEach((reg: any) => {
    const event = events.find((e) => e.id === reg.eventId);
    if (event) {
      grossRevenue += event.price;
    }
  });

  // Compile managed events list with actual registered counts from the DB file
  const managedEvents = events.map((event) => {
    const registeredCount = registrationsList.filter((r: any) => r.eventId === event.id).length;
    
    let formattedDate = "TBD";
    if (event.date) {
      const dateParts = event.date.split("-");
      if (dateParts.length === 3) {
        const dObj = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
        formattedDate = dObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
      } else {
        formattedDate = event.date;
      }
    }

    return {
      id: event.id,
      title: event.title,
      venue: event.venue,
      date: formattedDate,
      registered: registeredCount,
      capacity: event.capacity,
      status: registeredCount > 0 ? "Selling Fast" : event.status,
    };
  });

  return {
    totalEvents,
    totalRegistrations,
    grossRevenue,
    managedEvents,
  };
}

export async function fetchTasksAction() {
  return await db.getTasks();
}

export async function toggleTaskAction(id: number) {
  const tasks = await db.toggleTask(id);
  revalidatePath("/dashboard/organizer");
  return tasks;
}

// ADMIN DASHBOARD ACTIONS
export async function fetchAdminDashboardAction() {
  const users = await db.getUsers();
  const allEvents = await db.getEvents();
  const registrationsList = await db.getRegistrationsAll();

  const totalUsers = users.length;
  const activeFests = allEvents.filter((e) => e.status === "Active" || e.status === "Selling Fast").length;
  const pendingFestsCount = allEvents.filter((e) => e.status === "Pending").length;
  
  let totalPlatformRevenue = 0;
  registrationsList.forEach((r) => {
    totalPlatformRevenue += r.amount;
  });

  const pendingEventsList = allEvents.filter((e) => e.status === "Pending");

  return {
    totalUsers,
    activeFests,
    pendingFestsCount,
    totalPlatformRevenue,
    users,
    pendingEvents: pendingEventsList,
  };
}

export async function approveEventAction(eventId: string) {
  await db.updateEventStatus(eventId, "Active");
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/organizer");
}

export async function rejectEventAction(eventId: string) {
  await db.updateEventStatus(eventId, "Rejected");
  revalidatePath("/");
  revalidatePath("/events");
  revalidatePath("/dashboard/admin");
  revalidatePath("/dashboard/organizer");
}

export async function updateUserRoleAction(userId: string, role: "STUDENT" | "ORGANIZER" | "ADMIN" | "VOLUNTEER") {
  const users = await db.updateUserRole(userId, role);
  revalidatePath("/dashboard/admin");
  return users;
}

// VOLUNTEER DASHBOARD ACTIONS
export async function fetchVolunteerDashboardAction() {
  const registrations = await db.getRegistrationsAll();
  const events = await db.getEvents();

  const totalTickets = registrations.length;
  const checkedIn = registrations.filter((r) => r.scanned).length;
  const pendingCheckIns = totalTickets - checkedIn;

  const registrationsWithDetails = registrations.map((r) => {
    const event = events.find((e) => e.id === r.eventId);
    return {
      ...r,
      eventTitle: event?.title || "Unknown Event",
      eventCategory: event?.category || "TBD",
    };
  });

  return {
    stats: {
      totalTickets,
      checkedIn,
      pendingCheckIns,
    },
    registrations: registrationsWithDetails,
  };
}

export async function checkInTicketAction(ticketId: string) {
  const reg = await db.checkInTicket(ticketId);
  revalidatePath("/dashboard/volunteer");
  revalidatePath("/dashboard/organizer");
  revalidatePath("/dashboard/student");
  return reg;
}
