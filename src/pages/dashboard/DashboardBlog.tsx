import { useEffect, useState, useRef } from "react";
import { 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Loader2, 
  Eye, 
  EyeOff,
  Upload,
  Image as ImageIcon,
  FileText,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { BlogPost } from "@/lib/types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const EMPTY_FORM = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image_url: "",
  published: false,
};

export default function DashboardBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function load() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      setPosts((data ?? []) as BlogPost[]);
    } catch (err) {
      console.error("Error loading posts:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openNew() {
    setForm(EMPTY_FORM);
    setUploadMessage(null);
    setSaveError(null);
    setShowEditor(true);
  }

  function openEdit(post: BlogPost) {
    setForm({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt ?? "",
      content: post.content,
      cover_image_url: post.cover_image_url ?? "",
      published: post.published,
    });
    setUploadMessage(null);
    setSaveError(null);
    setShowEditor(true);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadMessage({ tone: "err", text: "Please select a valid image file (PNG, JPG, GIF, or WebP)." });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadMessage({ tone: "err", text: "Image must be less than 5MB." });
      return;
    }

    setUploading(true);
    setUploadMessage(null);

    try {
      // Generate a clean filename
      const fileExt = file.name.split(".").pop()?.toLowerCase() || 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `blog-covers/${fileName}`;

      console.log("Uploading to blog-images bucket:", filePath);

      // Direct upload without checking bucket
      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      console.log("Upload successful:", urlData.publicUrl);
      setForm((prev) => ({ ...prev, cover_image_url: urlData.publicUrl }));
      setUploadMessage({ tone: "ok", text: "Cover image uploaded successfully!" });
    } catch (err) {
      console.error("Upload failed:", err);
      let errorMessage = "Upload failed. Please try again.";
      
      if (err instanceof Error) {
        if (err.message.includes("row-level security")) {
          errorMessage = "Permission denied. Please ensure storage policies are set up correctly.";
        } else if (err.message.includes("not found") || err.message.includes("bucket")) {
          errorMessage = "Storage bucket 'blog-images' not found. Create it in Supabase dashboard.";
        } else if (err.message.includes("Failed to fetch") || err.message.includes("timeout")) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setUploadMessage({ tone: "err", text: errorMessage });
    } finally {
      setUploading(false);
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      // Validate required fields
      if (!form.title?.trim()) {
        throw new Error("Title is required");
      }
      if (!form.content?.trim()) {
        throw new Error("Content is required");
      }
      if (!form.slug?.trim()) {
        throw new Error("Slug is required");
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt?.trim() || null,
        content: form.content.trim(),
        cover_image_url: form.cover_image_url || null,
        published: form.published,
        updated_at: new Date().toISOString(),
      };

      let result;
      if (form.id) {
        // Update existing post
        result = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", form.id)
          .select()
          .single();
      } else {
        // Insert new post
        const insertPayload = {
          ...payload,
          created_at: new Date().toISOString(),
        };
        result = await supabase
          .from("blog_posts")
          .insert(insertPayload)
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      setShowEditor(false);
      setForm(EMPTY_FORM);
      await load();
    } catch (err) {
      console.error("Save error:", err);
      const message = err instanceof Error ? err.message : String(err);
      setSaveError(`Failed to save post: ${message}`);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this post permanently?")) return;
    setDeleting(id);
    
    try {
      // Get the post to delete its cover image from storage
      const post = posts.find((p) => p.id === id);
      if (post?.cover_image_url) {
        try {
          const url = new URL(post.cover_image_url);
          const pathParts = url.pathname.split("/");
          const bucketIndex = pathParts.findIndex(part => part === "blog-images");
          if (bucketIndex !== -1) {
            const filePath = pathParts.slice(bucketIndex + 1).join("/");
            if (filePath) {
              await supabase.storage.from("blog-images").remove([filePath]);
            }
          }
        } catch (urlErr) {
          console.warn("Failed to parse cover image URL:", urlErr);
        }
      }
      
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
      
      await load();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete post. Please try again.");
    } finally {
      setDeleting(null);
    }
  }

  async function togglePublished(post: BlogPost) {
    try {
      const { error } = await supabase
        .from("blog_posts")
        .update({ 
          published: !post.published, 
          updated_at: new Date().toISOString() 
        })
        .eq("id", post.id);
      
      if (error) throw error;
      await load();
    } catch (err) {
      console.error("Toggle published error:", err);
      alert("Failed to update post status.");
    }
  }

  const publishedCount = posts.filter((p) => p.published).length;
  const draftCount = posts.filter((p) => !p.published).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Content
          </p>
          <h1 className="mt-1 text-2xl sm:text-3xl font-light tracking-tight text-neutral-900">
            Blog Posts
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Write, publish and manage articles for your blog.
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="group inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#4A1812] hover:shadow-lg hover:shadow-[#5D1F17]/20"
        >
          <Plus className="h-3.5 w-3.5 transition-transform group-hover:rotate-90" />
          New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            Total Posts
          </p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-neutral-900">
            {posts.length}
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            Published
          </p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-emerald-700">
            {publishedCount}
          </p>
        </div>
        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            Drafts
          </p>
          <p className="mt-2 text-3xl font-semibold tabular-nums text-neutral-400">
            {draftCount}
          </p>
        </div>
      </div>

      {/* Editor modal */}
      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4 py-10">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-neutral-900">
                  {form.id ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
                <p className="mt-0.5 text-[11px] text-neutral-500">
                  {form.id ? "Update your post details" : "Fill in the details to publish your article"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowEditor(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600"
                aria-label="Close editor"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={save} className="p-6 space-y-5">
              {/* Save error */}
              {saveError && (
                <div className="flex items-center gap-2 rounded-xl border border-red-200/60 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {saveError}
                </div>
              )}

              {/* Title */}
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Post Title *
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm({ 
                      ...form, 
                      title: e.target.value, 
                      slug: form.id ? form.slug : slugify(e.target.value) 
                    })
                  }
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
                  placeholder="Enter a compelling title…"
                />
              </div>

              {/* Slug and Cover Image */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                    Slug (URL) *
                  </label>
                  <input
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
                    placeholder="my-post-slug"
                  />
                </div>
                
                {/* Cover Image Upload */}
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                    Cover Image
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/gif,image/webp"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  
                  {form.cover_image_url ? (
                    <div className="relative group">
                      <img
                        src={form.cover_image_url}
                        alt="Cover preview"
                        className="h-32 w-full rounded-xl object-cover border border-neutral-200"
                      />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, cover_image_url: "" })}
                        className="absolute top-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/70"
                        aria-label="Remove image"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-neutral-200 bg-neutral-50/40 transition-all duration-300 hover:border-[#5D1F17]/40 hover:bg-[#5D1F17]/5 disabled:opacity-50"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin text-[#5D1F17]" />
                          <span className="text-[11px] font-medium text-neutral-500">Uploading…</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-5 w-5 text-neutral-400" />
                          <span className="text-[11px] font-medium text-neutral-500">
                            Click to upload image
                          </span>
                          <span className="text-[10px] text-neutral-400">
                            PNG, JPG, GIF, WebP up to 5MB
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Upload message */}
              {uploadMessage && (
                <div
                  className={`flex items-center justify-between gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium ${
                    uploadMessage.tone === "ok"
                      ? "border-emerald-200/60 bg-emerald-50 text-emerald-700"
                      : "border-red-200/60 bg-red-50 text-red-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {uploadMessage.tone === "ok" ? (
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    )}
                    {uploadMessage.text}
                  </span>
                  {uploadMessage.tone === "err" && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700 hover:bg-red-100"
                    >
                      <RotateCcw className="h-2.5 w-2.5" />
                      Retry
                    </button>
                  )}
                </div>
              )}

              {/* Excerpt */}
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Excerpt
                </label>
                <textarea
                  rows={2}
                  value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
                  placeholder="Short summary shown on the blog listing…"
                />
              </div>

              {/* Content */}
              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Content *
                </label>
                <textarea
                  rows={12}
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full resize-y rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none transition-all duration-300 focus:border-[#5D1F17] focus:ring-2 focus:ring-[#5D1F17]/10"
                  placeholder="Write your post content here…"
                />
              </div>

              {/* Published toggle */}
              <label className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50/40 p-4 cursor-pointer transition-colors hover:border-neutral-300">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="h-4 w-4 accent-[#5D1F17]"
                />
                <div>
                  <p className="text-sm font-medium text-neutral-900">Published</p>
                  <p className="text-[11px] text-neutral-500">
                    Make this post visible on the public blog
                  </p>
                </div>
              </label>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditor(false)}
                  className="rounded-full border border-neutral-200 px-5 py-2.5 text-xs font-semibold text-neutral-600 transition-colors hover:border-neutral-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-6 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#4A1812] hover:shadow-lg hover:shadow-[#5D1F17]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      {form.id ? "Save changes" : "Create post"}
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts list */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm">
        {loading ? (
          <div className="flex flex-col items-center gap-3 px-5 py-16">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
            <p className="text-xs text-neutral-500">Loading posts…</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 px-5 py-16">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
              <FileText className="h-5 w-5 text-neutral-400" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-neutral-700">No posts yet</p>
              <p className="mt-1 text-[11px] text-neutral-500">
                Click "New Post" to write your first article.
              </p>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-neutral-100">
            {posts.map((p) => (
              <li 
                key={p.id} 
                className="group flex items-center justify-between gap-4 px-6 py-4 transition-all duration-200 hover:bg-gradient-to-r hover:from-neutral-50/80 hover:to-transparent"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  {p.cover_image_url ? (
                    <img
                      src={p.cover_image_url}
                      alt={p.title}
                      className="h-12 w-16 shrink-0 rounded-lg object-cover border border-neutral-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="grid h-12 w-16 shrink-0 place-items-center rounded-lg bg-neutral-100 border border-neutral-200">
                      <ImageIcon className="h-4 w-4 text-neutral-400" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-neutral-900">{p.title}</p>
                    <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-400">
                      <span className="truncate">/{p.slug}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {p.updated_at?.slice(0, 10)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublished(p)}
                    className={`group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-semibold transition-all duration-300 ${
                      p.published
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200/60 hover:bg-emerald-100"
                        : "bg-neutral-100 text-neutral-500 ring-1 ring-inset ring-neutral-200/60 hover:bg-neutral-200"
                    }`}
                  >
                    {p.published ? (
                      <Eye className="h-3 w-3" />
                    ) : (
                      <EyeOff className="h-3 w-3" />
                    )}
                    {p.published ? "Live" : "Draft"}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(p)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-all duration-300 hover:border-[#5D1F17] hover:bg-[#5D1F17]/5 hover:text-[#5D1F17]"
                    aria-label="Edit post"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    disabled={deleting === p.id}
                    className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 text-neutral-500 transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    aria-label="Delete post"
                  >
                    {deleting === p.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
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