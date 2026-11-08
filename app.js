document.querySelectorAll('.mark-card').forEach(button => {
  button.addEventListener('click', () => {
    const viewer = document.getElementById('mark-view');
    const panel = viewer.querySelector('.mark-art');
    panel.replaceChildren(button.querySelector('svg').cloneNode(true));
    panel.style.background = button.style.background;
    viewer.showModal();
  });
});
const projects = {
  apex: {
    title: 'APEX. Характер в деталях', category: 'Сайт · Демонстрационный концепт',
    description: 'Данный сайт создан для примера. Концепция тюнинг-ателье с направлениями работ и интерактивным подбором дисков: можно менять рисунок, диаметр и покрытие. Адаптирован для компьютера и телефона.',
    media:'',
    note: 'APEX — вымышленное тюнинг-ателье. Изображение автомобиля создано для концепта; реальные работы ателье не заявлены.'
  },
  barber: {
    title: 'Кремень. Сайт барбершопа', category: 'Сайт · Демопроект',
    description: 'Одностраничный сайт с услугами, ценами и переходом к записи через Telegram. Тёмно-зелёная палитра, золотистые акценты и адаптация для телефона. Ниже — первый экран проекта.',
    media: '<div class="dialog-media-stack barber"><img src="assets/barber.jpg" alt="Первый экран сайта Кремень"></div>',
    note: 'Показан интерфейс проекта. Telegram-бот демонстрационной версии отключён.'
  },
  reels: {
    title: 'В кадре — главное', category: 'Видео · Монтаж разговорного Reels',
    description: 'Вертикальный ролик «Не экономить» из серии об интерьере. Смена планов, субтитры и графическое оформление. Нажмите воспроизведение, чтобы оценить темп монтажа и звук.',
    media: '<video class="modal-video" controls playsinline preload="metadata" poster="assets/reels.jpg"><source src="assets/reels.mp4" type="video/mp4">Ваш браузер не поддерживает видео.</video>',
    note: 'Готовое видео в вертикальном формате. Монтаж и оформление субтитров.'
  },
  book: {
    title: 'От текста к странице', category: 'Вёрстка · Книга',
    description: 'Оформление книги Дмитрия Суворова «Как быстро и хорошо разбогатеть на чужих деньгах» по материалам автора. Работа с заголовками, основным текстом и иллюстрациями. Итоговые форматы — Word и PDF.',
    media: '<div class="dialog-media-stack"><img src="assets/book-cover.jpg" alt="Обложка книги"><img src="assets/book-page.jpg" alt="Страница об авторе"><img src="assets/book-detail.jpg" alt="Пример оформления текста и иллюстраций"></div>',
    note: 'В портфолио опубликованы отдельные страницы. Текст и иллюстрации предоставлены автором.'
  }
};
const dialog = document.querySelector('#project-dialog');
let activeTrigger;
function openProject(id, trigger) {
  if(id==='library'){openDemo(id,trigger);return;}
  const project = projects[id];
  if (!project) return;
  if (id === 'apex') {
    openDemo(id, trigger);
    return;
  }
  activeTrigger = trigger;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-category').textContent = project.category;
  document.querySelector('#dialog-description').textContent = project.description;
  document.querySelector('#dialog-media').innerHTML = project.media;
  document.querySelector('#dialog-note').textContent = project.note;
  dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.scrollTop = 0;

}
function closeProject() { dialog.close(); }
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
document.querySelector('.close-dialog').addEventListener('click', closeProject);
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeProject(); } });
dialog.addEventListener('close', () => { document.querySelectorAll('#dialog-media video').forEach(video => video.pause()); document.querySelector('#dialog-media').innerHTML = ''; document.body.classList.remove('modal-open'); activeTrigger?.focus({ preventScroll: true }); });
document.querySelector('.dialog-contact').addEventListener('click', closeProject);
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelectorAll('[data-category]').forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
}));
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.header nav');
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню'); navigation.classList.toggle('open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Открыть меню'); }));
function init_apex(root){
const selection = { model: 'split', size: '20', finish: 'satin' };
const modelNames = { split: 'Split', mesh: 'Mesh', blade: 'Blade' };
const finishNames = { satin: 'Сатин', black: 'Графит', bronze: 'Бронза' };
const finishes = { satin: ['#e5e7e9', '#a2a8ae', '#4e545b'], black: ['#737a82', '#393f46', '#171b20'], bronze: ['#d1b18a', '#97734c', '#4d3825'] };
const spokes = root.querySelector('#wheel-spokes');
const preview = root.querySelector('#wheel-preview');
function renderWheel() {
  const count = selection.model === 'mesh' ? 10 : 5;
  const shapes = {
    split: '<path d="M286 253 L265 95 L277 87 L303 245Z M303 245 L324 87 L337 95 L315 257Z"/>',
    mesh: '<path d="M291 253 L255 98 L264 94 L306 249Z M303 253 L336 96 L344 100 L317 257Z"/>',
    blade: '<path d="M281 255 L273 92 L297 82 L330 100 L309 125 L316 257 L303 278Z"/>'
  };
  spokes.innerHTML = Array.from({ length: count }, (_, i) => `<g transform="rotate(${i * 360 / count} 300 291)">${shapes[selection.model]}</g>`).join('');
  ['.metal-light', '.metal-mid', '.metal-dark'].forEach((selector, i) => root.querySelector(selector).setAttribute('stop-color', finishes[selection.finish][i]));
  const scale = { 20: 0.94, 21: 0.97, 22: 1 }[selection.size];
  root.querySelector('#wheel-disc').setAttribute('transform', `translate(300 291) scale(${scale}) translate(-300 -291)`);
  const summary = `${modelNames[selection.model]} / ${selection.size}″ / ${finishNames[selection.finish]}`;
  root.querySelector('#selection-summary').textContent = summary;
  root.querySelector('#wheel-code').textContent = `AF.0${Object.keys(modelNames).indexOf(selection.model) + 1} / ${modelNames[selection.model].toUpperCase()}`;
  preview.setAttribute('aria-label', `Диск ${modelNames[selection.model]}, ${finishNames[selection.finish]}, ${selection.size} дюймов`);
}
['model', 'size', 'finish'].forEach(kind => {
  root.querySelectorAll(`[data-${kind}]`).forEach(button => button.addEventListener('click', () => {
    selection[kind] = button.dataset[kind];
    root.querySelectorAll(`[data-${kind}]`).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderWheel();
  }));
});
const briefDialog = root.querySelector('#brief-dialog');
let lastTrigger;
function showBrief(trigger, text) {
  lastTrigger = trigger;
  root.querySelector('#brief-selection').textContent = text;
  briefDialog.showModal();
}
root.querySelectorAll('[data-open-brief]').forEach(button => button.addEventListener('click', () => showBrief(button, button.dataset.service ? `Направление: ${button.dataset.service}` : 'Индивидуальный проект автомобиля')));
root.querySelector('#choose-wheel').addEventListener('click', event => showBrief(event.currentTarget, `Ваш выбор: APEX ${modelNames[selection.model]} / ${selection.size}″ / ${finishNames[selection.finish]}`));
root.querySelectorAll('.dialog-close, .continue-button').forEach(button => button.addEventListener('click', () => briefDialog.close()));
briefDialog.addEventListener('close', () => lastTrigger?.focus({ preventScroll: true }));
briefDialog.addEventListener('click', event => {
  if (event.target !== briefDialog) return;
  const rect = briefDialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) briefDialog.close();
});
renderWheel();

