export function highlightJson(json: string): string {
  return json
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)/g, (match) => {
      let cls = "text-orange-400"
      if (/:$/.test(match)) {
        cls = "text-blue-400"
      }
      return `<span class="${cls}">${match}</span>`
    })
    .replace(/\b(true|false|null)\b/g, '<span class="text-purple-400">$1</span>')
    .replace(/\b(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g, '<span class="text-green-400">$1</span>')
}
