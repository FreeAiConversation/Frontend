# SEO Setup Guide

## ✅ What's Been Implemented

### 1. **Metadata Configuration**
- ✅ Dynamic page titles with template
- ✅ Meta descriptions
- ✅ Keywords
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ Canonical URLs
- ✅ Robots meta tags

### 2. **Structured Data (JSON-LD)**
- ✅ Website schema
- ✅ Organization schema
- ✅ Tool/Software Application schema
- ✅ Breadcrumb schema
- ✅ Search action schema

### 3. **SEO Files**
- ✅ `robots.txt` - Auto-generated
- ✅ `sitemap.xml` - Dynamic sitemap with all pages
- ✅ `manifest.json` - PWA manifest

### 4. **Utilities**
- ✅ `src/lib/seo.ts` - SEO helper functions
- ✅ `src/components/seo/StructuredData.tsx` - Structured data component

## 🚀 Setup Instructions

### Step 1: Environment Variables
Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_GOOGLE_VERIFICATION=your-verification-code
```

### Step 2: Add Images
Add these images to the `public/` folder:
- `og-image.png` (1200x630px) - For social media sharing
- `icon-192.png` (192x192px) - PWA icon
- `icon-512.png` (512x512px) - PWA icon
- `logo.png` - Your logo

### Step 3: Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property
3. Verify ownership using the meta tag method
4. Add the verification code to `.env.local`
5. Submit your sitemap: `https://yourdomain.com/sitemap.xml`

### Step 4: Google Analytics (Optional)
Add to `.env.local`:
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📝 How to Use SEO Utilities

### For Tool Pages
```tsx
import { generateMetadata, generateToolSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata = generateMetadata({
  title: 'Word Counter',
  description: 'Count words, characters, sentences & reading time instantly.',
  keywords: ['word counter', 'character counter', 'text analysis'],
  canonical: '/tools/word-counter',
});

export default function WordCounterPage() {
  const toolSchema = generateToolSchema({
    name: 'Word Counter',
    description: 'Count words, characters, sentences & reading time',
    url: 'https://yourdomain.com/tools/word-counter',
    category: 'Utility',
  });

  return (
    <>
      <StructuredData data={toolSchema} />
      {/* Your page content */}
    </>
  );
}
```

### For Custom Pages
```tsx
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'Our privacy policy and data handling practices.',
  noindex: false, // Set to true if you don't want this page indexed
});
```

## 🎯 SEO Best Practices Implemented

### Technical SEO
- ✅ Semantic HTML structure
- ✅ Mobile-responsive design
- ✅ Fast page load times (Next.js optimization)
- ✅ Clean URL structure
- ✅ Proper heading hierarchy (H1, H2, H3)
- ✅ Alt text for images (add when implementing)
- ✅ Internal linking structure

### On-Page SEO
- ✅ Unique titles for each page
- ✅ Compelling meta descriptions
- ✅ Keyword optimization
- ✅ Content structure with proper headings
- ✅ Schema markup for rich snippets

### Performance
- ✅ Next.js Image optimization
- ✅ Font optimization
- ✅ Code splitting
- ✅ Static generation where possible

## 📊 Monitoring & Analytics

### Google Search Console
- Monitor search performance
- Check indexing status
- View search queries
- Identify crawl errors

### Key Metrics to Track
- Organic traffic
- Click-through rate (CTR)
- Average position
- Impressions
- Core Web Vitals

## 🔍 Testing Your SEO

### Tools to Use
1. **Google Rich Results Test**: Test structured data
   - https://search.google.com/test/rich-results

2. **Google Mobile-Friendly Test**: Check mobile optimization
   - https://search.google.com/test/mobile-friendly

3. **PageSpeed Insights**: Check performance
   - https://pagespeed.web.dev/

4. **Lighthouse**: Comprehensive audit
   - Built into Chrome DevTools

### Manual Checks
- [ ] All pages have unique titles
- [ ] All pages have meta descriptions
- [ ] Images have alt text
- [ ] Internal links work correctly
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`
- [ ] Open Graph preview looks good (use https://www.opengraph.xyz/)

## 🎨 Social Media Optimization

### Open Graph Tags
- Optimized for Facebook, LinkedIn, Discord
- 1200x630px image recommended
- Title, description, and image included

### Twitter Cards
- Summary card with large image
- Optimized preview for Twitter/X
- Same image as Open Graph

## 📈 Next Steps

1. **Content Strategy**
   - Create unique, valuable content for each tool
   - Add blog posts or guides
   - Update content regularly

2. **Link Building**
   - Get backlinks from relevant sites
   - Submit to tool directories
   - Share on social media

3. **Local SEO** (if applicable)
   - Add business schema
   - Create Google Business Profile

4. **Continuous Improvement**
   - Monitor analytics
   - A/B test titles and descriptions
   - Update based on search trends

## 🛠️ Maintenance

### Regular Tasks
- [ ] Check Google Search Console weekly
- [ ] Update sitemap when adding new pages
- [ ] Monitor Core Web Vitals
- [ ] Fix any crawl errors
- [ ] Update meta descriptions based on performance

### Quarterly Reviews
- [ ] Analyze top-performing pages
- [ ] Identify low-performing pages
- [ ] Update outdated content
- [ ] Check for broken links
- [ ] Review keyword rankings

## 📚 Resources

- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev SEO Guide](https://web.dev/learn/seo/)
