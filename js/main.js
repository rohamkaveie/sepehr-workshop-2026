async function loadComponent(id, file) {
  const container = document.querySelector(`[data-component="${id}"]`);
  if (!container) return;
  try {
    const response = await fetch(`components/${file}`);
    if (response.ok) {
      container.innerHTML = await response.text();
    } else {
      console.error(`Component not found: ${file}`);
    }
  } catch (error) {
    console.error(`Error loading ${file}:`, error);
  }
}

function initGallerySlider() {
  const slides = document.querySelectorAll('.gallery-slide');
  const dots = document.querySelectorAll('#slider-dots .dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const track = document.getElementById('slider-track');

  if (!slides || slides.length === 0) return;

  let currentIndex = 0;
  let autoPlayTimer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        slide.classList.add('opacity-100', 'scale-100', 'z-10');
      } else {
        slide.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
        slide.classList.remove('opacity-100', 'scale-100', 'z-10');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.className = 'dot w-8 h-3 rounded-full bg-indigo-500 transition-all duration-300';
      } else {
        dot.className = 'dot w-3 h-3 rounded-full bg-slate-600 hover:bg-slate-400 transition-all duration-300';
      }
    });

    currentIndex = index;
  }

  function nextSlide() {
    let nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => { e.preventDefault(); nextSlide(); };
  }
  if (prevBtn) {
    prevBtn.onclick = (e) => { e.preventDefault(); prevSlide(); };
  }

  dots.forEach((dot, index) => {
    dot.onclick = (e) => { e.preventDefault(); showSlide(index); };
  });

  function startAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(nextSlide, 3500);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) clearInterval(autoPlayTimer);
  }

  startAutoPlay();

  if (track) {
    track.onmouseenter = stopAutoPlay;
    track.onmouseleave = startAutoPlay;
  }
}

async function initApp() {
  await loadComponent('navbar', 'navbar.html');
  await loadComponent('hero', 'hero.html');
  await loadComponent('about', 'about.html');
  await loadComponent('topics', 'topics.html');
  await loadComponent('gallery', 'gallery.html');
  await loadComponent('faq', 'faq.html');
  await loadComponent('register', 'register.html');
  await loadComponent('footer', 'footer.html');
  initGallerySlider();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
