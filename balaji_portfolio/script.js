const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('balaji-portfolio-theme');
if (savedTheme === 'light' || savedTheme === 'dark') root.dataset.theme = savedTheme;
themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('balaji-portfolio-theme', next);
  themeToggle.setAttribute('aria-label', `Switch to ${next === 'dark' ? 'dark' : 'light'} theme`);
});

const starLayer = document.getElementById('stars');
let seed = 9137;
function random() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
for (let i = 0; i < 145; i++) {
  const star = document.createElement('span');
  star.className = 'star';
  star.style.left = `${random() * 100}%`;
  star.style.top = `${random() * 100}%`;
  const size = random() > .9 ? 3 : random() > .55 ? 2 : 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.setProperty('--duration', `${2 + random() * 5}s`);
  star.style.setProperty('--delay', `${random() * -6}s`);
  starLayer.appendChild(star);
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const sections = [...document.querySelectorAll('main section[id]')];
const navItems = [...navLinks.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));
document.getElementById('year').textContent = new Date().getFullYear();

// Gentle glowing cursor on desktop; touch devices keep native behavior.
const cursorGlow=document.getElementById('cursorGlow'),cursorDot=document.getElementById('cursorDot');
if(window.matchMedia('(pointer: fine)').matches&&cursorGlow&&cursorDot){let tx=innerWidth/2,ty=innerHeight/2,gx=tx,gy=ty;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cursorDot.style.left=tx+'px';cursorDot.style.top=ty+'px'},{passive:true});function moveGlow(){gx+=(tx-gx)*.12;gy+=(ty-gy)*.12;cursorGlow.style.left=gx+'px';cursorGlow.style.top=gy+'px';requestAnimationFrame(moveGlow)}moveGlow();document.querySelectorAll('a,button,.stack-card,.project-card').forEach(el=>{el.addEventListener('pointerenter',()=>cursorDot.classList.add('cursor-hover'));el.addEventListener('pointerleave',()=>cursorDot.classList.remove('cursor-hover'))})}
