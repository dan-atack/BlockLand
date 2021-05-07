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
    [1, 1, 1, 2],
    [3, 3, 1, 1, 2, 0, 0, 0, 0, 0, 20, 0, 20],
    [3, 3, 1, 2, 11, 11, 11, 11, 11, 11, 21, 21, 21],
    [3, 3, 1, 2, 0, 0, 0, 0, 0, 0, 20, 0, 20],
    [3, 3, 1, 2, 0, 0, 0, 7],
    [3, 1, 1, 2, 6, 6, 7, 7, 7],
    [3, 1, 1, 2, 0, 0, 0, 7],
    [3, 1, 1, 2, 0, 7],
    [3, 1, 1, 2, 6, 7, 7],
    [3, 1, 1, 2, 0, 7, 0, 0, 0, 0, 20],
    [3, 1, 1, 2, 0, 0, 0, 0, 0, 0, 20],
    [3, 1, 1, 2, 11, 11, 11, 11, 11, 11, 21],
    [3, 3, 1, 2, 0, 0, 0, 0, 0, 0, 20],
    [3, 1, 2, 0, 0, 0, 7, 0, 0, 0, 20],
    [3, 1, 2, 0, 0, 7, 7, 7],
    [3, 1, 6, 6, 6, 6, 7, 7, 7],
    [3, 1, 2, 0, 0, 7, 7, 7],
    [3, 1, 2, 0, 0, 0, 7],
    [3, 1, 2],
    [3, 1, 2],
    [3, 1, 2],
    [3, 1, 1, 0, 0, 0, 7],
    [3, 1, 2, 0, 0, 0, 7, 7],
    [3, 1, 2, 6, 6, 6, 7, 7],
    [3, 1, 2, 0, 0, 0, 7, 7],
    [3, 1, 1, 2, 0, 0, 7],
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

