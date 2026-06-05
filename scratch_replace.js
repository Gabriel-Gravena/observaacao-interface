const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /solicitacoes/g, to: "solicitações" },
  { from: /solicitacao/g, to: "solicitação" },
  { from: /Solicitacoes/g, to: "Solicitações" },
  { from: /Solicitacao/g, to: "Solicitação" },
  { from: /historico/g, to: "histórico" },
  { from: /Historico/g, to: "Histórico" },
  { from: /Nao /g, to: "Não " },
  { from: /nao /g, to: "não " },
  { from: /Cidadao/g, to: "Cidadão" },
  { from: /cidadao/g, to: "cidadão" },
  { from: /Usuario/g, to: "Usuário" },
  { from: /usuario/g, to: "usuário" },
  { from: /Gestao/g, to: "Gestão" },
  { from: /gestao/g, to: "gestão" },
  { from: /Acao/g, to: "Ação" },
  { from: /acao/g, to: "ação" },
  { from: /informacoes/g, to: "informações" },
  { from: /Informacoes/g, to: "Informações" },
  { from: /voce/g, to: "você" },
  { from: /Voce/g, to: "Você" },
  { from: /Navegacao/g, to: "Navegação" },
  { from: /navegacao/g, to: "navegação" },
  { from: /Exclusao/g, to: "Exclusão" },
  { from: /exclusao/g, to: "exclusão" },
  { from: /Edicao/g, to: "Edição" },
  { from: /edicao/g, to: "edição" },
  { from: /Atendimento municipal/g, to: "Atendimento Municipal" },
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('.git')) {
        results = results.concat(walk(file));
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.md')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('.');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Don't replace inside imports or URLs
  // So we only replace text that is shown to the user or strings.
  // Actually, standard regex replace is fine if we are careful. 'solicitacoes' might be used in API routes like `/api/solicitacoes`.
  // Let's only replace occurrences that have spaces around them or are clearly text?
  // No, `solicitações` in URL breaks. Let's fix URLs if we accidentally replace them.
  
  replacements.forEach(({from, to}) => {
    content = content.replace(from, to);
  });
  
  // Revert specific URL strings that might have been broken
  content = content.replace(/\/solicitações/g, '/solicitacoes');
  content = content.replace(/@\/api\/solicitações/g, '@/api/solicitacoes');
  content = content.replace(/use-solicitações/g, 'use-solicitacoes');
  content = content.replace(/routes\.citizenRequests = "\/cidadão\/solicitacoes"/g, 'routes.citizenRequests = "/cidadao/solicitacoes"');
  content = content.replace(/\/cidadão\//g, '/cidadao/');
  content = content.replace(/\/cidadão/g, '/cidadao');
  content = content.replace(/"cidadao"/g, '"cidadao"'); // if it was replaced inside strings
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
