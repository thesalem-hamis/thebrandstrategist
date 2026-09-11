import { useEffect, useState, useRef } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import type { BookProduct } from "@/lib/types";

const EMPTY_FORM = {
  id: "",
  title: "",
  author: "",
  description: "",
  price: "",
  sku: "",
  image_url: "",
  pdf_url: "",
  stock_qty: "",
  is_digital: true,
  active: true,
  selar_link: "",
};

type UploadField = "image_url" | "pdf_url";
type UploadBucket = "book-covers" | "book-files";

export default function DashboardBooks() {
  const [products, setProducts] = useState<BookProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [coverUploading, setCoverUploading] = useState(false);
  const [pdfUploading, setPdfUploading] = useState(false);

  const [uploadMessage, setUploadMessage] = useState<{
    tone: "ok" | "err";
    text: string;
  } | null>(null);

  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; title: string } | null>(null);
  const [message, setMessage] = useState<{ tone: "ok" | "err"; text: string } | null>(null);

  const coverInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // ------------------------------------------------------------
  // LOAD BOOKS
  // ------------------------------------------------------------

  async function load() {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("book_products")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setProducts((data ?? []) as BookProduct[]);
    } catch (err) {
      console.error("Error loading books:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // ------------------------------------------------------------
  // ADMIN AUTH CHECK
  // ------------------------------------------------------------

  async function requireAuthenticatedAdmin() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Session check failed:", error);

      throw new Error(
        "Unable to verify your admin session. Please refresh the page and try again."
      );
    }

    if (!session?.user) {
      throw new Error(
        "You must be logged into the admin dashboard before performing this action."
      );
    }

    return session;
  }

  // ------------------------------------------------------------
  // OPEN NEW BOOK
  // ------------------------------------------------------------

  function openNew() {
    setForm(EMPTY_FORM);
    setUploadMessage(null);
    setSaveError(null);
    setShowEditor(true);
  }

  // ------------------------------------------------------------
  // OPEN EDIT
  // ------------------------------------------------------------

  function openEdit(product: BookProduct) {
    setForm({
      id: product.id,
      title: product.title,
      author: product.author ?? "",
      description: product.description ?? "",
      price: String(product.price ?? ""),
      sku: product.sku ?? "",
      image_url: product.image_url ?? "",
      pdf_url: product.pdf_url ?? "",
      stock_qty: product.stock_qty?.toString() ?? "",
      is_digital: product.is_digital ?? true,
      active: product.active ?? true,
      selar_link: product.selar_link ?? "",
    });

    setUploadMessage(null);
    setSaveError(null);
    setShowEditor(true);
  }

  // ------------------------------------------------------------
  // GET STORAGE PATH FROM URL
  // ------------------------------------------------------------

  function getStoragePathFromUrl(
    urlString: string,
    bucket: UploadBucket
  ): string | null {
    try {
      const url = new URL(urlString);

      const publicMarker = `/storage/v1/object/public/${bucket}/`;

      if (url.pathname.includes(publicMarker)) {
        return decodeURIComponent(
          url.pathname.split(publicMarker)[1]
        );
      }

      const authenticatedMarker =
        `/storage/v1/object/authenticated/${bucket}/`;

      if (url.pathname.includes(authenticatedMarker)) {
        return decodeURIComponent(
          url.pathname.split(authenticatedMarker)[1]
        );
      }

      const objectMarker = `/storage/v1/object/${bucket}/`;

      if (url.pathname.includes(objectMarker)) {
        return decodeURIComponent(
          url.pathname.split(objectMarker)[1]
        );
      }

      const parts = url.pathname.split("/");

      const bucketIndex = parts.findIndex(
        (part) => part === bucket
      );

      if (bucketIndex !== -1) {
        return decodeURIComponent(
          parts.slice(bucketIndex + 1).join("/")
        );
      }

      return null;
    } catch (error) {
      console.warn(
        "Could not parse storage URL:",
        error
      );

      return null;
    }
  }

  // ------------------------------------------------------------
  // DELETE OLD STORAGE FILE
  // ------------------------------------------------------------

  async function removeStorageFile(
    url: string | null | undefined,
    bucket: UploadBucket
  ) {
    if (!url) {
      return;
    }

    const path = getStoragePathFromUrl(url, bucket);

    if (!path) {
      return;
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.warn(
        `Failed to remove old ${bucket} file:`,
        error
      );
    }
  }

  // ------------------------------------------------------------
  // UPLOAD FILE
  // ------------------------------------------------------------

  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    bucket: UploadBucket,
    field: UploadField
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Reset input so same file can be selected again.
    e.target.value = "";

    // ----------------------------------------------------------
    // CHECK AUTHENTICATION
    // ----------------------------------------------------------

    try {
      await requireAuthenticatedAdmin();
    } catch (err) {
      console.error(
        "Authentication required:",
        err
      );

      const message =
        err instanceof Error
          ? err.message
          : "You must be logged in as an admin.";

      setUploadMessage({
        tone: "err",
        text: message,
      });

      return;
    }

    // ----------------------------------------------------------
    // VALIDATE IMAGE
    // ----------------------------------------------------------

    if (field === "image_url") {
      const validTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
        "image/webp",
      ];

      if (!validTypes.includes(file.type.toLowerCase())) {
        setUploadMessage({
          tone: "err",
          text:
            "Please select a valid image file (PNG, JPG, GIF, or WebP).",
        });

        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadMessage({
          tone: "err",
          text: "Image must be less than 5MB.",
        });

        return;
      }
    }

    // ----------------------------------------------------------
    // VALIDATE PDF
    // ----------------------------------------------------------

    if (field === "pdf_url") {
      if (
        file.type.toLowerCase() !==
        "application/pdf"
      ) {
        setUploadMessage({
          tone: "err",
          text: "Please select a valid PDF file.",
        });

        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        setUploadMessage({
          tone: "err",
          text: "PDF must be less than 50MB.",
        });

        return;
      }
    }

    if (field === "image_url") {
      setCoverUploading(true);
    } else {
      setPdfUploading(true);
    }

    setUploadMessage(null);

    try {
      // --------------------------------------------------------
      // CREATE UNIQUE FILE NAME
      // --------------------------------------------------------

      const fileExt =
        file.name.split(".").pop()?.toLowerCase() ||
        (field === "pdf_url" ? "pdf" : "bin");

      const safeBaseName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 60);

      const uniqueName = `${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 10)}`;

      const fileName = `${
        safeBaseName || "file"
      }-${uniqueName}.${fileExt}`;

      // Do NOT include bucket name in path.
      const filePath = fileName;

      // --------------------------------------------------------
      // UPLOAD
      // --------------------------------------------------------

      const {
        data: uploadData,
        error: uploadError,
      } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (uploadError) {
        throw uploadError;
      }

      if (!uploadData?.path) {
        throw new Error(
          "Upload completed but Supabase did not return a file path."
        );
      }

      // --------------------------------------------------------
      // IMAGE = PUBLIC URL
      // --------------------------------------------------------

      if (bucket === "book-covers") {
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("book-covers")
          .getPublicUrl(uploadData.path);

        if (!publicUrl) {
          throw new Error(
            "Cover uploaded but a public URL could not be generated."
          );
        }

        setForm((prev) => ({
          ...prev,
          image_url: publicUrl,
        }));

        setUploadMessage({
          tone: "ok",
          text: "Cover image uploaded successfully.",
        });
      }

      // --------------------------------------------------------
      // PDF = PRIVATE STORAGE PATH
      // --------------------------------------------------------

      if (bucket === "book-files") {
        setForm((prev) => ({
          ...prev,
          pdf_url: uploadData.path,
        }));

        setUploadMessage({
          tone: "ok",
          text: "PDF uploaded successfully.",
        });
      }
    } catch (err) {
      console.error("Upload failed:", err);

      let errorMessage =
        "Upload failed. Please try again.";

      if (err instanceof Error) {
        errorMessage = err.message;
      }

      if (
        errorMessage
          .toLowerCase()
          .includes("row-level security")
      ) {
        errorMessage =
          "Upload blocked by Supabase security. Make sure you are logged into the admin dashboard.";
      }

      setUploadMessage({
        tone: "err",
        text: errorMessage,
      });
    } finally {
      setCoverUploading(false);
      setPdfUploading(false);
    }
  }

  // ------------------------------------------------------------
  // SAVE BOOK
  // ------------------------------------------------------------

  async function save(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setSaveError(null);

    try {
      await requireAuthenticatedAdmin();

      // --------------------------------------------------------
      // VALIDATE TITLE
      // --------------------------------------------------------

      if (!form.title?.trim()) {
        throw new Error("Title is required.");
      }

      // --------------------------------------------------------
      // VALIDATE PRICE
      // --------------------------------------------------------

      const priceCents = parseInt(
        form.price,
        10
      );

      if (
        isNaN(priceCents) ||
        priceCents < 1
      ) {
        throw new Error(
          "Price must be at least 1 cent."
        );
      }

      // --------------------------------------------------------
      // VALIDATE STOCK
      // --------------------------------------------------------

      let stockQty: number | null = null;

      if (form.stock_qty.trim()) {
        const parsedStock = parseInt(
          form.stock_qty,
          10
        );

        if (
          isNaN(parsedStock) ||
          parsedStock < 0
        ) {
          throw new Error(
            "Stock quantity must be a valid number greater than or equal to 0."
          );
        }

        stockQty = parsedStock;
      }

      // --------------------------------------------------------
      // PAYLOAD
      // --------------------------------------------------------

      const payload = {
        title: form.title.trim(),
        author: form.author?.trim() || null,
        description:
          form.description?.trim() || null,
        price: priceCents,
        sku: form.sku?.trim() || null,
        image_url: form.image_url || null,
        pdf_url: form.pdf_url || null,
        stock_qty: stockQty,
        is_digital: form.is_digital,
        active: form.active,
        selar_link: form.selar_link?.trim() || null,
      };

      // --------------------------------------------------------
      // UPDATE
      // --------------------------------------------------------

      let result;

      if (form.id) {
        result = await supabase
          .from("book_products")
          .update(payload)
          .eq("id", form.id)
          .select()
          .single();
      }

      // --------------------------------------------------------
      // CREATE
      // --------------------------------------------------------

      else {
        result = await supabase
          .from("book_products")
          .insert(payload)
          .select()
          .single();
      }

      if (result.error) {
        throw result.error;
      }

      setShowEditor(false);
      setForm(EMPTY_FORM);
      setUploadMessage(null);

      await load();
    } catch (err) {
      console.error("Save error:", err);

      const message =
        err instanceof Error
          ? err.message
          : String(err);

      setSaveError(
        `Failed to save book: ${message}`
      );
    } finally {
      setSaving(false);
    }
  }

  // ------------------------------------------------------------
  // DELETE BOOK
  // ------------------------------------------------------------

  function requestDelete(product: BookProduct) {
    setDeleteTarget({ id: product.id, title: product.title });
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    setShowDeleteModal(false);
    setDeleting(deleteTarget.id);

    try {
      await requireAuthenticatedAdmin();

      const product = products.find(
        (p) => p.id === deleteTarget.id
      );

      if (!product) {
        throw new Error(
          "Book product not found."
        );
      }

      const {
        error: ordersDeleteError,
      } = await supabase
        .from("orders")
        .delete()
        .eq("product_id", deleteTarget.id);

      if (ordersDeleteError) {
        throw new Error(
          `Failed to remove related orders`
        );
      }

      if (product.image_url) {
        await removeStorageFile(
          product.image_url,
          "book-covers"
        );
      }

      if (product.pdf_url) {
        let pdfPath = product.pdf_url;

        if (
          pdfPath.startsWith("http://") ||
          pdfPath.startsWith("https://")
        ) {
          const extractedPath =
            getStoragePathFromUrl(
              pdfPath,
              "book-files"
            );

          if (extractedPath) {
            pdfPath = extractedPath;
          }
        }

        if (pdfPath) {
          const {
            error: pdfDeleteError,
          } = await supabase.storage
            .from("book-files")
            .remove([pdfPath]);

          if (pdfDeleteError) {
            console.warn(
              "Failed to remove PDF:",
              pdfDeleteError
            );
          }
        }
      }

      const {
        error: productDeleteError,
      } = await supabase
        .from("book_products")
        .delete()
        .eq("id", deleteTarget.id);

      if (productDeleteError) {
        throw productDeleteError;
      }

      setDeleteTarget(null);
      await load();

      setMessage({
        tone: "ok",
        text: `"${deleteTarget.title}" deleted successfully.`,
      });

      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error(
        "Delete error:",
        err
      );

      const rawMessage =
        err instanceof Error
          ? err.message
          : String(err);

      const sanitized = rawMessage
        .replace(/localhost:\d+/g, "this site")
        .replace(/http:\/\/localhost[^\s]*/g, "this site")
        .replace(/https:\/\/localhost[^\s]*/g, "this site");

      setMessage({
        tone: "err",
        text: `Failed to delete book: ${sanitized}`,
      });

      setTimeout(() => setMessage(null), 5000);
    } finally {
      setDeleting(null);
    }
  }

  const publishedCount = products.filter(
    (p) => p.active
  ).length;

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-neutral-400">
            Store
          </p>

          <h1 className="mt-1 text-2xl font-light tracking-tight text-neutral-900 sm:text-3xl">
            Book Products
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Manage book listings, upload covers and
            PDFs, set prices and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={openNew}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#5D1F17] px-4 py-2 text-xs font-semibold text-white shadow transition-all duration-300 hover:bg-[#4A1812] hover:shadow-md"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Book
        </button>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            Total Products
          </p>

          <p className="mt-3 text-2xl font-semibold text-neutral-900">
            {products.length}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            Active
          </p>

          <p className="mt-3 text-2xl font-semibold text-neutral-900">
            {publishedCount}
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
            Draft
          </p>

          <p className="mt-3 text-2xl font-semibold text-neutral-900">
            {products.length - publishedCount}
          </p>
        </div>
      </div>

      {/* Upload Message */}

      {uploadMessage && (
        <div
          className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-medium ${
            uploadMessage.tone === "ok"
              ? "border-emerald-200/60 bg-emerald-50 text-emerald-700"
              : "border-red-200/60 bg-red-50 text-red-700"
          }`}
        >
          {uploadMessage.tone === "ok" ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <X className="h-3.5 w-3.5" />
          )}

          {uploadMessage.text}
        </div>
      )}

      {/* Save Error */}

      {saveError && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200/60 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">
          <X className="h-3.5 w-3.5" />
          {saveError}
        </div>
      )}

      {/* Table */}

      <div className="overflow-hidden rounded-2xl border border-neutral-200/70 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/40">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Product
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Price
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Cover
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  PDF
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Digital
                </th>

                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />

                      <p className="text-xs text-neutral-500">
                        Loading books…
                      </p>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
                        <BookOpen className="h-5 w-5 text-neutral-400" />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-neutral-700">
                          No books yet
                        </p>

                        <p className="mt-1 text-[11px] text-neutral-500">
                          Add your first book product
                          to start selling.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="group text-xs transition-all duration-200 hover:bg-gradient-to-r hover:from-neutral-50/80 hover:to-transparent"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-neutral-900">
                        {product.title}
                      </div>

                      <div className="mt-0.5 text-[11px] text-neutral-500">
                        {product.author &&
                          `by ${product.author}`}

                        {product.sku &&
                          ` · SKU: ${product.sku}`}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-semibold text-neutral-900">
                        ${(product.price / 100).toFixed(2)}{" "}
                        {product.currency}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="h-12 w-12 rounded object-cover"
                        />
                      ) : (
                        <span className="text-[11px] text-neutral-400">
                          —
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {product.pdf_url ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
                          <CheckCircle2 className="h-2.5 w-2.5" />
                          Uploaded
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-400">
                          —
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      {product.is_digital ? (
                        <span className="text-[11px] text-emerald-700">
                          Yes
                        </span>
                      ) : (
                        <span className="text-[11px] text-neutral-500">
                          {product.stock_qty ?? "∞"}
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                          product.active
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-neutral-100 text-neutral-500"
                        }`}
                      >
                        {product.active
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            openEdit(product)
                          }
                          className="grid h-8 w-8 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            requestDelete(product)
                          }
                          disabled={
                            deleting === product.id
                          }
                          className="grid h-8 w-8 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          {deleting === product.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor */}

      {showEditor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">
                {form.id
                  ? "Edit Book"
                  : "Add New Book"}
              </h2>

              <button
                type="button"
                onClick={() => {
                  setShowEditor(false);
                  setUploadMessage(null);
                  setSaveError(null);
                }}
                className="grid h-8 w-8 place-items-center rounded-lg text-neutral-400 hover:bg-neutral-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={save}
              className="mt-6 space-y-6"
            >
              {/* Title + Author */}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Title
                  </label>

                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                    placeholder="The Brand Strategist"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Author
                  </label>

                  <input
                    type="text"
                    value={form.author}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        author: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                    placeholder="Bimpe Mohammed"
                  />
                </div>
              </div>

              {/* Description */}

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Description
                </label>

                <textarea
                  rows={4}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                  placeholder="A practical guide to building a brand that matters…"
                />
              </div>

              {/* Price / SKU / Stock */}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Price (cents)
                  </label>

                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        price: e.target.value,
                      })
                    }
                    required
                    min={1}
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                    placeholder="3500"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    SKU
                  </label>

                  <input
                    type="text"
                    value={form.sku}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        sku: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                    placeholder="brand-strategist-book"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Stock Qty
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={form.stock_qty}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        stock_qty: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                    placeholder="Leave empty for digital"
                  />
                </div>
              </div>

              {/* Cover + PDF */}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Cover */}

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Cover Image
                    </label>

                    <input
                      type="text"
                      value={form.image_url}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          image_url:
                            e.target.value,
                        })
                      }
                      placeholder="Or paste image URL"
                      className="mb-2 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                    />

                    {form.image_url && (
                      <div className="flex items-center gap-2 text-[10px] text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Cover image selected
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Upload
                    </label>

                    <input
                      type="file"
                      ref={coverInputRef}
                      accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
                      onChange={(e) =>
                        handleUpload(
                          e,
                          "book-covers",
                          "image_url"
                        )
                      }
                      className="text-[11px] file:mr-2 file:cursor-pointer file:rounded-lg file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-[10px] file:font-semibold file:text-neutral-700 hover:file:bg-neutral-200"
                      disabled={
                        coverUploading ||
                        pdfUploading
                      }
                    />

                    {coverUploading && (
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-neutral-500">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Uploading…
                      </div>
                    )}
                  </div>
                </div>

                {/* PDF */}

                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      PDF File
                    </label>

                    <input
                      type="text"
                      value={form.pdf_url}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          pdf_url:
                            e.target.value,
                        })
                      }
                      placeholder="Private PDF storage path"
                      className="mb-2 w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                    />

                    {form.pdf_url && (
                      <div className="flex items-center gap-2 text-[10px] text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" />
                        PDF selected
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      Upload
                    </label>

                    <input
                      type="file"
                      ref={pdfInputRef}
                      accept="application/pdf"
                      onChange={(e) =>
                        handleUpload(
                          e,
                          "book-files",
                          "pdf_url"
                        )
                      }
                      className="text-[11px] file:mr-2 file:cursor-pointer file:rounded-lg file:border-0 file:bg-neutral-100 file:px-3 file:py-1.5 file:text-[10px] file:font-semibold file:text-neutral-700 hover:file:bg-neutral-200"
                      disabled={
                        pdfUploading ||
                        coverUploading
                      }
                    />

                    {pdfUploading && (
                      <div className="mt-2 flex items-center gap-1.5 text-[10px] text-neutral-500">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        Uploading…
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Selar Link */}

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="selar_link"
                  className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-400"
                >
                  Selar Link (Optional)
                </label>
                <p className="text-[11px] text-neutral-500">
                  Fill this to redirect to an external Selar store
                  page instead of Paystack checkout.
                </p>
                <input
                  id="selar_link"
                  type="url"
                  value={form.selar_link ?? ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      selar_link: e.target.value,
                    })
                  }
                  placeholder="https://selar.co/your-book-link"
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                />
              </div>

              {/* Digital */}

              <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-4">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                    Digital Book
                  </label>

                  <p className="text-[11px] text-neutral-500">
                    Enable to provide instant digital
                    download
                  </p>
                </div>

                <label className="relative inline-flex h-6 w-10 cursor-pointer items-center rounded-full">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.is_digital}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        is_digital:
                          e.target.checked,
                      })
                    }
                  />

                  <span
                    className={`h-6 w-10 rounded-full transition-colors ${
                      form.is_digital
                        ? "bg-[#5D1F17]"
                        : "bg-neutral-300"
                    }`}
                  />

                  <span
                    className={`absolute left-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                      form.is_digital
                        ? "translate-x-4"
                        : "translate-x-0"
                    }`}
                  />
                </label>
              </div>

              {/* Actions */}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditor(false);
                    setUploadMessage(null);
                    setSaveError(null);
                  }}
                  className="rounded-full border border-neutral-200 px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:border-neutral-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    saving ||
                    coverUploading ||
                    pdfUploading
                  }
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#5D1F17] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#4A1812] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <BookOpen className="h-3.5 w-3.5" />
                  )}

                  <span>
                    {form.id
                      ? "Update"
                      : "Create"}{" "}
                    Book
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-red-50 text-red-600">
                <Trash2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">Delete book</h3>
                <p className="text-xs text-neutral-500">This action cannot be undone.</p>
              </div>
            </div>

            <p className="text-sm text-neutral-600 mb-6">
              Are you sure you want to delete <span className="font-semibold text-neutral-900">"{deleteTarget.title}"</span>? 
              This will also remove its related orders, uploaded cover, and PDF file.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteTarget(null);
                }}
                className="rounded-full border border-neutral-200 px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:border-neutral-400"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting === deleteTarget.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting === deleteTarget.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {message && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl border px-4 py-3 text-xs font-medium shadow-lg ${
            message.tone === "ok"
              ? "border-emerald-200/60 bg-emerald-50 text-emerald-700"
              : "border-red-200/60 bg-red-50 text-red-700"
          }`}
        >
          {message.tone === "ok" ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <X className="h-3.5 w-3.5" />
          )}
          {message.text}
        </div>
      )}
    </div>
  );
}
