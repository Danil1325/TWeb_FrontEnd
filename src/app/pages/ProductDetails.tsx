import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Package, AlertCircle, CheckCircle, Truck } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products" className="text-blue-600 hover:text-blue-700">
          Browse All Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
    toast.success(`${quantity} x ${product.name} added to cart`);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
        <span className="text-gray-400">/</span>
        <Link to="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-blue-600 font-semibold mb-2">{product.category}</div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl font-bold text-blue-600">${product.price}</div>
            {product.prescriptionRequired && (
              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded text-sm font-semibold">
                Prescription Required
              </span>
            )}
          </div>

          <div className={`flex items-center gap-2 mb-6 p-4 rounded-lg ${product.inStock ? 'bg-green-50' : 'bg-red-50'}`}>
            {product.inStock ? (
              <>
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-semibold">
                  In Stock - {product.stockQuantity} units available
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700 font-semibold">Out of Stock</span>
              </>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{product.fullDescription}</p>
          </div>

          {/* Specifications */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4">Product Specifications</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-600">Manufacturer</dt>
                <dd className="font-semibold">{product.manufacturer}</dd>
              </div>
              {product.activeIngredient && (
                <div>
                  <dt className="text-sm text-gray-600">Active Ingredient</dt>
                  <dd className="font-semibold">{product.activeIngredient}</dd>
                </div>
              )}
              {product.dosage && (
                <div>
                  <dt className="text-sm text-gray-600">Dosage</dt>
                  <dd className="font-semibold">{product.dosage}</dd>
                </div>
              )}
              {product.packaging && (
                <div>
                  <dt className="text-sm text-gray-600">Packaging</dt>
                  <dd className="font-semibold">{product.packaging}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm text-gray-600">Category</dt>
                <dd className="font-semibold">{product.category}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-600">Prescription</dt>
                <dd className="font-semibold">{product.prescriptionRequired ? 'Required' : 'Not Required (OTC)'}</dd>
              </div>
            </dl>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="border-t pt-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stockQuantity}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border-x border-gray-300 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex-1 w-full sm:w-auto">
                <label className="block text-sm text-gray-600 mb-2">&nbsp;</label>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="w-full px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 flex items-start gap-3">
              <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold text-blue-900">Fast Delivery</p>
                <p className="text-blue-700">Same-day shipping for orders placed before 2 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relProduct => (
              <Link
                key={relProduct.id}
                to={`/product/${relProduct.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{relProduct.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">${relProduct.price}</span>
                    <span className={`text-xs px-2 py-1 rounded ${relProduct.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {relProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
