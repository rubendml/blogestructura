// Script simple para demo BFS/DFS en el grafo de 5 nodos
(function(){
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
    logEl.textContent = order.join(' -> ');
    order.forEach((id,i)=>{
      setTimeout(()=>{
        const el = document.getElementById(id);
        if(el) el.classList.add('visited');
      }, i*600);
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

  // click para seleccionar nodo
  nodes.forEach(n=>n.addEventListener('click', e=>{
    nodes.forEach(x=>x.classList.remove('selected'));
    e.target.classList.add('selected');
    selected = e.target.id;
  }));

  document.getElementById('bfsBtn').addEventListener('click', ()=>{
    if(!selected){ alert('Seleccione un nodo (clic en un círculo) antes de ejecutar BFS.'); return; }
    reset();
    const order = bfs(selected);
    highlightOrder(order);
  });

  document.getElementById('dfsBtn').addEventListener('click', ()=>{
    if(!selected){ alert('Seleccione un nodo (clic en un círculo) antes de ejecutar DFS.'); return; }
    reset();
    const order = dfs(selected);
    highlightOrder(order);
  });

  document.getElementById('resetBtn').addEventListener('click', reset);

})();
