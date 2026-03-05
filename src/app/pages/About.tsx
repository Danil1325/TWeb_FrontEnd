// @ts-ignore
import React from 'react';
import { Award, Users, Target, Heart, Shield, Zap, Globe, TrendingUp } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div>
    
      <div className="m-4 rounded-lg overflow-hidden bg-gradient-to-r from-indigo-500 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About PharmaWarehouse</h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Your trusted partner in pharmaceutical distribution, serving pharmacies nationwide with quality products and exceptional service since 1995.
          </p>
        </div>
      </div>

 
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-2 hover:border-indigo-500 rounded-lg p-8 transition">
            <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              To provide pharmacies across the country with reliable access to high-quality pharmaceutical products, 
              ensuring that communities receive the medications they need when they need them. We are committed to 
              excellence in service, integrity in business, and innovation in distribution.
            </p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 hover:border-indigo-500 transition">
            <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted and innovative pharmaceutical distributor in the nation, setting the standard 
              for quality, reliability, and customer service. We envision a healthcare system where every pharmacy 
              has seamless access to the products they need to serve their communities effectively.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Founded in 1995, PharmaWarehouse began as a small regional distributor with a simple mission: 
                to provide local pharmacies with reliable access to quality pharmaceutical products. Over the past 
                three decades, we've grown into a nationwide leader in pharmaceutical distribution, serving over 
                10,000 pharmacies across the country.
              </p>
              <p>
                Our growth has been driven by our unwavering commitment to our customers and our dedication to 
                excellence in every aspect of our business. We've invested heavily in state-of-the-art warehousing 
                and logistics technology to ensure that every order is processed accurately and delivered on time.
              </p>
              <p>
                Today, PharmaWarehouse is proud to be a trusted partner to pharmacies of all sizes, from independent 
                community pharmacies to large regional chains. We continue to innovate and expand our services while 
                maintaining the personalized customer service that has been our hallmark since day one.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-indigo-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Quality</h3>
            <p className="text-gray-600">
              We source only from certified manufacturers and maintain rigorous quality control standards.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Service</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We're here to support your success.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Innovation</h3>
            <p className="text-gray-600">
              We continuously invest in technology to improve efficiency and service delivery.
            </p>
          </div>

          <div className="text-center">
            <div className="bg-indigo-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Integrity</h3>
            <p className="text-gray-600">
              We conduct business with honesty, transparency, and ethical practices at all times.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-indigo-300 py-16 m-4 rounded-lg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">By the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">30+</div>
              <div className="text-white">Years in Business</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">10,000+</div>
              <div className="text-white">Partner Pharmacies</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">5,000+</div>
              <div className="text-white">Products Available</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">99.9%</div>
              <div className="text-white">On-Time Delivery</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose PharmaWarehouse?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <Globe className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Nationwide Coverage</h3>
            <p className="text-gray-600">
              Multiple distribution centers ensure fast delivery to pharmacies in all 50 states.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <TrendingUp className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Competitive Pricing</h3>
            <p className="text-gray-600">
              Volume purchasing power allows us to offer competitive prices without compromising quality.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <Users className="w-12 h-12 text-indigo-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
            <p className="text-gray-600">
              Dedicated account managers and 24/7 customer support to assist with all your needs.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Certifications & Compliance</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-700 mb-6 leading-relaxed">
                PharmaWarehouse is fully licensed and certified to distribute pharmaceutical products nationwide. 
                We maintain strict compliance with all federal and state regulations governing pharmaceutical distribution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">FDA Registered</h4>
                    <p className="text-sm text-gray-600">Registered with the U.S. Food and Drug Administration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">DEA Licensed</h4>
                    <p className="text-sm text-gray-600">Licensed by the Drug Enforcement Administration</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">VAWD Accredited</h4>
                    <p className="text-sm text-gray-600">Verified-Accredited Wholesale Distributors</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">ISO Certified</h4>
                    <p className="text-sm text-gray-600">ISO 9001:2015 Quality Management System</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Partner with Us?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of pharmacies that trust PharmaWarehouse for their pharmaceutical supply needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-indigo-500 px-8 py-3 rounded-lg border-2 border-white font-semibold hover:bg-indigo-500 hover:text-white transition inline-block"
            >
              Register Your Pharmacy
            </a>
            <a
              href="/support"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-500 transition inline-block"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
