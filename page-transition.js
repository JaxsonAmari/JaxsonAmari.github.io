(() => {
  const root = document.documentElement;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const storageKey = 'portfolio-page-wipe';
  let busy = false;
  let arriving = false;

  // Runs in the head so the incoming page starts covered before its first paint.
  try {
    const pending = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    sessionStorage.removeItem(storageKey);
    arriving = !reducedMotion.matches && pending?.path === location.pathname &&
      Date.now() - pending.time < 5000;
    if (arriving) {
      if (typeof pending.color === 'string' && /^#[0-9a-f]{6}$/i.test(pending.color)) {
        root.style.setProperty('--wipe-bg', pending.color);
      }
      root.classList.add('page-arriving');
    }
  } catch { /* Navigation still works when storage is unavailable. */ }

  function clear() {
    root.classList.remove('page-cover', 'page-arriving', 'page-reveal');
    root.style.removeProperty('--wipe-bg');
    busy = false;
  }

  function reveal() {
    root.classList.remove('page-cover');
    root.classList.add('page-arriving');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      root.classList.add('page-reveal');
      root.classList.remove('page-arriving');
      setTimeout(clear, 460);
    }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (arriving) reveal();
    document.querySelectorAll('a[href]:not(.skip-link)').forEach(link => {
      link.addEventListener('click', event => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey ||
            event.altKey || (link.target && link.target !== '_self') ||
            link.hasAttribute('download') || reducedMotion.matches) return;
        const destination = new URL(link.href);
        if (!['http:', 'https:', 'file:'].includes(destination.protocol)) return;
        // Preserve direct-file previews while retaining clean URLs on the server.
        if (location.protocol === 'file:' && link.getAttribute('href') === '/') {
          destination.href = new URL(document.querySelector('script[data-page-transition]').src).href
            .replace(/page-transition\.js$/, 'index.html');
        }
        if (location.protocol === 'file:' && destination.pathname.endsWith('/')) {
          destination.pathname += 'index.html';
        }
        if (destination.origin !== location.origin) return;
        event.preventDefault();
        if (busy) return;
        const homePath = path => path.replace(/index\.html$/, '').replace(/\/$/, '');
        if (homePath(destination.pathname) === homePath(location.pathname) &&
              destination.search === location.search) {
            let target = document.querySelector('main');
            if (destination.hash) {
              try { target = document.getElementById(decodeURIComponent(destination.hash.slice(1))) || target; }
              catch { /* Malformed fragments fall back to the main content. */ }
            }
            try {
              if (destination.hash !== location.hash) history.pushState(null, '', destination.href);
              else history.replaceState(null, '', destination.href);
            } catch { /* Local preview. */ }
            if (destination.hash) target?.scrollIntoView({ behavior: 'instant', block: 'start' });
            else window.scrollTo({ top: 0, behavior: 'instant' });
            if (target) {
              const temporaryTabindex = !target.hasAttribute('tabindex');
              if (temporaryTabindex) target.setAttribute('tabindex', '-1');
              target.focus({ preventScroll: true });
              if (temporaryTabindex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
            }
            return;
        }
        busy = true;
        const coverColor = getComputedStyle(root).getPropertyValue('--bg').trim();
        root.style.setProperty('--wipe-bg', coverColor);
        root.classList.add('page-cover');
        setTimeout(() => {
            try {
              sessionStorage.setItem(storageKey, JSON.stringify({ path: destination.pathname, color: coverColor, time: Date.now() }));
            } catch { /* The outgoing wipe still works without storage. */ }
            location.assign(destination.href);
            setTimeout(clear, 1500);
        }, 380);
      });
    });
  });
  window.addEventListener('pageshow', event => { if (event.persisted) clear(); });
  reducedMotion.addEventListener('change', event => { if (event.matches) clear(); });
})();
