// Script simple para demo BFS/DFS en el grafo de 5 nodos
/* Demo BFS/DFS actualizado:
   - Mantén la estructura de lista de adyacencia en `adj`.
   - Cambia los tiempos de animación modificando `ANIM_DELAY`.
*/
(function(){
  const ANIM_DELAY = 520; // ms entre nodos (personalizable)

  const adj = {
    A: ['B','E'],
    B: ['A','C'],
    C: ['B','D','E'],
    D: ['C','E'],
    E: ['A','C','D']
  };

  const nodes = Array.from(document.querySelectorAll('.node'));
  const logEl = document.getElementById('log');
  let selected = null;

  function reset(){
    nodes.forEach(n=>n.classList.remove('visited','selected'));
    logEl.textContent = '';
    selected = null;
  }

  function highlightOrder(order){
    logEl.textContent = order.join(' → ');
    order.forEach((id,i)=>{
      setTimeout(()=>{
        const el = document.getElementById(id);
        if(el) el.classList.add('visited');
      }, i*ANIM_DELAY);
    });
  }

  function bfs(start){
    const visited = new Set();
    const q = [start];
    const order = [];
    visited.add(start);
    while(q.length){
      const u = q.shift();
      order.push(u);
      for(const v of adj[u]){
        if(!visited.has(v)){
          visited.add(v);
          q.push(v);
        }
      }
    }
    return order;
  }

  function dfs(start){
    const visited = new Set();
    const order = [];
    function visit(u){
      visited.add(u); order.push(u);
      for(const v of adj[u]) if(!visited.has(v)) visit(v);
    }
    visit(start);
    return order;
  }

  // click para seleccionar nodo (soporta click en <text> o <circle>)
  nodes.forEach(n=>{
    const onClick = (e)=>{
      // si el usuario clicó el texto interior, el target puede ser <text>
      const el = e.target.tagName === 'text' ? document.getElementById(e.target.textContent) : e.currentTarget;
      nodes.forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected');
      selected = el.id;
    };
    // si el nodo es circle, añade listener al circle y también al text adyacente
    n.addEventListener('click', onClick);
    const txt = n.nextElementSibling;
    if(txt && txt.tagName === 'text') txt.addEventListener('click', onClick);
  });

  document.getElementById('bfsBtn').addEventListener('click', ()=>{
    if(!selected){ alert('Seleccione un nodo (clic en un círculo) antes de ejecutar BFS.'); return; }
    // limpiar estilos y mostrar orden
    nodes.forEach(x=>x.classList.remove('visited'));
    const order = bfs(selected);
    highlightOrder(order);
  });

  document.getElementById('dfsBtn').addEventListener('click', ()=>{
    if(!selected){ alert('Seleccione un nodo (clic en un círculo) antes de ejecutar DFS.'); return; }
    nodes.forEach(x=>x.classList.remove('visited'));
    const order = dfs(selected);
    highlightOrder(order);
  });

  document.getElementById('resetBtn').addEventListener('click', reset);

})();
