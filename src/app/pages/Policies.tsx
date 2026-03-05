// @ts-ignore
// noinspection HtmlUnknownAnchorTarget

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Shield, RefreshCw, FileText, Lock } from 'lucide-react';

export const Policies: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // noinspection HtmlUnknownAnchorTarget
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Policies & Legal Information</h1>
        <p className="text-xl text-gray-600">
          Please review our policies regarding returns, privacy, and terms of service
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <a
          href="#return-policy"
          className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition flex items-start gap-4"
        >
          <div className="bg-indigo-500 p-3 rounded-lg">
            <RefreshCw className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Return Policy</h3>
            <p className="text-gray-600 text-sm">Learn about our product return and refund procedures</p>
          </div>
        </a>

        <a
          href="#privacy"
          className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition flex items-start gap-4"
        >
          <div className="bg-indigo-500 p-3 rounded-lg">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Privacy Policy</h3>
            <p className="text-gray-600 text-sm">How we collect, use, and protect your data</p>
          </div>
        </a>

        <a
          href="#terms"
          className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition flex items-start gap-4"
        >
          <div className="bg-indigo-500 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Terms of Service</h3>
            <p className="text-gray-600 text-sm">Terms and conditions for using our services</p>
          </div>
        </a>

        <a
          href="#compliance"
          className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-indigo-500 transition flex items-start gap-4"
        >
          <div className="bg-indigo-500 p-3 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">Compliance</h3>
            <p className="text-gray-600 text-sm">Regulatory compliance and certifications</p>
          </div>
        </a>
      </div>

      {/* Return Policy */}
      <section id="return-policy" className="mb-16 scroll-mt-24">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <RefreshCw className="w-8 h-8 text-indigo-500" />
            <h2 className="text-3xl font-bold">Return Policy</h2>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Last Updated: February 25, 2026
            </p>

            <h3 className="text-xl font-semibold mb-4">Return Eligibility</h3>
            <p className="mb-4">
              PharmaWarehouse accepts returns of pharmaceutical products under the following conditions:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Products must be returned within 30 days of delivery</li>
              <li>Products must be unopened and in original packaging</li>
              <li>Products must not be expired or within 6 months of expiration</li>
              <li>Temperature-sensitive products must have been stored properly</li>
              <li>A return authorization number must be obtained prior to return</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Non-Returnable Items</h3>
            <p className="mb-4">
              The following items cannot be returned:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Opened or used products</li>
              <li>Controlled substances (Schedule II-V medications)</li>
              <li>Cold chain products that were not maintained at proper temperature</li>
              <li>Custom-ordered or special-order products</li>
              <li>Products past their expiration date</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Return Process</h3>
            <ol className="list-decimal pl-6 mb-6 space-y-3">
              <li>Contact our customer service team at 1-800-PHARMA or support@pharmawarehouse.com</li>
              <li>Provide your order number and reason for return</li>
              <li>Receive a Return Authorization (RA) number</li>
              <li>Package items securely with RA number clearly visible</li>
              <li>Ship to the address provided by customer service</li>
            </ol>

            <h3 className="text-xl font-semibold mb-4">Refunds</h3>
            <p className="mb-4">
              Once we receive and inspect your return:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Approved returns will be credited within 5-7 business days</li>
              <li>Refunds will be issued to the original payment method</li>
              <li>Shipping costs are non-refundable unless the return is due to our error</li>
              <li>A 15% restocking fee may apply to certain returns</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Damaged or Defective Products</h3>
            <p className="mb-4">
              If you receive damaged or defective products:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Notify us within 48 hours of delivery</li>
              <li>Provide photos of damaged items and packaging</li>
              <li>We will arrange for immediate replacement at no cost</li>
              <li>Return shipping will be prepaid by PharmaWarehouse</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="mb-16 scroll-mt-24">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-8 h-8 text-indigo-500" />
            <h2 className="text-3xl font-bold">Privacy Policy</h2>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Last Updated: February 25, 2026
            </p>

            <h3 className="text-xl font-semibold mb-4">Information We Collect</h3>
            <p className="mb-4">
              We collect the following types of information:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Account Information:</strong> Name, email, phone number, pharmacy license details</li>
              <li><strong>Business Information:</strong> Pharmacy name, address, DEA number, state licenses</li>
              <li><strong>Order Information:</strong> Products ordered, quantities, delivery addresses</li>
              <li><strong>Payment Information:</strong> Billing address, payment method details</li>
              <li><strong>Usage Data:</strong> Website interactions, browsing patterns, device information</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">How We Use Your Information</h3>
            <p className="mb-4">
              Your information is used to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Process and fulfill your orders</li>
              <li>Verify pharmacy credentials and licenses</li>
              <li>Communicate about orders, products, and services</li>
              <li>Improve our website and services</li>
              <li>Comply with legal and regulatory requirements</li>
              <li>Detect and prevent fraud</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Information Sharing</h3>
            <p className="mb-4">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Service providers who assist with order fulfillment and shipping</li>
              <li>Payment processors for transaction processing</li>
              <li>Regulatory authorities as required by law</li>
              <li>Law enforcement when legally required</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Data Security</h3>
            <p className="mb-4">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>SSL encryption for all data transmission</li>
              <li>Secure data storage with regular backups</li>
              <li>Access controls and authentication</li>
              <li>Regular security audits and monitoring</li>
              <li>Employee training on data protection</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Your Rights</h3>
            <p className="mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Cookies and Tracking</h3>
            <p className="mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Maintain your session and login status</li>
              <li>Remember your preferences</li>
              <li>Analyze website usage and performance</li>
              <li>Personalize your experience</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">
              For privacy-related questions or to exercise your rights:
            </p>
            <p className="mb-2">Email: privacy@pharmawarehouse.com</p>
            <p className="mb-2">Phone: 1-800-PHARMA</p>
            <p>Mail: PharmaWarehouse Privacy Office, 1234 Medical Plaza, Suite 500, Healthcare City, HC 12345</p>
          </div>
        </div>
      </section>

      {/* Terms of Service */}
      <section id="terms" className="mb-16 scroll-mt-24">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-indigo-500" />
            <h2 className="text-3xl font-bold">Terms of Service</h2>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              Last Updated: February 25, 2026
            </p>

            <h3 className="text-xl font-semibold mb-4">Account Registration</h3>
            <p className="mb-4">
              To use our services, you must:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Be a licensed pharmacy or authorized healthcare facility</li>
              <li>Provide accurate and current information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Product Orders</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>All orders are subject to product availability</li>
              <li>Prices are subject to change without notice</li>
              <li>We reserve the right to limit quantities</li>
              <li>Prescription products require valid documentation</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Payment Terms</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Payment is due upon order placement or as agreed</li>
              <li>Net 30 terms available for approved accounts</li>
              <li>Late payments may incur fees and account suspension</li>
              <li>We reserve the right to require prepayment</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Limitation of Liability</h3>
            <p className="mb-6">
              PharmaWarehouse is not liable for indirect, incidental, or consequential damages arising from use of our services or products.
            </p>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="mb-16 scroll-mt-24">
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-indigo-500" />
            <h2 className="text-3xl font-bold">Regulatory Compliance</h2>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 mb-6">
              PharmaWarehouse maintains full compliance with all applicable federal and state regulations governing pharmaceutical distribution.
            </p>

            <h3 className="text-xl font-semibold mb-4">Certifications</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>FDA Registration Number: 1234567890</li>
              <li>DEA Registration Number: RP1234567</li>
              <li>VAWD Accreditation: Current and Active</li>
              <li>ISO 9001:2015 Certified</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Regulatory Standards</h3>
            <p className="mb-4">
              We adhere to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Drug Supply Chain Security Act (DSCSA)</li>
              <li>Good Distribution Practice (GDP) guidelines</li>
              <li>State Board of Pharmacy regulations in all 50 states</li>
              <li>DEA regulations for controlled substances</li>
            </ul>

            <h3 className="text-xl font-semibold mb-4">Product Authenticity</h3>
            <p className="mb-6">
              All products are sourced directly from manufacturers or authorized distributors. We maintain full chain of custody documentation and product traceability.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Questions About Our Policies?</h2>
        <p className="text-white mb-6">
          Our team is here to help answer any questions you may have.
        </p>
        <a
          href="/support"
          className="inline-block bg-white text-indigo-500 px-8 py-3 rounded-lg border-2 border-white font-semibold hover:bg-indigo-500 hover:text-white transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};
