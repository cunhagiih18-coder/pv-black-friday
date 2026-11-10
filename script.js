const countdown = document.querySelector('#countdown');
const deadline = Date.parse(countdown.dateTime);
const header = document.querySelector('.deadline strong');
let ticker;
function updateCountdown() {
  const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
  if (!remaining) {
    header.textContent = 'As condições da Black da Reposição encerraram';
    countdown.textContent = 'Encerrado em 30/11';
    clearInterval(ticker);
    return;
  }
  const two = number => String(number).padStart(2, '0');
  countdown.textContent = [two(Math.floor(remaining / 86400)) + 'd', two(Math.floor(remaining / 3600) % 24) + 'h', two(Math.floor(remaining / 60) % 60) + 'min', two(remaining % 60) + 's'].join(' : ');
}
ticker = setInterval(updateCountdown, 1000);
updateCountdown();

const ribbon = document.querySelector('.jump');
const ribbonToggle = document.querySelector('.ribbon-toggle');
ribbonToggle.addEventListener('click', () => {
  const paused = ribbon.classList.toggle('is-paused');
  ribbonToggle.setAttribute('aria-pressed', String(paused));
  ribbonToggle.setAttribute('aria-label', paused ? 'Retomar animação da faixa' : 'Pausar animação da faixa');
  ribbonToggle.textContent = paused ? '▶' : 'Ⅱ';
});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('motion-ready');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.14 });
  document.querySelectorAll('.section-feature').forEach(section => observer.observe(section));
}


const root=document.documentElement;
const hero=document.querySelector('.intro');
const world=document.querySelector('.world');
const tiles=[...world.children];
const explore=document.querySelector('#explore');
const pan=document.querySelector('#pan');
let x=0,y=0,frame=0;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function position(){world.style.setProperty('--px',x+'px');world.style.setProperty('--py',y+'px')}
explore.addEventListener('click',()=>{pan.hidden=!pan.hidden;explore.setAttribute('aria-expanded',String(!pan.hidden))});
pan.addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.id==='reset'){x=0;y=0}else{x=Math.max(-480,Math.min(480,x+Number(button.dataset.x||0)*115));y=Math.max(-360,Math.min(360,y+Number(button.dataset.y||0)*100))}position()});
function scrollFrame(){const progress=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/hero.offsetHeight));world.style.setProperty('--gallery-opacity',String(1-.92*Math.max(0,(progress-.16)/.74)));tiles.forEach((tile,i)=>tile.style.setProperty('--offset',(i%3-1)*progress*105+'px'));frame=0}
if(!reduced){addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(scrollFrame)},{passive:true});scrollFrame();}
