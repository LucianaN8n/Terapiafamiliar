
// Mentor — Terapia Familiar e de Casais (ISC)
// Zero eval, sem libs externas; imprime via window.print.

const el = (id) => document.getElementById(id);
const saidaCard = el('saidaCard');
const saida = el('saida');

// Vocabulário para classificação leve
const routes = [
  {cat: "Dependência Emocional", keys: ["ciúme","ciumes","controle","controla","checar","aprovação","posse","dependente","apego ansioso"]},
  {cat: "Relacionamentos Tóxicos", keys: ["xingar","desqualifica","gaslighting","gas-lighting","humilha","ameaça","tóxico","toxica","abusivo","abuso"]},
  {cat: "Terapia Familiar e de Casal", keys: ["desalinhados","distância","conexão","discussão","briga","rotina","reconexão","conflito","comunicação"]},
  {cat: "Terapia em Lutos e Perdas", keys: ["luto","perda","morte","falecimento","saudade","culpa","enlutado"]},
  {cat: "Educação Parental", keys: ["filho","filhos","adolescente","criança","parental","pais","limites","regra","castigo","comportamento","tarefa"]},
  {cat: "Terapia do Imago e Comunicação Assertiva", keys: ["não me ouve","nao me ouve","escuta","imago","comunicação","assertiva","validar","eu-mensagem"]},
  {cat: "Educação Parental e Terapia Estratégica", keys: ["birra","birras","rotina","acordos","estratégica","estrategica","paradoxo","tarefa paradoxal"]},
  {cat: "Terapia Estrutural e Transgeracional", keys: ["triangulação","triangulacao","genograma","fronteira","coalizão","coalizao","transgeracional","padrões","padroes","parentificação","parentificacao","minuchin"]},
];

