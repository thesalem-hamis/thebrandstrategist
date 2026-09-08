import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  CheckCircle2,
  BookOpen,
  Upload,
  Image as ImageIcon,
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
  selar_link: "",
  active: true,
};

export default function DashboardBooks() {
  const [products, setProducts] = useState<BookProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Selected local image
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);

  // Local preview URL
  const [imagePreview, setImagePreview] =
    useState<string>("");

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  // ------------------------------------------------------------
  // LOAD BOOKS
  // ------------------------------------------------------------

  async function load() {
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("book_products")
        .select("*")
        .order("sort_order", {
          ascending: true,
        })
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setProducts(
        (data ?? []) as BookProduct[]
      );
    } catch (err) {
      console.error(
        "Error loading books:",
        err
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  // ------------------------------------------------------------
  // CLEANUP IMAGE PREVIEW
  // ------------------------------------------------------------

  useEffect(() => {
    return () => {
      if (
        imagePreview &&
        imagePreview.startsWith("blob:")
      ) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ------------------------------------------------------------
  // ADMIN AUTH CHECK
  // ------------------------------------------------------------

  async function requireAuthenticatedAdmin() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error(
        "Session check failed:",
        error
      );

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
    setSelectedImage(null);
    setImagePreview("");
    setSaveError(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

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
      description:
        product.description ?? "",
      price: String(product.price ?? ""),
      sku: product.sku ?? "",
      image_url:
        product.image_url ?? "",
      selar_link:
        product.selar_link ?? "",
      active:
        product.active ?? true,
    });

    setSelectedImage(null);

    // Show existing image as preview
    setImagePreview(
      product.image_url ?? ""
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setSaveError(null);
    setShowEditor(true);
  }

  // ------------------------------------------------------------
  // SELECT COVER IMAGE
  // ------------------------------------------------------------

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setSaveError(
        "Please select a valid image file."
      );

      e.target.value = "";
      return;
    }

    // 5MB maximum
    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setSaveError(
        "Cover image must be smaller than 5MB."
      );

      e.target.value = "";
      return;
    }

    setSaveError(null);
    setSelectedImage(file);

    // Revoke previous local preview
    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  }

  // ------------------------------------------------------------
  // REMOVE SELECTED IMAGE
  // ------------------------------------------------------------

  function removeSelectedImage() {
    if (
      imagePreview &&
      imagePreview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(imagePreview);
    }

    setSelectedImage(null);

    // If editing and there was an existing image,
    // restore the existing image URL.
    if (form.id && form.image_url) {
      setImagePreview(form.image_url);
    } else {
      setImagePreview("");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // ------------------------------------------------------------
  // UPLOAD COVER TO SUPABASE STORAGE
  // ------------------------------------------------------------

  async function uploadCoverImage(
    file: File,
    productSku: string
  ) {
    const extension =
      file.name.split(".").pop()?.toLowerCase() ||
      "jpg";

    const safeSku =
      productSku
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-_]/g, "-");

    const fileName = `${safeSku}-${Date.now()}.${extension}`;

    const filePath =
      `covers/${fileName}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from("book-covers")
      .upload(
        filePath,
        file,
        {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        }
      );

    if (uploadError) {
      throw new Error(
        `Cover upload failed: ${uploadError.message}`
      );
    }

    const {
      data: publicUrlData,
    } = supabase.storage
      .from("book-covers")
      .getPublicUrl(filePath);

    if (
      !publicUrlData?.publicUrl
    ) {
      throw new Error(
        "Cover uploaded, but its public URL could not be generated."
      );
    }

    return publicUrlData.publicUrl;
  }

  // ------------------------------------------------------------
  // SAVE BOOK
  // ------------------------------------------------------------

  async function save(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setSaving(true);
    setSaveError(null);

    try {
      await requireAuthenticatedAdmin();

      if (!form.title?.trim()) {
        throw new Error(
          "Title is required."
        );
      }

      const priceCents =
        parseInt(form.price, 10);

      if (
        isNaN(priceCents) ||
        priceCents < 1
      ) {
        throw new Error(
          "Price must be at least 1 cent."
        );
      }

      const sku =
        form.sku?.trim() || null;

      let imageUrl =
        form.image_url || null;

      // --------------------------------------------------------
      // UPLOAD NEW IMAGE IF ONE WAS SELECTED
      // --------------------------------------------------------

      if (selectedImage) {
        const uploadSku =
          sku ||
          form.title
            .trim()
            .toLowerCase()
            .replace(
              /[^a-z0-9]+/g,
              "-"
            );

        imageUrl =
          await uploadCoverImage(
            selectedImage,
            uploadSku
          );
      }

      const payload = {
        title: form.title.trim(),

        author:
          form.author?.trim() ||
          null,

        description:
          form.description?.trim() ||
          null,

        price: priceCents,

        sku,

        image_url: imageUrl,

        selar_link:
          form.selar_link?.trim() ||
          null,

        active: form.active,
      };

      let result;

      // --------------------------------------------------------
      // UPDATE
      // --------------------------------------------------------

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
      setSelectedImage(null);
      setImagePreview("");
      setSaveError(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await load();
    } catch (err) {
      console.error(
        "Save error:",
        err
      );

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

  async function remove(id: string) {
    if (
      !confirm(
        "Delete this book product permanently? This will also remove its related orders."
      )
    ) {
      return;
    }

    setDeleting(id);

    try {
      await requireAuthenticatedAdmin();

      const {
        error: ordersDeleteError,
      } = await supabase
        .from("orders")
        .delete()
        .eq(
          "product_id",
          id
        );

      if (ordersDeleteError) {
        throw new Error(
          `Failed to remove related orders: ${ordersDeleteError.message}`
        );
      }

      const {
        error: productDeleteError,
      } = await supabase
        .from("book_products")
        .delete()
        .eq("id", id);

      if (productDeleteError) {
        throw productDeleteError;
      }

      await load();
    } catch (err) {
      console.error(
        "Delete error:",
        err
      );

      const message =
        err instanceof Error
          ? err.message
          : String(err);

      alert(
        `Failed to delete book product.\n\n${message}`
      );
    } finally {
      setDeleting(null);
    }
  }

  const publishedCount =
    products.filter(
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
            {products.length -
              publishedCount}
          </p>
        </div>
      </div>

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
                  Selar Link
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
                    colSpan={5}
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
                    colSpan={5}
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
                products.map(
                  (product) => (
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
                          $
                          {(
                            product.price /
                            100
                          ).toFixed(2)}{" "}
                          {product.currency}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {product.image_url ? (
                          <img
                            src={
                              product.image_url
                            }
                            alt={
                              product.title
                            }
                            className="h-12 w-12 rounded object-cover"
                          />
                        ) : (
                          <span className="text-[11px] text-neutral-400">
                            —
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        {product.selar_link ? (
                          <a
                            href={
                              product.selar_link
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] font-medium text-[#5D1F17] underline underline-offset-2 transition-colors hover:text-neutral-900"
                          >
                            Open Link
                          </a>
                        ) : (
                          <span className="text-[11px] text-neutral-400">
                            —
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              openEdit(
                                product
                              )
                            }
                            className="grid h-8 w-8 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              remove(
                                product.id
                              )
                            }
                            disabled={
                              deleting ===
                              product.id
                            }
                            className="grid h-8 w-8 place-items-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                          >
                            {deleting ===
                            product.id ? (
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                              <Trash2 className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
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
                  setSaveError(null);
                  setSelectedImage(null);
                  setImagePreview("");
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
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                  placeholder="A practical guide to building a brand that matters…"
                />
              </div>

              {/* Price / SKU */}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                        price:
                          e.target.value,
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
              </div>

              {/* COVER IMAGE */}

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Cover Image
                </label>

                <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {/* Preview */}

                    <div className="relative flex h-40 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Book cover preview"
                            className="h-full w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={
                              removeSelectedImage
                            }
                            className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-white transition hover:bg-black"
                            title="Remove cover"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-neutral-400">
                          <ImageIcon className="h-8 w-8" />

                          <span className="text-[10px]">
                            No cover
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Upload Area */}

                    <div className="flex-1">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={
                          handleImageChange
                        }
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          fileInputRef.current?.click()
                        }
                        className="inline-flex items-center gap-2 rounded-full bg-[#5D1F17] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#4A1812]"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        {selectedImage
                          ? "Choose Different Image"
                          : "Choose Cover Image"}
                      </button>

                      <p className="mt-3 text-[11px] leading-relaxed text-neutral-500">
                        Select the book cover directly
                        from your computer.
                        <br />
                        JPG, PNG or WebP. Maximum
                        file size: 5MB.
                      </p>

                      {selectedImage && (
                        <div className="mt-3 flex items-center gap-2 text-[10px] font-medium text-emerald-700">
                          <CheckCircle2 className="h-3 w-3" />

                          <span className="truncate">
                            {selectedImage.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* SELAR LINK */}

              <div>
                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                  Selar Link
                </label>

                <input
                  type="url"
                  value={form.selar_link}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      selar_link:
                        e.target.value,
                    })
                  }
                  placeholder="https://selar.co/..."
                  required
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-xs outline-none focus:border-[#5D1F17]"
                />

                <p className="mt-1 text-[10px] text-neutral-500">
                  Paste the direct Selar product link.
                  Users will be sent here to complete
                  purchase.
                </p>
              </div>

              {/* ACTIVE */}

              <div className="flex items-center gap-3">
                <input
                  id="book-active"
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      active:
                        e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-neutral-300 text-[#5D1F17] focus:ring-[#5D1F17]"
                />

                <label
                  htmlFor="book-active"
                  className="text-xs font-medium text-neutral-700"
                >
                  Publish this book
                </label>
              </div>

              {/* Actions */}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditor(false);
                    setSaveError(null);
                    setSelectedImage(null);
                    setImagePreview("");
                  }}
                  className="rounded-full border border-neutral-200 px-5 py-2.5 text-xs font-semibold text-neutral-600 hover:border-neutral-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
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
    </div>
  );
}