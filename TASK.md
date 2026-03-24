# TASK for Sub-Agent

Improve nox-bots site (src/app/page.tsx + src/app/globals.css):

1. Add mobile hamburger menu - nav links hidden on mobile, need burger icon that opens menu
2. Add scroll-reveal animations - sections fade in when scrolled into view (IntersectionObserver + CSS)
3. Add typing animation dots in chat mockup bot messages
4. Add hover effects on feat-card elements (subtle scale + brighter border)
5. Fix any mobile responsiveness issues

After changes:
- git add -A && git commit -m "v8: Mobile menu, scroll animations, typing, hover" && git push
- npx vercel@latest --prod --yes

When done run: openclaw system event --text "Done: v8 deployed" --mode now
