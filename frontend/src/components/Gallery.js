import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  // Hardcoded SEO Gallery Array to bypass the unstable backend
  const galleryImages = [
    {
      id: 1,
      url: '/gallery/indoor_setup.jpg',
      caption: 'Grand Bengali Wedding Reception Setup at a Premium Banquet in Shibpur, Howrah - Featuring our signature Buffet Line.'
    },
    {
      id: 2,
      url: '/gallery/outdoor_setup.jpg',
      caption: 'Vibrant Outdoor Sangeet & Mehendi Catering Setup under the Kolkata night sky, complete with illuminated draping.'
    },
    {
      id: 3,
      url: '/gallery/kebabs.jpg',
      caption: 'Live Charcoal Kebab Station: Fresh, sizzling Chicken Reshmi Kebabs prepared live for a 500-Guest Corporate Event.'
    },
    {
      id: 4,
      url: '/gallery/mutton_korma.jpg',
      caption: 'Our Signature Mutton Korma - The undisputed Crown Jewel of every traditional Kolkata Biye Bari Menu.'
    },
    {
      id: 5,
      url: '/gallery/chicken_curry.jpg',
      caption: 'Authentic Bengali Style Chicken Kosha in elegant chafing dishes, slow-cooked to perfection over low heat.'
    },
    {
      id: 6,
      url: '/gallery/copper_handis.jpg',
      caption: 'Premium Vegetarian Spread featuring North Indian delicacies like Dal Makhani and Paneer served in traditional copper Handis.'
    },
    {
      id: 7,
      url: '/gallery/red_banquet.jpg',
      caption: 'Exquisite Red Velvet & Chandelier Banquet Dining Setup for an ultra-premium Howrah Wedding Celebration.'
    },
    {
      id: 8,
      url: '/gallery/mutton_biryani.jpg',
      caption: 'The King of Celebrations: Hand-crafted Kolkata Mutton Biryani presented under our premium red-and-black draped buffet segment.'
    },
    {
      id: 9,
      url: '/gallery/sweets.jpg',
      caption: 'Traditional Sweet Counter Assortment: Gurer Sandesh, Rajbhog, and Kamala Bhog sourced from the finest confectioners in Bengal.'
    },
    {
      id: 10,
      url: '/gallery/banner_chef.jpg',
      caption: 'Our passionate Head Chef standing proudly ready to serve, backed by the trusted Rannaghar Caterer Howrah banner.'
    },
    {
      id: 11,
      url: '/gallery/wooden_counter.jpg',
      caption: 'Elegant Wooden Setup with Premium Ceramic Crockery - Ready to serve our Howrah Banquet guests.'
    },
    {
      id: 12,
      url: '/gallery/salad_cart.jpg',
      caption: 'Creative Bicycle Salad Cart Display - Adding a touch of innovation and freshness to your Kolkata Wedding Reception.'
    }
  ];

  return (
    <div className="gallery-page p-6 max-w-7xl mx-auto">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Culinary Gallery</h1>
        <p className="text-gray-600">A glimpse into the mouth-watering events we've catered.</p>
      </header>

      {galleryImages.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No photos shared yet. Stay tuned!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="gallery-card group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img.url}
                  alt={img.caption || "Rannaghar Caterer Event"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {img.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white text-sm font-medium leading-relaxed">{img.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
