import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: "$",
  NGN: "₦",
  GHS: "GH₵",
  KES: "KSh",
  ZAR: "R",
};

export interface Notification {
  id: string;
  title: string;
  body: string;
  href: string;
  created_at: string;
  read: boolean;
}

/**
 * Subscribes to Supabase Realtime for new consultations, inquiries and blog posts.
 * Returns the latest ~20 notifications plus a live unread count.
 */
export function useDashboardNotifications() {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!user) return;

    // Seed with the most recent rows so the bell isn't empty on first load.
    (async () => {
      const [{ data: consults }, { data: inq }] = await Promise.all([
        supabase
          .from("consultations")
          .select("id, client_name, status, created_at")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("service_inquiries")
          .select("id, name, service, created_at")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);

      const seeded: Notification[] = [
        ...(consults ?? []).map((c: any) => ({
          id: `c-${c.id}`,
          title: c.status === "paid" ? "Payment received" : "New booking",
          body:
            c.status === "paid"
              ? `${c.client_name} just paid for a session.`
              : `${c.client_name} started a booking.`,
          href: "/dashboard/consultations",
          created_at: c.created_at,
          read: false,
        })),
        ...(inq ?? []).map((i: any) => ({
          id: `i-${i.id}`,
          title: "New service inquiry",
          body: `${i.name} is interested in ${i.service}.`,
          href: "/dashboard/inquiries",
          created_at: i.created_at,
          read: false,
        })),
      ]
        .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
        .slice(0, 20);

      setItems(seeded);
      setUnread(seeded.length);
    })();

    // Realtime: listen for INSERTs and UPDATEs.
    const channel = supabase
      .channel("dashboard-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "consultations" },
        (payload) => {
          const c: any = payload.new;
          push({
            id: `c-${c.id}-${Date.now()}`,
            title: "New booking",
            body: `${c.client_name} booked a session for ${c.session_date} at ${c.session_time}.`,
            href: "/dashboard/consultations",
            created_at: c.created_at,
            read: false,
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "consultations" },
        (payload) => {
          const c: any = payload.new;
          if (c.status === "paid") {
            const symbol = CURRENCY_SYMBOLS[c.currency] ?? c.currency;
            push({
              id: `c-${c.id}-paid-${Date.now()}`,
              title: "Payment received 💸",
              body: `${c.client_name} just paid ${symbol}${(c.amount / 100).toFixed(0)} ${c.currency}.`,
              href: "/dashboard/consultations",
              created_at: c.created_at ?? new Date().toISOString(),
              read: false,
            });
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "service_inquiries" },
        (payload) => {
          const i: any = payload.new;
          push({
            id: `i-${i.id}-${Date.now()}`,
            title: "New service inquiry",
            body: `${i.name} is interested in ${i.service}.`,
            href: "/dashboard/inquiries",
            created_at: i.created_at ?? new Date().toISOString(),
            read: false,
          });
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "blog_posts" },
        (payload) => {
          const p: any = payload.new;
          push({
            id: `b-${p.id}-${Date.now()}`,
            title: p.published ? "New article published" : "New draft saved",
            body: p.title,
            href: "/dashboard/blog",
            created_at: p.created_at ?? new Date().toISOString(),
            read: false,
          });
        }
      )
      .subscribe();

    function push(n: Notification) {
      setItems((prev) => [n, ...prev].slice(0, 20));
      setUnread((u) => u + 1);
    }

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnread(0);
  }

  return { items, unread, markAllRead };
}