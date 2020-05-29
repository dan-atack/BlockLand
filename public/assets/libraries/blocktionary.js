// The Blocktionary is our special repository of all the blocks and their special attributes:

const blocktionary = [
  { id: '000', name: 'Air', properties: ['permeable'] },
  {
    id: '001',
    name: 'Dirt',
    // An empty properties array means you are a basic block:
    properties: [],
  },
  {
    id: '002',
    name: 'Grass',
    properties: [
      // At some point maybe note that grass is tall/ a 'top' block for the benefit of future... terrain generating algorithms? :O
    ],
  },
  { id: '003', name: 'Stone_A', properties: [] },
  { id: '004', name: 'Lava', properties: ['lethal' /*'permeable'*/] },
  { id: '005', name: 'Water_Top', properties: ['permeable'] },
  { id: '006', name: 'Tree_Trunk', properties: [] },
  { id: '007', name: 'Leaves_A', properties: [] },
  { id: '008', name: 'Ice_A', properties: ['low_friction'] },
  { id: '009', name: 'Bricks', properties: [] },
  { id: '010', name: 'Wood_Planks_A', properties: [] },
  { id: '012', name: 'Water_Deep', properties: ['permeable'] },
  { id: '200', name: 'Swamp_Water_Deep', properties: ['permeable'] },
  { id: '201', name: 'Swamp_Water_Top', properties: ['permeable'] },
  { id: '970', name: 'Bacon_Horizontal_Middle', properties: [] },
  { id: '971', name: 'Bacon_Vertical_Middle', properties: [] },
  { id: '972', name: 'Bacon_Horizontal_Right', properties: [] },
  { id: '973', name: 'Bacon_Horizontal_Left', properties: [] },
  { id: '974', name: 'Bacon_Vertical_Bottom', properties: [] },
  { id: '975', name: 'Bacon_Vertical_Top', properties: [] },
  { id: '989', name: 'Portal', properties: ['permeable', 'animated'] },
  { id: '999', name: 'Golden_Egg', properties: [] },
];

// const template = { id: '', name: '', properties: [] },
