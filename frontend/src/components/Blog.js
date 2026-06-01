import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Calendar, ArrowLeft, MessageCircle, Phone, MapPin, Globe2 } from 'lucide-react';

/* ─────────────── LANGUAGE CONFIG ─────────────── */
const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'bn', label: 'বাংলা',   short: 'বাং' },
  { code: 'hi', label: 'हिन्दी',   short: 'हिं' },
];

const useBlogLang = () => {
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('rannaghar_blog_lang')
      || localStorage.getItem('rannaghar_lang')
      || 'en';
  });
  const setLang = (code) => {
    localStorage.setItem('rannaghar_blog_lang', code);
    setLangState(code);
  };
  return [lang, setLang];
};

/* ─────────────── BLOG DATA (3 LANGUAGES) ─────────────── */
import SEO_BLOGS from '../data/blogs.json';

/* ─────────────── LANGUAGE TABS COMPONENT ─────────────── */
const LangTabs = ({ lang, setLang }) => (
  <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl w-fit mx-auto mb-10 shadow-sm">
    <Globe2 size={16} className="text-gray-400 ml-2 mr-1 flex-shrink-0" />
    {LANGUAGES.map(l => (
      <button
        key={l.code}
        onClick={() => setLang(l.code)}
        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
          lang === l.code
            ? 'bg-white text-orange-600 shadow-md border border-orange-100'
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        {l.label}
      </button>
    ))}
  </div>
);

/* ─────────────── ZIG-ZAG BALLOON ─────────────── */
const ZigZagBalloon = ({ onClick }) => {
  const vw = typeof window !== 'undefined' ? window.innerWidth : 400;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  return (
    <motion.div
      onClick={onClick}
      className="fixed z-[60] cursor-pointer pointer-events-auto"
      style={{ top: 0, left: 0 }}
      animate={{
        x: [vw * 0.75, vw * 0.1, vw * 0.75, vw * 0.1, vw * 0.75],
        y: [-80, vh * 0.25, vh * 0.55, vh * 0.8, vh * 1.05],
        rotate: [-4, 4, -4, 4, -4],
      }}
      transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
      whileHover={{ scale: 1.12 }}
    >
      <div className="relative bg-white text-gray-900 border-2 border-orange-500 shadow-2xl rounded-full px-5 py-3 flex items-center gap-2 font-semibold text-sm whitespace-nowrap">
        <span className="text-2xl">🎈</span>
        <div>
          <span className="block text-orange-600 text-xs font-bold leading-tight">Click here to see</span>
          <span className="block text-gray-800 font-bold leading-tight">Our Catering Service</span>
        </div>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-5 bg-orange-400 rounded-full" />
      </div>
    </motion.div>
  );
};

