import React, { type SubmitEventHandler, useMemo, useState } from "react";
import { Edit2, PackagePlus, Trash2, X } from "lucide-react";
import { PRODUCT_CATEGORIES, toBackendImagePath, type Product, type ProductRequest } from "../../api/products";
import { useProducts } from "../../context/ProductsContext";
import { toast } from "sonner";

interface ProductFormData {
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  price: string;
  image: string;
  stockQuantity: string;
  manufacturer: string;
  activeIngredient: string;
  dosage: string;
  packaging: string;
  prescriptionRequired: boolean;
  featured: boolean;
}

const defaultImage =
  "/images/default-product.png";

const defaultForm: ProductFormData = {
  name: "",
  category: PRODUCT_CATEGORIES[1] || "Antibiotics",
  description: "",
  fullDescription: "",
  price: "",
  image: defaultImage,
  stockQuantity: "",
  manufacturer: "",
  activeIngredient: "",
  dosage: "",
  packaging: "",
  prescriptionRequired: false,
  featured: false,
};

const ProductFormModal: React.FC<{
  isOpen: boolean;
  title: string;
  categories: string[];
  initial?: ProductFormData;
  onClose: () => void;
  onSave: (data: ProductFormData) => Promise<void> | void;
}> = ({ isOpen, title, categories, initial, onClose, onSave }) => {
  const [form, setForm] = useState<ProductFormData>(initial || defaultForm);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    setForm(initial || defaultForm);
  }, [initial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
    } finally {
      setSaving(false);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Product name</label>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className={fieldClass}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
              <select
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
                className={fieldClass}
              >
                {categories.filter((category) => category !== "All Products").map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Price</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) => setForm({ ...form, price: event.target.value })}
                className={fieldClass}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Stock quantity</label>
              <input
                type="number"
                min="0"
                step="1"
                value={form.stockQuantity}
                onChange={(event) => setForm({ ...form, stockQuantity: event.target.value })}
                className={fieldClass}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Manufacturer</label>
              <input
                value={form.manufacturer}
                onChange={(event) => setForm({ ...form, manufacturer: event.target.value })}
                className={fieldClass}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Backend image path</label>
              <input
                value={form.image}
                onChange={(event) => setForm({ ...form, image: event.target.value })}
                className={fieldClass}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Active ingredient</label>
              <input
                value={form.activeIngredient}
                onChange={(event) => setForm({ ...form, activeIngredient: event.target.value })}
                className={fieldClass}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Dosage</label>
              <input
                value={form.dosage}
                onChange={(event) => setForm({ ...form, dosage: event.target.value })}
                className={fieldClass}
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Packaging</label>
              <input
                value={form.packaging}
                onChange={(event) => setForm({ ...form, packaging: event.target.value })}
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Short description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              className={fieldClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Full description</label>
            <textarea
              rows={5}
              value={form.fullDescription}
              onChange={(event) => setForm({ ...form, fullDescription: event.target.value })}
              className={fieldClass}
              required
            />
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 md:flex-row md:items-center md:justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.prescriptionRequired}
                onChange={(event) => setForm({ ...form, prescriptionRequired: event.target.checked })}
              />
              Prescription required
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => setForm({ ...form, featured: event.target.checked })}
              />
              Featured product
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 disabled:bg-slate-300">
              {saving ? "Saving..." : "Save product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapToForm = (product: Product): ProductFormData => ({
  name: product.name,
  category: product.category,
  description: product.description,
  fullDescription: product.fullDescription,
  price: String(product.price),
  image: toBackendImagePath(product.image),
  stockQuantity: String(product.stockQuantity),
  manufacturer: product.manufacturer,
  activeIngredient: product.activeIngredient || "",
  dosage: product.dosage || "",
  packaging: product.packaging || "",
  prescriptionRequired: product.prescriptionRequired,
  featured: Boolean(product.featured),
});

const buildProductRequest = (data: ProductFormData): ProductRequest => {
  const stockQuantity = Number(data.stockQuantity || 0);

  return {
    name: data.name.trim(),
    category: data.category,
    description: data.description.trim(),
    fullDescription: data.fullDescription.trim(),
    price: Number(data.price || 0),
    image: data.image.trim() || defaultImage,
    inStock: stockQuantity > 0,
    stockQuantity,
    manufacturer: data.manufacturer.trim(),
    activeIngredient: data.activeIngredient.trim() || undefined,
    dosage: data.dosage.trim() || undefined,
    packaging: data.packaging.trim() || undefined,
    prescriptionRequired: data.prescriptionRequired,
    featured: data.featured,
  };
};

