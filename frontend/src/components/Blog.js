import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Calendar, ArrowLeft, MessageCircle } from 'lucide-react';

const SEO_BLOGS = [
  {
    id: 1,
    title: "5 Mistakes to Avoid When Planning a Wedding Reception in Kolkata",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "Organizing a Biye Bari in the heart of Kolkata comes with unique challenges. Learn how to navigate venues, weather, and catering head-counts flawlessly.",
    content: `
      <h2>The Pressure of the Perfect Biye Bari</h2>
      <p>When organizing a Bengali wedding ceremony in Kolkata or Howrah, the expectations are astronomically high—primarily regarding the food. Often, families make critical early mistakes that result in unnecessary stress on the day of the reception.</p>
      
      <h3>1. Underestimating the "Kolkata Winter" Rush</h3>
      <p>Between November and February, premium catering services in Kolkata and Howrah book out months in advance. Many families wait until their venue is locked before speaking to a caterer. The mistake? The best catering teams, like the passionate chefs at Rannaghar Caterer, prioritize quality over volume and take limited bookings.</p>

      <h3>2. Getting the Fish Count Wrong</h3>
      <p>Whether it's Bhetki Fish Fry or Paturi, Bengali guests evaluate a wedding by the quality and availability of the fish. Always estimate a 15% surplus on premium fish items to ensure the latecomers aren't left disappointed.</p>

      <h3>3. Ignoring Hyperlocal Venue Restrictions</h3>
      <p>Many heritage venues in North Kolkata or tight banquet halls in Howrah have severe restrictions on live-fire cooking. Always confirm with your caterer if they are equipped for off-site prep that tastes just as fresh as a live counter.</p>

      <h3>4. Forgetting the "Adda" Factor</h3>
      <p>Bengali weddings stretch late into the night. Ensure your catering package includes secondary rounds of cha (tea) and coffee alongside late-night snacks for the closest family members who stay back.</p>

      <h3>5. Hiring a "Factory" Caterer</h3>
      <p>Massive corporate catering services often freeze their base gravies to handle 10 weddings a night. To secure the authentic, hand-ground spice flavors of a true Bengali feast, always seek out dedicated, passionate, localized teams who cook fresh on-site.</p>
    `
  },
  {
    id: 2,
    title: "Decoding the Perfect Bengali Biye Bari Menu (With Pricing Advice)",
    date: "2024-03-20",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "What exactly makes a Bengali wedding menu unforgettable? We break down the absolute must-have dishes and how to balance your catering budget in Kolkata.",
    content: `
      <h2>The Anatomy of a Bengali Feast</h2>
      <p>The heart of every successful celebration in Kolkata and Howrah is the menu. A proper Bengali wedding feast is a carefully orchestrated symphony of flavors, moving from subtle bitterness to rich spices, ending in overwhelming sweetness.</p>

      <h3>The Starters: Setting the Tone</h3>
      <p>Before the main course begins, the live counters dominate. A standard expectation today includes a highly active Mocktail Bar, accompanied by live Chicken Reshmi Kebab skewers and the absolute non-negotiable: the crumb-coated Bhetki Fish Fry served with kasundi.</p>

      <h3>The Main Course: A Celebration of Richness</h3>
      <p>While experimental cuisines are fun, traditional Biye Bari menus still reign supreme in Howrah. The perfect flow includes:</p>
      <ul>
        <li><strong>Radhaballavi and Cholar Dal:</strong> The perfect gentle introduction.</li>
        <li><strong>Bhetki Paturi:</strong> Fish meticulously marinated in mustard and green chili paste, steamed inside a banana leaf.</li>
        <li><strong>Basanti Pulao and Mutton Kosha:</strong> The crowning jewel. The mutton must be slow-cooked until it falls off the bone, rich with dark, caramelized onion gravy.</li>
      </ul>

      <h3>Pricing Expectations in Kolkata</h3>
      <p>A premium plate featuring authentic Bhetki and high-grade Mutton in Kolkata typically dictates a higher budget. When assessing catering prices, remember that you are paying for the quality of the raw ingredients. Discounted catering almost always means compromised fish or heavily tenderized, low-grade meat. Choose a passionate team like Rannaghar Caterer who refuses to cut corners on the raw market buys.</p>
    `
  },
  {
    id: 3,
    title: "Why Bhetki Paturi is the Star of Every Howrah Celebration",
    date: "2024-04-02",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    excerpt: "Discover the cultural prestige behind Kolkata's most beloved fish preparation, and why it remains the ultimate test of a caterer's skill.",
    content: `
      <h2>The Ultimate Test of a Bengali Caterer</h2>
      <p>There are few dishes wrapped in as much cultural prestige as the authentic Bhetki Paturi. If you are hiring a catering service in Kolkata or Howrah, their ability to execute this single dish perfectly is the ultimate litmus test for their culinary pedigree.</p>

      <h3>The Mustard Magic</h3>
      <p>The secret lies in the marinade. A perfect Paturi relies on a highly calculated ratio of black and yellow mustard seeds (shorshe), poppy seeds (posto), and a potent splash of pungent raw mustard oil. Too much black mustard, and the dish turns undeniably bitter. Too little raw oil, and it loses its iconic 'kick' that clears the sinuses.</p>

      <h3>The Banana Leaf Envelope</h3>
      <p>Steaming the fish inside a charred banana leaf isn't just for ceremonial presentation. The leaf itself imparts a subtle, earthy, sweet aroma into the fish as it cooks, sealing the moisture perfectly inside so the Bhetki melts the moment it touches the tongue.</p>

      <h3>Why Freshness is Non-Negotiable</h3>
      <p>Frozen Bhetki dramatically alters the texture of a Paturi, making it stiff and rubbery. This is why authentic, passionate local teams like Rannaghar Caterer prioritize early-morning fresh market sourcing. When the strings are untied at the dinner table and the steam wafts up, your guests will instantly know if you hired a premium caterer.</p>
    `
  }
];