// Banco de técnicas (resumo do material enviado)
const TECNICAS = {
  "Imago": {
    titulo: "Exercício de Ressignificação — Diálogo de Imago",
    quando: "Brigas repetitivas, sensação de 'não sou ouvido', ciclo perseguidor–evitador.",
    objetivo: [
      "Transformar críticas/defesas em compreensão e conexão.",
      "Ressignificar gatilhos do 'par invisível' (imprints infantis)."
    ],
    passos: [
      "Defina papéis: Emissor (fala) e Receptor (espelha). Sem interrupções.",
      "Emissor: 'Quando ____, eu me sinto ____ e preciso de ____.'",
      "Receptor espelha: 'Se entendi, quando ____, você se sente ____ e precisa de ____. É isso?'",
      "Validação: 'Faz sentido você se sentir assim porque ____.'",
      "Empatia: 'Imagino que isso traga ____/medo de ____/dor em ____.'",
      "Ressignificação: conectar com imagem raiz (infância). Receptor oferece simbolicamente o que faltou.",
      "Contrato de 7 dias: 1 microcomportamento observável por pessoa."
    ],
    tarefa: "3 diálogos curtos/semana + Diário do Insight (3 linhas/dia).",
    metricas: "Interrupções por diálogo; escala 0–10 'sinto-me ouvido'."
  },
  "CNV": {
    titulo: "CNV Focada + Assertividade",
    quando: "Críticas difusas, 'você nunca/sempre', sarcasmo.",
    objetivo: ["Reduzir ataques/defesas", "Estruturar pedidos claros e negociáveis"],
    passos: [
      "Observação: descreva o fato sem julgamento.",
      "Sentimento: nomeie 1–2 emoções.",
      "Necessidade: o que é importante para você nesse contexto.",
      "Pedido: específico, positivo, com tempo e contexto (teste de 7 dias)."
    ],
    tarefa: "1 conversa por dia (tema leve) usando CNV.",
    metricas: "Qtd. de conversas concluídas sem escalada (meta crescente)."
  },
  "TimeOut": {
    titulo: "Ritual de Time-Out e Reconexão",
    quando: "Escalada iminente (voz alta, interrupções, taquicardia).",
    objetivo: ["Interromper escaladas", "Retomar com clareza e limite de tempo"],
    passos: [
      "Código pré-acordado (palavra/gesto).",
      "Pausa 20–40 min com regulação (respiração 4–6, água, caminhar).",
      "Retorno marcado: 'Voltamos às __:__ por 15 min com CNV.'",
      "Fechamento: 1 coisa que funcionou + 1 ajuste."
    ],
    tarefa: "Ensaiar 2 vezes/semana, mesmo sem conflito.",
    metricas: "Tempo de escalada antes de acionar pausa; nº de reconexões realizadas."
  },
  "Checkin": {
    titulo: "Check-in 10–10–10",
    quando: "Distância emocional; pouca conexão.",
    objetivo: ["Manutenção do vínculo", "Prevenir acúmulo de microfrustrações"],
    passos: [
      "10 min para A falar.",
      "10 min para B falar.",
      "10 min para 'nós' (1 microação planejada)."
    ],
    tarefa: "3× por semana.",
    metricas: "Escala 0–10 de conexão semanal."
  },
  "DiarioCiume": {
    titulo: "Diário do Ciúme + Prevenção de Resposta",
    quando: "Ciúme/checar celular, controle, dependência emocional.",
    objetivo: ["Tornar o ciúme observável", "Desacoplar controle do impulso"],
    passos: [
      "Registrar gatilho → pensamento → emoção → impulso.",
      "Aguardar 20–30 min antes de checar.",
      "Comunicar com eu-mensagem/planejar conversa CNV."
    ],
    tarefa: "Diário por 14 dias.",
    metricas: "Redução de checks/dia; aumento da latência."
  },
  "Luto": {
    titulo: "Roda do Luto & Ritual de Despedida",
    quando: "Perda recente, culpa, saudade persistente.",
    objetivo: ["Integrar significados", "Avançar nas tarefas do luto"],
    passos: [
      "Identificar estágio predominante.",
      "Carta não enviada (o que ficou por dizer).",
      "Ritual simbólico (data/local/fala de despedida).",
      "Plano de cuidado individual e do casal/família."
    ],
    tarefa: "5 min/dia com a memória + 1 gesto de cuidado.",
    metricas: "Oscilação de intensidade; capacidade de retomar rotinas."
  },
  "Parental": {
    titulo: "Aliança Parental & Regras de Coparentalidade",
    quando: "Divergência na criação; inconsistência de regras.",
    objetivo: ["Previsibilidade para os filhos", "Unidade parental"],
    passos: [
      "Mapa de 3 valores não negociáveis.",
      "Top 5 regras curtas, positivas e observáveis.",
      "Consequências combinadas, proporcionais e sem humilhação.",
      "Reunião semanal (20 min) para revisar e ajustar.",
      "Ritual de reparo pós-conflito com filhos."
    ],
    tarefa: "Colar regras visíveis; diário de consistência (sim/não).",
    metricas: "Divergências entre pais por semana."
  },
  "Escultura": {
    titulo: "Escultura Familiar Breve (Estrutural)",
    quando: "Coalizões/Fracas fronteiras geracionais; triangulações.",
    objetivo: ["Tornar visíveis fronteiras", "Reestruturar proximidades"],
    passos: [
      "Cada membro posiciona os demais (distância/orientação).",
      "Explorar significado da distância.",
      "Reestruturar: aproximar díades funcionais e reforçar fronteiras geracionais.",
      "Ensaiar interação nas novas posições."
    ],
    tarefa: "Foto/esboço da nova escultura; 1 gesto/dia que confirma a posição.",
    metricas: "Conflitos por triangulação/semana."
  },
  "Genograma": {
    titulo: "Genograma Transgeracional Focado em Vínculo",
    quando: "Repetições de ciúme/abandono/segredos; lealdades invisíveis.",
    objetivo: ["Mapear scripts herdados", "Criar atos de interrupção"],
    passos: [
      "3 gerações com símbolos de rupturas/lutos.",
      "Marcar crenças herdadas-chave.",
      "Perguntar: 'O que repito sem perceber?' e definir ato de interrupção."
    ],
    tarefa: "Carta 'Eu paro aqui' (1 página), lida em sessão.",
    metricas: "Consciência de padrão (0–10); nº de atos/semana."
  },
  "Paradoxo": {
    titulo: "Tarefa Paradoxo-Leve (Estratégica)",
    quando: "Brigas previsíveis; insistência em 'provar ponto'.",
    objetivo: ["Desarmar controle/escalada por via paradoxal"],
    passos: [
      "Horário oficial para discutir (ex.: 19:30–19:45).",
      "Fora desse bloco, discussão é proibida (regra do humor).",
      "Cartões de fala (2 por pessoa). Acabou, encerra."
    ],
    tarefa: "Aplicar 7 dias; registrar intensidade pós-bloco (0–10).",
    metricas: "Queda de intensidade/semana."
  },
  "Funcoes": {
    titulo: "Reatribuição de Papéis & Contrato de Funções (Estrutural)",
    quando: "Parentificação de filhos; triangulação crônica.",
    objetivo: ["Devolver funções aos pais", "Proteger fronteiras geracionais"],
    passos: [
      "Listar tarefas/papéis do filho como 'quase-cônjuge'.",
      "Redistribuir para o adulto competente.",
      "Contrato: quando X, adulto Y assume; filho Z fica fora."
    ],
    tarefa: "Checklist semanal + reforço positivo visível.",
    metricas: "Vezes que o filho é puxado ao conflito (meta 0)."
  },
  "Impacto15": {
    titulo: "Protocolo Assertivo de Alto Impacto (3 Etapas)",
    quando: "Tema único difícil, necessidade de resolução rápida.",
    objetivo: ["Resolver 1 tema em 15–20 min", "Gerar ajuste testável de 7 dias"],
    passos: [
      "Contexto & boa intenção ('Quero resolver isso para ficarmos bem').",
      "Fato–Sentimento–Pedido (3 min por pessoa).",
      "Negociar 1 ajuste testável por 7 dias + definir métrica."
    ],
    tarefa: "Reavaliar em 7 dias; manter ou ajustar.",
    metricas: "Taxa de cumprimento do ajuste; satisfação 0–10."
  }
};

