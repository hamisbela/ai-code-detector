// Initialize Prism.js and its languages
import Prism from 'prismjs';

// Core languages
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';

// Other languages (in dependency order)
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-php';

// Theme
import 'prismjs/themes/prism.css';

export function detectLanguage(code: string): string {
  // Common language patterns
  const patterns = {
    python: /\b(def|class|import|from|if __name__ == ['"]__main__['"]:)\b/,
    javascript: /\b(const|let|var|function|=>)\b/,
    typescript: /\b(interface|type|namespace)\b|:\s*(string|number|boolean)\b/,
    java: /\b(public|private|class|void|String)\b/,
    cpp: /#include|using namespace|std::/,
    ruby: /\b(def|class|require|gem)\b|\bdo\b|\bend\b/,
    php: /<\?php|\b(function|echo|namespace)\b/,
    go: /\bfunc\b|\bpackage\b|\bimport\b/,
    rust: /\bfn\b|\blet mut\b|\buse\b/,
    sql: /\b(SELECT|INSERT|UPDATE|DELETE|FROM|WHERE)\b/i,
    html: /<[^>]*>/,
    css: /[.#][^{]+{|@media/,
    json: /^[\s]*[{[]/,
    yaml: /^[\s]*[\w]+:/,
    bash: /^[\s]*(#!\/bin\/|npm|yarn|git|docker)/,
    markdown: /^[\s]*#|^[\s]*\*[\s]*\*/
  };

  // Check each pattern
  for (const [lang, pattern] of Object.entries(patterns)) {
    if (pattern.test(code)) {
      return lang;
    }
  }

  // Default to javascript if no pattern matches
  return 'javascript';
}

export { Prism };