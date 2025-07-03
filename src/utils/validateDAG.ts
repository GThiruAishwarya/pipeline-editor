// src/utils/validateDAG.ts
export default function validateDAG(nodes: any[], edges: any[]): boolean {
  if (nodes.length < 2) return false;

  const adj: { [key: string]: string[] } = {};
  for (const node of nodes) adj[node.id] = [];
  for (const edge of edges) {
    if (edge.source === edge.target) return false;
    adj[edge.source].push(edge.target);
  }

  const visited: { [key: string]: boolean } = {};
  const recStack: { [key: string]: boolean } = {};

  const hasCycle = (nodeId: string): boolean => {
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      recStack[nodeId] = true;

      for (const neighbor of adj[nodeId]) {
        if (!visited[neighbor] && hasCycle(neighbor)) return true;
        else if (recStack[neighbor]) return true;
      }
    }
    recStack[nodeId] = false;
    return false;
  };

  for (const node of nodes) {
    if (hasCycle(node.id)) return false;
  }

  const connected = new Set();
  for (const e of edges) {
    connected.add(e.source);
    connected.add(e.target);
  }

  return nodes.every((node) => connected.has(node.id));
}
