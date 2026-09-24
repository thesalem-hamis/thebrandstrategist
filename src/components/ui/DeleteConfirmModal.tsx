import { Loader2, Trash2, X, AlertTriangle } from "lucide-react";

interface Props {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteConfirmModal({ title, description, onConfirm, onCancel, loading }: Props) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!loading ? onCancel : undefined}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 disabled:opacity-40"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="p-6">
          {/* Icon */}
          <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-red-50 ring-1 ring-red-100">
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>

          {/* Text */}
          <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
          <p className="mt-1.5 text-xs leading-relaxed text-neutral-500">{description}</p>

          {/* Divider */}
          <div className="my-5 h-px bg-neutral-100" />

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-50 disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 disabled:opacity-60"
            >
              {loading ? (
                <><Loader2 className="h-3 w-3 animate-spin" />Deleting…</>
              ) : (
                <><Trash2 className="h-3 w-3" />Delete permanently</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
