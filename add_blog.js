const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend/src/data/blogs.json');
const blogs = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const newBlog = {
  id: 4,
  slug: "annaprasan-traditional-rice-ceremony-menus-kolkata",
  date: new Date().toISOString().split('T')[0],
  image: "https://images.unsplash.com/photo-1542315059-e91d5ceaa596?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  translations: {
    en: {
      title: "Planning an Annaprasan in Kolkata? 5 Traditional Rice Ceremony Menus Your Guests Will Love",
      excerpt: "Annaprasan, or the 'first rice ceremony,' is a cherished milestone in every Bengali household. Choosing the right spread can transform a simple gathering into an unforgettable event.",
      content: `
          <p>Annaprasan, or the 'first rice ceremony,' is a cherished milestone in every Bengali household. It's a joyous occasion marking a baby's transition from a milk-only diet to solid food, celebrated with family, friends, and, most importantly, an elaborate feast. In Kolkata, where food is deeply intertwined with culture and emotion, the Annaprasan menu is often the heart of the celebration. Choosing the right spread can transform a simple gathering into an unforgettable event, reflecting tradition, hospitality, and love.</p>
          <p>Here are five traditional Annaprasan menu ideas, meticulously crafted to delight your guests and honor this significant cultural event, with a special nod to the diverse culinary preferences across Kolkata and Howrah.</p>
          
          <h3>1. The Classic Bengali Thali: A Timeless Celebration</h3>
          <p>For those who cherish authenticity, the Classic Bengali Thali is an undisputed favorite. This menu offers a comprehensive journey through Bengali flavors, perfect for families across all neighborhoods, from the bustling lanes of Gariahat to the serene residential areas of Bally. It typically includes:</p>
          <ul>
            <li><strong>Starters:</strong> Mochar Chop (banana blossom croquettes) or Fish Fry (crispy Bhetki fillet).</li>
            <li><strong>Main Course:</strong> Fluffy Luchi (deep-fried flatbread) with rich Cholar Dal (chickpea lentil curry), fragrant Basanti Pulao (sweet saffron rice), accompanied by Shukto (bitter-sweet mixed vegetable stew), Dhokar Dalna (lentil cake curry), and the quintessential Katla Kalia (spicy fish curry). For meat lovers, tender Kosha Mangsho (slow-cooked mutton) is a must-have.</li>
            <li><strong>Accompaniments:</strong> Begun Bhaja (fried eggplant slices) and a selection of fresh salads.</li>
            <li><strong>Desserts:</strong> Creamy Mishti Doi (sweet yogurt) and classic Rosogolla (syrup-soaked cheese balls).</li>
          </ul>

          <h3>2. Seafood Extravaganza: A Homage to the Hooghly</h3>
          <p>Given Kolkata's proximity to the Hooghly River, a seafood-centric menu is a natural choice, especially popular in areas like Shibpur and other parts of Howrah known for their fresh produce markets. This menu celebrates the bounty of the river and sea:</p>
          <ul>
            <li><strong>Starters:</strong> Crispy Chingri Cutlet (prawn cutlet) or Bhetki Paturi (steamed Bhetki fish in banana leaf with mustard paste).</li>
            <li><strong>Main Course:</strong> Aromatic Basanti Pulao or plain steamed rice served with rich Chingri Malai Curry (prawn in coconut milk curry), flavorful Ilish Bhaja (fried Hilsa fish), and a spicy Pabda Macher Jhol (Pabda fish curry).</li>
            <li><strong>Accompaniments:</strong> Seasonal vegetable preparations and fresh salads.</li>
            <li><strong>Desserts:</strong> Nolen Gurer Sandesh (date palm jaggery sweet, seasonal) and Baked Rosogolla.</li>
          </ul>

          <h3>3. The Pure Vegetarian Delight: For Sacred Beginnings</h3>
          <p>For families preferring a purely vegetarian spread, often for religious sanctity, this menu offers a rich and diverse array of dishes that are equally satisfying. This option is versatile and appreciated across all communities in Kolkata.</p>
          <ul>
            <li><strong>Starters:</strong> Crispy Vegetable Chop and soft Paneer Tikka.</li>
            <li><strong>Main Course:</strong> Fragrant Ghee Bhaat (ghee rice) or Basanti Pulao paired with creamy Paneer Butter Masala, spicy Aloo Dum (potato curry), and a seasonal mixed vegetable curry. Dal Makhani or Dal Fry can also be included.</li>
            <li><strong>Accompaniments:</strong> Assorted Indian breads like Naan or Roti, and fresh raita.</li>
            <li><strong>Desserts:</strong> A selection of traditional Bengali sweets like Komola Bhog (orange-flavored Rosogolla) and Rajbhog.</li>
          </ul>

          <h3>4. Modern Bengali Fusion: A Contemporary Twist</h3>
          <p>Catering to the evolving tastes of younger generations and families in modern localities like New Town and Salt Lake, this menu blends traditional Bengali flavors with contemporary culinary trends. It offers a sophisticated yet familiar dining experience.</p>
          <ul>
            <li><strong>Starters:</strong> A fusion platter featuring mini Chicken Reshmi Kebabs alongside Mochar Chop.</li>
            <li><strong>Main Course:</strong> Peas Pulao or Fried Rice served with a choice of Chicken Chaap (rich chicken curry) or Mutton Rogan Josh, complemented by a lighter Bhetki Fillet in Lemon Butter Sauce.</li>
            <li><strong>Accompaniments:</strong> Garlic Naan, mixed raita, and a fresh garden salad.</li>
            <li><strong>Desserts:</strong> Blueberry Mishti Doi or Chocolate Sandesh for a modern touch, alongside traditional Rosogolla.</li>
          </ul>

          <h3>5. The Grand Feast: Biye Bari Style Annaprasan</h3>
          <p>For those who wish to celebrate Annaprasan with the grandeur of a wedding feast, this menu is designed to impress. It's a lavish spread that ensures every guest finds something to savor, reminiscent of the elaborate Biye Bari meals.</p>
          <ul>
            <li><strong>Welcome Drinks:</strong> Aam Panna (raw mango drink) or fresh fruit juice.</li>
            <li><strong>Starters:</strong> An extensive array including Fish Orly, Chicken Pakora, and Paneer Pakora.</li>
            <li><strong>Main Course:</strong> Rich Mutton Biryani (with the essential potato!) or Kolkata Biryani, fragrant Basanti Pulao, accompanied by Chingri Malai Curry, Kosha Mangsho, and Dhokar Dalna.</li>
            <li><strong>Accompaniments:</strong> Dahi Vada, assorted breads, and a variety of chutneys and pickles.</li>
            <li><strong>Desserts:</strong> A grand dessert station featuring Mishti Doi, Rosogolla, Gulab Jamun, and seasonal fruit platters.</li>
          </ul>

          <p>Choosing the perfect menu for your baby's Annaprasan is a delightful task that allows you to express your family's culinary heritage and hospitality. Whether you opt for a classic thali or a modern fusion, the key is to select dishes that resonate with your taste and traditions. A professional caterer with deep local expertise can help you navigate these choices, ensuring fresh, authentic ingredients and impeccable service, making your little one's first rice ceremony truly special. From the vibrant markets of Gariahat to the bustling kitchens of Howrah, we understand the nuances that make a Bengali feast truly memorable.</p>
          <p><strong>Ready to plan an unforgettable Annaprasan feast? Contact us today for a customized menu consultation!</strong></p>
      `
    },
    bn: {
      title: "কলকাতায় অন্নপ্রাশনের পরিকল্পনা করছেন? ৫টি ঐতিহ্যবাহী মেনু যা আপনার অতিথিদের মুগ্ধ করবে",
      excerpt: "অন্নপ্রাশন প্রতিটি বাঙালি পরিবারের একটি বিশেষ মুহূর্ত। সঠিক খাবার নির্বাচন একটি সাধারণ অনুষ্ঠানকে অবিস্মরণীয় করে তুলতে পারে।",
      content: `
          <p>অন্নপ্রাশন বা 'মুখে ভাত' প্রতিটি বাঙালি পরিবারের জন্য একটি অত্যন্ত প্রিয় মুহূর্ত। এটি এমন একটি আনন্দের উপলক্ষ যা শিশুর শুধুমাত্র দুধের খাদ্য থেকে কঠিন খাবারে রূপান্তরকে চিহ্নিত করে, যা পরিবার, বন্ধুবান্ধব এবং সবচেয়ে গুরুত্বপূর্ণভাবে একটি বিস্তৃত ভোজের মাধ্যমে উদযাপিত হয়। কলকাতায়, অন্নপ্রাশনের মেনু প্রায়শই উদযাপনের মূল আকর্ষণ হয়ে থাকে।</p>
          <p>আপনার অতিথিদের আনন্দিত করতে এবং এই তাৎপর্যপূর্ণ সাংস্কৃতিক ঘটনাকে সম্মান জানাতে এখানে পাঁচটি ঐতিহ্যবাহী অন্নপ্রাশন মেনুর ধারণা দেওয়া হলো:</p>
          
          <h3>১. ক্লাসিক বাঙালি থালি</h3>
          <p>যাঁরা খাঁটি বাঙালি স্বাদ পছন্দ করেন, তাঁদের জন্য ক্লাসিক বাঙালি থালি অবিসংবাদিত প্রিয়। এর মধ্যে রয়েছে মোচার চপ বা ফিশ ফ্রাই, লুচি-ছোলার ডাল, বাসন্তী পোলাও, শুক্তো, ধোঁকার ডালনা এবং কাতলা কালিয়া। মাংসপ্রেমীদের জন্য নরম কষা মাংস অবশ্যই থাকা উচিত। মিষ্টিতে থাকছে মিষ্টি দই এবং রসগোল্লা।</p>

          <h3>২. সামুদ্রিক মাছের সমাহার</h3>
          <p>হুগলী নদীর নৈকট্যের কারণে মাছ-ভিত্তিক মেনু একটি স্বাভাবিক পছন্দ। এর মধ্যে রয়েছে মুচমুচে চিংড়ি কাটলেট বা ভেটকি পাতুরি, বাসন্তী পোলাওয়ের সাথে চিংড়ি মালাই কারি, সুস্বাদু ইলিশ ভাজা এবং ঝাল পাবদা মাছের ঝোল।</p>

          <h3>৩. বিশুদ্ধ নিরামিষ আনন্দ</h3>
          <p>যাঁরা ধর্মীয় পবিত্রতার জন্য বিশুদ্ধ নিরামিষ খাবার পছন্দ করেন, তাঁদের জন্য এই মেনুটি অত্যন্ত তৃপ্তিদায়ক। এর মধ্যে থাকছে ভেজিটেবল চপ, পনির টিক্কা, ঘি ভাত বা পোলাওয়ের সাথে পনির বাটার মাসালা, আলুর দম এবং ডাল মাখানি।</p>

          <h3>৪. আধুনিক ফিউশন</h3>
          <p>আধুনিক রুচির সাথে মানানসই এই মেনুতে থাকছে মিনি চিকেন রেশমি কাবাব, পিস পোলাও বা ফ্রাইড রাইসের সাথে চিকেন চাপ বা মাটন রোগান জোশ এবং লেমন বাটার সসে ভেটকি ফিলে। শেষপাতে থাকছে ব্লুবেরি মিষ্টি দই বা চকোলেট সন্দেশ।</p>

          <h3>৫. বিয়েবাড়ি স্টাইলের গ্র্যান্ড ফিস্ট</h3>
          <p>যাঁরা বিয়ের ভোজের মতো জাঁকজমকপূর্ণ অন্নপ্রাশন উদযাপন করতে চান, তাঁদের জন্য এই মেনু। এর মধ্যে থাকছে ফিশ অর্লি, চিকেন পকোড়া, মাটন বিরিয়ানি, বাসন্তী পোলাও, চিংড়ি মালাই কারি এবং কষা মাংস।</p>

          <p>আপনার ছোট্ট সোনাটির মুখে ভাত অনুষ্ঠানটিকে সত্যিই বিশেষ করে তুলতে আমরা সর্বদা প্রস্তুত। কাস্টমাইজড মেনু কনসালটেশনের জন্য আজই আমাদের সাথে যোগাযোগ করুন!</p>
      `
    },
    hi: {
      title: "कोलकाता में अन्नप्राशन की योजना बना रहे हैं? 5 पारंपरिक मेनू जो मेहमानों को पसंद आएंगे",
      excerpt: "अन्नप्राशन हर बंगाली परिवार में एक खास पल है। सही भोजन का चुनाव एक साधारण समारोह को अविस्मरणीय बना सकता है।",
      content: `
          <p>अन्नप्राशन हर बंगाली परिवार के लिए एक बहुत ही प्यारा पल है। यह एक खुशी का अवसर है जो बच्चे के दूध से ठोस भोजन में परिवर्तन को चिह्नित करता है। कोलकाता में, अन्नप्राशन मेनू अक्सर उत्सव का मुख्य आकर्षण होता है।</p>
          <p>आपके मेहमानों को खुश करने और इस महत्वपूर्ण सांस्कृतिक घटना का सम्मान करने के लिए यहां पांच पारंपरिक अन्नप्राशन मेनू विचार दिए गए हैं:</p>
          
          <h3>1. क्लासिक बंगाली थाली</h3>
          <p>जो लोग प्रामाणिक स्वाद पसंद करते हैं, उनके लिए क्लासिक बंगाली थाली निर्विवाद रूप से पसंदीदा है। इसमें मोचार चॉप या फिश फ्राई, लूची-छोलार दाल, बासंती पुलाव, शुक्तो, धोकार डालना और कतला कालिया शामिल हैं। मांस प्रेमियों के लिए कोशा मांग्शो बहुत जरूरी है। मिठास में मिष्टी दोई और रोसोगुल्ला।</p>

          <h3>2. सीफूड एक्स्ट्रावैगेंज़ा</h3>
          <p>नदी की निकटता के कारण मछली-आधारित मेनू एक स्वाभाविक विकल्प है। इसमें क्रिस्पी चिंगरी कटलेट या भेटकी पातुरी, बासंती पुलाव के साथ चिंगरी मलाई करी, स्वादिष्ट इलिश भाजा और तीखी पाबदा माछेर झोल शामिल हैं।</p>

          <h3>3. शुद्ध शाकाहारी आनंद</h3>
          <p>जो लोग शुद्ध शाकाहारी भोजन पसंद करते हैं, उनके लिए यह मेनू बहुत संतोषजनक है। इसमें वेजिटेबल चॉप, पनीर टिक्का, घी भात या पुलाव के साथ पनीर बटर मसाला, आलू दम और दाल मखनी शामिल हैं।</p>

          <h3>4. आधुनिक बंगाली फ्यूजन</h3>
          <p>आधुनिक स्वाद के अनुकूल इस मेनू में मिनी चिकन रेशमी कबाब, पीस पुलाव या फ्राइड राइस के साथ चिकन चाप या मटन रोगन जोश और लेमन बटर सॉस में भेटकी फ़िललेट शामिल हैं। अंत में ब्लूबेरी मिष्टी दोई या चॉकलेट संदेश।</p>

          <h3>5. बिए बाड़ी स्टाइल ग्रैंड फीस्ट</h3>
          <p>जो लोग शादी की दावत की तरह भव्य अन्नप्राशन मनाना चाहते हैं, उनके लिए यह मेनू है। इसमें फिश ओरली, चिकन पकोड़ा, मटन बिरयानी, बासंती पुलाव, चिंगरी मलाई करी और कोशा मांग्शो शामिल हैं।</p>

          <p>आपके बच्चे के अन्नप्राशन को वास्तव में खास बनाने के लिए हम हमेशा तैयार हैं। कस्टमाइज़्ड मेनू कंसल्टेशन के लिए आज ही हमसे संपर्क करें!</p>
      `
    }
  }
};

blogs.push(newBlog);
fs.writeFileSync(filePath, JSON.stringify(blogs, null, 2), 'utf8');
console.log("Blog added successfully");
