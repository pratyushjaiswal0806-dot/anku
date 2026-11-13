// Tiny, nesting-safe text splitter (keeps <em>, <strong>, <br> intact).

function walkText(root, onText) {
  [...root.childNodes].forEach((n) => {
    if (n.nodeType === 3) onText(n);
    else if (n.nodeType === 1 && n.tagName !== 'BR') walkText(n, onText);
  });
}

/** Wrap every word in <span class="word">, optionally inside an overflow mask. */
export function splitWords(el, { mask = false } = {}) {
  if (el._words) return el._words;
  const words = [];
  walkText(el, (node) => {
    const frag = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(part));
      const w = document.createElement('span');
      w.className = 'word';
      w.textContent = part;
      if (mask) {
        const m = document.createElement('span');
        m.className = 'wmask';
        m.appendChild(w);
        frag.appendChild(m);
      } else frag.appendChild(w);
      words.push(w);
    });
    node.replaceWith(frag);
  });
  el._words = words;
  return words;
}

/** Wrap every character in <span class="char"> (words kept together to avoid bad breaks). */
export function splitChars(el) {
  if (el._chars) return el._chars;
  const chars = [];
  walkText(el, (node) => {
    const frag = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(part));
      const word = document.createElement('span');
      word.className = 'cword';
      [...part].forEach((ch) => {
        const c = document.createElement('span');
        c.className = 'char';
        c.textContent = ch;
        word.appendChild(c);
        chars.push(c);
      });
      frag.appendChild(word);
    });
    node.replaceWith(frag);
  });
  el._chars = chars;
  return chars;
}