const careStages = [
  { title: 'Чистая основа.', description: 'Деликатная мойка и удаление стойких загрязнений с кузова и дисков. Перед следующим этапом поверхность проверяется при направленном свете.', includes: ['Кузов и колёсные арки', 'Диски и труднодоступные зоны', 'Проверка состояния покрытия'] },
  { title: 'Порядок внутри.', description: 'Очистка салона и багажного пространства с подбором средств под каждый материал. Кожаные элементы получают отдельный уход после проверки их состояния.', includes: ['Сиденья, ковры и багажник', 'Пластик и декоративные вставки', 'Очистка и уход за кожей'] },
  { title: 'Глубина цвета.', description: 'Подбор мягкой полировки по состоянию лака. Пробный участок помогает согласовать результат и выбрать сочетание пасты и круга.', includes: ['Осмотр лакокрасочного покрытия', 'Пробный участок', 'Мягкая финишная обработка'] },
  { title: 'Финальный защитный слой.', description: 'На подготовленную поверхность наносится согласованное покрытие. После завершения работ выдаются рекомендации по уходу и условиям хранения автомобиля.', includes: ['Подготовка и обезжиривание', 'Защитный состав для кузова', 'Рекомендации по дальнейшему уходу'] }
];
const careTabs = Array.from(root.querySelectorAll('[data-care]'));
function selectCareStage(index) {
  const stage = careStages[index];
  careTabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  root.querySelector('#care-panel').setAttribute('aria-labelledby', `care-tab-${index}`);
  root.querySelector('#care-step').textContent = `0${index + 1} / 04`;
  root.querySelector('#care-title').textContent = stage.title;
  root.querySelector('#care-description').textContent = stage.description;
  root.querySelector('#care-includes').replaceChildren(...stage.includes.map(text => {
    const item = document.createElement('li'); item.textContent = text; return item;
  }));
}
careTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectCareStage(index));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % careTabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + careTabs.length) % careTabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = careTabs.length - 1;
    else return;
    event.preventDefault(); selectCareStage(next); careTabs[next].focus();
  });
});

}

