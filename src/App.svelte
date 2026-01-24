<!--
 Copyright © 2026 Akira Miyakoda

 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

<script lang="ts">
    import { onMount } from "svelte";
    import { getAnswer, getQuestion, HAND_SIZE, QUESTION_COUNT } from "./lib/Questions.svelte";
    import Tile, { COLOR_COUNT, TILE_COUNT } from "./lib/Tile.svelte";
    import { shuffle } from "./lib/Utils.svelte";

    const MIN_TILE = 1; // 数牌の最小値
    const MAX_TILE = 9; // 数牌の最大値

    // 状態
    let order: number[] = [];
    let showAnswer = false;
    let color = 0;
    let question: number[] = [];
    let userAnswer: boolean[] = [];
    let correctAnswer: boolean[] = [];

    // 次の問題を出題する
    function moveNext(): void {
        showAnswer = false;
        userAnswer = Array(TILE_COUNT).fill(false);
        color = Math.floor(Math.random() * COLOR_COUNT);

        // 出題順を生成（全問題が1問ずつ出るようにする）
        if (order.length === 0) {
            order = shuffle([...Array(QUESTION_COUNT).keys()]);
        }
        const index = order.pop() ?? 0;

        // 問題を作成
        const q = getQuestion(index);
        const min = MIN_TILE - Math.min(...q);
        const max = MAX_TILE + 1 - Math.max(...q);
        const offset = Math.floor(Math.random() * (max - min)) + min;
        question = [...q.map((i) => i + offset), ...Array(HAND_SIZE - q.length).fill(0)];

        // 正解を作成
        const a = new Set(
            getAnswer(index)
                .map((i) => i + offset)
                .filter((i) => MIN_TILE <= i && i <= MAX_TILE),
        );
        correctAnswer = Array.from({ length: TILE_COUNT }, (_, i) => (i === 0 ? q.length < HAND_SIZE : a.has(i)));
    }

    // 回答の切り替え
    function toggleUserAnswer(index: number): void {
        userAnswer[index] = !userAnswer[index];
    }

    // 正解表示の切り替え
    function toggleShowAnswer(): void {
        showAnswer = !showAnswer;
    }

    onMount(() => {
        moveNext();
    });

    // サービスワーカーの登録
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js", { scope: "/" });
    }
</script>

<main>
    <div class="main-box">
        <div class="title-row">麻雀 7枚形ドリル</div>
        <div class="text-row">この形の</div>
        <div class="tile-row">
            {#each question as index}
                <Tile active={true} {color} {index} />
            {/each}
        </div>
        <div class="text-row">待ちは何？</div>
        <div class="tile-row">
            {#each Array(TILE_COUNT) as _, index}
                <Tile active={userAnswer[index]} {color} {index} onclick={() => toggleUserAnswer(index)} />
            {/each}
        </div>
        <div class="text-row">正解</div>
        <div class="tile-row">
            {#each Array(TILE_COUNT) as _, index}
                <Tile active={showAnswer && correctAnswer[index]} {color} {index} />
            {/each}
        </div>
        <div class="button-row">
            <button onclick={toggleShowAnswer}>
                正解を{showAnswer ? "隠す" : "見る"}
            </button>
            <button onclick={moveNext}>次の問題へ</button>
        </div>
    </div>
    <div class="credit-box">
        <div class="credit-row">
            <a href="https://github.com/AkiraMiyakoda/7mai-drill" title="Github repository" target="_blank">
                <div class="github-icon"></div>
            </a>
        </div>
    </div>
</main>

<style lang="scss">
    $tile-size: min(calc(100vw / 8), 100px);

    .main-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        padding-top: 8vh;
    }

    .title-row {
        font-size: 1.6rem;
        font-weight: bold;
    }

    .text-row {
        font-size: 1.2rem;
        padding-top: 3vh;
    }

    .tile-row {
        padding-top: 3vh;
    }

    .button-row {
        padding-top: 5vh;
    }

    .credit-box {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100vw;
        padding-bottom: 5vh;
    }

    .github-icon {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-image: url("./assets/github.svg");
        background-size: contain;
    }
</style>
