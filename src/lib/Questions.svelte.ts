// Copyright © 2026 Akira Miyakoda
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const QUESTIONS = [
    { q: [2, 2, 3, 4, 5, 6, 7], a: [2, 5, 8] },
    { q: [2, 3, 4, 5, 6, 7, 8], a: [2, 5, 8] },
    { q: [3, 4, 5, 5, 6, 7, 8], a: [2, 5, 8] },
    { q: [3, 4, 5, 5, 5, 6, 7], a: [2, 5, 8] },
    { q: [3, 3, 3, 4, 5, 6, 7], a: [2, 4, 5, 7, 8] },
    { q: [3, 4, 4, 4, 5, 6, 7], a: [2, 3, 5, 8] },
    { q: [3, 3, 3, 5, 5, 6, 7], a: [4, 5, 8] },
    { q: [3, 3, 3, 5, 6, 7, 8], a: [4, 5, 8] },
    { q: [3, 3, 3, 4, 4, 4, 5], a: [3, 4, 5, 6] },
    { q: [3, 3, 3, 4, 4, 5, 5], a: [3, 4, 5, 6] },
    { q: [3, 3, 3, 4, 4, 5, 6], a: [2, 4, 5, 7] },
    { q: [3, 3, 3, 4, 5, 5, 5], a: [2, 3, 4, 5, 6] },
    { q: [3, 3, 3, 4, 5, 5, 6], a: [4, 5, 7] },
    { q: [3, 3, 3, 4, 5, 6, 8], a: [7, 8] },
    { q: [3, 3, 3, 5, 7, 7, 7], a: [4, 5, 6] },
    { q: [3, 3, 4, 4, 4, 5, 5], a: [3, 4, 5] },
    { q: [3, 3, 4, 5, 5, 5, 5], a: [3, 4, 6] },
    { q: [4, 4, 5, 5, 5, 5, 6], a: [3, 4, 6, 7] },
    { q: [4, 5, 5, 5, 5, 6, 7], a: [3, 4, 6, 7] },
    { q: [2, 3, 4, 4, 4], a: [1, 4] }, // 字牌が2枚入る形
];

export const HAND_SIZE = QUESTIONS[0].q.length;
export const QUESTION_COUNT = QUESTIONS.length;

export function getQuestion(index: number): number[] {
    return [...QUESTIONS[index].q];
}

export function getAnswer(index: number): number[] {
    return [...QUESTIONS[index].a];
}
