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
export const SEO_BLOGS = [
  {
    id: 1,
    slug: 'wedding-reception-mistakes-kolkata',
    date: '2024-03-15',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    translations: {
      en: {
        title: '5 Mistakes to Avoid When Planning a Wedding Reception in Kolkata',
        excerpt: 'Organizing a Biye Bari in the heart of Kolkata comes with unique challenges. Learn how to navigate venues, weather, and catering head-counts flawlessly.',
        content: `
          <h2>The Pressure of the Perfect Biye Bari</h2>
          <p>When organizing a Bengali wedding ceremony in Kolkata or Howrah, the expectations are astronomically high—primarily regarding the food. Often, families make critical early mistakes that result in unnecessary stress on the day of the reception.</p>
          <h3>1. Underestimating the "Kolkata Winter" Rush</h3>
          <p>Between November and February, premium catering services in Kolkata and Howrah book out months in advance. The best catering teams, like Rannaghar Caterer, prioritize quality over volume and take limited bookings.</p>
          <h3>2. Getting the Fish Count Wrong</h3>
          <p>Whether it's Bhetki Fish Fry or Paturi, Bengali guests evaluate a wedding by the quality and availability of the fish. Always estimate a 15% surplus on premium fish items.</p>
          <h3>3. Ignoring Hyperlocal Venue Restrictions</h3>
          <p>Many heritage venues in North Kolkata have severe restrictions on live-fire cooking. Always confirm with your caterer if they are equipped for off-site prep.</p>
          <h3>4. Forgetting the "Adda" Factor</h3>
          <p>Bengali weddings stretch late into the night. Ensure your catering package includes secondary rounds of cha (tea) and late-night snacks for close family.</p>
          <h3>5. Hiring a "Factory" Caterer</h3>
          <p>Massive corporate catering services often freeze their base gravies to handle 10 weddings a night. Always seek out dedicated, passionate, localized teams who cook fresh on-site.</p>
        `
      },
      bn: {
        title: 'কলকাতায় বিবাহের রিসেপশন পরিকল্পনায় যে ৫টি ভুল অবশ্যই এড়াবেন',
        excerpt: 'কলকাতার হৃদয়ে বিয়েবাড়ি আয়োজন করা অনেক চ্যালেঞ্জের বিষয়। ভেন্যু, আবহাওয়া এবং ক্যাটারিং সংক্রান্ত সমস্যা কীভাবে সামলাবেন তা জানুন।',
        content: `
          <h2>নিখুঁত বিয়েবাড়ির চাপ</h2>
          <p>কলকাতা বা হাওড়ায় বাংলা বিবাহ অনুষ্ঠান আয়োজন করতে গেলে প্রত্যাশার মাত্রা অত্যন্ত উঁচুতে থাকে—বিশেষত খাবারের ক্ষেত্রে। অনেক পরিবার এমন কিছু ভুল করে থাকে যা অনুষ্ঠানের দিন অতিরিক্ত চাপের কারণ হয়ে দাঁড়ায়।</p>
          <h3>১. "কলকাতার শীতকালীন" ভিড়কে অবহেলা</h3>
          <p>নভেম্বর থেকে ফেব্রুয়ারির মধ্যে কলকাতা ও হাওড়ার প্রিমিয়াম ক্যাটারিং সার্ভিসগুলো মাসের পর মাস আগে থেকেই বুক হয়ে যায়। রান্নাঘর ক্যাটারারের মতো সেরা দলগুলো মানের সাথে আপোস না করে সীমিত বুকিং নেয়।</p>
          <h3>২. মাছের পরিমাণ ভুল হিসাব</h3>
          <p>ভেটকি ফিশ ফ্রাই হোক বা পাতুরি, বাংলার অতিথিরা মাছের গুণমান ও পরিমাণ দিয়েই বিয়েবাড়ি মূল্যায়ন করেন। প্রিমিয়াম মাছের আইটেমে সর্বদা ১৫% অতিরিক্ত রাখুন।</p>
          <h3>৩. স্থানীয় ভেন্যু বিধিনিষেধ উপেক্ষা</h3>
          <p>উত্তর কলকাতার অনেক ঐতিহ্যবাহী ভেন্যুতে সরাসরি আগুনে রান্নার উপর কঠোর বিধিনিষেধ রয়েছে। সর্বদা ক্যাটারারের সাথে অফসাইট প্রস্তুতির বিষয়টি নিশ্চিত করুন।</p>
          <h3>৪. "আড্ডার" বিষয়টি ভুলে যাওয়া</h3>
          <p>বাংলা বিবাহ রাত গভীর পর্যন্ত চলে। আপনার ক্যাটারিং প্যাকেজে যেন দেরিতে চা-কফি ও লেট নাইট স্ন্যাকস অন্তর্ভুক্ত থাকে।</p>
          <h3>৫. "ফ্যাক্টরি" ক্যাটারার নিয়োগ</h3>
          <p>বড় কর্পোরেট ক্যাটারিং সার্ভিসগুলো প্রায়ই এক রাতে ১০টি বিয়ের অনুষ্ঠান করতে গিয়ে বেস গ্রেভি ফ্রিজ করে রাখে। খাঁটি হাতে-পেষা মশলার স্বাদ পেতে রান্নাঘর ক্যাটারারের মতো নিবেদিত স্থানীয় দলকে বেছে নিন।</p>
        `
      },
      hi: {
        title: 'कोलकाता में शादी रिसेप्शन प्लान करते समय इन 5 गलतियों से बचें',
        excerpt: 'कोलकाता में बिए बाड़ी आयोजित करना कई चुनौतियों से भरा होता है। वेन्यू, मौसम और कैटरिंग से जुड़ी समस्याओं को कैसे सुलझाएं, यह जानें।',
        content: `
          <h2>परफेक्ट बिए बाड़ी का दबाव</h2>
          <p>कोलकाता या हावड़ा में बंगाली शादी समारोह आयोजित करते समय अपेक्षाएं बहुत ऊंची होती हैं—खासकर खाने के मामले में। कई परिवार शुरुआत में ऐसी गलतियां करते हैं जो समारोह के दिन अनावश्यक तनाव का कारण बन जाती हैं।</p>
          <h3>1. "कोलकाता विंटर" की भीड़ को नजरअंदाज करना</h3>
          <p>नवंबर से फरवरी के बीच कोलकाता और हावड़ा की प्रीमियम कैटरिंग सेवाएं महीनों पहले ही बुक हो जाती हैं। रन्नाघर कैटरर जैसी सर्वश्रेष्ठ टीमें गुणवत्ता से समझौता नहीं करतीं।</p>
          <h3>2. मछली की मात्रा का गलत अनुमान</h3>
          <p>चाहे भेटकी फिश फ्राई हो या पातुरी, बंगाली मेहमान शादी को मछली की गुणवत्ता से आंकते हैं। प्रीमियम मछली आइटम में हमेशा 15% अतिरिक्त रखें।</p>
          <h3>3. स्थानीय वेन्यू प्रतिबंधों को नजरअंदाज करना</h3>
          <p>उत्तरी कोलकाता के कई ऐतिहासिक वेन्यू में लाइव-फायर कुकिंग पर कड़े प्रतिबंध हैं। अपने कैटरर से ऑफसाइट तैयारी की पुष्टि करें।</p>
          <h3>4. "अड्डा" फैक्टर को भूल जाना</h3>
          <p>बंगाली शादियां देर रात तक चलती हैं। सुनिश्चित करें कि कैटरिंग पैकेज में चाय-कॉफी के अतिरिक्त राउंड और लेट-नाइट स्नैक्स शामिल हों।</p>
          <h3>5. "फैक्टरी" कैटरर को नियुक्त करना</h3>
          <p>बड़ी कॉर्पोरेट कैटरिंग सेवाएं अक्सर एक रात में 10 शादियां करने के लिए बेस ग्रेवी फ्रीज करके रखती हैं। असली स्वाद के लिए रन्नाघर कैटरर जैसी समर्पित स्थानीय टीम को चुनें।</p>
        `
      }
    }
  },
  {
    id: 2,
    slug: 'bengali-wedding-menu-pricing-kolkata',
    date: '2024-03-20',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    translations: {
      en: {
        title: 'Decoding the Perfect Bengali Biye Bari Menu (With Pricing Advice)',
        excerpt: 'What exactly makes a Bengali wedding menu unforgettable? We break down the must-have dishes and how to balance your catering budget in Kolkata.',
        content: `
          <h2>The Anatomy of a Bengali Feast</h2>
          <p>The heart of every successful celebration in Kolkata and Howrah is the menu. A proper Bengali wedding feast is a carefully orchestrated symphony of flavors, moving from subtle bitterness to rich spices, ending in overwhelming sweetness.</p>
          <h3>The Starters: Setting the Tone</h3>
          <p>Before the main course begins, the live counters dominate. A standard expectation today includes a Mocktail Bar, live Chicken Reshmi Kebab skewers, and the non-negotiable crumb-coated Bhetki Fish Fry served with kasundi.</p>
          <h3>The Main Course: A Celebration of Richness</h3>
          <p>The perfect flow includes:</p>
          <ul>
            <li><strong>Radhaballavi and Cholar Dal:</strong> The perfect gentle introduction.</li>
            <li><strong>Bhetki Paturi:</strong> Fish marinated in mustard and green chili paste, steamed in a banana leaf.</li>
            <li><strong>Basanti Pulao and Mutton Kosha:</strong> The crowning jewel—slow-cooked mutton in dark caramelized onion gravy.</li>
          </ul>
          <h3>Pricing Expectations in Kolkata</h3>
          <p>A premium plate with authentic Bhetki and high-grade Mutton dictates a higher budget. Discounted catering almost always means compromised ingredients. Choose a team like Rannaghar Caterer who refuses to cut corners.</p>
        `
      },
      bn: {
        title: 'নিখুঁত বাংলা বিয়েবাড়ির মেনু ডিকোড করুন (মূল্য পরামর্শসহ)',
        excerpt: 'একটি বাংলা বিবাহের মেনু কী কী দিয়ে অবিস্মরণীয় হয়? কলকাতায় ক্যাটারিং বাজেট কীভাবে সামলাবেন তা বিস্তারিত জানুন।',
        content: `
          <h2>বাংলা ভোজের গঠনকাঠামো</h2>
          <p>কলকাতা ও হাওড়ায় প্রতিটি সফল অনুষ্ঠানের হৃদয় হলো মেনু। একটি সঠিক বাংলা বিবাহভোজ হলো স্বাদের একটি যত্নে সাজানো সিম্ফনি—হালকা তিক্ততা থেকে শুরু করে সমৃদ্ধ মশলার স্তর পেরিয়ে অপ্রতিরোধ্য মিষ্টিতে পরিসমাপ্তি।</p>
          <h3>স্টার্টার: সুরের শুরু</h3>
          <p>মূল পদ পরিবেশনের আগে লাইভ কাউন্টারগুলো আধিপত্য করে। আজকের মানদণ্ড অনুযায়ী একটি মকটেল বার, লাইভ চিকেন রেশমি কাবাব এবং কাসুন্দিসহ ক্রাম্ব-কোটেড ভেটকি ফিশ ফ্রাই অপরিহার্য।</p>
          <h3>মূল পদ: সমৃদ্ধির উৎসব</h3>
          <p>নিখুঁত ক্রমবিন্যাস:</p>
          <ul>
            <li><strong>রাধাবল্লভী ও ছোলার ডাল:</strong> মৃদু ও নিখুঁত সূচনা।</li>
            <li><strong>ভেটকি পাতুরি:</strong> সরষে ও কাঁচালঙ্কা বাটায় মাখানো মাছ কলাপাতায় ভেপে রান্না।</li>
            <li><strong>বাসন্তী পোলাও ও মটন কষা:</strong> মুকুটের মণি—ধীরে রান্না করা মটন গাঢ় পেঁয়াজের গ্রেভিতে।</li>
          </ul>
          <h3>কলকাতায় মূল্য প্রত্যাশা</h3>
          <p>খাঁটি ভেটকি ও উচ্চমানের মটনসহ প্রিমিয়াম প্লেটের জন্য বাজেট একটু বেশি হবে। সস্তা ক্যাটারিং মানেই মানের সাথে আপোস। রান্নাঘর ক্যাটারারের মতো এমন দলকে বেছে নিন যারা কখনো কোণঠাসা করে না।</p>
        `
      },
      hi: {
        title: 'परफेक्ट बंगाली बिए बाड़ी मेनू को समझें (प्राइसिंग सलाह के साथ)',
        excerpt: 'बंगाली शादी का मेनू क्या बनाता है अविस्मरणीय? कोलकाता में कैटरिंग बजट को कैसे संतुलित करें, विस्तार से जानें।',
        content: `
          <h2>बंगाली भोज की संरचना</h2>
          <p>कोलकाता और हावड़ा में हर सफल समारोह का दिल होता है मेनू। एक सच्चा बंगाली शादी का भोज स्वाद की एक सुनियोजित सिम्फनी है—हल्की कड़वाहट से शुरू होकर समृद्ध मसालों से गुजरते हुए अप्रतिरोध्य मिठास पर समाप्त।</p>
          <h3>स्टार्टर: माहौल बनाना</h3>
          <p>मुख्य कोर्स से पहले लाइव काउंटर हावी होते हैं। आज का मानक है: मॉकटेल बार, लाइव चिकन रेशमी कबाब और कसुंदी के साथ क्रम्ब-कोटेड भेटकी फिश फ्राई।</p>
          <h3>मुख्य कोर्स: समृद्धि का उत्सव</h3>
          <p>परफेक्ट क्रम:</p>
          <ul>
            <li><strong>राधाबल्लवी और छोले की दाल:</strong> शानदार सौम्य शुरुआत।</li>
            <li><strong>भेटकी पातुरी:</strong> सरसों और हरी मिर्च के पेस्ट में मैरिनेट मछली, केले के पत्ते में भाप से पकाई।</li>
            <li><strong>बासंती पुलाव और मटन कोशा:</strong> मुकुट का रत्न—धीमी आंच पर पकाया मटन गहरी कैरेमेलाइज़ड प्याज की ग्रेवी में।</li>
          </ul>
          <h3>कोलकाता में मूल्य अपेक्षाएं</h3>
          <p>असली भेटकी और उच्च गुणवत्ता के मटन वाली प्रीमियम थाली के लिए बजट थोड़ा अधिक होगा। सस्ती कैटरिंग का मतलब हमेशा समझौता होता है। रन्नाघर कैटरर जैसी टीम चुनें जो कभी समझौता नहीं करती।</p>
        `
      }
    }
  },
  {
    id: 3,
    slug: 'bhetki-paturi-howrah-caterer',
    date: '2024-04-02',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    translations: {
      en: {
        title: 'Why Bhetki Paturi is the Star of Every Howrah Celebration',
        excerpt: 'Discover the cultural prestige behind Kolkata\'s most beloved fish preparation, and why it remains the ultimate test of a caterer\'s skill.',
        content: `
          <h2>The Ultimate Test of a Bengali Caterer</h2>
          <p>There are few dishes wrapped in as much cultural prestige as the authentic Bhetki Paturi. If you are hiring a catering service in Kolkata or Howrah, their ability to execute this single dish perfectly is the ultimate litmus test for their culinary pedigree.</p>
          <h3>The Mustard Magic</h3>
          <p>The secret lies in the marinade. A perfect Paturi relies on a highly calculated ratio of black and yellow mustard seeds (shorshe), poppy seeds (posto), and a potent splash of pungent raw mustard oil. Too much black mustard, and the dish turns undeniably bitter.</p>
          <h3>The Banana Leaf Envelope</h3>
          <p>Steaming the fish inside a charred banana leaf isn't just for ceremonial presentation. The leaf itself imparts a subtle, earthy, sweet aroma into the fish as it cooks, sealing the moisture perfectly inside so the Bhetki melts the moment it touches the tongue.</p>
          <h3>Why Freshness is Non-Negotiable</h3>
          <p>Frozen Bhetki dramatically alters the texture of a Paturi, making it stiff and rubbery. This is why authentic teams like Rannaghar Caterer prioritize early-morning fresh market sourcing. When the strings are untied at the dinner table and the steam wafts up, your guests will instantly know if you hired a premium caterer.</p>
        `
      },
      bn: {
        title: 'কেন ভেটকি পাতুরি হাওড়ার প্রতিটি উৎসবের তারকা?',
        excerpt: 'কলকাতার সবচেয়ে প্রিয় মাছের পদের পেছনের সাংস্কৃতিক মর্যাদা এবং কেন এটি ক্যাটারারের দক্ষতার চূড়ান্ত পরীক্ষা তা আবিষ্কার করুন।',
        content: `
          <h2>একজন বাংলা ক্যাটারারের চূড়ান্ত পরীক্ষা</h2>
          <p>খাঁটি ভেটকি পাতুরির মতো সাংস্কৃতিক মর্যাদায় মোড়া খুব কম পদ আছে। কলকাতা বা হাওড়ায় ক্যাটারিং সার্ভিস নিয়োগ করলে, এই একটি পদ সঠিকভাবে রান্না করার ক্ষমতাই তাদের রন্ধন-বংশের চূড়ান্ত পরীক্ষা।</p>
          <h3>সরষের যাদু</h3>
          <p>রহস্য লুকিয়ে আছে মেরিনেডে। নিখুঁত পাতুরির জন্য কালো ও হলুদ সরষে বাটা (শর্ষে), পোস্তো এবং কাঁচা সরষের তেলের সুনির্দিষ্ট অনুপাত দরকার। বেশি কালো সরষে হলেই পদটি তিক্ত হয়ে যাবে।</p>
          <h3>কলাপাতার খাম</h3>
          <p>পোড়া কলাপাতার মধ্যে ভেপে রান্না শুধু অনুষ্ঠানিক উপস্থাপনার জন্য নয়। পাতাটি নিজেই রান্নার সময় মাছে একটি মৃদু, মাটির গন্ধ মিশিয়ে দেয়, আর্দ্রতা সিল করে রাখে যাতে ভেটকি মুখে দেওয়ার সাথে সাথে গলে যায়।</p>
          <h3>কেন তাজা উপাদান অপরিহার্য</h3>
          <p>হিমায়িত ভেটকি পাতুরির গঠন সম্পূর্ণ বদলে দেয়, শক্ত ও রাবারের মতো করে তোলে। তাই রান্নাঘর ক্যাটারার ভোরবেলা তাজা বাজার থেকে কেনাকাটাকে সর্বোচ্চ অগ্রাধিকার দেয়। ডিনার টেবিলে সুতো খুলে ধোঁয়া উঠলেই অতিথিরা বুঝতে পারবেন প্রিমিয়াম ক্যাটারার নিয়োগ হয়েছে কিনা।</p>
        `
      },
      hi: {
        title: 'भेटकी पातुरी हावड़ा के हर उत्सव का स्टार क्यों है?',
        excerpt: 'कोलकाता की सबसे प्रिय मछली की तैयारी के पीछे की सांस्कृतिक प्रतिष्ठा और यह कैटरर की कुशलता का अंतिम परीक्षण क्यों है, जानें।',
        content: `
          <h2>एक बंगाली कैटरर की अंतिम परीक्षा</h2>
          <p>असली भेटकी पातुरी जितनी सांस्कृतिक प्रतिष्ठा से ओत-प्रोत कुछ व्यंजन ही हैं। कोलकाता या हावड़ा में कैटरिंग सेवा नियुक्त करते समय, इस एक व्यंजन को सही तरीके से बनाने की क्षमता ही उनकी रसोई की पारंपरिक योग्यता की अंतिम परीक्षा है।</p>
          <h3>सरसों का जादू</h3>
          <p>रहस्य मैरिनेड में छुपा है। एक परफेक्ट पातुरी के लिए काली और पीली सरसों (शर्षे), पोस्ता और कच्चे सरसों के तेल का सटीक अनुपात जरूरी है। ज्यादा काली सरसों से व्यंजन कड़वा हो जाता है।</p>
          <h3>केले के पत्ते का लिफाफा</h3>
          <p>जली हुई केले की पत्ती में भाप से पकाना सिर्फ रस्मी प्रस्तुति नहीं है। पत्ती खुद ही एक हल्की, मिट्टी की सुगंध मछली में मिला देती है और नमी को सील करती है ताकि भेटकी मुंह में जाते ही पिघल जाए।</p>
          <h3>ताजगी क्यों जरूरी है</h3>
          <p>जमी हुई भेटकी पातुरी की बनावट बिल्कुल बदल देती है—इसे सख्त और रबड़ जैसा बना देती है। इसीलिए रन्नाघर कैटरर सुबह-सुबह ताजे बाजार से खरीदारी को सर्वोच्च प्राथमिकता देता है। जब डिनर टेबल पर धागा खुलता है और भाप उठती है, मेहमान तुरंत समझ जाते हैं कि प्रीमियम कैटरर नियुक्त किया गया है।</p>
        `
      }
    }
  }
];

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
export const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useBlogLang();
  const [showMapModal, setShowMapModal] = useState(false);

  const blog = SEO_BLOGS.find(b => b.slug === slug);
  const t = blog?.translations[lang] || blog?.translations['en'];

  const handleCall = () => { window.location.href = 'tel:+919831924872'; };
  const handleWhatsApp = () => { window.open('https://wa.me/919831924872', '_blank'); };
  const actuallyOpenMap = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Rannaghar+Caterer+Brojonath+Lahiri+Ln+Howrah', '_blank');
    setShowMapModal(false);
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
        <Link to="/blog" className="text-orange-600 font-bold underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfaf7] pb-32">
      <ZigZagBalloon onClick={() => navigate('/')} />

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden my-8 mx-4 md:mx-auto"
      >
        {/* Back */}
        <div className="p-6 pb-0">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors font-medium px-4 py-2 rounded-full hover:bg-orange-50">
            <ArrowLeft size={20} /> Back to Articles
          </Link>
        </div>

        <div className="p-8 md:p-12 pb-4">
          {/* Language Tabs */}
          <LangTabs lang={lang} setLang={setLang} />

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
const Blog = () => {
  const navigate = useNavigate();
  const [lang, setLang] = useBlogLang();

  const headings = {
    en: { title: 'Event Planning & Culinary Insights', sub: 'Expert advice on planning unforgettable weddings, birthdays, and celebrations across Kolkata and Howrah.' },
    bn: { title: 'অনুষ্ঠান পরিকল্পনা ও রন্ধন অন্তর্দৃষ্টি', sub: 'কলকাতা ও হাওড়ায় অবিস্মরণীয় বিবাহ, জন্মদিন ও উৎসব পরিকল্পনায় বিশেষজ্ঞ পরামর্শ।' },
    hi: { title: 'इवेंट प्लानिंग और पाक अंतर्दृष्टि', sub: 'कोलकाता और हावड़ा में अविस्मरणीय शादियों, जन्मदिनों और उत्सवों की योजना बनाने पर विशेषज्ञ सलाह।' },
  };
  const h = headings[lang] || headings['en'];

  return (
    <div className="blog-page p-6 max-w-7xl mx-auto min-h-[90vh]">
      <header className="mb-8 text-center pt-8">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {h.title}
        </h1>
        <p className="text-gray-700 font-medium text-lg max-w-2xl mx-auto mb-8">{h.sub}</p>
        <LangTabs lang={lang} setLang={setLang} />
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
                onClick={() => navigate(`/blog/${blog.slug}`)}
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
