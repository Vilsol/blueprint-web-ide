<script lang="ts">
  import type { Connection } from "@ide/models/Connection";
  import type { PinDefinition } from "@ide/models/Pin";
  import type { Tile } from "@ide/models/Tile";
  import { PIN_INPUT, PIN_OUTPUT } from "@ide/models/Pin";
  import { drawnConnection, connections, tiles, tileSelection } from "@ide/store";
  import type { TileMap } from "@ide/store";
  import { GenerateGUID } from "@ide/utils/random";
  import { onMount } from "svelte";
  import { derived, get } from "svelte/store";
  import type { Writable, Readable } from "svelte/store";

  const snapping = 1;

  export let tile: Writable<Tile>;
  export let scaling: number = 1;
  export let offsetX: number = 0;
  export let offsetY: number = 0;

  let self: HTMLElement;

  let dragging = false;

  let startX = 0;
  let startY = 0;

  let startPageX = 0;
  let startPageY = 0;

  const pinBindings: { [key: string]: HTMLElement } = {};

  const selected: Readable<boolean> = derived(tileSelection, $selection => $selection.has((get(tile) as Tile).metadata.id))

  onMount(() => {
    // TODO Make not ugly
    (self as any).ide_component = tile;
    (self as any).handleDragStart = handleDragStart;
    (self as any).handleDragEnd = handleDragEnd;

    tile.update((t) => {
      return {
        ...t,
        metadata: {
          ...t.metadata,
          component: self,
          pinComponents: pinBindings,
        },
      };
    });
  });

  function handleSelection(event: MouseEvent) {
    if (!event.ctrlKey) {
      return;
    }

    tileSelection.toggle(get(tile));
  }

  function handleDragStart(event: MouseEvent, original = true) {
    if (event.ctrlKey) {
      return; // Let's ignore ctrl clicks
    }
    
    const selected = get(tileSelection) as Set<string>;
    const id = (get(tile) as Tile).metadata.id;
    if (selected.has(id) && original) {
        for (const tile of (Object.values(get(tiles) as TileMap).map(get) as Tile[])) {
          const tileId = tile.metadata.id;
          if (id !== tileId && selected.has(tileId)) {
            (tile.metadata.component as any).handleDragStart(event, false);
          }
        }
    }

    dragging = true;
    startX = event.clientX - self.offsetLeft;
    startY = event.clientY - self.offsetTop;
    startPageX = event.pageX;
    startPageY = event.pageY;
  }

  function handleMouseMove(event: MouseEvent) {
    if (dragging) {
      const newX = startPageX - startX + ((event.pageX - startPageX) / scaling);
      const newY = startPageY - startY + ((event.pageY - startPageY) / scaling);
      tile.update((t) => {
        return {
          ...t,
          metadata: {
            ...t.metadata,
            position: {
              x: newX - (newX % snapping),
              y: newY - (newY % snapping),
            },
          },
        };
      });
    }
  }

  function handleDragEnd(event: MouseEvent, original = true) {
    if (dragging) {
      const selected = get(tileSelection) as Set<string>;
      const id = (get(tile) as Tile).metadata.id;
      if (selected.has(id) && original) {
        for (const tile of (Object.values(get(tiles) as TileMap).map(get) as Tile[])) {
          const tileId = tile.metadata.id;
          if (id !== tileId && selected.has(tileId)) {
            (tile.metadata.component as any).handleDragEnd(event, false);
          }
        }
      }

      dragging = false;
    }
  }

  function drawConnection(pin: PinDefinition) {
    const connection: Connection = {
      metadata: {
        id: GenerateGUID(),
      },
    };

    if (pin.position === PIN_OUTPUT) {
      connection.sourceTile = {
        tile,
        pin,
      };
    } else {
      connection.targetTile = {
        tile,
        pin,
      };
    }

    drawnConnection.set(connection);

    tile.update((t) => {
      return {
        ...t,
        metadata: {
          ...t.metadata,
          pinConnections: {
            ...t.metadata.pinConnections,
            [pin.name]: connection,
          },
        },
      };
    });
  }

  function releaseMouse(pin: PinDefinition) {
  // TODO Remove cast on svelte version >= 3.30
    const connection = get(drawnConnection) as any;

    if (!connection) {
      return;
    }

    if (connection.sourceTile && pin.position === PIN_INPUT) {
      connection.targetTile = {
        tile,
        pin,
      };
    } else if (connection.targetTile && pin.position === PIN_OUTPUT) {
      connection.sourceTile = {
        tile,
        pin,
      };
    }

    drawnConnection.set(undefined);

    if (connection.sourceTile && connection.targetTile) {
      connections.add(connection);

      tile.update((t) => {
        return {
          ...t,
          metadata: {
            ...t.metadata,
            pinConnections: {
              ...t.metadata.pinConnections,
              [pin.name]: connection,
            },
          },
        };
      });
    } else {
      const otherTile = connection.sourceTile || connection.targetTile;
      otherTile.tile.update((t: Tile) => {
        return {
          ...t,
          metadata: {
            ...t.metadata,
            pinConnections: {
              ...t.metadata.pinConnections,
              [otherTile.pin.name]: undefined,
            },
          },
        };
      });
    }
  }
