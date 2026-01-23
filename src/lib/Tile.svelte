<!--
 Copyright © 2026 Akira Miyakoda

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts" module>
    const TILES = [
        ["🀃", "🀇", "🀈", "🀉", "🀊", "🀋", "🀌", "🀍", "🀎", "🀏"],
        ["🀃", "🀐", "🀑", "🀒", "🀓", "🀔", "🀕", "🀖", "🀗", "🀘"],
        ["🀃", "🀙", "🀚", "🀛", "🀜", "🀝", "🀞", "🀟", "🀠", "🀡"],
    ];
    export const TILE_COUNT = TILES[0].length;
    export const COLOR_COUNT = TILES.length;
</script>

<script lang="ts">
    type Props = {
        color: number;
        index: number;
        active: boolean;
        onclick?: () => void;
    };
    let { color, index, active, onclick }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<span class:active {onclick} role="button" tabindex="-1">
    {TILES[color][index]}
</span>

<style lang="scss">
    $tile-size: min(calc(100vw / 8), 80px);

    span {
        display: inline-block;
        margin: 1px;
        font-family: "Tiles";
        font-size: $tile-size;
        line-height: $tile-size;
        opacity: 0.25;
        cursor: default;

        &.active {
            opacity: 1;
        }
    }
</style>
