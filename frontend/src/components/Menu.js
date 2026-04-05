import React from 'react';
import { motion } from 'framer-motion';

const Menu = () => {
  const biyeBariMenu = [
    { category: 'Welcome Drinks', items: ['Fresh Mango Pora Shorbot', 'Blue Lagoon Mocktail', 'Hot Coffee / Tea'] },
    { category: 'Live Starters', items: ['Chicken Reshmi Kebab', 'Fish Orly / Bhetki Fish Fry (with Kasundi)', 'Crispy Baby Corn', 'Paneer Tikka'] },
    { category: 'Main Course', items: ['Radhaballavi', 'Cholar Dal with Coconut', 'Bhetki Paturi', 'Basanti Pulao', 'Mutton Kosha / Chicken Dakbungalow', 'Pineapple Chutney', 'Papad'] },
    { category: 'Desserts', items: ['Baked Rasgulla', 'Nolen Gurer Ice Cream', 'Fire Paan'] },
  ];

  const generalMenu = [
    { category: 'Starters', items: ['Crispy Chilli Babycorn', 'Chicken 65', 'Fish Finger'] },
    { category: 'Main Course', items: ['Peas Pulao', 'Chicken Chaap / Mutton Rogan Josh', 'Mixed Veg', 'Fish Kaliya'] },
    { category: 'Accompaniments', items: ['Butter Naan', 'Salad', 'Mixed Raita'] },
  ];

  return (
    <div className="min-h-[90vh] p-6 max-w-5xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Our Signature Menus</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our most beloved catering packages. Every item is hand-cooked with authentic Bengali spices and uncompromising quality.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Premium Biye Bari Menu */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-orange-50/50 rounded-3xl p-8 border border-orange-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-red-600 text-white text-xs font-bold px-4 py-2 rounded-bl-xl shadow-md">
            MOST POPULAR
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-orange-200 pb-4 inline-block">The Grand Biye Bari Feast</h2>
          <div className="space-y-8">
            {biyeBariMenu.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-orange-700 mb-3">{section.category}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-gray-700 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Standard Menu */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b-2 border-gray-200 pb-4 inline-block">The Classic Celebration</h2>
          <div className="space-y-8">
            {generalMenu.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{section.category}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-gray-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-gray-500 italic">
          * These are sample menus. We completely customize our offerings based on your exact budget, guest count, and preferences in Kolkata and Howrah.
        </p>
      </motion.div>
    </div>
  );
};

export default Menu;
