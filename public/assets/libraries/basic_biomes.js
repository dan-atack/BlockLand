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
