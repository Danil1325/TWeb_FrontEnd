// @ts-ignore
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { ArrowRight, Shield, Truck, Clock, Award, Package } from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../Components/ProductCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const Home: React.FC = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 6);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000
  };
  const featuredSliderSettings = {
    dots: true,
    infinite: featuredProducts.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <div className="overflow-x-hidden">
      <div className="m-4 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-4xl overflow-hidden">
        <Slider {...sliderSettings}>
          <div>
            <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Your Trusted Pharmaceutical Partner
                </h2>
                <p className="text-xl text-white mb-8">
                  Quality medications delivered to pharmacies nationwide with guaranteed reliability and exceptional service.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3 rounded-lg border-1 border-white font-semibold hover:bg-white hover:text-indigo-500 transition"
                >
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
          
          <div>
            <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Fast & Reliable Delivery
                </h2>
                <p className="text-xl text-white mb-8">
                  Same-day shipping on orders placed before 2 PM. Get your pharmaceutical supplies when you need them.
                </p>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3 rounded-lg border-1 border-white font-semibold hover:bg-white hover:text-indigo-500 transition"
                >
                  Register Your Pharmacy
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Special Offers This Month
                </h2>
                <p className="text-xl text-white mb-8">
                  Save up to 25% on select products. Exclusive deals for registered pharmacies.
                </p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-3 rounded-lg border-1 border-white font-semibold hover:bg-white hover:text-indigo-500 transition"
                >
                  View Offers
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </Slider>
      </div>

    
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Quality Assured</h3>
            <p className="text-sm text-gray-600">All products from certified manufacturers</p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">Same-day shipping available</p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p className="text-sm text-gray-600">Always here to help you</p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Licensed Distributor</h3>
            <p className="text-sm text-gray-600">Fully certified and compliant</p>
          </div>
        </div>
      </div>


      <div className="bg-transparent py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-2">Popular pharmaceutical products for your pharmacy</p>
            </div>
            <Link to="/products" className="text-indigo-500 hover:text-indigo-500 flex items-center gap-1">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <Slider {...featuredSliderSettings}>
            {featuredProducts.map(product => (
              <div key={product.id} className="px-2 pb-2 h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Antibiotics', 'Pain Relief', 'Cardiovascular', 'Diabetes Care', 'Respiratory', 'Dermatology', 'Vitamins & Supplements', 'Medical Devices', 'First Aid'].map(category => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:border-indigo-500 hover:shadow-md transition"
            >
              <Package className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-base">{category}</h3>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 py-16 m-4 rounded-lg overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-white mb-8">
            Join thousands of pharmacies nationwide that trust PharmaWarehouse for their pharmaceutical supply needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-transparent text-white px-8 py-3 rounded-lg border-2 border-white font-semibold hover:bg-white hover:text-indigo-500 transition"
            >
              Register Your Pharmacy
            </Link>
            <Link
              to="/support"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-500 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-indigo-500 mb-2">5,000+</div>
            <div className="text-gray-600">Products Available</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-500 mb-2">10,000+</div>
            <div className="text-gray-600">Partner Pharmacies</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-500 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-indigo-500 mb-2">99.9%</div>
            <div className="text-gray-600">On-Time Delivery</div>
          </div>
        </div>
        </div>
      </div>
  );
};

