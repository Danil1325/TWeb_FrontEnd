import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, HelpCircle, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'To place an order, browse our products, add items to your cart, and proceed to checkout. You will need to be logged in with a verified pharmacy account.'
  },
  {
    question: 'What are your delivery times?',
    answer: 'We offer standard delivery (3-5 business days) and express delivery (1-2 business days). Orders placed before 2 PM are shipped the same day.'
  },
  {
    question: 'Do you require a prescription for all products?',
    answer: 'No, we carry both prescription and over-the-counter (OTC) products. Prescription medications are clearly marked and require proper documentation.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept credit/debit cards and offer Net 30 invoice payment terms for verified pharmacy accounts.'
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order ships, you will receive a tracking number via email. You can also view tracking information in your account dashboard.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days for unopened products in original packaging. See our full return policy for details.'
  },
  {
    question: 'How do I become a verified pharmacy partner?',
    answer: 'Register your pharmacy with your license information. Our team will verify your credentials within 24-48 hours.'
  },
  {
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer volume discounts for bulk orders. Contact our sales team for custom pricing.'
  }
];

export const Support: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit: NonNullable<React.ComponentProps<'form'>['onSubmit']> = (e) => {
    e.preventDefault();
    toast.success('Message sent! Our support team will contact you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How Can We Help You?</h1>
        <p className="text-xl text-gray-600">Get support from our expert team</p>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white border-2 border-indigo-500 rounded-lg p-6 text-center">
          <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Call Us</h3>
          <p className="text-gray-600 mb-3">Speak with our support team</p>
          <a href="tel:1-800-PHARMA" className="text-indigo-500 font-semibold text-lg">
            1-800-PHARMA
          </a>
          <p className="text-sm text-gray-500 mt-2">Mon-Fri: 8 AM - 8 PM</p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-indigo-500 transition">
          <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Email Us</h3>
          <p className="text-gray-600 mb-3">Send us your questions</p>
          <a href="mailto:support@pharmawarehouse.com" className="text-indigo-500 font-semibold">
            support@pharmawarehouse.com
          </a>
          <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
        </div>

        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-indigo-500 transition">
          <div className="bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
          <p className="text-gray-600 mb-3">Chat with us now</p>
          <button className="text-indigo-500 font-semibold">
            Start Chat
          </button>
          <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-6 h-6 text-indigo-500" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="mb-6">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <details key={index} className="group border border-gray-200 rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-50 flex justify-between items-center">
                    {faq.question}
                    <span className="text-indigo-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No FAQs found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Tell us more..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-500 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Business Hours */}
      <div className="mt-12 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-8 h-8" />
          <h2 className="text-2xl font-bold">Business Hours</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <div>
            <p className="font-semibold mb-2">Customer Support</p>
            <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
            <p>Saturday - Sunday: 9:00 AM - 5:00 PM</p>
          </div>
          <div>
            <p className="font-semibold mb-2">Order Processing</p>
            <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
            <p>Saturday: 9:00 AM - 2:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