/* ─────────────── INDIVIDUAL BLOG POST PAGE ─────────────── */
export const BlogPost = ({ lang }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [showMapModal, setShowMapModal] = useState(false);

  const blog = SEO_BLOGS.find(b => b.slug === slug);
  const t = blog?.translations[lang] || blog?.translations['en'];

  // Save current language preference in localStorage
  useEffect(() => {
    localStorage.setItem('rannaghar_blog_lang', lang);
  }, [lang]);

  // Inject SEO metadata dynamically for crawlers
  useEffect(() => {
    if (!blog || !t) return;

    const originalTitle = document.title;
    document.title = `${t.title} | Rannaghar Caterer`;

    let metaDesc = document.querySelector('meta[name="description"]');
    let originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', t.excerpt);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    let originalCanonical = canonicalLink ? canonicalLink.getAttribute('href') : '';
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://rannagharcaterers.in/blog/${lang}/${slug}`);

    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(el => el.remove());

    const hreflangEls = [];
    LANGUAGES.forEach(l => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', l.code);
      link.setAttribute('href', `https://rannagharcaterers.in/blog/${l.code}/${slug}`);
      document.head.appendChild(link);
      hreflangEls.push(link);
    });

    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `https://rannagharcaterers.in/blog/en/${slug}`);
    document.head.appendChild(defaultLink);
    hreflangEls.push(defaultLink);

    return () => {
      document.title = originalTitle;
      if (metaDesc) {
        if (originalDesc) {
          metaDesc.setAttribute('content', originalDesc);
        } else {
          metaDesc.remove();
        }
      }
      if (canonicalLink) {
        if (originalCanonical) {
          canonicalLink.setAttribute('href', originalCanonical);
        } else {
          canonicalLink.remove();
        }
      }
      hreflangEls.forEach(el => el.remove());
    };
  }, [lang, slug, blog, t]);

  const handleCall = () => { window.location.href = 'tel:+919831924872'; };
  const handleWhatsApp = () => { window.open('https://wa.me/919831924872', '_blank'); };
  const actuallyOpenMap = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Rannaghar+Caterer+Brojonath+Lahiri+Ln+Howrah', '_blank');
    setShowMapModal(false);
  };

  const handleLangChange = (newLang) => {
    navigate(`/blog/${newLang}/${slug}`);
  };

  const ctaLabels = {
    en: { heading: 'Planning Your Own Event?', sub: "Don't risk your special day with factory caterers. Hire a passionate local team dedicated to authentic Kolkata and Howrah culinary perfection.", call: 'Call Now', wa: 'WhatsApp', map: 'Find Us on Map' },
    bn: { heading: 'নিজে অনুষ্ঠান পরিকল্পনা করছেন?', sub: 'ফ্যাক্টরি ক্যাটারারের হাতে বিশেষ দিনটি ঝুঁকিতে ফেলবেন না। খাঁটি কলকাতা ও হাওড়ার রান্নার প্রতি নিবেদিত স্থানীয় দলকে বেছে নিন।', call: 'এখনই কল করুন', wa: 'হোয়াটসঅ্যাপ', map: 'ম্যাপে খুঁজুন' },
    hi: { heading: 'खुद इवेंट प्लान कर रहे हैं?', sub: 'फैक्टरी कैटरर के भरोसे अपना खास दिन खतरे में न डालें। कोलकाता और हावड़ा की असली रसोई को समर्पित स्थानीय टीम को चुनें।', call: 'अभी कॉल करें', wa: 'व्हाट्सऐप', map: 'मैप पर खोजें' },
  };
  const cta = ctaLabels[lang] || ctaLabels['en'];

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
        <h1 className="text-3xl font-bold text-gray-800">Article not found</h1>
        <Link to={`/blog/${lang}`} className="text-orange-600 font-bold underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] pb-32">
      <ZigZagBalloon onClick={() => navigate('/?play=true')} />

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden my-8 mx-4 md:mx-auto"
      >
        {/* Back */}
        <div className="p-6 pb-0">
          <Link to={`/blog/${lang}`} className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-medium px-4 py-2 rounded-full hover:bg-orange-50">
            <ArrowLeft size={20} /> Back to Articles
          </Link>
        </div>

        <div className="p-8 md:p-12 pb-4">
          {/* Language Tabs */}
          <LangTabs lang={lang} setLang={handleLangChange} />

          <div className="flex items-center gap-2 text-sm text-orange-600 font-bold mb-6">
            <Calendar className="w-4 h-4" /><span>{blog.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8">{t.title}</h1>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-[21/9] max-h-[420px] overflow-hidden bg-gray-100">
          <img src={blog.image} alt={t.title} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={lang}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="prose prose-lg prose-orange max-w-none text-gray-800
                         prose-h2:text-2xl prose-h2:font-extrabold prose-h2:text-gray-900 prose-h2:mt-12 prose-h2:mb-6
                         prose-h3:text-xl prose-h3:font-bold prose-h3:text-gray-800 prose-h3:mt-8 prose-h3:mb-4
                         prose-p:leading-relaxed prose-p:mb-6 prose-p:text-gray-800
                         prose-li:my-2 prose-ul:mb-6"
              dangerouslySetInnerHTML={{ __html: t.content }}
            />
          </AnimatePresence>

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 md:p-12 text-center border border-orange-100 shadow-inner mb-8">
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">{cta.heading}</h3>
            <p className="text-lg text-gray-700 font-medium mb-8 max-w-2xl mx-auto">{cta.sub}</p>
            <div className="cta-buttons">
              <button className="cta-btn cta-call" onClick={handleCall}><Phone size={20} /><span>{cta.call}</span></button>
              <button className="cta-btn cta-whatsapp" onClick={handleWhatsApp}><MessageCircle size={20} /><span>{cta.wa}</span></button>
              <button className="cta-btn cta-map" onClick={() => setShowMapModal(true)}><MapPin size={20} /><span>{cta.map}</span></button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Map Modal */}
      <AnimatePresence>
        {showMapModal && (
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center border border-gray-100"
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 border-b border-gray-100 pb-4">A Quick Note Before We Go...</h3>
              <p className="text-gray-700 mb-8 font-medium leading-relaxed">We might be new to Google Maps, but our passion for authentic Bengali catering is unmatched. Please call us and give us a chance!</p>
              <div className="flex flex-col gap-3">
                <button onClick={actuallyOpenMap} className="bg-[#4285F4] hover:bg-[#3367d6] transition-colors text-white font-bold py-4 px-8 rounded-full w-full shadow-lg flex items-center justify-center gap-2">
                  <MapPin size={20} /> Continue to Google Maps
                </button>
                <button onClick={() => setShowMapModal(false)} className="text-gray-500 font-medium py-3 hover:text-gray-800 transition-colors">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─────────────── BLOG LIST PAGE ─────────────── */
const Blog = ({ lang }) => {
  const navigate = useNavigate();

  const headings = {
    en: { title: 'Event Planning & Culinary Insights', sub: 'Expert advice on planning unforgettable weddings, birthdays, and celebrations across Kolkata and Howrah.' },
    bn: { title: 'অনুষ্ঠান পরিকল্পনা ও রন্ধন অন্তর্দৃষ্টি', sub: 'কলকাতা ও হাওড়ায় অবিস্মরণীয় বিবাহ, জন্মদিন ও উৎসব পরিকল্পনায় বিশেষজ্ঞ পরামর্শ।' },
    hi: { title: 'इवेंट प्लानिंग और पाक अंतर्दृष्टि', sub: 'कोलकाता और हावड़ा में अविस्मरणीय शादियों, जन्मदिनों और उत्सवों की योजना बनाने पर विशेषज्ञ सलाह।' },
  };
  const h = headings[lang] || headings['en'];

  // Save current language preference in localStorage
  useEffect(() => {
    localStorage.setItem('rannaghar_blog_lang', lang);
  }, [lang]);

  // Inject SEO metadata dynamically for crawlers
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${h.title} | Rannaghar Caterer`;

    let metaDesc = document.querySelector('meta[name="description"]');
    let originalDesc = metaDesc ? metaDesc.getAttribute('content') : '';
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', h.sub);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    let originalCanonical = canonicalLink ? canonicalLink.getAttribute('href') : '';
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `https://rannagharcaterers.in/blog/${lang}`);

    const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach(el => el.remove());

    const hreflangEls = [];
    LANGUAGES.forEach(l => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', l.code);
      link.setAttribute('href', `https://rannagharcaterers.in/blog/${l.code}`);
      document.head.appendChild(link);
      hreflangEls.push(link);
    });

    const defaultLink = document.createElement('link');
    defaultLink.setAttribute('rel', 'alternate');
    defaultLink.setAttribute('hreflang', 'x-default');
    defaultLink.setAttribute('href', `https://rannagharcaterers.in/blog/en`);
    document.head.appendChild(defaultLink);
    hreflangEls.push(defaultLink);

    return () => {
      document.title = originalTitle;
      if (metaDesc) {
        if (originalDesc) {
          metaDesc.setAttribute('content', originalDesc);
        } else {
          metaDesc.remove();
        }
      }
      if (canonicalLink) {
        if (originalCanonical) {
          canonicalLink.setAttribute('href', originalCanonical);
        } else {
          canonicalLink.remove();
        }
      }
      hreflangEls.forEach(el => el.remove());
    };
  }, [lang, h]);

  const handleLangChange = (newLang) => {
    navigate(`/blog/${newLang}`);
  };

  return (
    <div className="blog-page p-6 max-w-7xl mx-auto min-h-[90vh]">
      <header className="mb-8 text-center pt-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {h.title}
        </h1>
        <p className="text-gray-700 font-medium text-lg max-w-2xl mx-auto mb-8">{h.sub}</p>
        <LangTabs lang={lang} setLang={handleLangChange} />
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={lang}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {SEO_BLOGS.map((blog, index) => {
            const t = blog.translations[lang] || blog.translations['en'];
            return (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
                onClick={() => navigate(`/blog/${lang}/${blog.slug}`)}
                className="blog-card flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer group"
              >
                <div className="aspect-[16/9] overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={blog.image} alt={t.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-sm text-orange-600 font-bold mb-3">
                    <Calendar className="w-4 h-4" /><span>{blog.date}</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">{t.title}</h3>
                  <p className="text-gray-700 font-medium mb-6 line-clamp-3">{t.excerpt}</p>
                  <div className="mt-auto">
                    <span className="text-orange-600 font-bold text-sm inline-flex items-center gap-1">
                      {lang === 'bn' ? 'সম্পূর্ণ নিবন্ধ পড়ুন' : lang === 'hi' ? 'पूरा लेख पढ़ें' : 'Read Full Article'}
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Blog;