// Tabelas por categoria
const CAT_TO_TECHS = {
  "Dependência Emocional": ["Imago","CNV","TimeOut","DiarioCiume","Impacto15"],
  "Relacionamentos Tóxicos": ["CNV","TimeOut","Paradoxo","Impacto15"],
  "Terapia Familiar e de Casal": ["Imago","Checkin","CNV","Impacto15"],
  "Terapia em Lutos e Perdas": ["Luto","CNV","Impacto15"],
  "Educação Parental": ["Parental","Impacto15"],
  "Terapia do Imago e Comunicação Assertiva": ["Imago","CNV","Checkin","Impacto15"],
  "Educação Parental e Terapia Estratégica": ["Parental","Paradoxo","Impacto15"],
  "Terapia Estrutural e Transgeracional": ["Escultura","Genograma","Funcoes","Impacto15"]
};

function classify(queixa){
  const q = (queixa||"").toLowerCase();
  let best = "Terapia Familiar e de Casal";
  for(const r of routes){
    for(const k of r.keys){
      if(q.includes(k)){ return r.cat; }
    }
  }
  return best;
}

function plan4weeks(cat){
  // Plano genérico com microtarefas
  const linhas = [
    {semana:"Semana 1 — Mapeamento & Alívio Rápido", itens:[
      "Psicoeducação breve sobre o padrão identificado.",
      "1 técnica base aplicada em sessão (roteiro assistido).",
      "Tarefa diária de 10–15 min (microação)."
    ]},
    {semana:"Semana 2 — Treino de Comunicação & Fronteiras", itens:[
      "2 ensaios guiados com feedback.",
      "Contrato de 7 dias com comportamentos observáveis."
    ]},
    {semana:"Semana 3 — Consolidação & Prevenção de Recaída", itens:[
      "Ritual de reparo pós-conflito.",
      "Métricas simples (0–10) e revisão de gatilhos."
    ]},
    {semana:"Semana 4 — Autonomia & Próximos Passos", itens:[
      "Checklist do que funcionou e do que manter.",
      "Plano de manutenção (1 encontro/semana por 20 min)."
    ]},
  ];
  return linhas;
}

