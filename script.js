// ====== CONFIGURE AQUI ======
const WHATSAPP = "5562994088097";          // (62) 99408-8097
const INSTAGRAM = "https://instagram.com/_dekarmy_";

// cats: pintado | colorido | personalizado  (uma peça pode ter mais de uma)
const TRABALHOS = [
  {nome:"Batman", img:"fotos/01-batman.jpg", cats:["pintado"], tag:"Pintado à mão",
   desc:"Miniatura do Batman em pé sobre uma base temática. Impressa em 3D e pintada à mão, com detalhes dourados no cinto e no símbolo."},
  {nome:"Boneco personalizado", img:"fotos/02-clayton.jpg", cats:["pintado","personalizado"], tag:"Personalizado",
   desc:"Boneco estilo chibi feito a partir do cliente: boné, barba, camiseta e até o ônibus ao lado. A base leva o nome em relevo. Pintado à mão."},
  {nome:"Majin Buu", img:"fotos/03-majin-buu.jpg", cats:["colorido"], tag:"Impresso já colorido",
   desc:"Impresso em várias partes, cada uma já na cor do personagem, e depois colado. Sem tinta: a cor vem direto do filamento."},
  {nome:"Link (Zelda)", img:"fotos/04-link.jpg", cats:["pintado"], tag:"Pintado à mão",
   desc:"Impresso em várias partes, montado e depois pintado à mão. Espada, escudo, botas e as costuras da túnica foram pintados um a um."},
  {nome:"Ocarina do Zelda", img:"fotos/05-ocarina.jpg", cats:["colorido"], tag:"Impresso já colorido",
   desc:"Ocarina impressa já na cor azul, sem pintura, com uma base branca que traz o símbolo da Triforce gravado."},
  {nome:"Totoro", img:"fotos/06-totoro.jpg", cats:["pintado"], tag:"Pintado à mão",
   desc:"O Totoro com seu guarda-chuva. Peça impressa em 3D e pintada à mão em tons de cinza, com a barriga clara e a folha verde na cabeça."},
  {nome:"Gatinho Jão", img:"fotos/07-gato-jao.jpg", cats:["personalizado","pintado"], tag:"Criação própria",
   desc:"Criado do zero: modelamos, imprimimos e pintamos. Na foto, a peça ainda na mesa da impressora, com o nome na base."},
  {nome:"Chaveiro da cauda do Banguela", img:"fotos/08-chaveiro-banguela.jpg", cats:["pintado"], tag:"Chaveiro",
   desc:"Chaveiro da cauda do Banguela, de Como Treinar o Seu Dragão. Impresso em 3D, com a parte vermelha e o símbolo pintados à mão."}
];
// ============================

const grid = document.getElementById("grid");
const wa = txt => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;

function render(filtro="todos"){
  grid.innerHTML = TRABALHOS.filter(p => filtro==="todos" || p.cats.includes(filtro)).map(p => `
    <article class="card">
      <button class="thumb" data-img="${p.img}" data-alt="${p.nome}" aria-label="Ampliar foto: ${p.nome}">
        <span class="tag">${p.tag}</span>
        <img src="${p.img}" alt="${p.nome}" loading="lazy">
      </button>
      <div class="info">
        <h3>${p.nome}</h3><p>${p.desc}</p>
        <a class="btn" target="_blank" rel="noopener" href="${wa(`Olá! Vi o trabalho "${p.nome}" no site da Dekarmy e quero um parecido.`)}">Quero um parecido</a>
      </div>
    </article>`).join("");
}
render();

document.getElementById("filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if(!b) return;
  document.querySelectorAll("#filters button").forEach(x => x.classList.remove("on"));
  b.classList.add("on"); render(b.dataset.f);
});

// ampliar foto
const lb = document.getElementById("lightbox"), lbImg = lb.querySelector("img");
grid.addEventListener("click", e => {
  const t = e.target.closest(".thumb"); if(!t) return;
  lbImg.src = t.dataset.img; lbImg.alt = t.dataset.alt; lb.hidden = false;
  lb.querySelector("button").focus();
});
lb.addEventListener("click", () => lb.hidden = true);
document.addEventListener("keydown", e => { if(e.key==="Escape") lb.hidden = true; });

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(e.target);
  window.open(wa(`Olá! Sou ${d.get("nome")} e quero um boneco personalizado: ${d.get("msg")}`), "_blank");
});

const menu = document.getElementById("menu"), btn = document.getElementById("menuBtn");
btn.addEventListener("click", () => btn.setAttribute("aria-expanded", menu.classList.toggle("open")));
menu.addEventListener("click", e => { if(e.target.tagName==="A") menu.classList.remove("open"); });

document.getElementById("wpp").href = wa("Olá! Vim pelo site da Dekarmy.");
document.getElementById("insta").href = INSTAGRAM;
document.getElementById("ano").textContent = new Date().getFullYear();
