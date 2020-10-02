
const code = ".Connection.svelte-genuzz{position:absolute;z-index:10;pointer-events:none;min-height:15px;min-width:10px}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);