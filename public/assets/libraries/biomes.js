// Welcome to the Biomes Library!

// Here is where all the biomes are kept, at the moment in the form of a list of arrays.
// At the bottom we have a biomes object which is the index that holds all of the arrays with the actual biome blueprints.
// This way we can keep the biomes' names while still treating them as though they were in a list (so our randomizer can randomly grab them)
// NOTE: If we ever do jazz up the start screen it should be given a wierd number so it can't be chosen by the randomizer.

const startStage = [
  // first index position for each column is the BOTTOM row.
  // Block printer will render this pattern from left to right.
  // ZERO is a placeholder for, you guessed it, an empty block!
  [3, 1, 1, 2], // column zero,
  [4, 3, 1, 5], // column one...
  [4, 3, 1, 5], // column two...
  [4, 3, 1, 1],
  [4, 3, 3, 1, 0, 0, 1, 2],
  [4, 3, 3, 1, 0, 0, 1],
  [4, 3, 1, 1],
  [4, 3, 1, 1, 2],
  [4, 3, 1, 2], // column eight
  [4, 3, 1, 2],
  [4, 3, 1, 9, 9],
  [4, 3, 0, 0, 9, 9],
  [4, 4, 0, 0, 0, 9],
  [4, 4],
  [4, 4],
  [4, 4],
  [4, 4, 0, 0, 0, 10],
  [4, 4, 0, 0, 0, 10],
  [4, 4],
  [4, 4],
  [4, 4],
  [4, 3, 9, 9, 9, 9],
  [4, 3, 9, 9, 9],
  [4, 3, 9, 9],
  [4, 3, 9],
  [3, 1, 2],
  [3, 1, 2, 0, 7],
  [3, 1, 6, 6, 7, 7],
  [3, 1, 2, 0, 7],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2],
  [3, 3, 3, 3],
  [4, 0, 3, 3],
  [4, 0, 0, 3, 0, 0, 3, 0, 0, 0, 9],
  [4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 9],
  [4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 9],
  [4, 0, 0, 3, 0, 0, 0, 0, 0, 9, 9],
  [4, 0, 3, 3, 0, 0, 0, 0, 0, 9],
  [4, 3, 3, 3, 0, 0, 0, 0, 0, 9],
  [4, 3, 3, 0, 0, 0, 0, 0, 0, 9, 9],
  [4, 4, 0, 0, 0, 0, 10, 0, 0, 0, 9],
  [4, 4, 3, 0, 0, 0, 10, 0, 0, 0, 9],
  [4, 4, 0, 0, 0, 0, 10, 0, 0, 0, 9],
  [4, 4, 0, 0, 0, 0, 10, 0, 0, 0, 9],
  [4, 3, 0, 0, 10, 0, 0, 0, 0, 0, 9],
  [4, 3, 0, 0, 10],
  [4, 4],
  [4, 4],
  [4, 4],
  [4, 4, 0, 0, 10],
  [4, 4, 0, 0, 10],
];

const experimentalIceTrees = [
  // Tree blocks actually look decent too but the foliage blocks need some branches coming in from the bottom.
  // Food for future thought: background "connector" imgs placed relative to certain 'node' blocks to make cooler looking large formations.
  [3, 8, 6, 7],
  [3, 8, 6, 7],
  [3, 8, 6, 7],
  [3, 8, 6, 7],
  [3, 8, 6, 6, 7],
  [3, 8, 6, 7],
  [3, 8, 6, 7, 0, 0, 7],
  [3, 8, 6, 6, 6, 7, 7, 7],
  [3, 8, 6, 7, 0, 0, 7],
  [3, 8, 0, 0, 0, 7],
  [3, 8, 6, 6, 7, 7, 7],
  [3, 8, 0, 0, 0, 7],
  [3, 8],
  [3, 8, 2],
  [3, 8],
  [3, 8, 0, 0, 0, 7],
  [3, 8, 0, 0, 7, 7, 7],
  [3, 1, 2, 6, 6, 7, 7, 7],
  [3, 8, 0, 0, 7, 7, 7],
  [3, 8, 0, 0, 0, 7],
  [3, 8],
  [3, 8],
  [3, 8, 0, 0, 7],
  [3, 8, 6, 6, 7, 7],
  [3, 8, 0, 0, 7],
];

