// @ts-ignore
import React, { SetStateAction, useState} from 'react';
import {Link} from 'react-router-dom';
import {Calendar, User, Clock, Search, ArrowRight} from 'lucide-react';
import {blogPosts} from '../data/blog';

const Blog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Healthcare', 'Operations', 'Regulations', 'Technology', 'Compliance', 'Seasonal'];

    const filteredPosts = blogPosts.filter(post => {
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        const matchesSearch = !(!post.title.toLowerCase().includes(searchTerm.toLowerCase()) && !post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredPost = blogPosts[0];

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">PharmaWarehouse Blog</h1>
                <p className="text-xl text-gray-600">
                    Industry insights, updates, and educational resources for pharmacy professionals
                </p>
            </div>

            {/* Search */}
            <div className="mb-8 max-w-2xl mx-auto">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"/>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e: { target: { value: SetStateAction<string>; }; }) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              selectedCategory === category
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Post */}
      {selectedCategory === 'All' && !searchTerm && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Featured Article</h2>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4 self-start">
                  {featuredPost.category}
                </div>
                <h3 className="text-2xl font-bold mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {featuredPost.readTime}
                  </div>
                </div>
                <Link
                  to={`/blog/${featuredPost.id}`}
                  className="inline-flex items-center gap-2 text-indigo-500 font-semibold hover:text-indigo-500"
                >
                  Read Article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="inline-block bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 self-start">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4" />
                    {post.author}
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-indigo-500 font-semibold hover:text-indigo-500 flex items-center gap-1"
                  >
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg mb-2">No articles found</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-indigo-500 hover:text-indigo-500"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-16 bg-gradient-to-r from-indigo-500 to-indigo-500 rounded-lg p-12 text-center text-white">
        <h2 className="text-3xl text-white font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
          Get the latest industry insights, updates, and exclusive content delivered to your inbox.
        </p>
        <form className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-lg bg-transparent border-2 border-white text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white text-indigo-500 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-500 hover:text-white transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};
export default Blog
