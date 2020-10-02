
const code = ".ColorWheel.svelte-18tb1ts.svelte-18tb1ts{width:400px;height:400px;position:absolute;z-index:50;border-radius:100%;overflow:hidden;pointer-events:none}.ColorWheel.svelte-18tb1ts .Button.svelte-18tb1ts{left:50%;top:-50%;margin-left:-400px;position:absolute;width:400px;height:400px;transform-origin:100% 100%;overflow:hidden;border-bottom:5px solid rgba(0, 0, 0, 0);pointer-events:none}.ColorWheel.svelte-18tb1ts .Button .ActiveButton.svelte-18tb1ts{width:200px;height:140px;position:absolute;background:rgba(45, 45, 45, 0.95);text-align:center;top:280px;left:220px;cursor:pointer;border-top-right-radius:100%;border-top-left-radius:100%;line-height:130px;pointer-events:all}.ColorWheel.svelte-18tb1ts .Button .ActiveButton.svelte-18tb1ts:hover{background:rgba(90, 90, 90, 0.95)}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);