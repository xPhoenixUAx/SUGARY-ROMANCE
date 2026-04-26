# Sugary Romance Media Website Skeleton

## Brand Positioning

Sugary Romance Media is a full-cycle digital partner for companies that need strategy, marketing, web design, website development, launch support, and ongoing maintenance in one connected process.

The website uses the supplied reference as a broad style direction: dark agency base, lime accent, bold modern typography, pill CTAs, service strip energy, and premium but practical spacing. It remains a skeleton, so the final visual design can still be adapted from future section-by-section references.

## Sitemap

- `index.html` - Home
- `services.html` - Services overview
- `service-detail.html` - Full-Cycle Digital Partner service detail page
- `service-strategy.html` - Strategy & Campaign Systems detail page
- `service-design.html` - Web Design & Landing Pages detail page
- `service-development.html` - Development & Support detail page
- `about.html` - Company and process
- `contact.html` - Inquiry form
- `privacy.html` - Privacy Policy
- `terms.html` - Terms of Service
- `cookie.html` - Cookie Policy
- `send-mail.php` - Contact form processor

## Page Structure

- Home: header, hero, capability strip, services overview, full-cycle process, reasons to choose the company, case-style block, CTA, footer.
- Services: page hero, category overview, expanded service cards, process note, CTA.
- Full-Cycle Service Detail: hero, summary, problems solved, inclusions, approach, deliverables, best-fit clients, business impact, FAQ, CTA.
- About: introduction, services overview, full-cycle approach, principles, client fit, project handling, address, CTA.
- Contact: intro, form, submission expectations, ideal project fit, email contact.
- Legal pages: readable policy structures for privacy, terms, and cookies.

## Expanded Service Content

The services page includes:

- Marketing Strategy
- Performance Marketing
- Paid Social Campaigns
- Search Advertising
- Web Design
- Website Development
- Frontend Development
- Backend Development
- Landing Page Creation
- Conversion Rate Optimization
- Content Strategy
- Creative Production
- Email Marketing Systems
- Analytics & Reporting
- Website Support & Maintenance

Each service includes a description, business value, inclusions, ideal client fit, expected outcome, and CTA.

## File Structure

```text
/index.html
/services.html
/service-detail.html
/about.html
/contact.html
/privacy.html
/terms.html
/cookie.html
/send-mail.php
/css/base.css
/css/bundle.css
/css/pages/home.css
/css/pages/services.css
/css/pages/service.css
/css/pages/about.css
/css/pages/contact.css
/css/pages/legal.css
/js/main.js
/img/home/
/img/services/
/img/common/
```

## Implementation Notes

- No frameworks, Bootstrap, Tailwind, WordPress, React, or Vue are used. Lucide Icons is loaded from CDN for lightweight UI icons.
- Navigation and footer are duplicated across static pages for simple deployment.
- `css/bundle.css` imports the shared base and page-specific styles.
- `js/main.js` controls sticky header state, right-side menu panel accessibility, body scroll lock, Escape close, and contact form validation.
- `send-mail.php` validates required fields, validates email format, sanitizes input, checks a honeypot field, and sends notification email to `support@sugaryromancemedia.com`.
- The website intentionally contains no phone number or phone link.
- PHP mail delivery depends on server mail configuration. On production hosting, test form delivery and configure SMTP/mail transport if needed.