function renderTecnica(key){
  const t = TECNICAS[key];
  if(!t) return "";
  const li = (arr)=> arr.map(x=>`<li>${x}</li>`).join("");
  return `
  <div class="block">
    <strong>${t.titulo}</strong>
    <div class="muted">Quando usar: ${t.quando}</div>
    <div><em>Objetivos</em>:</div>
    <ul>${li(t.objetivo)}</ul>
    <div><em>Passo a passo</em>:</div>
    <ol>${t.passos.map(x=>`<li>${x}</li>`).join("")}</ol>
    <div><em>Tarefa de casa</em>: ${t.tarefa}</div>
    <div><em>Métricas</em>: ${t.metricas}</div>
  </div>`;
}

function gerarProtocolo(){
  const terapeuta = el('terapeuta').value.trim() || "—";
  const cliente = el('cliente').value.trim() || "—";
  const queixa = el('queixa').value.trim();
  if(!queixa){ alert("Descreva a queixa principal."); return; }

  const cat = classify(queixa);
  const techs = CAT_TO_TECHS[cat] || ["Imago","CNV","Impacto15"];
  const plano = plan4weeks(cat);

  const hoje = new Date().toLocaleDateString("pt-BR");
  let html = `
    <div class="tag">${cat}</div>
    <h3>Síntese Clínica</h3>
    <p>${queixa ? 'Com base na queixa descrita, identifica-se um padrão compatível com <strong>'+cat+'</strong>, com manutenção por reforços (emoções não validadas, fronteiras difusas, escalada por comunicação defensiva).': ''}</p>

    <h3>Hipótese Funcional</h3>
    <p>O ciclo se mantém por gatilhos específicos que disparam emoções intensas, seguidas de respostas automáticas (ataque/defesa/controle/evitação). Intervenções focam <strong>validação + fronteiras + microacordos</strong> e treino de <strong>comunicação assertiva</strong>.</p>

    <h3>Objetivos</h3>
    <ul>
      <li>Reduzir escaladas e aumentar sensação de ser ouvido.</li>
      <li>Estabelecer contratos de comportamento observáveis por 7 dias.</li>
      <li>Fortalecer vínculo/aliança (check-ins, reparos) e proteção de fronteiras.</li>
    </ul>

    <h3>Técnicas Selecionadas</h3>
    ${techs.slice(0,3).map(renderTecnica).join("")}

    <h3>Plano de Ação (4 Semanas)</h3>
    <ul>
      ${plano.map(p=>`<li><strong>${p.semana}:</strong> ${p.itens.join(" • ")}</li>`).join("")}
    </ul>

    <h3>Métricas Simples</h3>
    <ul>
      <li>Conexão percebida (0–10) — registrar 2×/semana.</li>
      <li>Nº de discussões com time-out aplicado e reconexão marcada.</li>
    </ul>

    <p class="muted">Gerado em ${hoje} • Terapeuta: ${terapeuta} • Cliente(s): ${cliente}</p>
  `;

  saida.innerHTML = html;
  saidaCard.classList.remove('hidden');
  window.scrollTo({top: saidaCard.offsetTop-12, behavior: 'smooth'});
}

function copiar(){
  const tmp = document.createElement('div');
  tmp.innerHTML = saida.innerText;
  const texto = tmp.innerText;
  navigator.clipboard.writeText(texto).then(()=>{
    alert("Protocolo copiado para a área de transferência.");
  });
}


async function baixar(){
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({unit:'pt', format:'a4'});
  const content = saida.innerHTML;
  doc.html(content, {
    callback: function (doc) {
      doc.save("protocolo.pdf");
    },
    margin: [20,20,20,20],
    autoPaging: 'text',
    x: 20, y: 20, width: 550
  });
}

function limpar(){
  el('terapeuta').value = "";
  el('cliente').value = "";
  el('queixa').value = "";
  saida.innerHTML = "";
  saidaCard.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', ()=>{
  el('gerar').addEventListener('click', gerarProtocolo);
  el('copiar').addEventListener('click', copiar);
  el('baixar').addEventListener('click', baixar);
  el('limpar').addEventListener('click', limpar);
});
