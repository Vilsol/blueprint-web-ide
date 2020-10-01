<script lang="ts">
  import type { Readable } from "svelte/store";

  export let bounds: Readable<{
    x: number;
    y: number;
    width: number;
    height: number;
    swap: boolean;
  }>;
</script>

<style lang="scss">
  .Connection {
    position: absolute;
    z-index: 10;
    pointer-events: none;
    min-height: 15px;
    min-width: 10px;
  }
</style>

<div
  class="Connection"
  style="color: red; top: {$bounds.y}px; left: {$bounds.x}px; width: {$bounds.width}px; height: {$bounds.height}px">
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 {$bounds.width} {$bounds.height}">
    {#if $bounds.swap}
      <path
        d="M {$bounds.width - 3} 3
        Q {$bounds.width / 2} 3 {$bounds.width / 2} {$bounds.height / 2} 
        M {$bounds.width / 2} {$bounds.height / 2}  
        Q {$bounds.width / 2} {$bounds.height - 3} 3 {$bounds.height - 3}"
        stroke="red"
        stroke-width="5"
        style="stroke-linecap: round; stroke-linejoin: round;"
        fill="none" />
    {:else}
      <path
        d="M 3 3
        Q {$bounds.width / 2} 3 {$bounds.width / 2} {$bounds.height / 2} 
        M {$bounds.width / 2} {$bounds.height / 2}  
        Q {$bounds.width / 2} {$bounds.height - 3} {$bounds.width - 3} {$bounds.height - 3}"
        stroke="red"
        stroke-width="5"
        style="stroke-linecap: round; stroke-linejoin: round;"
        fill="none" />
    {/if}
  </svg>
</div>