const laboratory = [
  [711,711,711,702,711,701,701,701,701,701,701,701,701,701,701,701,710,704,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,710,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,701,701,701,701,701,701,701,701,710,704,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,714,711,711,711,711,711,711,711,711,711,711,711,712,701,701,701,701,701,701,701,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,701,701,701,701,701,701,701,701,710,704,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,710,701,701,701,701,701,701,701,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,701,701,701,701,701,701,701,701,734,704,0,0,0,0,0,0,701,701,701,701,701,701,701,701,701,0,0,0,0,701,701,701,0,0,701,701,0,0,701,701,734,701,701,701,701,701,701,701,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,701,701,701,705,701,701,701,701,0,720,0,0,0,0,0,0,0,702,0,704,733,0,0,0,0,0,0,0,0,705,733,0,0,0,0,0,0,0,0,0,0,0,0,707,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,702,711,711,711,701,701,701,705,701,701,701,0,0,720,0,0,0,0,0,0,0,702,0,704,741,0,0,0,734,706,706,706,706,705,0,0,0,0,0,0,0,0,0,0,0,0,0,707,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,702,701,701,701,705,701,701,0,0,0,720,0,0,0,0,0,0,0,702,0,704,0,0,0,0,720,0,720,0,720,705,0,0,0,0,0,0,0,0,0,0,0,0,0,707,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,701,0,0,0,0,720,0,0,0,0,0,0,0,702,0,704,0,0,0,0,720,0,720,0,720,705,0,0,0,0,0,0,0,0,0,0,0,0,0,707,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,701,701,701,705,0,0,0,0,0,702,0,0,0,0,0,703,703,734,0,0,0,0,0,0,720,0,720,0,720,705,0,0,702,0,0,0,702,0,0,0,0,0,0,707,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,736,735,735,735,735,706,0,0,0,701,701,701,701,701,706,703,703,703,703,703,703,703,703,703,703,706,0,0,706,703,703,703,706,703,703,703,703,703,703,707,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,711,711,701,705,0,0,0,0,0,702,0,0,0,734,701,721,701,701,702,711,711,711,711,711,711,711,711,711,711,712,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,702,711,711,711,711,711,701,705,0,0,0,0,0,723,0,0,0,0,0,0,0,731,702,711,711,711,711,711,711,711,702,711,712,710,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,701,701,701,705,792,0,0,0,0,702,902,0,0,0,0,0,0,790,706,703,703,703,703,703,703,703,706,0,710,710,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,0,0,0,0,0,723,0,0,0,0,0,0,0,0,702,0,0,790,702,0,0,0,0,0,734,734,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,0,0,0,0,790,702,901,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,702,0,0,0,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,0,0,0,0,0,723,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,790,702,0,0,0,0,0,0,701,701,705,0,702,702,702,702,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,0,0,0,0,0,702,0,0,0,0,0,0,0,0,702,0,0,0,706,703,703,703,706,0,0,0,0,726,791,701,701,705,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,712,711,711,711,711,705,0,735,735,735,735,706,733,0,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,727,791,701,701,705,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,714,711,712,711,711,705,0,0,0,0,0,702,0,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,701,705,0,0,790,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,1,714,711,712,705,0,0,0,0,0,723,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,701,701,705,0,0,0,720,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,40,1,1,1,710,705,741,791,791,791,791,702,0,0,0,0,702,702,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,701,701,701,705,0,0,0,720,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,1,1,710,705,0,0,0,0,0,723,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,701,701,705,0,0,0,0,720,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,99,1,710,705,0,0,0,0,0,723,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,720,0,0,0,0,0,701,701,705,0,0,0,0,720,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,99,1,731,705,0,0,0,0,0,702,0,0,0,790,702,0,0,0,0,0,0,0,0,0,0,0,720,0,0,0,0,0,701,701,705,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,710,705,0,735,735,735,735,702,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,701,701,705,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,710,705,0,0,0,0,0,702,902,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,720,701,722,0,0,0,0,701,705,0,0,0,0,702,722,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,715,730,705,0,0,0,0,0,723,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,790,720,731,0,0,701,701,701,701,705,736,735,702,703,702,703,703,703,703,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,710,99,705,0,0,0,0,0,723,0,0,0,734,720,0,0,0,0,0,0,720,0,0,0,0,742,702,0,0,0,0,0,0,742,0,0,0,0,0,0,0,742,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,710,98,705,0,0,0,0,790,702,901,0,0,734,720,0,0,0,0,0,790,702,0,0,0,0,720,702,791,791,791,791,791,791,791,791,791,791,791,791,791,791,791,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,710,1,705,0,0,0,0,0,702,0,0,0,734,720,0,0,0,0,0,0,720,0,0,0,0,720,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,40,43,0,710,1,705,0,735,735,735,735,706,733,0,0,0,720,0,0,0,0,0,790,702,0,0,0,0,720,702,791,791,791,791,791,791,791,791,791,791,791,791,791,791,791,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,711,713,1,705,0,0,0,0,0,702,904,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,742,702,0,0,0,0,0,0,742,0,0,0,0,0,0,0,742,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,0,98,1,705,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,790,720,730,0,0,701,701,701,701,701,701,736,701,701,701,701,701,701,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,1,705,0,0,0,0,790,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,720,701,0,0,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,701,705,0,0,0,0,790,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,720,0,0,0,0,734,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,1,1,1,715,711,734,0,0,0,0,0,706,734,706,0,0,0,0,0,0,0,0,0,0,0,0,0,0,720,0,0,0,0,714,712,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,711,711,706,706,705,732,0,0,0,0,0,710,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,720,701,0,0,0,701,714,712,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,0,0,0,0,0,0,710,702,0,0,0,0,0,0,0,0,0,0,0,706,790,702,734,701,0,0,0,0,707,734,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,736,735,735,735,734,0,710,702,0,0,0,0,0,0,0,0,702,703,703,706,730,702,707,701,739,0,0,0,707,0,707,705,737,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,3,3,3,701,701,701,701,705,0,0,0,0,707,0,710,701,701,701,701,701,701,736,735,735,702,703,703,706,703,706,707,701,0,0,0,0,707,0,707,705,738,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,3,3,3,3,701,701,701,705,722,0,0,0,707,0,714,711,734,711,712,701,705,0,0,0,0,0,0,720,0,0,707,701,0,0,0,0,707,0,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,701,701,701,705,0,0,0,0,707,0,0,0,0,0,710,701,705,720,732,741,0,0,0,720,0,0,707,701,736,735,703,703,707,0,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,3,3,701,701,701,705,0,0,0,0,734,711,711,711,734,0,710,701,705,732,732,732,732,741,0,720,0,0,707,705,0,0,0,0,707,0,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,3,701,701,701,705,733,0,0,0,0,0,715,711,707,0,710,701,705,0,0,0,0,0,790,720,720,720,707,705,0,0,0,0,707,0,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,3,3,3,701,705,0,0,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,720,0,0,707,705,0,0,0,0,707,0,707,705,733,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,3,3,3,701,705,737,0,0,0,0,0,710,0,707,0,710,701,705,0,0,0,0,0,0,720,0,0,707,705,741,0,0,0,707,0,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,3,3,3,3,701,705,738,0,0,0,0,0,710,0,707,0,710,701,705,0,0,0,0,0,0,702,0,0,707,705,0,0,0,0,707,0,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,3,3,3,3,701,705,0,0,0,0,724,791,710,0,707,0,710,701,705,732,732,0,0,0,0,702,0,0,707,705,0,0,0,0,707,0,707,705,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,3,3,3,3,701,705,0,0,0,0,725,791,710,0,707,0,710,701,705,0,0,0,0,0,0,702,0,0,707,705,0,0,0,0,707,0,707,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,3,3,3,701,705,741,0,0,0,0,0,710,0,707,0,710,701,705,0,0,0,0,0,0,702,0,0,707,705,0,0,0,0,707,0,707,701,703,703,703,703,703,703,703,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,711,702,711,712,705,0,0,0,0,0,0,710,0,0,0,710,701,705,732,0,0,0,0,0,702,0,0,707,705,0,0,0,0,707,0,0,734,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,711,712,710,705,0,0,0,0,0,0,710,0,0,0,710,701,705,732,741,0,0,0,0,702,0,0,707,705,0,0,0,0,707,0,0,734,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,710,710,705,702,0,0,0,0,0,710,0,707,0,710,701,705,732,732,732,0,0,0,0,0,0,707,701,0,0,0,0,707,0,0,734,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,710,710,701,701,702,0,0,0,0,710,0,707,0,710,701,701,701,701,701,701,701,701,701,701,720,720,720,720,734,0,707,707,0,707,710,703,703,703,703,703,703,703,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,710,714,711,712,701,0,0,0,0,710,0,707,0,714,711,711,711,711,711,711,711,711,711,711,711,711,711,711,713,0,0,0,0,707,710,3,3,3,3,3,3,3,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,714,711,712,710,705,0,0,0,0,710,0,707,0,0,0,0,0,734,711,711,711,711,711,711,711,713,701,701,701,0,707,707,707,707,710,3,3,3,3,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,3,3,3,3,3,710,710,705,733,0,0,0,710,0,707,707,707,707,707,0,707,1,1,1,1,1,1,1,1,701,701,710,0,715,711,711,711,713,711,711,712,3,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,3,3,710,710,705,0,0,0,0,710,0,0,0,0,0,707,0,707,1,1,1,1,12,5,1,3,701,701,710,0,710,0,0,0,0,3,3,710,3,3,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,3,4,3,3,3,710,710,705,0,0,0,0,714,711,707,0,707,0,707,0,707,1,1,12,12,12,5,0,3,701,715,713,0,710,0,0,0,0,0,3,710,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,4,3,3,3,710,710,705,0,0,0,0,0,790,707,0,707,0,707,0,707,3,1,1,12,12,5,98,3,701,710,0,0,710,0,0,0,0,98,3,710,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,4,3,3,3,710,710,705,737,0,0,0,0,0,707,0,707,0,0,0,707,3,1,1,1,1,5,0,1,701,710,0,715,713,720,720,720,720,3,3,710,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,4,40,3,3,710,710,705,739,0,0,0,0,0,707,0,707,0,0,0,707,3,1,1,1,1,5,1,1,701,710,0,710,0,0,0,0,0,3,3,710,1,701,701,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,4,3,3,710,710,705,0,0,0,0,0,0,707,0,707,0,707,0,707,711,711,711,712,1,1,1,1,701,710,0,710,0,0,0,0,0,98,3,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,4,3,3,710,710,705,0,0,0,0,0,0,707,0,0,0,707,0,0,0,0,0,710,1,1,1,1,701,710,0,710,0,0,0,0,0,0,3,710,3,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,4,3,3,710,710,705,733,0,0,0,0,790,707,0,703,703,703,734,707,711,712,0,710,1,1,1,1,701,710,0,710,0,0,0,0,0,0,3,710,3,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,4,4,3,710,714,711,711,711,711,711,711,734,707,734,711,734,711,711,711,711,711,711,711,711,711,711,711,711,713,0,734,0,0,0,0,99,3,3,710,3,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,4,3,714,711,711,711,711,711,711,711,711,711,712,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,734,791,791,791,791,791,3,3,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,4,3,701,701,701,701,701,701,701,701,701,701,714,711,711,711,711,711,711,711,711,711,711,711,711,1,1,0,0,0,0,0,0,0,99,3,3,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,4,4,4,3,3,3,3,3,3,3,3,3,701,701,701,701,701,701,701,701,701,701,701,701,701,701,1,1,0,0,0,0,0,99,1,1,1,1,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,4,4,4,4,4,40,40,3,3,3,3,3,3,3,3,3,3,40,3,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,99,1,1,1,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,4,4,4,4,4,40,40,40,40,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,98,1,1,1,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,4,4,4,4,4,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,1,1,1,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,1,1,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,40,40,40,3,40,40,40,3,40,43,0,0,0,0,0,0,0,0,98,1,1,1,710,1,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,0,0,0,0,0,0,0,99,1,1,1,710,1,701,701,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,722,0,0,0,0,0,0,98,1,1,1,710,1,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,710,1,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,710,1,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,4,4,4,4,4,4,4,40,40,40,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,0,0,0,0,0,0,99,1,1,1,1,1,710,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,4,4,4,4,4,4,40,40,40,40,40,40,40,40,3,40,40,40,40,3,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,1,1,1,1,1,710,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,4,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,1,1,1,1,710,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,4,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,710,720,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,1,3,3,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,710,720,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,4,40,40,40,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,4,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,4,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,4,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,4,4,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,3,3,3,3,3,3,3,3,3,3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,3,3,3,40,40,40,3,3,3,40,40,40,40,40,40,1,1,1,1,1,1,1,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,1,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,40,40,40,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,40,40,40,40,40,43,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,40,40,43,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,3,3,3,3,3,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,3,3,3,3,3,3,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,43,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,3,3,3,3,3,3,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,99,3,3,3,3,3,3,3,3,3,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,98,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,99,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,703,703,703,703,703,703,703,703,703,703,703,703,703,703,703,703,703,703,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,98,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,98,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,3,3,3,3,3,12,12,12,5,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,12,12,12,5,0,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,12,12,12,5,0,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,12,12,12,5,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,12,12,12,5,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