const forestA = [
  [3, 1, 1, 2],
  [3, 1, 2, 6, 6, 7],
  [3, 1, 2],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 6, 6, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 0, 7],
  [3, 1, 2, 6, 7, 7],
  [3, 1, 2, 0, 7],
  [3, 1, 2],
  [3, 1, 2],
  [3, 3, 1, 2],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 0, 0, 7, 7, 7],
  [3, 1, 6, 6, 6, 6, 7, 7, 7],
  [3, 1, 2, 0, 0, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1],
  [3, 1, 2, 0, 0, 7],
  [3, 1, 2, 6, 6, 7, 7],
  [3, 1, 2, 0, 0, 7],
  [3, 1, 2],
];

const volcano = [
  [4, 3, 3, 2],
  [4, 3, 3, 2],
  [4, 3, 3, 3, 3, 2],
  [4, 4, 3, 3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4],
  [4, 4, 3, 3, 3, 3, 3, 3],
  [4, 4, 3, 3, 3, 0, 7],
  [4, 3, 3, 2, 6, 7, 7],
  [4, 3, 1, 2, 0, 0, 7],
  [4, 3, 1],
];

const shallowLake = [
  [3, 1, 1, 2],
  [3, 1, 1, 5],
  [3, 1, 1, 5],
  [3, 3, 1, 5],
  [3, 3, 1, 1, 2],
  [3, 3, 1, 1, 2, 0, 7],
  [3, 3, 1, 1, 6, 6, 7, 7],
  [3, 3, 1, 1, 2, 0, 7],
  [3, 1, 1, 5],
  [3, 1, 1, 5],
  [3, 1, 1, 5],
];

const iceRink = [
  [8, 8, 8],
  [8, 8, 8],
  [8, 8, 8],
  [8, 8, 8],
  [8, 8, 8],
  [4, 8, 8],
  [4, 4],
  [4, 4],
  [4, 8, 8],
  [4, 8, 8],
];

const labyrinthA = [
  [3, 3, 3, 3],
  [3],
  [3, 0, 3, 3, 3, 0, 7],
  [3, 0, 3, 1, 6, 6, 7, 7],
  [3, 0, 3, 3, 3, 0, 7],
  [3, 0, 0, 0, 3],
  [3, 3, 0, 0, 3, 3],
  [3, 3, 0, 0, 0, 3],
  [3, 0, 0, 0, 0, 3],
  [3, 0, 3, 0, 0, 3],
  [3, 0, 3, 0, 0, 0, 0, 7],
  [3, 0, 3, 0, 3, 3, 6, 7, 7],
  [3, 0, 3, 0, 3, 3, 0, 7],
  [3, 0, 3, 0, 0, 3],
  [3, 0, 0, 0, 0, 3],
  [3, 3, 3],
  [4],
  [4, 3, 3, 3],
];
const castleA = [
  [3, 1, 2],
  [3, 1, 2, 0, 7],
  [3, 1, 6, 6, 7, 7],
  [3, 1, 2, 0, 7],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2],
  [3, 3, 3, 3],
  [4, 0, 3, 3],
  [4, 0, 0, 3, 0, 0, 3, 0, 0, 0, 9],
  [4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 9],
  [4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 9],
  [4, 0, 0, 3, 0, 0, 0, 0, 0, 9, 9],
  [4, 0, 3, 3, 0, 0, 0, 0, 0, 9],
  [4, 3, 3, 3, 0, 0, 0, 0, 0, 9],
  [4, 3, 3, 0, 0, 0, 0, 0, 0, 9, 9],
  [4, 4, 0, 0, 0, 0, 10, 0, 0, 0, 9],
  [4, 4, 3, 0, 0, 0, 10, 0, 0, 0, 9],
  [4, 4, 0, 0, 0, 0, 10, 0, 0, 0, 9],
  [4, 4, 0, 0, 0, 0, 10, 0, 0, 0, 9],
  [4, 3, 0, 0, 10, 0, 0, 0, 0, 0, 9],
  [4, 3, 0, 0, 10],
  [4, 4],
  [4, 4],
  [4, 4],
  [4, 4, 0, 0, 10],
  [4, 4, 0, 0, 10],
];

