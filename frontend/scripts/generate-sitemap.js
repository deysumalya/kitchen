const fs = require('fs');
const path = require('path');

const blogsPath = path.join(__dirname, '../src/data/blogs.json');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Base URL for the site
const BASE_URL = 'https://rannagharcaterers.in';
const LANGUAGES = ['en', 'bn', 'hi'];

function generateSitemap() {
  const blogsData = fs.readFileSync(blogsPath, 'utf8');
  const blogs = JSON.parse(blogsData);

  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Menu Page -->
  <url>
    <loc>${BASE_URL}/menu</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Gallery Page -->
  <url>
    <loc>${BASE_URL}/gallery</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

  // Add blog list pages for each language
  LANGUAGES.forEach((lang) => {
    xml += `
  <!-- Blog List Page - ${lang.toUpperCase()} -->
  <url>
    <loc>${BASE_URL}/blog/${lang}</loc>
${LANGUAGES.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/blog/${l}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog/en"/>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // Add individual blog posts
  blogs.forEach((blog) => {
    const lastmod = blog.date || today;
    
    LANGUAGES.forEach((lang) => {
      xml += `
  <!-- Blog Post: ${blog.slug} (${lang.toUpperCase()}) -->
  <url>
    <loc>${BASE_URL}/blog/${lang}/${blog.slug}</loc>
${LANGUAGES.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${BASE_URL}/blog/${l}/${blog.slug}"/>`).join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/blog/en/${blog.slug}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    });
  });

  xml += `</urlset>\n`;

  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log('Sitemap generated successfully at', sitemapPath);
}

generateSitemap();
