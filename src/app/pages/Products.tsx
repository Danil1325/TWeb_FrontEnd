import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data/products';
import { ProductCard } from '../Components/ProductCard';

export const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Products');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [showFilters, setShowFilters] = useState(false);
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [prescriptionFilter, setPrescriptionFilter] = useState<'all' | 'required' | 'notRequired'>('all');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
      const matchesStock = stockFilter === 'all' || 
                          (stockFilter === 'inStock' && product.inStock) ||
                          (stockFilter === 'outOfStock' && !product.inStock);
      const matchesPrescription = prescriptionFilter === 'all' ||
                                 (prescriptionFilter === 'required' && product.prescriptionRequired) ||
                                 (prescriptionFilter === 'notRequired' && !product.prescriptionRequired);
      
      return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesPrescription;
    });
  }, [searchTerm, selectedCategory, priceRange, stockFilter, prescriptionFilter]);

  const handleAddToCart = (product: typeof products[0]) => {
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Catalog</h1>
        <p className="text-gray-600">Browse our comprehensive range of pharmaceutical products</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:w-auto px-6 py-3 bg-gray-100 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-200"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2 mb-6">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded ${
                    selectedCategory === category
                      ? 'bg-indigo-500 text-white font-semibold'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <h3 className="font-semibold mb-4">Price Range</h3>
            <div className="mb-6">
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>${priceRange.min}</span>
                <span>${priceRange.max}</span>
              </div>
            </div>

            <h3 className="font-semibold mb-4">Availability</h3>
            <div className="space-y-2 mb-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stock"
                  checked={stockFilter === 'all'}
                  onChange={() => setStockFilter('all')}
                  className="mr-2"
                />
                All Products
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stock"
                  checked={stockFilter === 'inStock'}
                  onChange={() => setStockFilter('inStock')}
                  className="mr-2"
                />
                In Stock Only
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="stock"
                  checked={stockFilter === 'outOfStock'}
                  onChange={() => setStockFilter('outOfStock')}
                  className="mr-2"
                />
                Out of Stock
              </label>
            </div>

            <h3 className="font-semibold mb-4">Prescription</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="prescription"
                  checked={prescriptionFilter === 'all'}
                  onChange={() => setPrescriptionFilter('all')}
                  className="mr-2"
                />
                All
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="prescription"
                  checked={prescriptionFilter === 'required'}
                  onChange={() => setPrescriptionFilter('required')}
                  className="mr-2"
                />
                Prescription Required
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="prescription"
                  checked={prescriptionFilter === 'notRequired'}
                  onChange={() => setPrescriptionFilter('notRequired')}
                  className="mr-2"
                />
                OTC (No Prescription)
              </label>
            </div>
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                showActions
                stockVariant="quantity"
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Products');
                  setPriceRange({ min: 0, max: 100 });
                  setStockFilter('all');
                  setPrescriptionFilter('all');
                }}
                className="mt-4 text-indigo-500 hover:text-indigo-500"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