const baconLandRight = [
  [4, 0, 973],
  [4, 0, 970],
  [4, 0, 970],
  [4, 0, 972],
  [4, 0, 0, 0, 973],
  [4, 0, 0, 0, 970],
  [4, 0, 0, 0, 970],
  [4, 0, 0, 0, 972],
  [4, 0, 0, 973],
  [4, 0, 0, 970],
  [4, 0, 0, 970],
  [4, 0, 0, 972, 973],
  [4, 0, 0, 0, 970],
  [4, 0, 0, 0, 970],
  [4, 0, 0, 0, 972],
  [4, 973],
  [4, 970],
  [4, 970],
  [4, 972],
];

const baconLandLeft = [
  [4, 0, 972],
  [4, 0, 970],
  [4, 0, 970],
  [4, 0, 973],
  [4, 0, 0, 0, 972],
  [4, 0, 0, 0, 970],
  [4, 0, 0, 0, 970],
  [4, 0, 0, 0, 973],
  [4, 0, 0, 972],
  [4, 0, 0, 970],
  [4, 0, 0, 970],
  [4, 0, 0, 973, 972],
  [4, 0, 0, 0, 970],
  [4, 0, 0, 0, 970],
  [4, 0, 0, 0, 973],
  [4, 972, 0, 0, 0, 0, 974, 971, 971, 975],
  [4, 970],
  [4, 970, 0, 0, 0, 0, 974, 971, 971, 975],
  [4, 973],
];

const swampLandA = [
  [3, 3, 1, 2],
  [3, 12, 12, 5],
  [3, 12, 12, 5],
  [3, 1, 12, 5],
  [3, 3, 1, 5],
  [3, 3, 3, 1, 2],
  [3, 3, 3, 1, 2, 6, 7],
  [3, 3, 3, 1, 2, 6, 7],
  [4, 3, 3, 200, 201],
  [3, 3, 200, 200, 201],
  [3, 3, 200, 200, 201],
  [3, 3, 3, 200, 201],
  [3, 3, 3, 1, 201],
  [3, 3, 3, 3, 1, 2],
];

const provingGrounds = [
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
];

const provingGroundsB = [
  [3, 3, 3, 3, 3],
  [3, 3, 3, 3],
  [3, 3, 3],
  [3, 3, 8],
  [3, 3, 8],
  [3, 3, 8],
  [3, 3, 8],
  [3, 3, 8],
  [3, 3, 3],
  [3, 3, 3, 3],
  [3, 3, 3, 3],
  [3, 3, 3, 3, 3],
];

