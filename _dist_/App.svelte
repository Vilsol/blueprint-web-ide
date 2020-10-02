<script context="module">
  import * as BaseDefinitions from "./definitions";
  import * as LanguageDefinitions from "./languages";
  import { RegisterTileDefinition } from "./models/TileDefinition";
  import { RegisterLanguageTileDefinition } from "./models/LanguageTileDefinition";

  Object.values(BaseDefinitions).forEach((definition) => {
    RegisterTileDefinition(definition);
  });

  Object.entries(LanguageDefinitions).forEach(([language, definitions]) => {
    Object.values(definitions).forEach((definition) => {
      RegisterLanguageTileDefinition(language, definition);
    });
  });
</script>

<script lang="ts">
  import Draggable from "./components/Draggable.svelte";
  import DrawingConnection from "./components/DrawingConnection.svelte";
  import Connection from "./components/Connection.svelte";

  import type { Tile } from "@ide/models/Tile";
  import type { Readable } from "svelte/store";
  import type { Connection as ConnectionModel } from "@ide/models/Connection";
  import type { PanzoomObject } from "@panzoom/panzoom";
  import type { ButtonWheelPoint } from "./models/ButtonWheel";

  import { GenerateGUID } from "./utils/random";
  import { GetTileDefinition } from "./models/TileDefinition";
  import { tiles, connections, drawnConnection } from "@ide/store";
  import { derived, get, writable } from "svelte/store";
  import { Compile } from "./engine/transpiler";
  import { onMount } from "svelte";

  import Panzoom from "@panzoom/panzoom";
  import ButtonWheel from "./components/ButtonWheel.svelte";

  let compiled: string = "";

  let self: HTMLElement;

  // TODO Global Point Size
  const pointOffsetX = 8;
  const pointOffsetY = 10;

  let panzoom: PanzoomObject;

  let panScale = 0;
  let panX = 0;
  let panY = 0;

  let contextClick: undefined | ButtonWheelPoint<any>;

  onMount(() => {
    panzoom = Panzoom(self, {
      maxScale: 2,
      contain: "outside",
      setTransform: (elem: any, { scale, x, y }: any) => {
        panScale = scale;
        panX = x;
        panY = y;
        panzoom.setStyle(
          "transform",
          `scale(${scale}) translate(${x}px, ${y}px)`
        );
      },
    });
    parent.addEventListener("wheel", panzoom.zoomWithWheel);
  });

  const generateTile = () => {
    return {
      definition: GetTileDefinition("Sum")!,
      metadata: {
        id: GenerateGUID(),
        position: {
          x: document.documentElement.clientWidth / 2,
          y: document.documentElement.clientHeight / 2,
        },
      },
    };
  };

  const validConnecton = derived(drawnConnection, ($drawnConnection) => {
    return $drawnConnection as ConnectionModel;
  });

  const calculateBounds = (
    connection: Readable<ConnectionModel>
  ): Readable<{
    x: number;
    y: number;
    width: number;
    height: number;
    swap: boolean;
  }> => {
    const conn = get(connection) as ConnectionModel | undefined;

    if (!conn || !conn.sourceTile || !conn.targetTile) {
      return writable({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        swap: false,
      });
    }

    return derived(
      [conn.sourceTile.tile, conn.targetTile.tile],
      ([sourceTile, targetTile]) => {
        let left = Number.MAX_SAFE_INTEGER;
        let right = 0;
        let top = Number.MAX_SAFE_INTEGER;
        let bottom = 0;

        const sourceBounds = sourceTile.metadata.pinComponents![
          conn!.sourceTile!.pin.name
        ].getBoundingClientRect();

        const targetBounds = targetTile.metadata.pinComponents![
          conn!.targetTile!.pin.name
        ].getBoundingClientRect();

        left = Math.min(left, sourceBounds.x);
        right = Math.max(right, sourceBounds.x);
        top = Math.min(top, sourceBounds.y);
        bottom = Math.max(bottom, sourceBounds.y);

        left = Math.min(left, targetBounds.x);
        right = Math.max(right, targetBounds.x);
        top = Math.min(top, targetBounds.y);
        bottom = Math.max(bottom, targetBounds.y);

        const swap = !(
          (left !== targetBounds.x && top !== targetBounds.y) ||
          (right !== targetBounds.x && bottom !== targetBounds.y)
        );

        top -= pointOffsetY - 4;

        const containerBB = self.getBoundingClientRect();

        left -= containerBB.x;
        right -= containerBB.x;

        top -= containerBB.y;
        bottom -= containerBB.y;

        left /= panScale;
        right /= panScale;

        top /= panScale;
        bottom /= panScale;

        // TODO Fix zoom scaling for point offsets
        left += pointOffsetX;
        right += pointOffsetX;

        top += pointOffsetY;
        bottom += pointOffsetY;

        return {
          x: left,
          y: top,
          width: right - left,
          height: bottom - top,
          swap,
        };
      }
    );
  };

  const onRightClick = (event: MouseEvent) => {
    event.preventDefault();

    let current = event.target;
    while (current && !("ide_component" in current)) {
      current = (current as HTMLElement).parentElement;
    }

    if (!current) {
      contextClick = undefined;
    } else {
      contextClick = {
        pageX: event.pageX,
        pageY: event.pageY,
        offsetX: event.offsetX,
        offsetY: event.offsetY,
        context: (current as any).ide_component,
      };
    }
  };
</script>

<style>
  :global(body) {
    margin: 0;
    background: rgb(36, 36, 36);
    color: white;
    font-family: "Roboto", sans-serif;
  }

  .App {
    width: 100vw;
    height: 100vh;
  }

  .HUD {
    position: absolute;
    z-index: 9999999999;
  }

  .Container {
    width: 16000px;
    height: 9000px;
    outline: 3px solid rgb(156 156 156);
    background: repeating-linear-gradient(
        00deg,
        rgba(0 0 0 / 0%),
        rgba(0 0 0 / 0) 39px,
        rgb(55, 55, 55) 0,
        rgb(55, 55, 55) 40px
      ),
      repeating-linear-gradient(
        90deg,
        rgba(0 0 0 / 0%),
        rgba(0 0 0 / 0) 39px,
        rgb(55, 55, 55) 0,
        rgb(55, 55, 55) 40px
      );
  }
</style>

<div class="App" style="background-position: {panX}px {panY}px">
  <div class="HUD">
    <button on:click={() => tiles.add(generateTile())}>Add Draggable</button>
    <button on:click={() => (compiled = Compile())}>Compile</button>
    <button on:click={() => panzoom.zoom(0.9)}>0.90</button>
    <br /> Total Draggables: {Object.values($tiles).length}
    <br /> Scale: {panScale}
    <br /> X: {panX}
    <br /> Y: {panY}
    <br />
    <textarea cols="100" rows="10">{compiled}</textarea>
  </div>

  {#if contextClick}
    <ButtonWheel point={contextClick} />
  {/if}

  <div class="Container" bind:this={self} on:contextmenu={onRightClick}>
    {#if $drawnConnection}
      <DrawingConnection
        connection={validConnecton}
        offsetBB={self.getBoundingClientRect()}
        scaling={panScale} />
    {/if}

    {#each Object.values($tiles) as tile}
      <Draggable {tile} scaling={panScale} offsetX={panX} offsetY={panY} />
    {/each}

    {#each Object.values($connections) as connection}
      <Connection bounds={calculateBounds(connection)} />
    {/each}
  </div>
</div>
