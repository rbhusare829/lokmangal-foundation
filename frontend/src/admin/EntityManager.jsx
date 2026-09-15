import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { api } from "../lib/api.js";

function buildFormData(fields, values) {
  const fd = new FormData();
  for (const field of fields) {
    if (field.type === "file" || field.type === "pdf") {
      const fileList = values[field.name];
      if (fileList && fileList.length > 0) fd.append(field.name, fileList[0]);
    } else {
      fd.append(field.name, values[field.name] ?? "");
    }
  }
  return fd;
}

function FieldInput({ field, register, isEditing }) {
  // File/PDF fields are only ever required on create — on edit, leaving the
  // input empty means "keep the current file", which is valid.
  const isFileType = field.type === "file" || field.type === "pdf";
  const required = isFileType ? field.required && !isEditing : field.required;

  if (field.type === "textarea") {
    return (
      <textarea
        rows={field.rows ?? 3}
        placeholder={field.label}
        {...register(field.name, { required })}
        className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-brand-orange-accent"
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        {...register(field.name, { required })}
        className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-brand-orange-accent"
      >
        {field.options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    );
  }
  if (field.type === "file") {
    return (
      <input
        type="file"
        accept="image/*"
        {...register(field.name, { required })}
        className="w-full text-sm"
      />
    );
  }
  if (field.type === "pdf") {
    return (
      <input
        type="file"
        accept="application/pdf"
        {...register(field.name, { required })}
        className="w-full text-sm"
      />
    );
  }
  return (
    <input
      type="text"
      placeholder={field.label}
      {...register(field.name, { required })}
      className="w-full rounded-lg border border-[#E2E8F0] px-3 py-2 text-sm outline-none focus:border-brand-orange-accent"
    />
  );
}

function EntityForm({ config, item, onDone, onCancel }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: Object.fromEntries(
      config.fields
        .filter((f) => f.type !== "file" && f.type !== "pdf")
        .map((f) => [f.name, item?.[f.name] ?? (f.type === "select" ? f.options[0] : "")])
    ),
  });

  const onSubmit = async (values) => {
    const fd = buildFormData(config.fields, values);
    if (item) {
      await api.put(`${config.endpoint}/${item.id}`, fd);
    } else {
      await api.post(config.endpoint, fd);
    }
    onDone();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-6 grid grid-cols-1 gap-3 rounded-xl border border-light-green-tint bg-white p-5 sm:grid-cols-2"
    >
      {config.fields.map((field) => (
        <div key={field.name} className={field.wide ? "sm:col-span-2" : ""}>
          <label className="mb-1 block text-xs font-semibold text-secondary-text">
            {field.label}
            {field.required && " *"}
          </label>
          <FieldInput field={field} register={register} isEditing={Boolean(item)} />
          {errors[field.name] && <p className="mt-1 text-xs text-red-600">Required</p>}
          {(field.type === "file" || field.type === "pdf") && field.urlField && item?.[field.urlField] && (
            <p className="mt-1 text-xs text-secondary-text">Leave empty to keep the current file.</p>
          )}
        </div>
      ))}
      <div className="flex gap-2 sm:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-brand-orange-accent px-5 py-2 text-sm font-bold text-orange-btn-text hover:bg-[#D97A14] hover:text-white disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : item ? "Save Changes" : "Create"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-[#E2E8F0] px-5 py-2 text-sm font-semibold text-secondary-text hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default function EntityManager({ config }) {
  const [items, setItems] = useState(null);
  const [error, setError] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    api
      .get(config.endpoint)
      .then((res) => setItems(res.data))
      .catch(() => setError(true));
  };

  useEffect(load, [config.endpoint]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await api.delete(`${config.endpoint}/${id}`);
    load();
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-brand-green-primary">{config.title}</h1>
        {!formOpen && (
          <button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
            className="flex items-center gap-2 rounded-full bg-brand-green-primary px-4 py-2 text-sm font-bold text-white hover:bg-brand-green-medium"
          >
            <Plus size={16} /> Add New
          </button>
        )}
      </div>

      {formOpen && <EntityForm config={config} item={editing} onDone={closeForm} onCancel={closeForm} />}

      {error && <p className="text-sm text-red-600">Could not load {config.title.toLowerCase()}.</p>}
      {!error && !items && <p className="text-sm text-secondary-text">Loading…</p>}

      {items && (
        <div className="overflow-hidden rounded-xl border border-light-green-tint bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-light-green-tint/50 text-xs uppercase text-secondary-text">
              <tr>
                {config.columns.map((c) => (
                  <th key={c.key} className="px-4 py-3">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-green-tint/60">
              {items.map((item) => (
                <tr key={item.id}>
                  {config.columns.map((c) => (
                    <td key={c.key} className="max-w-xs truncate px-4 py-3">
                      {c.image ? (
                        item[c.key] ? (
                          <img src={item[c.key]} alt="" className="h-10 w-10 rounded object-cover" />
                        ) : (
                          "—"
                        )
                      ) : (
                        String(item[c.key] ?? "")
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => {
                        setEditing(item);
                        setFormOpen(true);
                      }}
                      className="mr-2 inline-flex h-8 w-8 items-center justify-center rounded-full text-brand-green-primary hover:bg-light-green-tint"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={config.columns.length + 1} className="px-4 py-8 text-center text-secondary-text">
                    Nothing here yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
