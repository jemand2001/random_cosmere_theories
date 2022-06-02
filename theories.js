
/** @type HTMLSpanElement */
const theorySpan = document.getElementById("theory");
/** @type HTMLSpanElement */
const allianceSpan = document.getElementById("alliance");

/**
 * @param {T[]} arr the array to choose from
 * @returns {T} a randomly chosen element from {arr}
 */
function choose(arr) {
  return arr?.[Math.floor(Math.random() * arr?.length)];
}

/**
 * @param {T[]} a1 the first array
 * @param {T[]} a2 the second array
 * @returns {T[]} the elements of the first array interleaved with the second array
 * 
 * example: interleave([1, 2, 3], [4, 5, 6]) => [1, 4, 2, 5, 3, 6]
 */
function interleave(a1, a2) {
    return a1.flatMap((v, i) => [v, a2[i]])
}

/**
 * @param {string[]} strings the array of literal strings produced by a tagged string template
 * @param {string[][]} arrays an array of string arrays to choose from
 */
function build(strings, ...arrays) {
    return interleave(strings, arrays.map(choose)).join('')
}

fetch("theories.json")
  .then((b) => b.json())
  .then((config) => {
    const { noun, verb, place, action, noun2, verb2, grouping } = config;
    window["generateTheory"] = function () {
        theorySpan.innerHTML = build`${noun} ${verb} ${place} ${action} ${noun2}`;
        allianceSpan.innerHTML = build`${noun} ${verb2} ${noun}`
    };
    generateTheory()
  });