function initBooks(root){
 const books=[["Пиковая дама", "Александр Пушкин", 1834, "Повесть", "Германн узнаёт о трёх картах, которые якобы гарантируют выигрыш. Попытка выведать тайну старой графини превращает расчётливость в опасную одержимость.", "#b44235", "<img class=\"jacket\" alt=\"Обложка: Пиковая дама\" src=\"assets/archive/7ad2874c7d581daa83.jpg\">", "https://commons.wikimedia.org/wiki/File:Best_Russian_short_stories_%28IA_bestrussianshort00selt%29.pdf", "Скан сборника Best Russian Short Stories (1917), в который вошла повесть", "https://ilibrary.ru/text/480/p.1/index.html", "assets/archive/0fa4e44edb9ef8196e.jpg", "assets/archive/dea7780bfc0796643c.jpg", "#fff1c8"], ["Ревизор", "Николай Гоголь", 1836, "Комедия", "В уездном городе ждут проверяющего из столицы. Когда за него принимают случайного постояльца, чиновники сами помогают недоразумению разрастись.", "#a86a2c", "<img class=\"jacket\" alt=\"Обложка: Ревизор\" src=\"assets/archive/4ee63f6fe191bfe195.jpg\">", "https://commons.wikimedia.org/wiki/File:%D0%A0%D0%B5%D0%B2%D0%B8%D0%B7%D0%BE%D1%80_%28%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0%D0%B9_%D0%93%D0%BE%D0%B3%D0%BE%D0%BB%D1%8C%29_%D0%BF%D0%B5%D1%80%D0%B2%D0%BE%D0%B5_%D0%B8%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D0%B5.jpg", "Обложка первого издания, 1836", "https://ilibrary.ru/text/473/p.1/index.html", "assets/archive/c5ec41805b4267efbf.jpg", "assets/archive/ab99d270d1c16e4871.jpg", "#31271c"], ["Капитанская дочка", "Александр Пушкин", 1836, "Исторический роман", "Молодой офицер Пётр Гринёв приезжает служить в Белогорскую крепость. Восстание Пугачёва заставляет его отвечать за данное слово и за судьбу Маши Мироновой.", "#305e76", "<img class=\"jacket\" alt=\"Обложка: Капитанская дочка\" src=\"assets/archive/2161f73fe1e6dfe3ea.jpg\">", "https://commons.wikimedia.org/wiki/File:Captain%27s_Daughter_1837.jpg", "Первая страница журнальной публикации", "https://ilibrary.ru/text/107/p.1/index.html", "assets/archive/dd93caf083ba4551bb.jpg", "assets/archive/e14c5d496d9f6c4b62.jpg", "#31271c"], ["Герой нашего времени", "Михаил Лермонтов", 1840, "Роман", "Печорин предстаёт то в рассказах других людей, то на страницах собственного журнала. Из этих несовпадающих взглядов складывается портрет человека, которому тесно в любой роли.", "#353c61", "<img class=\"jacket\" alt=\"Обложка: Герой нашего времени\" src=\"assets/archive/91fea07dfb2ba4aeba.jpg\">", "https://commons.wikimedia.org/wiki/File:Geroy_nashego_vremeni.png", "Титульный лист первого издания, 1840", "https://ilibrary.ru/text/12/p.1/index.html", "assets/archive/e3af2a21f0a9b8b1a1.jpg", "assets/archive/955c1e06426a3f1b51.jpg", "#31271c"], ["Мёртвые души", "Николай Гоголь", 1842, "Поэма в прозе", "Чичиков ездит от усадьбы к усадьбе и предлагает купить крестьян, которые умерли, но ещё числятся в ревизских списках. Каждая сделка открывает характер нового хозяина.", "#466250", "<img class=\"jacket\" alt=\"Обложка: Мёртвые души\" src=\"assets/archive/d80e5a55ec1dd15434.jpg\">", "https://commons.wikimedia.org/wiki/File:Dead_Souls_%28novel%29_Nikolai_Gogol_1842_title_page.jpg", "Титульный лист первого издания, 1842", "https://ilibrary.ru/text/78/p.1/index.html", "assets/archive/224ee5da5f718d17dc.jpg", "assets/archive/393376f9b7c09b4967.jpg", "#31271c"], ["Белые ночи", "Фёдор Достоевский", 1848, "Повесть", "Четыре петербургские ночи одинокий мечтатель проводит с Настенькой. Для него знакомство становится началом любви, а она всё ещё ждёт другого.", "#34528a", "<img class=\"jacket\" alt=\"Обложка: Белые ночи\" src=\"assets/archive/74c26218192c11faf0.jpg\">", "https://commons.wikimedia.org/wiki/File:Dostoevsky_-_White_Nights_and_Other_Stories.djvu", "Скан англоязычного сборника White Nights and Other Stories", "https://ilibrary.ru/text/29/p.1/index.html", "assets/archive/c958d3529477cd023e.jpg", "assets/archive/7adaecedb0b2be59a0.jpg", "#fff1c8"], ["Обломов", "Иван Гончаров", 1859, "Роман", "Илья Ильич всё собирается заняться имением и переменить свою жизнь. Друг Штольц и встреча с Ольгой заставляют его испытать силу собственных намерений.", "#9b503a", "<img class=\"jacket\" alt=\"Обложка: Обломов\" src=\"assets/archive/16a0e862232e5176f2.jpg\">", "https://commons.wikimedia.org/wiki/File:Oblomov-russ1859.jpg", "Титульный лист первого отдельного издания, 1859", "https://ilibrary.ru/text/475/p.1/index.html", "assets/archive/0a258b3aa6eb3e6600.jpg", "assets/archive/25e1eb6793516f58a5.jpg", "#31271c"], ["Отцы и дети", "Иван Тургенев", 1862, "Роман", "Аркадий Кирсанов привозит домой своего друга Базарова. В гостях у старших спор о науке, искусстве и пользе быстро становится личным.", "#535c39", "<img class=\"jacket\" alt=\"Обложка: Отцы и дети\" src=\"assets/archive/f312e0ca0636a687ae.jpg\">", "https://commons.wikimedia.org/wiki/File:Fathers_and_Sons_cover_-_retouched.jpg", "Обложка исторического издания", "https://ilibrary.ru/text/96/p.1/index.html", "assets/archive/17c46d3d4d125ed16d.jpg", "assets/archive/43901e532f73f846c6.jpg", "#31271c"]];
 const q=s=>root.querySelector(s),stage=q('.stage'),sheet=q('.sheet'),input=q('input'),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 let list=books,pos=3,target=3,frame=0,down=null,dragged=false;
 const mod=(n,m)=>(n%m+m)%m, norm=s=>s.toLowerCase().replaceAll('ё','е').trim();
 const active=()=>list[mod(Math.round(pos),list.length)];
 function draw(){
  if(!list.length || !stage.isConnected || !stage.querySelector('.face'))return;
  const h=stage.querySelector('.face').offsetHeight,w=h*.14,g=h*.035,d=h*.62,U=h*(stage.clientWidth<700?1.05:1.3);
  stage.querySelectorAll('.volume').forEach((el,i)=>{
   const n=list.length*3,r=mod(i-pos+n/2,n)-n/2,a=Math.abs(r),o=Math.max(0,1-a),open=o*o*(3-2*o),u=r*(w+g)+(d-w+1.4*g)*(a<1?(r+Math.sin(Math.PI*r)/Math.PI)/2:Math.sign(r)*.5);
   const sc=1/(1+(Math.abs(u)/U)**1.6);let x=0;for(let v=0;v<Math.abs(u);v+=6)x+=Math.min(6,Math.abs(u)-v)/(1+(v/U)**1.6);
   el.hidden=Math.abs(u)>2*U||(list.length===1&&a>.5);el.tabIndex=-1;el.style.zIndex=Math.round(sc*100);el.style.transform='translate3d('+Math.sign(u)*x/sc+'px,'+(h*.12*(1-sc)/sc)+'px,'+(1400*(1-1/sc))+'px) rotateY('+(Math.sign(u)*Math.min(1,Math.abs(u)/U)*26*(1-open)-90*open)+'deg)';el.firstElementChild.style.filter='brightness('+(.68+.32*sc)+')';
  });
  const [title,who,year,genre]=active();if(q('h1').textContent!==title){q('.scenery').style.backgroundImage='url("'+active()[10]+'")';q('h1').textContent=title;q('.author').textContent=who;q('.meta').textContent=year+' — '+genre;q('.dot').style.left=(year-1834)/28*100+'%';if(!reduced)q('h1').animate([{clipPath:'inset(100% 0 0)'},{clipPath:'inset(0)'}],280);}
 }
 function tick(){pos+= (target-pos)*(reduced?1:.18);if(Math.abs(target-pos)<.005)pos=target;draw();frame=pos!==target?requestAnimationFrame(tick):0;}
 function move(n){target=n;if(!frame)tick();}
 function build(){cancelAnimationFrame(frame);frame=0;stage.querySelectorAll('.volume').forEach(el=>el.remove());q('.browse').hidden=!list.length;q('.empty').hidden=!!list.length;q('output').textContent='Найдено: '+list.length;list.concat(list,list).forEach((b,i)=>{const el=document.createElement('button');el.className='volume';el.style.setProperty('--pig',b[5]);el.style.setProperty('--binding','url("'+b[11]+'")');el.style.setProperty('--letter',b[12]);el.setAttribute('aria-label',b[0]);el.innerHTML='<span class="face sp">'+b[0]+'</span><span class="face front">'+b[6]+'</span>';el.onclick=()=>{if(dragged)return;const n=list.length*3,r=mod(i-pos+n/2,n)-n/2;if(Math.abs(r)<.4)show();else move(Math.round(pos+r));};stage.append(el)});draw();}
 function show(){if(!list.length)return;const b=active();q('.who').textContent=b[1];q('.when').textContent=b[2]+' / '+b[3];q('h2').textContent=b[0];q('.detailgrid p').textContent=b[4];q('.big').innerHTML=b[6];const source=q('.rights a');source.href=b[9];source.textContent='Читать бесплатно ↗';q('.browse').hidden=true;q('.tools').hidden=true;sheet.hidden=false;sheet.scrollIntoView({block:'start'});if(!reduced)sheet.animate([{clipPath:'inset(15% 38% 48%)'},{clipPath:'inset(0%)'}],{duration:480,easing:'cubic-bezier(.2,.8,.2,1)'});q('.close').focus();}
 function close(){sheet.hidden=true;q('.browse').hidden=false;q('.tools').hidden=false;draw();q('.open').focus();q('.tools').scrollIntoView({block:'start'});}
 const writer=q('.writer'),genre=q('.genre');
 function filter(){const tokens=norm(input.value).split(/\s+/);list=books.filter(b=>(!writer.value||writer.value===b[1])&&(!genre.value||genre.value===b[3])&&tokens.every(t=>norm(b.slice(0,4).join(' ')).includes(t)));pos=target=0;build();}
 input.oninput=writer.onchange=genre.onchange=filter;
 function reset(){input.value=writer.value=genre.value='';filter();input.focus();}
 q('.clear').onclick=q('.reset').onclick=reset;
 q('.prev').onclick=()=>move(Math.round(target)-1);q('.next').onclick=()=>move(Math.round(target)+1);q('.open').onclick=show;q('.close').onclick=close;
 q('.archive').onkeydown=e=>{if(e.key==='Escape'&&!sheet.hidden){e.preventDefault();e.stopPropagation();close()}else if(sheet.hidden&&e.target!==input&&list.length&&['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();move(Math.round(target)+(e.key==='ArrowLeft'?-1:1))}};
 stage.onpointerdown=e=>{down=[e.clientX,target];dragged=false};stage.onpointermove=e=>{if(!down)return;const dx=e.clientX-down[0];if(Math.abs(dx)>7){dragged=true;stage.setPointerCapture(e.pointerId);move(down[1]-dx/45)}};stage.onpointerup=stage.onpointercancel=()=>{if(down&&dragged)move(Math.round(target));down=null};stage.onwheel=e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)||e.shiftKey){e.preventDefault();move(Math.round(target)+Math.sign(e.deltaX||e.deltaY))}};
 q('.ruler').onclick=e=>{const r=e.currentTarget.getBoundingClientRect(),year=1834+28*(e.clientX-r.left)/r.width;const idx=list.reduce((a,b,i)=>Math.abs(b[2]-year)<Math.abs(list[a][2]-year)?i:a,0);move(Math.round(target)+mod(idx-Math.round(target)+list.length/2,list.length)-list.length/2)};
 build();const observer=new ResizeObserver(()=>{if(stage.isConnected)draw();else observer.disconnect()});observer.observe(stage);return ()=>{observer.disconnect();cancelAnimationFrame(frame);};
}
const demoDialog=document.querySelector('#demo-dialog');
const demoRoot=document.querySelector('#demo-host').attachShadow({mode:'open'});
let demoTrigger;
let stopDemo;
function openDemo(id,trigger){
  demoTrigger=trigger;
  demoRoot.replaceChildren(document.querySelector('#demo-'+id).content.cloneNode(true));
  demoDialog.querySelector('strong').textContent=id==='library'?'Лист':'APEX';
  demoDialog.showModal();
  if(id==='library') stopDemo=initBooks(demoRoot); else init_apex(demoRoot);
  demoDialog.scrollTop=0;
  document.body.classList.add('modal-open');
}
demoRoot.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');
  if(!link)return;
  const href=link.getAttribute('href');
  if(href.startsWith('#')){event.preventDefault();demoRoot.getElementById(href.slice(1))?.scrollIntoView();}
  if(href.startsWith('index.html#')){event.preventDefault();demoDialog.close();document.getElementById(href.split('#')[1])?.scrollIntoView();}
});
demoDialog.querySelector('button').onclick=()=>demoDialog.close();
demoDialog.addEventListener('close',()=>{stopDemo?.();stopDemo=null;demoRoot.replaceChildren();document.body.classList.remove('modal-open');demoTrigger?.focus({preventScroll:true});});