const wetLands = [
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 6, 6, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 0, 7],
  [3, 1, 2, 6, 7, 7],
  [3, 1, 2, 0, 7],
  [3, 1, 2],
  [3, 1, 2],
  [3, 3, 1, 2],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 0, 0, 7, 7, 7],
  [3, 1, 6, 6, 6, 6, 7, 7, 7],
  [3, 1, 2, 0, 0, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2, 0, 0, 7],
  [3, 1, 2, 6, 6, 7, 7],
  [3, 1, 2, 0, 0, 7],
  [3, 1, 2],
  [3, 3, 1, 2],
  [3, 12, 12, 5],
  [3, 12, 12, 5],
  [3, 1, 12, 5],
  [3, 3, 1, 5],
  [3, 3, 3, 1, 2],
  [3, 3, 3, 1, 2, 6, 7],
  [3, 3, 3, 1, 2, 6, 7],
  [4, 3, 3, 200, 201],
  [3, 3, 200, 200, 201],
  [3, 3, 200, 200, 201],
  [3, 3, 3, 200, 201],
  [3, 3, 3, 1, 201],
  [3, 3, 3, 3, 1, 2],
  [3, 1, 1, 2],
  [3, 1, 1, 5],
  [3, 1, 1, 5],
  [3, 3, 1, 5],
  [3, 3, 1, 1, 2],
  [3, 3, 1, 1, 2, 0, 7],
  [3, 3, 1, 1, 6, 6, 7, 7],
  [3, 3, 1, 1, 2, 0, 7],
  [3, 1, 1, 5],
  [3, 1, 1, 5],
  [3, 1, 1, 5],
  [3, 1, 1, 2],
  [3, 1, 2, 6, 6, 7],
  [3, 1, 2],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 6, 6, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 0, 7],
  [3, 1, 2, 6, 7, 7],
  [3, 1, 2, 0, 7],
  [3, 1, 2],
  [3, 1, 2],
  [3, 3, 1, 2],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2, 0, 0, 7, 7, 7],
  [3, 1, 6, 6, 6, 6, 7, 7, 7],
  [3, 1, 2, 0, 0, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 7],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2],
  [3, 1, 2, 0, 0, 7],
  [3, 1, 2, 6, 6, 7, 7],
  [3, 1, 2, 0, 0, 7],
  [3, 1, 2],
];

