const selection = { model: 'split', size: '20', finish: 'satin' };
const modelNames = { split: 'Split', mesh: 'Mesh', blade: 'Blade' };
const finishNames = { satin: 'Сатин', black: 'Графит', bronze: 'Бронза' };
const finishes = { satin: ['#e5e7e9', '#a2a8ae', '#4e545b'], black: ['#737a82', '#393f46', '#171b20'], bronze: ['#d1b18a', '#97734c', '#4d3825'] };
const spokes = document.querySelector('#wheel-spokes');
const preview = document.querySelector('#wheel-preview');
function renderWheel() {
  const count = selection.model === 'mesh' ? 10 : 5;
  const shapes = {
    split: '<path d="M286 253 L265 95 L277 87 L303 245Z M303 245 L324 87 L337 95 L315 257Z"/>',
    mesh: '<path d="M291 253 L255 98 L264 94 L306 249Z M303 253 L336 96 L344 100 L317 257Z"/>',
    blade: '<path d="M281 255 L273 92 L297 82 L330 100 L309 125 L316 257 L303 278Z"/>'
  };
  spokes.innerHTML = Array.from({ length: count }, (_, i) => `<g transform="rotate(${i * 360 / count} 300 291)">${shapes[selection.model]}</g>`).join('');
  ['.metal-light', '.metal-mid', '.metal-dark'].forEach((selector, i) => document.querySelector(selector).setAttribute('stop-color', finishes[selection.finish][i]));
  const scale = { 20: 0.94, 21: 0.97, 22: 1 }[selection.size];
  document.querySelector('#wheel-disc').setAttribute('transform', `translate(300 291) scale(${scale}) translate(-300 -291)`);
  const summary = `${modelNames[selection.model]} / ${selection.size}″ / ${finishNames[selection.finish]}`;
  document.querySelector('#selection-summary').textContent = summary;
  document.querySelector('#wheel-code').textContent = `AF.0${Object.keys(modelNames).indexOf(selection.model) + 1} / ${modelNames[selection.model].toUpperCase()}`;
  preview.setAttribute('aria-label', `Диск ${modelNames[selection.model]}, ${finishNames[selection.finish]}, ${selection.size} дюймов`);
}
['model', 'size', 'finish'].forEach(kind => {
  document.querySelectorAll(`[data-${kind}]`).forEach(button => button.addEventListener('click', () => {
    selection[kind] = button.dataset[kind];
    document.querySelectorAll(`[data-${kind}]`).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    renderWheel();
  }));
});
const briefDialog = document.querySelector('#brief-dialog');
let lastTrigger;
function showBrief(trigger, text) {
  lastTrigger = trigger;
  document.querySelector('#brief-selection').textContent = text;
  briefDialog.showModal();
}
document.querySelectorAll('[data-open-brief]').forEach(button => button.addEventListener('click', () => showBrief(button, button.dataset.service ? `Направление: ${button.dataset.service}` : 'Индивидуальный проект автомобиля')));
document.querySelector('#choose-wheel').addEventListener('click', event => showBrief(event.currentTarget, `Ваш выбор: APEX ${modelNames[selection.model]} / ${selection.size}″ / ${finishNames[selection.finish]}`));
document.querySelectorAll('.dialog-close, .continue-button').forEach(button => button.addEventListener('click', () => briefDialog.close()));
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
const careTabs = Array.from(document.querySelectorAll('[data-care]'));
function selectCareStage(index) {
  const stage = careStages[index];
  careTabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  document.querySelector('#care-panel').setAttribute('aria-labelledby', `care-tab-${index}`);
  document.querySelector('#care-step').textContent = `0${index + 1} / 04`;
  document.querySelector('#care-title').textContent = stage.title;
  document.querySelector('#care-description').textContent = stage.description;
  document.querySelector('#care-includes').replaceChildren(...stage.includes.map(text => {
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
