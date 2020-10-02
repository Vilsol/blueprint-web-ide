
const code = "body{margin:0;background:rgb(36, 36, 36);color:white;font-family:\"Roboto\", sans-serif}.App.svelte-13ojy8i{width:100vw;height:100vh}.HUD.svelte-13ojy8i{position:absolute;z-index:9999999999}.Container.svelte-13ojy8i{width:16000px;height:9000px;outline:3px solid rgb(156 156 156);background:repeating-linear-gradient(\n        00deg,\n        rgba(0 0 0 / 0%),\n        rgba(0 0 0 / 0) 39px,\n        rgb(55, 55, 55) 0,\n        rgb(55, 55, 55) 40px\n      ),\n      repeating-linear-gradient(\n        90deg,\n        rgba(0 0 0 / 0%),\n        rgba(0 0 0 / 0) 39px,\n        rgb(55, 55, 55) 0,\n        rgb(55, 55, 55) 40px\n      )}";

const styleEl = document.createElement("style");
const codeEl = document.createTextNode(code);
styleEl.type = 'text/css';

styleEl.appendChild(codeEl);
document.head.appendChild(styleEl);