const treeForts = [
  [3, 1],
  [3, 3],
  [3],
  [3],
  [3, 3],
  [3, 1, 2],
  [3, 1, 2],
  [3, 3],
  [3, 3, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 7],
  [3, 3, 0, 0, 3, 2, 0, 0, 0, 0, 0, 7, 7, 7],
  [3, 3, 3, 0, 3, 2, 6, 6, 6, 6, 6, 7, 7, 7, 7],
  [3, 3, 3, 0, 3, 2, 0, 0, 0, 0, 0, 7, 7, 7],
  [3, 3, 3, 0, 1, 2, 0, 0, 0, 0, 0, 0, 7],
  [3, 1, 5],
  [3, 12, 5],
  [3, 12, 5],
  [3, 12, 5],
  [3, 1, 5, 0, 0, 0, 0, 7],
  [3, 3, 1, 2, 0, 0, 7, 7, 7],
  [3, 3, 1, 2, 6, 6, 6, 7, 7, 7],
  [3, 3, 1, 2, 0, 0, 7, 7, 7],
  [3, 1, 5, 0, 0, 0, 0, 7],
  [3, 1, 5],
  [3, 12, 5],
  [3, 12, 5],
  [3, 1, 5, 0, 0, 0, 0, 0, 7],
  [3, 1, 1, 0, 0, 0, 0, 7, 7, 7],
  [3, 3, 1, 6, 6, 6, 7, 7, 7, 7, 7],
  [3, 3, 1, 1, 0, 0, 0, 7, 7, 7],
  [3, 3, 3, 1, 0, 0, 0, 0, 7],
  [4, 3, 3, 1, 1],
  [4, 4, 3, 3, 1, 1],
  [3, 4, 4, 3, 3, 1, 1],
  [3, 3, 4, 3, 3, 3, 3, 1],
  [3, 3, 4, 4, 3, 3, 3, 3, 3],
  [4, 3, 3, 4, 3, 3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [3, 3, 3, 0, 0, 3, 3, 3, 3],
  [3, 0, 0, 0, 0, 3, 3, 3],
  [3, 0, 3, 3, 3, 3, 3, 1],
  [3, 0, 3, 3, 3, 3, 1],
  [3, 0, 3, 3, 3, 3, 1],
  [3, 0, 3, 3, 3, 1, 2],
  [3, 0, 0, 3, 1, 2],
  [3, 3, 0, 1, 2],
  [3, 3, 0, 1, 2, 0, 0, 0, 7],
  [3, 3, 0, 1, 0, 0, 0, 7, 7, 7],
  [3, 3, 0, 1, 0, 0, 0, 7, 7, 7, 7],
  [3, 5, 0, 1, 6, 6, 6, 6, 7, 7, 7],
  [3, 5, 1, 1, 0, 0, 0, 7, 7, 7, 7],
  [3, 5, 1, 0, 0, 0, 0, 7, 7, 7],
  [3, 5, 0, 0, 0, 0, 0, 0, 7],
  [3, 5],
  [3, 5],
  [3, 5, 0, 0, 0, 0, 7],
  [3, 1, 0, 0, 0, 0, 7, 7],
  [3, 3, 1, 6, 6, 6, 7, 7, 7],
  [3, 3, 1, 2, 0, 0, 7, 7],
  [3, 3, 1, 2, 0, 0, 7],
  [3, 3, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 7, 7],
  [3, 3, 3, 1, 2, 0, 0, 0, 0, 0, 0, 7, 10, 700],
  [3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 7, 10, 700],
  [3, 3, 1, 6, 6, 6, 6, 6, 6, 6, 6, 6, 10, 700],
  [3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 7, 10, 700],
  [3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 7, 10, 700],
  [3, 1, 2, 0, 0, 0, 7, 0, 0, 0, 0, 0, 7, 7],
  [3, 1, 6, 6, 6, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 7, 0, 0, 0, 7],
  [3, 1, 2, 0, 0, 0, 0, 0, 0, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 0, 0, 7, 7, 7, 7],
  [3, 1, 1, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7],
  [3, 3, 1, 2, 0, 0, 0, 0, 7, 7, 7, 7],
  [3, 3, 1, 0, 0, 0, 0, 0, 0, 7, 7, 7],
  [3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 7],
  [3, 1, 2],
];

const towerOfTerror = [
  [3, 3, 3, 3],
  [3, 3, 3, 3, 9, 9],
  [3, 3, 3, 3, 9, 9],
  [3, 3, 3, 3, 9, 9],
  [3, 3, 3, 3, 0, 9],
  [3, 3, 3, 3, 0, 9],
  [3, 3, 3, 3, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 10],
  [3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10],
  [3, 3, 3, 3, 9, 9, 0, 0, 0, 702],
  [3, 3, 3, 3, 9, 9, 0, 0, 0, 702],
  [3, 3, 3, 3, 9, 9, 0, 711, 711, 711, 711, 711, 711, 711],
  [3, 3, 3, 3, 9, 9, 0, 0, 0, 0, 0, 0, 0, 702, 0, 0, 702],
  [3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702],
  [3, 3, 3, 3],
  [3, 3, 3, 3, 711, 0, 711, 711, 711, 711, 711, 711],
  [3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 710, 702],
  [3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 710, 702, 0, 0, 0, 702],
  [3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 714, 711, 711, 711, 711, 702],
  [3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702, 711, 711, 711],
  [3, 3, 3, 3],
  [3, 3, 3, 3],
  [3, 3, 3, 3],
  [3, 3, 3, 3, 9, 9],
  [3, 3, 3, 3, 9, 9],
  [3, 3, 3, 3],
  [3, 3, 3, 3],
];

const fortress = [
  [3, 701, 0, 0, 0, 0, 702],
  [3, 701, 701, 711, 711, 711, 702],
  [3, 701, 0, 0, 0, 0, 702],
  [3],
  [3, 0, 701, 0, 0, 0, 0, 10, 700],
  [3, 0, 701, 711, 711, 711, 711, 10, 700],
  [3, 0, 701, 0, 0, 0, 0, 10, 700],
  [3],
  [3, 701],
  [3, 701, 701, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 701, 0, 0, 0, 0, 702],
  [3, 701, 701, 701, 0, 0, 0, 0, 702],
  [3, 701, 701, 701],
  [3, 701, 701, 701],
  [3, 701, 701],
  [3],
  [3, 0, 0, 0, 0, 0, 702],
  [3, 711, 711, 711, 711, 711, 712],
  [3, 0, 0, 0, 0, 0, 710],
  [3, 711, 711, 712, 0, 0, 710],
  [3, 0, 0, 710, 0, 715, 713],
  [3, 701, 701, 701, 0, 710],
  [3, 701, 701, 701, 701, 701, 701, 701],
  [3, 4, 4, 4, 4, 4, 4],
  [3, 4, 4, 4, 4, 4, 4],
  [3, 4, 4, 4, 4, 4, 4],
  [3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 702],
  [3, 4, 4, 4, 4, 4, 4, 0, 0, 0, 702],
  [3, 701, 701, 701, 701, 701, 701, 701],
  [3, 701, 701, 701, 701, 701, 0, 0, 0, 0, 0, 702],
  [3, 713, 0, 710, 710, 0, 0, 0, 0, 0, 0, 702],
  [3, 0, 0, 710, 710],
  [3, 711, 711, 713, 710],
  [3, 701, 701, 701, 714, 712],
  [3, 12, 12, 5, 711, 713, 0, 0, 0, 0, 0, 702],
  [3, 12, 12, 5, 0, 703, 703, 703, 703, 703, 703, 702],
  [3, 12, 12, 5, 0, 0, 702, 0, 0, 0, 0, 702],
  [3, 12, 12, 5],
  [3, 12, 12, 5],
  [3, 701, 701, 701, 0, 0, 0, 0, 702],
  [3, 0, 0, 0, 0, 0, 0, 0, 702],
  [3, 711, 712],
  [3, 701, 714, 711, 711, 711, 712, 701, 701, 701],
  [3, 701, 701, 703, 703, 703, 701, 701, 200, 201, 0, 0, 10, 700],
  [4, 4, 4, 4, 4, 4, 701, 200, 200, 201, 0, 0, 10, 700],
  [3, 701, 701, 703, 703, 703, 701, 701, 200, 201, 0, 0, 10, 700],
  [3, 701, 0, 0, 0, 0, 0, 701, 701, 701],
  [3, 0, 0, 0, 0, 0, 0, 0, 710],
  [3, 701, 701, 0, 0, 0, 0, 0, 710],
  [3, 701, 701, 701, 711, 711, 711, 711, 713],
  [3, 701],
  [3],
  [3, 9, 9, 9, 9],
  [3, 10, 0, 0, 9, 9],
  [3, 10, 10, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 702],
  [3, 10, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 702],
  [3, 0, 0, 0, 0, 0, 9, 6, 6, 6, 6, 6, 6, 702],
  [3, 10, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 702],
  [3, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 702],
  [3],
  [3],
  [3, 0, 0, 0, 0, 702],
  [3, 701],
  [3, 701, 701, 0, 0, 0, 0, 702],
  [4, 4, 702],
  [4, 4, 0, 0, 0, 0, 0, 0, 0, 702],
  [4, 4],
  [4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702],
  [4, 4],
  [4, 4],
  [4, 4],
  [4, 4, 0, 0, 0, 702],
  [4, 4, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 702],
  [4, 4, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 702],
  [3, 701, 0, 0, 0, 702],
  [3, 0, 0, 0, 0, 702],
  [3, 0, 0, 0, 0, 702],
  [3, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 702],
  [3, 701, 701, 701, 0, 702],
  [3, 701, 701, 701, 0, 702],
  [3, 701, 701, 701, 703, 702, 0, 0, 703, 703, 703, 703],
  [3, 0, 0, 0, 0, 702],
  [3, 0, 0, 0, 0, 702],
  [3, 0, 0, 702],
  [3, 0, 0, 702],
  [3],
  [3],
  [3],
  [3],
  [3],
  [3],
  [3],
  [3],
  [3],
  [3],
  [3],
  [3],
  [3],
];

const biomes = {
  biome0: startStage,
  biome1: experimentalIceTrees,
  biome2: forestA,
  biome3: volcano,
  biome4: shallowLake,
  biome5: iceRink,
  biome6: labyrinthA,
  biome7: castleA,
  biome8: swampLandA,
  biome9: provingGrounds,
  biome10: treeForts,
  biome11: fortress,
};

const template = [[], [], [], [], [], [], [], [], []];
