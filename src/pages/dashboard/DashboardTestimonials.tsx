import { useEffect, useState } from "react";
import {
  Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff,
  ArrowUpRight, AlertCircle, MessageSquareQuote, GripVertical,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Testimonial } from "@/lib/types";
import { DeleteConfirmModal } from "@/components/ui/DeleteConfirmModal";

const inputCls = "w-full rounded-xl border border-neutral-200 bg-white text-neutral-900 px-4 py-2.5 text-sm outline-none transition-all placeholder:text-neutral-400 focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}

const EMPTY: Omit<Testimonial, "created_at" | "updated_at"> = {
  id: "", author: "", title: null, role: null, location: null, quote: "", avatar: null,
  company_logo: null, bg_class: null, sort_order: 0, active: true,
};

export default function DashboardTestimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Testimonial | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "created_at" | "updated_at">>(EMPTY);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("testimonials").select("*").order("sort_order").order("created_at", { ascending: false });
    if (!error) setItems((data ?? []) as Testimonial[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setForm(EMPTY); setSaveError(null); setShowEditor(true);
  }

  function openEdit(t: Testimonial) {
    setForm({ id: t.id, author: t.author, title: t.title, role: t.role, location: t.location, quote: t.quote, avatar: t.avatar, company_logo: t.company_logo, bg_class: t.bg_class, sort_order: t.sort_order, active: t.active });
    setSaveError(null); setShowEditor(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSaveError(null);
    try {
      const payload = {
        author: form.author.trim(),
        title: form.title?.trim() || null,
        role: form.role?.trim() || null,
        location: form.location?.trim() || null,
        quote: form.quote.trim(),
        company_logo: form.company_logo?.trim() || null,
        bg_class: form.bg_class || null,
        sort_order: Number(form.sort_order) || 0,
        active: form.active,
        updated_at: new Date().toISOString(),
      };
      const result = form.id
        ? await supabase.from("testimonials").update(payload).eq("id", form.id).select().single()
        : await supabase.from("testimonials").insert({ ...payload, created_at: new Date().toISOString() }).select().single();
      if (result.error) throw result.error;
      setShowEditor(false);
      await load();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!confirmDelete) return;
    setDeleting(true);
    await supabase.from("testimonials").delete().eq("id", confirmDelete.id);
    setConfirmDelete(null);
    setDeleting(false);
    await load();
  }

  async function toggleActive(t: Testimonial) {
    await supabase.from("testimonials").update({ active: !t.active, updated_at: new Date().toISOString() }).eq("id", t.id);
    await load();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">Social Proof</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">Testimonials</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage client testimonials shown on the homepage.</p>
        </div>
        <button onClick={openNew} className="group inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#4A1812] hover:shadow-lg hover:shadow-[#5D1F17]/20">
          <Plus className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
          New Testimonial
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", val: items.length, cls: "text-neutral-900" },
          { label: "Active", val: items.filter(t => t.active).length, cls: "text-emerald-700" },
          { label: "Hidden", val: items.filter(t => !t.active).length, cls: "text-neutral-400" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl border border-neutral-200/70 bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">{s.label}</p>
            <p className={`mt-2 text-3xl font-semibold tabular-nums ${s.cls}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4 py-10">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">{form.id ? "Edit Testimonial" : "New Testimonial"}</h2>
                <p className="mt-0.5 text-[11px] text-neutral-500">Add a client quote to your social proof section</p>
              </div>
              <button onClick={() => setShowEditor(false)} className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={save} className="p-6 space-y-5">
              {saveError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200/60 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />{saveError}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Author Name" required>
                  <input required value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))} className={inputCls} placeholder="Jane Doe" />
                </Field>
                <Field label="Title">
                  <input value={form.title ?? ""} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className={inputCls} placeholder="Brand Strategist" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Role / Company">
                  <input value={form.role ?? ""} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className={inputCls} placeholder="CEO, Acme Corp" />
                </Field>
                <Field label="Location">
                  <input value={form.location ?? ""} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className={inputCls} placeholder="Lagos, Nigeria" />
                </Field>
              </div>

              <Field label="Quote" required>
                <textarea required rows={4} value={form.quote} onChange={e => setForm(f => ({ ...f, quote: e.target.value }))} className={`${inputCls} resize-none`} placeholder="What did they say about working with you?" />
              </Field>

              <Field label="Company / Brand Name">
                <input value={form.company_logo ?? ""} onChange={e => setForm(f => ({ ...f, company_logo: e.target.value }))} className={inputCls} placeholder="Acme Corp" />
              </Field>

              <div className="grid grid-cols-2 gap-5">
                <Field label="Sort Order">
                  <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} className={inputCls} placeholder="0" />
                </Field>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/40 p-4 cursor-pointer w-full hover:border-neutral-300">
                    <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="h-4 w-4 accent-[#5D1F17]" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Active</p>
                      <p className="text-[11px] text-neutral-500">Show on homepage</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowEditor(false)} className="rounded-full border border-neutral-200 px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:border-neutral-400">Cancel</button>
                <button type="submit" disabled={saving} className="group inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#4A1812] hover:shadow-lg hover:shadow-[#5D1F17]/20 disabled:opacity-50">
                  {saving ? <><Loader2 className="h-3 w-3 animate-spin" />Saving…</> : <>{form.id ? "Save changes" : "Add testimonial"}<ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <DeleteConfirmModal
          title={`Delete "${confirmDelete.author}"?`}
          description="This will permanently remove the testimonial and cannot be undone."
          loading={deleting}
          onConfirm={remove}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
            <p className="text-xs text-neutral-500">Loading testimonials…</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
              <MessageSquareQuote className="h-5 w-5 text-neutral-400" />
            </div>
            <p className="text-sm font-semibold text-neutral-700">No testimonials yet</p>
            <p className="text-[11px] text-neutral-500">Click "New Testimonial" to add your first client quote.</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {items.map(t => (
              <li key={t.id} className="group flex items-start gap-4 px-6 py-5 transition-all hover:bg-gradient-to-r hover:from-neutral-50/80 hover:to-transparent">
                <GripVertical className="mt-1 h-4 w-4 shrink-0 text-neutral-300" />
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#5D1F17] to-[#3a120c] text-[12px] font-bold text-white">
                  {t.author.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-neutral-900">{t.author}</p>
                    {t.title && <span className="text-[11px] text-[#5D1F17] font-semibold">· {t.title}</span>}
                    {t.role && <span className="text-[11px] text-neutral-400">· {t.role}</span>}
                    {t.location && <span className="text-[11px] text-neutral-400">· {t.location}</span>}
                  </div>
                  {t.company_logo && <p className="text-[11px] font-bold text-neutral-500 mt-0.5">{t.company_logo}</p>}
                  <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed line-clamp-2">"{t.quote}"</p>
                </div>
                <div className="flex shrink-0 items-center gap-2 mt-0.5">
                  <button onClick={() => toggleActive(t)} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${t.active ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/60 hover:bg-emerald-100" : "bg-neutral-100 text-neutral-500 ring-1 ring-inset ring-neutral-200/60 hover:bg-neutral-200"}`}>
                    {t.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {t.active ? "Live" : "Hidden"}
                  </button>
                  <button onClick={() => openEdit(t)} className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-all hover:border-[#5D1F17] hover:bg-[#5D1F17]/5 hover:text-[#5D1F17]">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setConfirmDelete(t)} className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
