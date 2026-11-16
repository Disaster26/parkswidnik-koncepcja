(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function sc(){top.classList.toggle('sc',window.scrollY>8)}
  window.addEventListener('scroll',sc,{passive:true});sc();
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){top.classList.remove('open');bg.setAttribute('aria-expanded','false');bg.setAttribute('aria-label','Otwórz menu')})});
  var io='IntersectionObserver' in window;
  // aktywna pozycja menu - dokladnie biezaca sekcja
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  var secs=links.map(function(l){return document.querySelector(l.getAttribute('href'))});
  function act(){var y=innerHeight*0.4,cur=-1;secs.forEach(function(s,i){if(s&&s.getBoundingClientRect().top<=y&&s.getBoundingClientRect().bottom>y)cur=i});links.forEach(function(l,i){l.classList.toggle('on',i===cur)})}
  window.addEventListener('scroll',act,{passive:true});act();
  // tory kart: palec natywnie, mysz przeciaganiem, strzalki
  document.querySelectorAll('.tor').forEach(function(tor){
    var down=false,sx=0,sl=0,moved=false;
    function step(){var k=tor.querySelector('.karta');var g=parseFloat(getComputedStyle(tor).columnGap)||20;return k.getBoundingClientRect().width+g}
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=tor.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tor.classList.add('drag')}tor.scrollLeft=sl-dx});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){var w=step();tor.classList.remove('drag');tor.scrollTo({left:Math.round(tor.scrollLeft/w)*w,behavior:'smooth'})}else tor.classList.remove('drag')});
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    var nav=document.querySelector('[data-tor="'+tor.id+'"]');
    if(nav)nav.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){tor.scrollBy({left:step()*(+b.dataset.k),behavior:'smooth'})})});
  });
  // dolny pasek na telefonie po przewinieciu za pierwszy ekran
  var mob=document.getElementById('mob'),hero=document.querySelector('.hero');
  if(mob&&hero&&io){new IntersectionObserver(function(es){mob.classList.toggle('widac',!es[0].isIntersecting)},{threshold:0}).observe(hero)}
  // mapa przy przewinieciu
  var m=document.getElementById('mapa');
  function load(){if(m.dataset.ok)return;m.dataset.ok=1;var f=document.createElement('iframe');f.src=m.dataset.src;f.title=m.dataset.title||'Mapa dojazdu';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f)}
  if(m){if(io){var mo=new IntersectionObserver(function(es){if(es[0].isIntersecting){load();mo.disconnect()}},{rootMargin:'300px'});mo.observe(m)}else load()}
  // formularz pokazowy
  var f=document.getElementById('form');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();var o=document.getElementById('form-ok');o.hidden=false;o.focus()});
})();
