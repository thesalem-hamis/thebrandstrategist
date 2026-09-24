import { useEffect, useState, useRef } from "react";
import {
  Plus, Pencil, Trash2, X, Loader2, Eye, EyeOff,
  Upload, Image as ImageIcon, ArrowUpRight, CheckCircle2,
  AlertCircle, RotateCcw, FolderOpen, GripVertical,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/lib/types";
import { DeleteConfirmModal } from "@/components/ui/DeleteConfirmModal";

function slugify(t: string) {
  return t.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_]+/g, "-").replace(/^-+|-+$/g, "");
}

const inputCls = "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10";

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

const EMPTY: Omit<Project, "created_at" | "updated_at"> & { id: string } = {
  id: "", slug: "", title: "", subtitle: null, description: null,
  overview: null, year: null, focus: [], process: [], outcome: null,
  banner_image: null, link: null, sort_order: 0, active: true,
};

type FormState = typeof EMPTY & { focusRaw: string; processRaw: string };

function toForm(p: Project): FormState {
  return { ...p, focusRaw: (p.focus ?? []).join("\n"), processRaw: (p.process ?? []).join("\n") };
}

export default function DashboardProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [uploadMsg, setUploadMsg] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [form, setForm] = useState<FormState>({ ...EMPTY, focusRaw: "", processRaw: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("projects").select("*").order("sort_order").order("created_at", { ascending: false });
    if (!error) setProjects((data ?? []) as Project[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  function openNew() {
    setForm({ ...EMPTY, focusRaw: "", processRaw: "" });
    setSaveError(null); setUploadMsg(null); setShowEditor(true);
  }

  function openEdit(p: Project) {
    setForm(toForm(p));
    setSaveError(null); setUploadMsg(null); setShowEditor(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (fileRef.current) fileRef.current.value = "";
    if (!["image/png","image/jpeg","image/jpg","image/webp"].includes(file.type)) {
      setUploadMsg({ tone: "err", text: "PNG, JPG or WebP only." }); return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setUploadMsg({ tone: "err", text: "Max 8 MB." }); return;
    }
    setUploading(true); setUploadMsg(null);
    try {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
      const path = `project-banners/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("project-images").upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const { data: urlData } = supabase.storage.from("project-images").getPublicUrl(path);
      setForm(f => ({ ...f, banner_image: urlData.publicUrl }));
      setUploadMsg({ tone: "ok", text: "Banner uploaded!" });
    } catch (err) {
      setUploadMsg({ tone: "err", text: err instanceof Error ? err.message : "Upload failed." });
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true); setSaveError(null);
    try {
      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        subtitle: form.subtitle?.trim() || null,
        description: form.description?.trim() || null,
        overview: form.overview?.trim() || null,
        year: form.year?.trim() || null,
        focus: form.focusRaw.split("\n").map(s => s.trim()).filter(Boolean),
        process: form.processRaw.split("\n").map(s => s.trim()).filter(Boolean),
        outcome: form.outcome?.trim() || null,
        banner_image: form.banner_image || null,
        link: form.link?.trim() || null,
        sort_order: Number(form.sort_order) || 0,
        active: form.active,
        updated_at: new Date().toISOString(),
      };
      const result = form.id
        ? await supabase.from("projects").update(payload).eq("id", form.id).select().single()
        : await supabase.from("projects").insert({ ...payload, created_at: new Date().toISOString() }).select().single();
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
    await supabase.from("projects").delete().eq("id", confirmDelete.id);
    setConfirmDelete(null);
    setDeleting(false);
    await load();
  }

  async function toggleActive(p: Project) {
    await supabase.from("projects").update({ active: !p.active, updated_at: new Date().toISOString() }).eq("id", p.id);
    await load();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">Portfolio</p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">Projects</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage your portfolio case studies.</p>
        </div>
        <button onClick={openNew} className="group inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#4A1812] hover:shadow-lg hover:shadow-[#5D1F17]/20">
          <Plus className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
          New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", val: projects.length, cls: "text-neutral-900" },
          { label: "Live", val: projects.filter(p => p.active).length, cls: "text-emerald-700" },
          { label: "Hidden", val: projects.filter(p => !p.active).length, cls: "text-neutral-400" },
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
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900">{form.id ? "Edit Project" : "New Project"}</h2>
                <p className="mt-0.5 text-[11px] text-neutral-500">Fill in the project details below</p>
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
                <Field label="Title" required>
                  <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value, slug: f.id ? f.slug : slugify(e.target.value) }))} className={inputCls} placeholder="MCZEEK ADVISORY" />
                </Field>
                <Field label="Slug (URL)" required>
                  <input required value={form.slug} onChange={e => setForm(f => ({ ...f, slug: slugify(e.target.value) }))} className={inputCls} placeholder="mczeek-advisory" />
                </Field>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field label="Subtitle">
                  <input value={form.subtitle ?? ""} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} className={inputCls} placeholder="Brand Strategy & Architecture" />
                </Field>
                <Field label="Year">
                  <input value={form.year ?? ""} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} className={inputCls} placeholder="2025" />
                </Field>
              </div>

              <Field label="Description">
                <textarea rows={3} value={form.description ?? ""} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className={`${inputCls} resize-none`} placeholder="Short description shown on the projects listing…" />
              </Field>

              <Field label="Banner Image">
                <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={handleUpload} className="hidden" />
                {form.banner_image ? (
                  <div className="relative group">
                    <img src={form.banner_image} alt="Banner" className="h-40 w-full rounded-xl object-cover border border-neutral-200" />
                    <button type="button" onClick={() => setForm(f => ({ ...f, banner_image: null }))} className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-black/70">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="flex h-40 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/40 transition-all hover:border-[#5D1F17]/40 hover:bg-[#5D1F17]/5 disabled:opacity-50">
                    {uploading ? <><Loader2 className="h-5 w-5 animate-spin text-[#5D1F17]" /><span className="text-[11px] text-neutral-500">Uploading…</span></> : <><Upload className="h-5 w-5 text-neutral-400" /><span className="text-[11px] text-neutral-500">Click to upload banner</span><span className="text-[10px] text-neutral-400">PNG, JPG, WebP up to 8MB</span></>}
                  </button>
                )}
                {uploadMsg && (
                  <div className={`mt-2 flex items-center justify-between gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium ${uploadMsg.tone === "ok" ? "border-emerald-200/60 bg-emerald-50 text-emerald-700" : "border-red-200/60 bg-red-50 text-red-700"}`}>
                    <span className="flex items-center gap-2">
                      {uploadMsg.tone === "ok" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                      {uploadMsg.text}
                    </span>
                    {uploadMsg.tone === "err" && <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase text-red-700 hover:bg-red-100"><RotateCcw className="h-2.5 w-2.5" />Retry</button>}
                  </div>
                )}
              </Field>

              <Field label="Live Site URL">
                <input value={form.link ?? ""} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} className={inputCls} placeholder="https://…" />
              </Field>

              <Field label="Overview">
                <textarea rows={3} value={form.overview ?? ""} onChange={e => setForm(f => ({ ...f, overview: e.target.value }))} className={`${inputCls} resize-none`} placeholder="Project overview paragraph…" />
              </Field>

              <Field label="Project Focus (one item per line)">
                <textarea rows={4} value={form.focusRaw} onChange={e => setForm(f => ({ ...f, focusRaw: e.target.value }))} className={`${inputCls} resize-none`} placeholder={"Define brand hierarchy.\nDevelop visual positioning."} />
              </Field>

              <Field label="Strategic Process (one step per line)">
                <textarea rows={5} value={form.processRaw} onChange={e => setForm(f => ({ ...f, processRaw: e.target.value }))} className={`${inputCls} resize-none`} placeholder={"Discovery & Brand Audit: Conducted interviews…\nBrand Architecture: Structured hierarchy…"} />
              </Field>

              <Field label="Brand Outcome">
                <textarea rows={3} value={form.outcome ?? ""} onChange={e => setForm(f => ({ ...f, outcome: e.target.value }))} className={`${inputCls} resize-none`} placeholder="What was achieved…" />
              </Field>

              <div className="grid grid-cols-2 gap-5">
                <Field label="Sort Order">
                  <input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: Number(e.target.value) }))} className={inputCls} placeholder="0" />
                </Field>
                <div className="flex items-end pb-0.5">
                  <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/40 p-4 cursor-pointer w-full hover:border-neutral-300">
                    <input type="checkbox" checked={form.active} onChange={e => setForm(f => ({ ...f, active: e.target.checked }))} className="h-4 w-4 accent-[#5D1F17]" />
                    <div>
                      <p className="text-sm font-medium text-neutral-900">Active / Visible</p>
                      <p className="text-[11px] text-neutral-500">Show on public projects page</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowEditor(false)} className="rounded-full border border-neutral-200 px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:border-neutral-400">Cancel</button>
                <button type="submit" disabled={saving || uploading} className="group inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#4A1812] hover:shadow-lg hover:shadow-[#5D1F17]/20 disabled:opacity-50">
                  {saving ? <><Loader2 className="h-3 w-3 animate-spin" />Saving…</> : <>{form.id ? "Save changes" : "Create project"}<ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <DeleteConfirmModal
          title={`Delete "${confirmDelete.title}"?`}
          description="This will permanently remove the project and cannot be undone. The banner image will remain in storage."
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
            <p className="text-xs text-neutral-500">Loading projects…</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
              <FolderOpen className="h-5 w-5 text-neutral-400" />
            </div>
            <p className="text-sm font-semibold text-neutral-700">No projects yet</p>
            <p className="text-[11px] text-neutral-500">Click "New Project" to add your first case study.</p>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {projects.map(p => (
              <li key={p.id} className="group flex items-center gap-4 px-6 py-4 transition-all hover:bg-gradient-to-r hover:from-neutral-50/80 hover:to-transparent">
                <GripVertical className="h-4 w-4 shrink-0 text-neutral-300" />
                {p.banner_image ? (
                  <img src={p.banner_image} alt={p.title} className="h-14 w-20 shrink-0 rounded-lg object-cover border border-neutral-200" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                ) : (
                  <div className="grid h-14 w-20 shrink-0 place-items-center rounded-lg bg-neutral-100 border border-neutral-200">
                    <ImageIcon className="h-4 w-4 text-neutral-400" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-neutral-900">{p.title}</p>
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-400">
                    <span className="truncate font-mono">/{p.slug}</span>
                    {p.year && <><span>·</span><span>{p.year}</span></>}
                    {p.subtitle && <><span>·</span><span className="truncate">{p.subtitle}</span></>}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button onClick={() => toggleActive(p)} className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all ${p.active ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/60 hover:bg-emerald-100" : "bg-neutral-100 text-neutral-500 ring-1 ring-inset ring-neutral-200/60 hover:bg-neutral-200"}`}>
                    {p.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                    {p.active ? "Live" : "Hidden"}
                  </button>
                  <button onClick={() => openEdit(p)} className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-all hover:border-[#5D1F17] hover:bg-[#5D1F17]/5 hover:text-[#5D1F17]">
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => setConfirmDelete(p)} className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-all hover:border-red-300 hover:bg-red-50 hover:text-red-600">
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
