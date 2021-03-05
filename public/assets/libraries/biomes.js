// Welcome to the Biomes Library!

// Here is where all the biomes are kept, at the moment in the form of a list of arrays.
// At the bottom we have a biomes object which is the index that holds all of the arrays with the actual biome blueprints.
// This way we can keep the biomes' names while still treating them as though they were in a list (so our randomizer can randomly grab them)
// NOTE: If we ever do jazz up the start screen it should be given a wierd number so it can't be chosen by the randomizer.

// Block wallpaper-effect test stage: Use this stage as the columns' primary biome to instantly see a wide selection of tiling effects
// With any block of your choice! Ideal for testing elaborate multi-block patterning effects!

// Enter the NUMBER of the block you wish to test:
const protoBlock = 730;
const offBlock = 721; // Test graphic interaction of multiple block types!

const testStage = [
  [ 3, 3, 3, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, ],
  [3, 3, 3, 0, 0, 0, 20],
  [3, 3, 3, 0, 0, 0, 20, 20, 0, 0, 20, 0, 0, 0, 0, 20],
  [3, 3, 3, 11, 11, 11, 21, 21, 11, 11, 21, 11, 11, 11, 11],
  [3, 3, 3, 0, 0, 0, 20, 20, 0, 0, 20, 0, 0, 0, 20],
  [3, 3, 3, 0, 0, 0, 20],
  [3, 3, 3, 3],
  [3, 3, 3, 3],
  [0, 0, protoBlock],
  [0, 0, protoBlock],
  [0, 0, protoBlock],
  [0, 0, protoBlock],
  [0, 0, protoBlock],
  [0, offBlock, protoBlock],
  [0, 0, protoBlock],
  [0, 0, protoBlock],
  [0, 0, protoBlock],
  [0, offBlock, protoBlock],
  [ 3, 3, 3, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 0, 9, ],
  [3, 3, 3, protoBlock],
  [3, 3, 3, protoBlock, protoBlock],
  [3, 3, 3, protoBlock, protoBlock, protoBlock, 0, 0, 0, offBlock],
  [ 3, 3, 3, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, offBlock, ],
  [ 3, 3, 3, protoBlock, offBlock, protoBlock, protoBlock, protoBlock, 0, offBlock, ],
  [3, 3, 3, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock],
  [ 3, 3, 3, protoBlock, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock, ],
  [ 3, 3, 3, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock, ],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [ 3, 3, 3, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock, ],
  [ 3, 3, 3, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock, ],
  [3, 3, 3, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock],
  [3, 3, 3, offBlock, protoBlock, offBlock, protoBlock, offBlock, protoBlock],
  [3, 3, 3, offBlock, protoBlock, offBlock, protoBlock],
  [3, 3, 3, offBlock, protoBlock, offBlock, protoBlock],
  [3, 3, 3, offBlock, protoBlock],
  [3, 3, 3, offBlock, protoBlock],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3],
  [3, 3, 3, protoBlock, protoBlock, protoBlock],
  [3, 3, 3, offBlock, offBlock, offBlock],
  [3, 3, 3, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock],
  [3, 3, 3, offBlock, offBlock, offBlock, offBlock, offBlock],
  [ 3, 3, 3, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, ],
  [ 3, 3, 3, offBlock, offBlock, offBlock, offBlock, offBlock, offBlock, offBlock, ],
  [ 3, 3, 3, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, ],
  [ 3, 3, 3, offBlock, offBlock, offBlock, offBlock, offBlock, offBlock, offBlock, offBlock, offBlock, ],
  [ 3, 3, 3, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, protoBlock, ],
];

