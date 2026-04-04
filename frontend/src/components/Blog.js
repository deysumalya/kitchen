import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Loader2 } from 'lucide-react';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/blogs`);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [BACKEND_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="blog-page p-6 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">The Rannaghar Blog</h1>
        <p className="text-gray-600">Recipes, stories, and updates from our kitchen.</p>
      </header>

      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <BookOpen className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No blog posts yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="blog-card overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100"
            >
              {blog.image_url && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(blog.created_at).toLocaleDateString()}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-orange-600 transition-colors cursor-pointer line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-3 overflow-hidden">
                  {blog.content}
                </p>
                <div className="mt-auto">
                  <button className="text-orange-600 font-semibold text-sm inline-flex items-center gap-1 group">
                    Read More 
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blog;