const Blog = () => {
  const [activeArticle, setActiveArticle] = useState(null);

  const handleWhatsApp = () => {
    window.open('https://wa.me/919831924872', '_blank');
  };

  return (
    <div className="blog-page p-6 max-w-7xl mx-auto min-h-[90vh]">
      <AnimatePresence mode="wait">
        {!activeArticle ? (
          <motion.div
            key="blog-grid"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <header className="mb-12 text-center pt-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Event Planning & Culinary Insights</h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">Expert advice on planning unforgettable weddings, birthdays, and celebrations across Kolkata and Howrah.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {SEO_BLOGS.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveArticle(blog)}
                  className="blog-card flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
                >
                  <div className="aspect-[16/9] overflow-hidden relative">
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-sm text-orange-600 font-medium mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{blog.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">
                      {blog.excerpt}
                    </p>
                    <div className="mt-auto">
                      <span className="text-orange-600 font-semibold text-sm inline-flex items-center gap-1">
                        Read Full Article 
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="article-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden my-8"
          >
            {/* Back Button */}
            <div className="p-6 pb-0">
              <button 
                onClick={() => setActiveArticle(null)}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-medium px-4 py-2 rounded-full hover:bg-orange-50"
              >
                <ArrowLeft size={20} />
                Back to Articles
              </button>
            </div>

            {/* Article Header */}
            <div className="p-8 md:p-12 pb-6">
              <div className="flex items-center gap-2 text-sm text-orange-600 font-medium mb-6">
                <Calendar className="w-4 h-4" />
                <span>{activeArticle.date}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                {activeArticle.title}
              </h1>
            </div>

            {/* Hero Image */}
            <div className="w-full aspect-[21/9] max-h-[500px] overflow-hidden bg-gray-100">
               <img src={activeArticle.image} alt={activeArticle.title} className="w-full h-full object-cover" />
            </div>

            {/* Article Content */}
            <div className="p-8 md:p-12">
               <div 
                 className="prose prose-lg prose-orange max-w-none text-gray-700
                            prose-h2:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-xl prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-8 prose-h3:mb-4
                            prose-p:leading-relaxed prose-p:mb-6
                            prose-li:my-2 prose-ul:mb-6"
                 dangerouslySetInnerHTML={{ __html: activeArticle.content }} 
               />
               
               {/* Extremely High Converting Call To Action for SEO reading flow */}
               <div className="mt-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 md:p-12 text-center border border-orange-100 shadow-inner">
                 <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Planning Your Own Event?</h3>
                 <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                   Don't risk your special day with factory caterers. Hire a passionate local team dedicated to authentic Kolkata and Howrah culinary perfection.
                 </p>
                 <button 
                   onClick={handleWhatsApp}
                   className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                 >
                   <MessageCircle size={24} />
                   WhatsApp Rannaghar Caterer
                 </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Blog;
