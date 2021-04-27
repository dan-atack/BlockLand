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

  const laurenLand = [
    [3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 7],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 7, 7, 7],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 2, 6, 6, 6, 6, 6, 7, 7, 7],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 2, 0, 0, 0, 0, 7, 7, 7],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 2, 0, 0, 0, 0, 7],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1, 1, 2],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 93, 92, 92, 92, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 93, 92, 92, 92, 92, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1],
    [3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1],
    [3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1, 2],
    [3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1],
    [3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1],
    [3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 3, 1],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1],
    [40, 40, 40, 43, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1, 2],
    [40, 40, 40, 43, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 3, 3, 1, 2],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1, 2],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 1, 2],
    [40, 40, 40, 43, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3, 3, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3],
    [40, 40, 40, 43, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3],
    [40, 40, 40, 43, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 99, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 99, 3, 3],
    [40, 40, 40, 43, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 99, 3],
    [40, 40, 40, 43, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [40, 40, 40, 43, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1],
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
    [3, 3, 3],
    [3, 3, 3],
    [3, 3, 3],
    [3, 3, 3],
    [3, 3, 3],
    [3, 3, 3],
  ]

const laboratory2 = [
  [711,711,711,702,711,701,701,701,705,0,0,0,710,701,710,701,710,704,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,722,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,733,0,0,710,701,710,701,710,704,0,0,0,0,702,702,704,733,0,0,0,0,0,0,0,0,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,0,0,0,710,701,710,701,710,704,732,0,0,0,702,702,704,733,0,0,0,734,706,706,706,706,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,0,0,0,734,701,710,701,710,704,0,0,0,0,702,702,704,0,0,0,0,720,0,720,0,720,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,0,0,0,710,701,710,701,710,704,733,0,0,0,702,702,704,0,0,0,0,720,0,720,0,720,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,0,0,0,710,701,710,701,710,704,703,703,703,703,734,702,704,0,0,0,0,720,0,720,0,720,705,0,0,703,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,711,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,706,703,703,703,703,703,703,703,703,703,703,706,703,703,703,703,703,703,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,711,711,701,701,701,701,701,701,701,701,701,701,701,734,701,721,701,701,702,711,711,711,711,711,711,711,711,711,711,712,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,711,711,701,701,701,701,701,701,701,701,0,0,0,0,0,0,0,731,702,711,711,711,711,711,711,711,702,711,712,710,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,711,701,701,701,705,0,0,702,0,0,0,0,0,0,0,0,0,0,790,706,703,703,703,703,703,703,703,706,0,710,710,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,702,0,0,790,702,0,0,0,0,0,734,734,0,0,0,701,701,705,0,0,0,702,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,701,0,0,0,0,0,702,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,702,0,0,0,0,0,0,701,701,705,0,0,702,702,702,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,701,0,0,0,0,0,702,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,790,702,0,0,0,0,0,0,701,701,705,0,702,702,702,702,702,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,701,0,0,0,0,0,702,0,0,0,0,0,0,0,0,702,0,0,0,706,703,703,703,706,0,0,0,0,0,0,701,701,705,0,0,0,702,0,0,0,0,0,0,0],
  [711,711,711,712,711,711,711,711,705,0,703,703,703,703,706,733,0,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,701,705,0,0,0,702,0,0,0,0,0,0,0],
  [3,3,3,714,711,712,711,711,705,0,0,0,0,0,702,0,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,701,705,0,0,790,702,0,0,0,0,0,0,0],
  [3,3,3,3,1,714,711,712,705,0,0,0,0,0,702,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,701,701,705,0,0,0,720,0,0,0,0,0,0,0],
  [3,3,3,40,1,1,1,710,705,0,0,0,0,0,702,0,0,0,0,702,702,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,701,701,701,705,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,1,1,710,705,0,0,0,0,0,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,701,701,0,0,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,99,1,710,705,0,0,0,0,0,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,99,1,731,705,0,0,0,0,0,702,0,0,0,790,702,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,0,705,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,0,0,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,0,0,0,0,0,0,701,701,0,0,0,0,0,702,722,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,0,0,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,701,701,701,705,720,720,720,702,720,720,720,0,0,0,0],
  [40,40,40,40,43,0,0,0,0,0,0,0,0,0,702,0,0,0,734,720,0,0,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,701,701,705,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,0,705,0,0,0,0,790,702,0,0,0,734,720,0,0,0,0,0,790,702,0,0,0,0,0,0,702,0,0,0,0,701,701,705,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,1,705,0,0,0,0,0,702,0,0,0,734,720,0,0,0,0,0,0,720,0,0,0,0,0,790,702,0,0,0,0,701,701,705,0,0,790,702,0,0,0,0,0,0,0],
  [3,3,3,40,43,0,99,1,705,0,0,703,703,703,706,733,0,0,0,720,0,0,0,0,0,790,702,0,0,0,0,0,0,720,0,0,0,0,701,701,705,0,0,0,702,0,0,0,0,0,0,0],
  [3,3,3,3,3,0,99,1,705,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,0,99,1,705,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,720,0,0,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,1,705,730,0,0,0,790,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,701,732,0,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,701,705,731,0,0,0,790,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,734,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,1,1,1,715,711,711,713,0,0,0,0,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,701,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,711,711,706,706,705,0,0,0,0,0,701,0,0,0,0,702,0,0,0,702,0,0,0,0,0,0,0,0,701,0,0,0,701,701,701,700,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,706,705,0,0,0,0,0,701,0,0,0,0,702,0,0,701,701,701,0,0,0,706,790,702,734,701,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,706,705,0,0,0,0,0,701,0,0,0,0,0,0,0,0,701,701,703,703,703,706,730,702,0,701,0,703,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,3,3,3,701,701,701,706,705,0,0,0,0,0,701,0,0,0,0,0,0,0,0,701,701,703,703,703,706,703,706,0,0,0,703,703,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [701,3,3,3,3,701,701,701,9,0,0,0,0,0,701,0,0,0,0,0,0,0,0,701,701,0,0,0,706,703,703,703,703,703,703,703,703,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,701,701,9,0,0,0,0,0,701,0,0,0,702,0,0,0,701,701,701,0,0,0,0,0,0,0,0,0,703,703,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,701,701,9,9,0,701,701,701,701,0,701,701,701,701,701,701,701,701,701,720,720,720,720,720,720,720,720,720,703,720,720,720,720,720,720,720,703,703,706,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,701,9,9,0,701,701,701,701,0,701,701,701,701,701,701,701,701,700,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,3,3,3,3,3,3,701,9,9,0,701,701,701,701,0,701,701,701,701,701,701,701,701,700,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,3,3,3,3,3,3,701,9,0,0,701,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,3,3,3,3,3,3,701,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,3,3,3,3,701,701,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,3,3,3,3,701,1,0,0,0,0,20,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,3,3,3,701,1,11,11,11,11,11,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,3,3,3,701,1,0,0,0,0,20,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,3,3,3,701,701,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,2,0,0,0,0,0,20,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,2,11,11,11,11,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,40,3,3,3,3,3,3,3,3,3,3,3,3,1,1,2,0,0,0,20,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,3,3,3,3,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,4,4,40,40,40,3,3,3,3,3,3,3,3,3,2,0,0,0,20,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

const laboratory1 = [
  [711,711,711,702,711,701,701,701,701,701,701,701,701,701,701,701,710,704,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,0,0],
  [711,711,711,702,711,701,701,701,701,701,701,701,701,701,701,701,734,704,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,0,0],
  [711,711,702,711,711,701,701,701,705,701,701,701,701,0,723,0,0,0,0,0,0,0,702,702,704,733,0,0,0,0,0,0,0,0,705,0,0,0,0,0,723,0,0,0,0,0,0,0,0,0,0,0],
  [711,702,711,711,711,701,701,701,705,701,701,701,0,0,723,0,0,0,732,0,0,0,702,702,704,733,0,0,0,734,706,706,706,706,705,0,0,0,0,0,723,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,702,701,701,701,705,701,701,0,0,0,723,0,0,0,0,0,0,0,702,702,704,0,0,0,0,720,0,720,0,720,705,0,0,0,0,0,723,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,701,0,0,0,0,723,0,0,0,733,0,0,0,702,702,704,0,0,0,0,720,0,720,0,720,705,0,0,0,0,0,723,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,701,701,701,705,0,0,0,0,0,702,0,0,0,703,703,703,703,734,702,704,0,0,0,0,720,0,720,0,720,705,0,0,703,0,0,723,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,735,735,735,735,735,706,0,0,0,701,701,701,701,701,706,703,703,703,703,703,703,703,703,703,703,706,0,0,703,703,703,703,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,711,711,701,705,732,0,0,0,0,702,0,0,0,734,701,721,701,701,702,711,711,711,711,711,711,711,711,711,711,712,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [711,702,711,711,711,711,711,701,705,0,0,0,0,0,723,0,0,0,0,0,0,0,731,702,711,711,711,711,711,711,711,702,711,712,710,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,711,711,701,701,701,705,0,0,0,0,0,702,0,0,0,0,0,0,0,790,706,703,703,703,703,703,703,703,706,0,710,710,0,0,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,701,701,701,705,0,0,0,0,0,723,0,0,0,0,0,0,0,0,702,0,0,790,702,0,0,0,0,0,734,734,0,0,0,701,701,705,0,0,0,702,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,0,0,0,0,0,702,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0,702,0,0,0,0,0,0,701,701,705,0,0,702,702,702,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,0,0,0,0,0,723,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,790,702,0,0,0,0,0,0,701,701,705,0,702,702,702,702,702,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,0,0,0,0,0,702,0,0,0,0,0,0,0,0,702,0,0,0,706,703,703,703,706,0,0,0,0,0,0,701,701,705,0,0,0,702,0,0,0,0,0,0,0],
  [711,711,711,712,711,711,711,711,705,0,735,735,735,735,706,733,0,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,701,705,0,0,0,702,0,0,0,0,0,0,0],
  [3,3,3,714,711,712,711,711,705,0,0,0,0,0,702,0,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,701,705,0,0,790,702,0,0,0,0,0,0,0],
  [3,3,3,3,1,714,711,712,705,0,0,0,0,0,723,0,0,0,0,0,703,702,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,701,701,701,705,0,0,0,720,0,0,0,0,0,0,0],
  [3,3,3,40,1,1,1,710,705,732,0,0,0,0,702,0,0,0,0,702,702,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,701,701,701,705,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,1,1,710,705,0,0,0,0,0,723,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,701,701,0,0,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,99,1,710,705,0,0,0,0,0,723,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,99,1,731,705,0,0,0,0,0,702,0,0,0,790,702,0,0,0,0,0,0,0,0,0,0,0,702,0,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,710,705,0,735,735,735,735,702,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,0,710,705,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,0,0,0,0,0,0,701,701,0,0,0,0,0,702,722,0,0,0,0,0,0],
  [40,40,40,40,43,0,715,730,705,0,0,0,0,0,723,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,701,701,701,705,720,720,720,702,720,720,720,0,0,0,0],
  [40,40,40,40,43,0,710,99,705,0,0,0,0,0,723,0,0,0,734,720,0,0,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,701,701,705,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,710,99,705,0,0,0,0,790,702,0,0,0,734,720,0,0,0,0,0,790,702,0,0,0,0,0,0,702,0,0,0,0,701,701,705,0,0,0,720,0,0,0,0,0,0,0],
  [40,40,40,40,43,0,710,1,705,0,0,0,0,0,702,0,0,0,734,720,0,0,0,0,0,0,720,0,0,0,0,0,790,702,0,0,0,0,701,701,705,0,0,790,702,0,0,0,0,0,0,0],
  [3,3,3,40,43,0,710,1,705,0,735,735,735,735,706,733,0,0,0,720,0,0,0,0,0,790,702,0,0,0,0,0,0,720,0,0,0,0,701,701,705,0,0,0,702,0,0,0,0,0,0,0],
  [3,3,3,3,3,711,713,1,705,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,0,0,720,0,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,0,99,1,705,0,0,0,0,0,702,0,0,0,0,720,0,0,0,0,0,0,702,0,0,0,0,0,720,0,0,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,1,705,0,0,0,0,790,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,701,732,0,0,0,0,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,1,1,701,705,0,0,0,0,790,702,0,0,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,734,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,1,1,1,715,711,734,0,0,0,0,0,706,734,706,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,701,701,701,701,705,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,711,711,706,706,705,732,0,0,0,0,0,710,702,0,0,702,0,0,0,0,0,0,0,0,0,0,0,0,701,0,0,0,701,701,701,700,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,0,0,0,0,0,0,710,702,0,0,0,0,0,0,0,0,0,0,0,706,790,702,734,701,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,701,701,701,701,701,701,701,705,735,735,735,735,734,0,710,702,733,0,0,0,0,0,0,0,702,703,703,706,730,702,0,701,0,703,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [701,3,3,3,701,701,701,701,705,0,0,0,0,707,0,710,701,701,701,701,701,701,0,0,0,702,703,703,706,703,706,0,0,0,703,703,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [701,3,3,3,3,701,701,701,705,722,0,0,0,707,0,714,711,734,711,712,701,705,0,0,0,0,0,0,706,703,703,703,703,703,703,703,703,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [3,3,3,3,3,701,701,701,705,0,0,0,0,707,0,0,0,0,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,703,703,0,0,0,0,0,0,0,0,702,0,0,0,0,0,0,0],
  [1,1,1,3,3,701,701,701,705,733,0,0,0,734,711,711,711,734,0,710,701,705,0,0,0,720,720,720,720,720,720,720,720,720,703,720,720,720,720,720,720,720,703,703,706,0,0,0,0,0,0,0],
  [1,1,1,1,3,701,701,701,705,0,0,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,3,3,3,701,705,733,0,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,3,3,3,701,705,0,0,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,3,3,3,3,701,705,0,0,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,3,3,3,3,701,705,0,0,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,702,3,3,3,3,701,705,0,0,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,3,3,3,701,705,733,0,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,711,711,702,711,712,705,999,0,0,0,0,0,0,0,0,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [711,711,711,702,711,711,712,710,705,733,0,0,0,0,0,0,0,0,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,710,710,705,732,732,0,0,0,0,0,0,707,0,710,701,705,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,710,710,701,701,701,701,701,701,701,0,701,707,0,710,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,701,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,710,714,711,711,711,711,711,711,711,711,711,711,734,714,711,711,711,711,711,711,711,711,711,711,711,711,711,711,701,701,701,701,701,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,714,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,711,701,701,701,701,701,701,701,701,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,40,40,40,40,40,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [40,40,40,3,3,3,3,4,4,3,3,3,40,40,40,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,4,4,40,40,40,40,40,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,4,3,3,40,40,40,40,40,40,3,3,1,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,4,3,3,3,3,3,3,3,3,3,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