</script>

<style lang="scss">
  .Draggable {
    width: 400px;
    position: absolute;
    user-select: none;
    cursor: auto;
    padding: 1px;

    &.Dragging {
      z-index: 1;

      & .Header {
        cursor: grabbing;
      }
    }

    & .Header {
      background: rgb(171 64 13);
      cursor: grab;
      padding: 10px;
    }

    &.Selected {
      border: 1px solid lighten(rgb(171 64 13), 50%);
      box-shadow: 0px 0px 3px 0px lighten(rgb(171 64 13), 50%);
      padding: 0px;
    }

    & .Body {
      background: rgb(23 23 23);
      display: flex;
      flex: 1;
      flex-direction: row;
      padding: 10px;

      & .Inputs,
      & .Outputs {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
      }

      & .Outputs {
        align-items: flex-end;

        & .Point {
          margin-right: 0;
          margin-left: 5px;
        }
      }

      & .Pin {
        display: flex;
        flex: 1;
        flex-direction: row;
        line-height: 15px;
        cursor: pointer;

        & .Point {
          width: 12px;
          height: 12px;
          border-radius: 12px;
          border: 2px solid white;
          margin-right: 5px;
        }
      }
    }

    & .Metadata {
      background: rgb(46 17 17);
      padding: 10px;
    }
  }
</style>

<svelte:window
  on:mousemove={handleMouseMove}
  on:mouseup={handleDragEnd} />

<div
  class="Draggable panzoom-exclude"
  class:Selected={$selected}
  style="top: {$tile.metadata.position.y}px; left: {$tile.metadata.position.x}px"
  bind:this={self}
  class:Dragging={dragging === true}>
  <div class="Header" on:mousedown={handleDragStart} on:click={handleSelection}>
    <span>{$tile.definition.name}</span>
  </div>
  <div class="Body">
    <div class="Inputs">
      {#each Object.entries($tile.definition.pins) as [_name, pin], _i}
        {#if pin.position === PIN_INPUT}
          <div
            class="Pin"
            on:mousedown={() => drawConnection(pin)}
            on:mouseup={() => releaseMouse(pin)}>
            <div bind:this={pinBindings[pin.name]} class="Point" />
            <span>{pin.name}</span>
          </div>
        {/if}
      {/each}
    </div>
    <div class="Outputs">
      {#each Object.entries($tile.definition.pins) as [_name, pin], _i}
        {#if pin.position === PIN_OUTPUT}
          <div
            class="Pin"
            on:mousedown={() => drawConnection(pin)}
            on:mouseup={() => releaseMouse(pin)}>
            <span>{pin.name}</span>
            <div bind:this={pinBindings[pin.name]} class="Point" />
          </div>
        {/if}
      {/each}
    </div>
  </div>
  <div class="Metadata">
    <span>ID: {$tile.metadata.id}</span><br />
    <span>Position: X: {$tile.metadata.position.x}, Y: {$tile.metadata.position.y}</span>
  </div>
</div>
