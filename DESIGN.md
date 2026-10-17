# Clarinet lessons
website

Current structure: a short homepage with two lesson plans, each linking to a dedicated rates page. Keep one sentence per plan on the homepage. Prices and durations remain explicitly unannounced until supplied. Align plan buttons on desktop; stack plans on mobile.

Site structure: root index.html is the concise personal portfolio; lessons/ contains the existing lessons site and its own stylesheet. This is a GitHub Pages path, not a DNS subdomain. Preserve the same approved fonts and palette across both. Portfolio recordings remain an honest empty state until real media is supplied.

Header navigation uses a single upward wipe in the page background color: 360ms to cover, 440ms to reveal. Reduced-motion users navigate immediately. The shared page-transition files handle same-page return-to-top, page arrival, and back/forward cache cleanup.
Confirmed rates: beginner/intermediate $20 per 30-minute lesson; advanced $30 per 30-minute lesson. These replace previous unannounced pricing guidance.
Owner-provided portfolio content is organized into skills, expandable experience entries, education, and awards. Contact details live on contact/index.html and are linked from both rates pages. All pages use the same lowercase name and navigation labels. Flyer information is transcribed as text; no QR code or flyer image is included.
Resume content lives at resume/index.html. The homepage keeps its original short introduction, recordings, and lessons link. Contact details remain on their separate page. Every header includes the Resume navigation link.
Homepage portrait: assets/jaxson.jpg, alongside the title on desktop and stacked below on mobile. Page backgrounds are defined in page-themes.css. Internal links use the page wipe with outgoing color preserved across navigation; buttons also have 150ms color feedback. Phone/email links and reduced-motion navigation remain native.
