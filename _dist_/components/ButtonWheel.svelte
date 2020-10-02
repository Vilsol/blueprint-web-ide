<script lang="ts">
  import type { ButtonWheelPoint } from "@ide/models/ButtonWheel";

  export let point: ButtonWheelPoint<any>;

  const radius = 400;

  let count = 8;
  $: central = 360 / count;
</script>

<style lang="scss">
  .ColorWheel {
    width: 400px;
    height: 400px;
    position: absolute;
    z-index: 50;
    border-radius: 100%;
    overflow: hidden;
    pointer-events: none;

    & .Button {
      left: 50%;
      top: -50%;
      margin-left: -400px;
      position: absolute;
      width: 400px;
      height: 400px;
      transform-origin: 100% 100%;
      overflow: hidden;
      border-bottom: 5px solid rgba(0, 0, 0, 0);
      pointer-events: none;

      & .ActiveButton {
        width: 200px;
        height: 140px;
        position: absolute;
        background: rgba(45, 45, 45, 0.95);
        text-align: center;
        top: 280px;
        left: 220px;
        cursor: pointer;
        border-top-right-radius: 100%;
        border-top-left-radius: 100%;
        line-height: 130px;
        pointer-events: all;

        &:hover {
          background: rgba(90, 90, 90, 0.95);
        }
      }
    }
  }
</style>

<div
  class="ColorWheel"
  style="top: {point.pageY - radius / 2}px; left: {point.pageX - radius / 2}px">
  {#each { length: count } as _, i}
    <div
      class="Button"
      style="transform: rotate({90 - central / 2 + i * central}deg) skew({90 - central}deg);">
      <div
        class="ActiveButton"
        style="transform: skew({-90 + central}deg) rotate({-1 * (90 - central / 2)}deg);">
        I am {i}
      </div>
    </div>
  {/each}
</div>