export const WarehouseProducts: React.FC = () => {
  const { products: items, categories, loading, error, createProduct, updateProduct, deleteProduct } = useProducts();
  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const dashboardCategories = useMemo(() => {
    return Array.from(
      new Set([...PRODUCT_CATEGORIES.filter((category) => category !== "All Products"), ...categories.filter((category) => category !== "All Products")])
    );
  }, [categories]);

  const handleCreate = async (data: ProductFormData) => {
    await createProduct(buildProductRequest(data));
    toast.success("Produsul a fost creat in baza de date.");
    setCreateOpen(false);
  };

  const handleEdit = async (data: ProductFormData) => {
    if (!editing) return;
    await updateProduct(editing.id, buildProductRequest(data));
    toast.success("Produsul a fost actualizat in baza de date.");
    setEditing(null);
  };

  const handleDelete = async (product: Product) => {
    if (!window.confirm(`Delete product ${product.name}?`)) return;
    await deleteProduct(product.id);
    toast.success("Produsul a fost sters din baza de date.");
  };

  const summary = useMemo(() => {
    const inStock = items.filter((product) => product.inStock).length;
    const lowStock = items.filter((product) => product.stockQuantity > 0 && product.stockQuantity <= 50).length;
    const featured = items.filter((product) => product.featured).length;

    return {
      total: items.length,
      inStock,
      lowStock,
      featured,
    };
  }, [items]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="rounded-3xl bg-linear-to-r from-slate-950 via-cyan-900 to-emerald-700 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-100">Warehouse Products</p>
            <h2 className="mt-3 text-3xl font-bold">Manage the product catalog used by the warehouse team</h2>
            <p className="mt-3 text-sm text-slate-200">
              Add new SKUs, update stock-facing details and remove obsolete products from the local warehouse catalog.
            </p>
          </div>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100"
          >
            <PackagePlus className="h-4 w-4" />
            Add product
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm text-slate-500">Total products</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{summary.total}</div>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm text-slate-500">In stock</div>
          <div className="mt-2 text-2xl font-bold text-emerald-700">{summary.inStock}</div>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm text-slate-500">Low stock</div>
          <div className="mt-2 text-2xl font-bold text-amber-700">{summary.lowStock}</div>
        </article>
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="text-sm text-slate-500">Featured</div>
          <div className="mt-2 text-2xl font-bold text-cyan-700">{summary.featured}</div>
        </article>
      </section>

      <section className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="border-b border-slate-200 px-6 py-4">
          <h3 className="text-xl font-semibold text-slate-900">Product list</h3>
          <p className="mt-1 text-sm text-slate-500">Changes are saved through the backend API in SQL Server.</p>
        </div>

        {loading ? (
          <div className="px-6 py-4 text-sm text-slate-500">Loading products from database...</div>
        ) : null}

        {error ? (
          <div className="px-6 py-4 text-sm text-rose-700">{error}</div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Manufacturer</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Flags</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product.id} className="border-t border-slate-200 align-top">
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <img src={product.image} alt={product.name} className="h-14 w-14 rounded-2xl object-cover ring-1 ring-slate-200" />
                      <div>
                        <div className="font-semibold text-slate-900">{product.name}</div>
                        <div className="mt-1 max-w-md text-xs text-slate-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-700">{product.category}</td>
                  <td className="px-4 py-4 text-slate-700">{product.manufacturer}</td>
                  <td className="px-4 py-4 font-semibold text-slate-900">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${product.inStock ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                      {product.stockQuantity} units
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {product.prescriptionRequired ? (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Rx</span>
                      ) : (
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">OTC</span>
                      )}
                      {product.featured ? (
                        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">Featured</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(product)}
                        className="rounded-xl border border-slate-200 p-2 text-cyan-700 hover:bg-cyan-50"
                        title="Edit product"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="rounded-xl border border-slate-200 p-2 text-rose-700 hover:bg-rose-50"
                        title="Delete product"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-slate-500">
                    No products available.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <ProductFormModal
        isOpen={createOpen}
        title="Add product"
        categories={dashboardCategories}
        onClose={() => setCreateOpen(false)}
        onSave={handleCreate}
      />

      <ProductFormModal
        isOpen={Boolean(editing)}
        title="Edit product"
        categories={dashboardCategories}
        initial={editing ? mapToForm(editing) : undefined}
        onClose={() => setEditing(null)}
        onSave={handleEdit}
      />
    </div>
  );
};
