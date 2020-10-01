<script lang="ts">
  import type { Connection as ConnectionModel } from "@ide/models/Connection";
  import type { tiles } from "@ide/store";
  import { derived, get, readable, writable } from "svelte/store";
  import type { Readable } from "svelte/store";
  import Connection from "./Connection.svelte";

  export let connection: Readable<ConnectionModel>;
  export let scaling: number = 1;
  export let offsetBB: DOMRect;

  const mousePos = writable({ x: 0, y: 0 });

  // TODO Global Point Size
  const pointOffsetX = 8;
  const pointOffsetY = 10;

  function handleMouseMove(event: MouseEvent) {
    mousePos.set({
      x: event.pageX,
      y: event.pageY,
    });
  }

  const bounds = derived([connection, mousePos], ([$connection, $mousePos]) => {
    if (!$connection || !$mousePos) {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        swap: false,
      };
    }

    let left = $mousePos.x || Number.MAX_SAFE_INTEGER;
    let right = $mousePos.x;
    let top = $mousePos.y || Number.MAX_SAFE_INTEGER;
    let bottom = $mousePos.y;
    let swap = false;

    if ($connection.sourceTile) {
      const sourceTile = get($connection.sourceTile.tile);
      const sourceBounds = sourceTile.metadata.pinComponents![
        $connection.sourceTile.pin.name
      ].getBoundingClientRect();

      const x = sourceBounds.x;
      const y = sourceBounds.y;

      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);

      swap = !((left !== x && top !== y) || (right !== x && bottom !== y));
    }

    if ($connection.targetTile) {
      const targetTile = get($connection.targetTile.tile);
      const targetBounds = targetTile.metadata.pinComponents![
        $connection.targetTile.pin.name
      ].getBoundingClientRect();

      const x = targetBounds.x;
      const y = targetBounds.y;

      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);

      swap = !((left !== x && top !== y) || (right !== x && bottom !== y));
    }

    left -= offsetBB.x;
    right -= offsetBB.x;

    top -= offsetBB.y;
    bottom -= offsetBB.y;

    left /= scaling;
    right /= scaling;

    top /= scaling;
    bottom /= scaling;

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
  });
</script>

<svelte:window on:mousemove={handleMouseMove} />

<Connection {bounds} />