const startStage = [
  [4,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,3,3,3,3,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,3,3,3,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,3,3,3,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,3,3,3,3,3,1,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,3,3,3,3,3,1,0,0,0,0,1,2,94,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [4,3,3,3,3,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,4,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,3,1,2,0,0,0,0,0,0,0,0,93,92,92,92,701,0,0,0,0,0,0,0,0,0,0,0,702,0,0],
  [3,3,3,4,3,1,9,9,9,0,0,0,0,0,0,0,0,0,0,701,0,0,0,0,0,0,0,0,0,0,0,702,0,0],
  [3,3,3,4,3,711,711,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,702,0,0],
  [3,3,3,40,43,0,0,0,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,715,711,711,711,711,711,711,702,0,0],
  [3,3,3,40,43,0,0,0,0,0,0,0,0,0,701,0,0,0,0,0,0,0,0,0,710,0,0,0,0,0,0,702,0,0],
  [3,3,3,40,43,0,0,0,0,0,0,0,0,0,701,0,0,0,0,0,715,711,711,711,713,0,0,0,0,0,0,702,0,0],
  [3,3,3,40,43,0,0,0,0,0,0,0,0,0,701,0,0,0,0,0,710,0,0,0,0,0,0,0,0,0,0,702,0,0],
  [3,3,3,40,43,0,0,0,702,0,0,0,0,0,701,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,0,702,0,0],
  [3,3,3,40,43,711,711,711,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,701,0,0,0,0,702,0,0],
  [3,3,3,40,43,0,0,0,702,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,99,701,0,0,0,701,702,0,0],
  [3,3,3,40,43,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,99,701,702,0,0],
  [3,3,3,40,43,0,0,0,0,0,0,0,0,0,0,0,0,720,0,0,0,0,0,0,0,0,0,0,0,0,99,702,0,0],
  [3,3,3,40,43,0,0,0,0,0,0,0,0,0,0,0,0,720,0,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0],
  [3,3,3,42,3,9,9,9,9,9,720,720,720,720,702,720,720,720,0,0,0,0,0,93,92,92,92,92,92,92,92,702,0,0],
  [3,3,3,42,3,9,9,9,9,9,0,0,0,0,0,0,0,720,0,0,0,0,0,0,0,99,701,0,0,0,0,702,0,0],
  [3,40,40,42,3,9,9,9,9,720,720,720,720,720,720,720,720,720,0,0,0,0,0,0,0,99,701,0,0,0,0,702,0,0],
  [40,40,3,3,3,9,9,9,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,701,0,0,0,0,702,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,6,6,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,94,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,0],
  [3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,0],
  [3,3,3,43,0,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,43,0,0,3,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,43,0,0,0,0,0,3,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,43,0,0,0,0,0,3,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,43,0,0,3,0,0,0,0,0,9,9,0,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,43,0,3,3,0,0,0,0,0,9,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,43,3,3,3,0,0,0,0,0,9,0,0,0,93,92,92,21,21,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,43,3,3,0,0,0,0,0,0,9,9,0,0,0,0,0,710,20,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,0,0,0,0,10,0,0,0,9,711,711,711,711,711,713,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,3,0,0,0,10,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,0,0,0,0,10,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,0,0,0,0,10,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,3,0,0,10,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,3,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

const wetlands = [
  [3,3,3,1,1,2,0,0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,1,1,2,6,6,7,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,1,1,2,6,6,7,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,1,1,2,0,0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,12,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,12,5,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,12,5,0,0,0,0,0,0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,5,0,0,0,0,0,0,0,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,6,6,6,6,6,6,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,2,0,0,0,0,0,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,2,94,0,0,0,0,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,2,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,0,99,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,0,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,0,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,43,0,99,1,1,2,94,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,1,2,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,1,6,6,6,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,200,201,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,200,200,201,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,200,200,201,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,200,200,200,201,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,200,200,200,201,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,200,200,200,201,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,200,200,200,201,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,200,200,200,201,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,200,200,200,201,0,0,0,0,10,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,200,200,200,201,0,0,0,0,10,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,3,3,200,201,0,0,0,0,10,0,0,0,10,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,200,200,201,0,0,0,0,0,0,0,0,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,200,200,201,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,200,201,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,1,201,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,2,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,6,6,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,2,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,1,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,6,6,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,6,6,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,6,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,6,6,6,6,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,6,6,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,2,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,1,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const baconLandRight = [
  [40, 40, 40, 43, 0, 973],
  [40, 40, 40, 43, 0, 970],
  [40, 40, 40, 43, 0, 970],
  [40, 40, 40, 43, 0, 972],
  [40, 40, 40, 43, 0, 0, 0, 973],
  [40, 40, 40, 43, 0, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 0, 972],
  [40, 40, 40, 43, 0, 0, 973],
  [40, 40, 40, 43, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 972, 973],
  [40, 40, 40, 43, 0, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 0, 972],
  [40, 40, 40, 43, 973],
  [40, 40, 40, 43, 970],
  [40, 40, 40, 43, 970],
  [40, 40, 40, 43, 972],
  [40, 40, 40, 43, 0, 0, 973],
  [40, 40, 40, 43, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 972],
];

const baconLandLeft = [
  [40, 40, 40, 43, 0, 972],
  [40, 40, 40, 43, 0, 970],
  [40, 40, 40, 43, 0, 970],
  [40, 40, 40, 43, 0, 973],
  [40, 40, 40, 43, 0, 0, 0, 972],
  [40, 40, 40, 43, 0, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 0, 973],
  [40, 40, 40, 43, 0, 0, 972],
  [40, 40, 40, 43, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 973, 972],
  [40, 40, 40, 43, 0, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 0, 970],
  [40, 40, 40, 43, 0, 0, 0, 973],
  [40, 40, 40, 43, 972, 0, 0, 0, 0, 0, 0, 974, 971, 971, 975],
  [40, 40, 40, 43, 970],
  [40, 40, 40, 43, 970, 0, 0, 0, 0, 0, 0, 974, 971, 971, 975],
  [40, 40, 40, 43, 973],
  [40, 40, 40, 43, 0, 972],
  [40, 40, 40, 43, 0, 970],
  [40, 40, 40, 43, 0, 970],
  [40, 40, 40, 43, 0, 973],
];

const treeForts = [
  [3, 3, 1, 2],
  [3, 3, 3, 3, 1],
  [3, 3, 3, 1],
  [3, 3, 3, 1],
  [3, 3, 3, 3, 1],
  [3, 3, 3, 3, 1, 2],
  [3, 3, 3, 3, 1, 2],
  [3, 3, 3, 3, 1],
  [3, 3, 3, 3, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 7],
  [3, 3, 3, 3, 1, 0, 0, 1, 2, 0, 0, 0, 0, 0, 7, 7, 7],
  [3, 3, 3, 1, 1, 1, 0, 1, 2, 6, 6, 6, 6, 6, 7, 7, 7, 7],
  [3, 3, 3, 3, 1, 1, 0, 1, 2, 0, 0, 0, 0, 0, 7, 7, 7],
  [3, 3, 3, 3, 1, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 7],
  [3, 3, 3, 1, 1, 5],
  [3, 3, 3, 1, 12, 5],
  [3, 3, 3, 1, 12, 5],
  [3, 3, 3, 1, 12, 5],
  [3, 3, 3, 1, 1, 5, 0, 0, 0, 0, 7],
  [3, 3, 3, 3, 3, 1, 2, 0, 0, 7, 7, 7],
  [3, 3, 3, 3, 1, 1, 2, 6, 6, 6, 7, 7, 7],
  [3, 3, 3, 3, 1, 1, 2, 0, 0, 7, 7, 7],
  [3, 3, 3, 3, 1, 5, 0, 0, 0, 0, 7],
  [3, 3, 3, 1, 1, 5],
  [3, 3, 3, 1, 12, 5],
  [40, 42, 3, 1, 12, 5],
  [40, 42, 3, 1, 1, 5, 0, 0, 0, 0, 0, 7],
  [40, 42, 3, 3, 1, 2, 0, 0, 0, 0, 7, 7, 7],
  [3, 42, 42, 1, 1, 1, 6, 6, 6, 7, 7, 7, 7, 7],
  [3, 40, 42, 3, 1, 1, 2, 0, 0, 0, 7, 7, 7],
  [3, 3, 42, 3, 3, 1, 2, 0, 0, 0, 0, 7],
  [3, 3, 40, 42, 3, 1, 1, 2],
  [3, 3, 3, 40, 42, 3, 1, 1, 1],
  [3, 3, 3, 3, 40, 42, 3, 3, 1, 1],
  [3, 3, 3, 3, 3, 42, 3, 3, 3, 3, 1],
  [3, 3, 3, 3, 3, 40, 42, 3, 3, 3, 3, 3, 3],
  [40, 3, 3, 43, 3, 3, 42, 3, 3, 3, 3, 3, 3, 3, 3],
  [40, 40, 3, 40, 40, 40, 40, 40, 40, 40, 40, 40, 43],
  [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 43],
  [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 43],
  [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 3, 3],
  [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 43],
  [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 43],
  [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 43],
  [40, 40, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [4, 3, 3, 3, 3, 3, 0, 0, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 0, 0, 0, 0, 3, 3, 3],
  [3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 1],
  [3, 3, 3, 3, 0, 3, 3, 3, 3, 1],
  [3, 3, 3, 3, 0, 3, 3, 3, 1, 1],
  [3, 3, 3, 3, 0, 3, 3, 1, 1, 2],
  [3, 3, 3, 3, 0, 0, 1, 1, 2],
  [3, 3, 3, 3, 3, 0, 1, 2],
  [3, 3, 3, 3, 3, 0, 1, 2, 0, 0, 0, 7],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 0, 7, 7, 7],
  [3, 3, 3, 3, 3, 0, 1, 0, 0, 0, 7, 7, 7, 7],
  [3, 3, 3, 1, 5, 0, 1, 6, 6, 6, 6, 7, 7, 7],
  [3, 3, 3, 1, 5, 1, 1, 0, 0, 0, 7, 7, 7, 7],
  [3, 3, 3, 1, 5, 1, 0, 0, 0, 0, 7, 7, 7],
  [3, 3, 3, 1, 5, 0, 0, 0, 0, 0, 0, 7],
  [3, 3, 3, 1, 5],
  [3, 3, 3, 1, 5],
  [3, 3, 3, 1, 5, 0, 0, 0, 0, 7],
  [3, 3, 3, 1, 1, 0, 0, 0, 0, 7, 7],
  [3, 3, 3, 3, 1, 1, 6, 6, 6, 7, 7, 7],
  [3, 3, 3, 3, 1, 1, 2, 0, 0, 7, 7, 0, 0, 20],
  [3, 3, 3, 3, 1, 2, 0, 0, 0, 7, 0, 0, 0, 20, 0, 0, 0, 20],
  [3, 1, 3, 1, 1, 11, 11, 11, 11, 11, 11, 11, 11, 21, 11, 11, 11, 21],
  [ 3, 1, 1, 2, 94, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 93, 92, 92, 92, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 16, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 16, 7, ],
  [ 3, 1, 2, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 92, 92, 7, 17, 7, 7, 18, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 17, 7, 7, 0, 7, 0, 0, 0, 0, 0, 7, ],
  [ 3, 1, 2, 94, 0, 0, 0, 0, 0, 0, 93, 92, 92, 92, 7, 0, 0, 7, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 17, 7, 7, ],
  [ 3, 1, 2, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 17, 7, 17, 7, 7, 17, 7, 16, 16, 16, 16, 16, 16, 16, 16, 16, 7, 7, ],
  [ 3, 1, 2, 0, 0, 93, 92, 92, 92, 92, 92, 92, 7, 17, 7, 7, 7, 7, 16, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 7, 7, 7, 7, 7, 18, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 92, 92, 92, 92, 92, 7, ],
  [ 3, 1, 2, 0, 93, 92, 92, 92, 92, 92, 7, 17, 7, 18, 7, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, ],
  [ 3, 1, 2, 94, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 7, 93, 92, 7, 7, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 17, 7, 7, 17, 7, 7, 0, 0, 0, 0, 0, 0, 0, 17, 7, 7, 7, 7, 7, 0, 7, 0, 0, 0, 7, 0, 7, 7, 0, 0, 7, 17, 7, ],
  [ 3, 1, 2, 14, 14, 14, 14, 14, 14, 16, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 7, 7, 17, 7, 7, 7, 7, 7, 17, 7, 7, 14, 14, 14, 16, 7, ],
  [ 3, 1, 2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 7, 16, 14, 14, 14, 14, 7, 16, 7, 7, 15, 15, 15, 16, 7, ],
  [ 3, 1, 2, 15, 15, 15, 15, 15, 15, 16, 15, 15, 15, 15, 15, 16, 15, 15, 15, 15, 15, 15, 15, 15, 16, 15, 15, 15, 15, 15, 16, 15, 15, 7, 15, 7, 7, 0, 0, 7, 18, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 18, 7, 7, 7, 18, 7, 18, 7, 0, 0, 0, 0, 0, 0, 0, 18, 7, 7, 7, 0, 0, 18, 7, 0, 0, 0, 0, 7, 92, 92, 7, 7, 7, ],
  [ 3, 1, 2, 94, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 7, 7, 0, 0, 0, 7, 0, 0, 0, 0, 7, 0, 0, 0, 7, ],
  [ 3, 1, 2, 0, 93, 92, 92, 92, 92, 92, 7, 18, 7, 17, 7, 91, 0, 0, 0, 7, 0, 93, 92, 92, 92, 19, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 7, 7, 16, 16, 16, 16, 7, 7, 0, 0, 0, 0, 19, ],
  [ 3, 1, 2, 0, 0, 93, 92, 92, 92, 92, 92, 92, 7, 18, 7, 91, 0, 0, 18, 7, 7, 7, 7, 0, 0, 19, ],
  [ 3, 1, 2, 94, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 7, 7, 0, 0, 0, 7, 7, 7, 0, 0, 0, 19, 7, 7, 91, 0, 0, 17, 7, ],
  [ 3, 1, 2, 11, 11, 11, 11, 11, 11, 11, 11, 21, 0, 0, 0, 0, 0, 0, 0, 0, 19, 7, 0, 0, 0, 18, 7, 7, 16, 16, 16, 16, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 7, 7, 91, 0, 0, 18, 7, ],
  [ 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 7, 91, ],
  [ 3, 1, 2, 0, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 7, 7, 0, 0, 0, 0, 18, 7, ],
  [3, 1, 2, 11, 11, 11, 11, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 7, 7],
  [ 3, 1, 2, 0, 0, 0, 0, 20, 0, 0, 0, 93, 92, 92, 92, 92, 92, 92, 92, 92, 92, 7, 7, 7, ],
  [3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 7, 7],
  [3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
  [3, 1, 2, 94],
  [3, 1, 1, 2],
  [3, 1, 1, 2],
];

const fortress = [
  [3, 701, 701, 0, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 701, 711, 711, 711, 711, 711, 711, 702],
  [3, 701, 701, 0, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701],
  [3, 701, 701, 0, 701, 0, 0, 0, 0, 10, 700, 6, 6, 10],
  [3, 701, 701, 0, 701, 711, 711, 711, 711, 10, 700, 0, 0, 10],
  [3, 701, 701, 0, 701, 0, 0, 0, 0, 10, 700, 6, 6, 10],
  [3, 701, 701],
  [3, 701, 701, 0, 0, 701, 701, 701, 702],
  [3, 701, 701, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 701, 0, 0, 0, 0, 702],
  [3, 701, 701, 701, 10, 10, 10, 0, 702],
  [3, 701, 701],
  [3, 701, 701, 10, 10],
  [3, 701, 701, 10],
  [3, 701, 701],
  [3, 701, 701, 703, 703, 703, 703, 703, 702],
  [3, 701, 701, 711, 711, 711, 711, 711, 712],
  [3, 701, 701, 0, 0, 0, 0, 0, 710],
  [3, 701, 701, 711, 711, 712, 0, 0, 710],
  [3, 701, 701, 0, 0, 710, 0, 715, 713],
  [3, 701, 701, 701, 701, 701, 0, 710],
  [3, 701, 701, 701, 701, 701, 701, 701, 701, 701],
  [3, 701, 40, 40, 40, 40, 40, 40, 43],
  [3, 701, 40, 40, 40, 40, 40, 40, 43],
  [40, 40, 40, 40, 40, 40, 40, 40, 43, 0, 0, 0, 702],
  [3, 701, 40, 40, 40, 40, 40, 40, 43, 0, 0, 0, 702],
  [3, 701, 40, 40, 40, 40, 40, 40, 43],
  [3, 701, 701, 701, 701, 701, 701, 701, 701, 701],
  [3, 701, 701, 701, 701, 701, 710, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 713, 0, 710, 710, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 710, 710],
  [3, 701, 701, 711, 711, 713, 710],
  [3, 701, 701, 701, 701, 701, 714, 712],
  [3, 701, 701, 12, 12, 5, 711, 713, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 12, 12, 5, 0, 703, 703, 703, 703, 703, 703, 702],
  [3, 701, 701, 12, 12, 5, 0, 0, 702, 0, 0, 0, 0, 702],
  [3, 701, 701, 12, 12, 5],
  [3, 701, 701, 12, 12, 5],
  [3, 701, 701, 701, 701, 701, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 711, 712],
  [3, 701, 701, 701, 714, 711, 711, 711, 712, 701, 701, 701, 6, 6, 10, 700],
  [3, 701, 701, 701, 701, 703, 703, 703, 701, 701, 200, 201, 0, 0, 10, 700],
  [40, 40, 40, 40, 40, 40, 40, 40, 701, 200, 200, 201, 0, 0, 10, 700],
  [3, 701, 701, 701, 701, 703, 703, 703, 701, 701, 200, 201, 0, 0, 10, 700],
  [3, 701, 701, 701, 0, 0, 0, 0, 0, 701, 701, 701, 6, 6, 10, 700],
  [3, 701, 701, 0, 0, 0, 0, 0, 0, 0, 710],
  [3, 701, 701, 9, 9, 0, 0, 0, 0, 0, 710],
  [3, 701, 701, 701, 701, 701, 711, 711, 711, 711, 713],
  [3, 701, 701, 9, 9],
  [3, 701, 701],
  [3, 701, 701, 9, 9, 9, 9],
  [3, 701, 701, 10, 0, 0, 9, 9],
  [3, 701, 701, 10, 10, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 10, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 0, 0, 0, 9, 6, 6, 6, 6, 6, 6, 702],
  [3, 701, 701, 10, 0, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 0, 0, 0, 0, 9, 9, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701],
  [3, 701, 701],
  [3, 701, 701, 0, 0, 0, 0, 702],
  [3, 701, 701, 701],
  [3, 701, 701, 701, 701, 0, 0, 0, 0, 702],
  [40, 40, 40, 43, 702],
  [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 702],
  [40, 40, 40, 43],
  [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702],
  [40, 40, 40, 43],
  [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702],
  [40, 40, 40, 43],
  [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702],
  [40, 40, 40, 43],
  [40, 40, 40, 43],
  [40, 40, 40, 43],
  [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702],
  [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 701, 701, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 701, 0, 0, 0, 0, 0, 0, 702],
  [3, 701, 701, 703, 703, 703, 703, 703, 703, 703, 702],
  [ 3, 701, 701, 0, 0, 0, 0, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, 702, ],
  [ 3, 701, 701, 0, 0, 0, 0, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, 702, ],
  [ 3, 701, 701, 701, 701, 0, 0, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 0, 720, 702, 0, 0, 720, 0, 0, 0, 720, 702, ],
  [ 3, 701, 701, 701, 701, 701, 0, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 0, 720, 702, 0, 0, 720, 0, 0, 0, 720, 702, ],
  [ 3, 701, 701, 701, 701, 701, 0, 0, 0, 0, 702, 720, 720, 720, 720, 702, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, ],  
  [ 3, 701, 701, 3, 1, 1, 9, 0, 0, 0, 702, 720, 720, 720, 702, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 720, 702, ],
  [ 3, 701, 701, 1, 1, 1, 9, 0, 0, 0, 702, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, 0, 702, ],
  [ 3, 701, 701, 9, 9, 9, 9, 0, 702, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, ],
  [ 3, 701, 701, 43, 0, 0, 9, 0, 702, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, ],
  [ 3, 701, 40, 43, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, 702, ],
  [ 3, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, 702, ],
  [ 3, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, 702, ],
  [ 3, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 720, 702, ],
  [ 3, 40, 40, 43, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702, ],
  [ 3, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702, ],
  [ 3, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 702, ],
  [3, 40, 40, 43],
  [3, 40, 40, 43],
  [3, 40, 40, 43],
  [3, 40, 40, 43],
  [3, 40, 40, 43],
  [3, 40, 40, 43, 10],
  [3, 40, 40, 43],
  [3, 40, 40, 43],
  [3, 40, 40, 43],
  [3, 3, 701, 701, 701],
  [3, 3, 701],
  [3, 3, 701],
  [3, 3, 701, 701],
];

const worldTreeRightHanded = [
  [ 3, 3, 1, 2, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 92, 92, 92, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 7, 16, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 16, 7, ],
  [ 3, 3, 2, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 92, 92, 7, 18, 7, 7, 17, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 18, 7, 7, 0, 7, 0, 0, 0, 0, 0, 7, ],
  [ 3, 3, 2, 94, 0, 0, 0, 0, 0, 0, 93, 92, 92, 92, 7, 0, 0, 7, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 18, 7, 7, ],
  [ 3, 3, 2, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 18, 7, 18, 7, 7, 18, 7, 16, 16, 16, 16, 16, 16, 16, 16, 16, 7, 7, ],
  [ 3, 3, 2, 0, 0, 93, 92, 92, 92, 92, 92, 92, 7, 18, 7, 7, 7, 7, 16, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 7, 7, 7, 7, 7, 17, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 93, 92, 92, 92, 92, 92, 7, ],
  [ 3, 3, 2, 0, 93, 92, 92, 92, 92, 92, 7, 18, 7, 17, 7, 7, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, ],
  [ 3, 3, 2, 94, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 7, 7, 93, 92, 7, 7, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 18, 7, 7, 18, 7, 7, 0, 0, 0, 0, 0, 0, 0, 18, 7, 7, 7, 7, 7, 0, 7, 0, 0, 0, 7, 0, 7, 7, 0, 0, 7, 18, 7, ],
  [ 3, 3, 2, 15, 15, 15, 15, 15, 15, 16, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 7, 7, 18, 7, 7, 7, 7, 7, 18, 7, 7, 15, 15, 15, 16, 7, ],
  [ 3, 3, 2, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 7, 16, 15, 15, 15, 15, 7, 16, 7, 7, 14, 14, 14, 16, 7, ],
  [ 3, 3, 2, 14, 14, 14, 14, 14, 14, 16, 14, 14, 14, 14, 14, 16, 14, 14, 14, 14, 14, 14, 14, 14, 16, 14, 14, 14, 14, 14, 16, 14, 14, 7, 14, 7, 7, 0, 0, 7, 17, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 17, 7, 7, 7, 17, 7, 17, 7, 0, 0, 0, 0, 0, 0, 0, 17, 7, 7, 7, 0, 0, 17, 7, 0, 0, 0, 0, 7, 92, 92, 7, 7, 7, ],
  [ 3, 3, 2, 94, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 7, 7, 0, 0, 0, 7, 0, 0, 0, 0, 7, 0, 0, 0, 7, ],
  [ 3, 3, 2, 0, 93, 92, 92, 92, 92, 92, 7, 17, 7, 18, 7, 91, 0, 0, 0, 7, 0, 93, 92, 92, 92, 19, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 7, 0, 7, 7, 7, 16, 16, 16, 16, 7, 7, 0, 0, 0, 0, 19, ],
  [ 3, 3, 2, 0, 0, 93, 92, 92, 92, 92, 92, 92, 7, 17, 7, 91, 0, 0, 17, 7, 7, 7, 7, 0, 0, 19, ],
  [ 3, 3, 2, 94, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 0, 0, 0, 7, 7, 7, 0, 0, 0, 19, 7, 7, 91, 0, 0, 18, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 7, 0, 0, 0, 17, 7, 7, 16, 16, 16, 16, 7, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 7, 7, 91, 0, 0, 17, 7, ],
  [ 3, 3, 2, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 0, 0, 0, 0, 0, 0, 7, 91, ],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19, 7, 7, 0, 0, 0, 0, 17, 7, ],
  [3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 7, 7],
  [ 3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 93, 92, 92, 92, 92, 92, 92, 92, 92, 92, 7, 7, 7, ],
  [3, 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17, 7, 7],
  [3, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7],
];

const biomes = {
  biome0: startStage,
  biome1: wetlands,
  biome2: forestA,
};
