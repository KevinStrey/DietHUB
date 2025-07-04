// Função para obter a data local no formato YYYY-MM-DD
export function getLocalDateString(dateObjOrString) {
  const d = dateObjOrString ? new Date(dateObjOrString) : new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Função para formatar data YYYY-MM-DD para DD/MM/YYYY
export function formatDateBr(dateStr) {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
} 