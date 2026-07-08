"use server";

import { revalidatePath } from "next/cache";
import { getSql } from "@/lib/db";
import { STARTUP_STATUSES, STARTUP_REJECTED, INVESTOR_STATUSES } from "@/lib/intake";

/**
 * Status moves for the deal board. Called directly from the client board
 * (drag & drop) and via form actions on the detail pages. These run behind
 * the /admin middleware gate, so only authenticated sessions reach them.
 * status_changed_at powers the time-in-stage aging signal on cards.
 */

const startupValues = [...STARTUP_STATUSES.map((s) => s.value), STARTUP_REJECTED.value] as string[];
const investorValues = INVESTOR_STATUSES.map((s) => s.value) as string[];

export async function updateStartupStatus(id: string, status: string): Promise<void> {
  if (!id || !startupValues.includes(status)) return;
  const sql = getSql();
  await sql`UPDATE startup_applications
            SET status = ${status}, status_changed_at = now()
            WHERE id = ${id}::uuid`;
  revalidatePath("/admin");
  revalidatePath(`/admin/s/${id}`);
}

export async function updateInvestorStatus(id: string, status: string): Promise<void> {
  if (!id || !investorValues.includes(status)) return;
  const sql = getSql();
  await sql`UPDATE investor_inquiries
            SET status = ${status}, status_changed_at = now()
            WHERE id = ${id}::uuid`;
  revalidatePath("/admin");
  revalidatePath(`/admin/i/${id}`);
}

export async function updateStartupStatusForm(formData: FormData): Promise<void> {
  await updateStartupStatus(String(formData.get("id") ?? ""), String(formData.get("status") ?? ""));
}

export async function updateInvestorStatusForm(formData: FormData): Promise<void> {
  await updateInvestorStatus(String(formData.get("id") ?? ""), String(formData.get("status") ?? ""));
}
