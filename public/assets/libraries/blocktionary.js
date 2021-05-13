// The Blocktionary is our special repository of all the blocks and their special attributes.

// Block numbers are assigned by categories, with each range of 100 numbers roughly corresponding to a particular category/theme:

// 001 - 010: "The basic ten" - lava, shallow water, grass, dirt, rock, ice, tree trunk, leaves, bricks, and wooden planks
// 11 - 99: Jungle - more types of leaves, tree trunks, some Aztec-style temple stones, mossy rocks, etc.
// 100 - 199: Desert - Sand, cacti, various rock formations... in short, plants and rocks and birds and things.
// 200 - 299: Swamp - Willow trees, mud, swamp water, pirhanna water (dangerous like lava), lily pads, boardwalk, etc.
// 300 - 399: Arctic - Snow, more kinds of ice, candy-canes (for X-mas themed level??), pine trees, etc.
// 400 - 499: BadLands - Cracked dry mud, tar, buttes (or their components), sun-bleached bones, acid lakes, etc.
// 500 - 599: Forest (non-rain variety) - Variety of trees, logs, stumps, mushrooms, flowers, etc.
// 600 - 699: Aquatic - More types of deep and shallow water, coral reefs, cliffs, sunken ships, etc.
// 700 - 799: Civilisation - Pipes, concrete, masonry, fences, electrical lines, and anything else from the world of Man.
// 800 - 899: Psychedelica - Bubbles, giant flowers, tie-dyed stuff, balloons, clouds, other-worldly stuff, etc.
// 900 - 999: Bonuses/Utility Blocks/ Miscellaneous: Golden Eggs, Portals, Reward chests, and... BACON???

// LIST OF PROPERTIES THAT ARE (CURRENTLY) KNOWN TO THE BLOCK CLASS:
// animated, lethal, low-friction, passable, permable

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
  { id: '003', name: 'Stone-A', properties: [] },
  { id: '004', name: 'Lava-Rightward-Flow', properties: ['lethal', 'gif', 'flowing-right', 'permeable', 'opaque'] },
  { id: '005', name: 'Water-Surface', properties: ['permeable'] },
  { id: '006', name: 'Tree-Trunk', properties: ['passable'] },
  { id: '007', name: 'Leaves', properties: [] },
  { id: '008', name: 'Ice', properties: ['low_friction'] },
  { id: '009', name: 'Bricks', properties: [] },
  { id: '010', name: 'Wood-Planks', properties: [] },
  { id: '011', name: 'Palm-Trunk', properties: ['passable'] },
  { id: '012', name: 'Water-Deep', properties: ['permeable'] },
  { id: '013', name: 'Toadstool-Stem', properties: ['passable'] },
  { id: '014', name: 'Big-Tree-Right', properties: [] },
  { id: '015', name: 'Big-Tree-Left', properties: [] },
  { id: '016', name: 'Big-Tree-Middle', properties: ['passable'] },
  { id: '017', name: 'Big-Tree-Right-Branch', properties: ['passable'] },
  { id: '018', name: 'Big-Tree-Left-Branch', properties: ['passable'] },
  { id: '019', name: 'Big-Tree-Horizontal-Branch', properties: [] },
  { id: '020', name: 'Palm-Frond', properties: [] },
  { id: '021', name: 'Palm-Frond-Node', properties: [] },
  { id: '040', name: 'Lava-Upward-Flow', properties: ['lethal', 'gif', 'flowing-up'] },
  { id: '041', name: 'Lava-Downward-Flow', properties: ['lethal', 'gif', 'flowing-down', 'permeable', 'opaque'] },
  { id: '042', name: 'Lava-Leftward-Flow', properties: ['lethal', 'gif', 'flowing-left', 'permeable', 'opaque'] },
  { id: '043', name: 'Lava-Surface', properties: ['permeable', 'lethal', 'gif', 'opaque'] },
  { id: '091', name: 'Vine-Rail', properties: ['passable'] },
  { id: '092', name: 'Vine-Creeper', properties: ['passable'] },
  { id: '093', name: 'Vine-Tip', properties: ['passable'] },
  { id: '094', name: 'Mega-Fern-A', properties: ['passable'] },
  { id: '098', name: 'Stalactite-A', properties: ['passable'] },
  { id: '099', name: 'Stalactite-B', properties: [] },
  { id: '200', name: 'Swamp-Water-Deep', properties: ['permeable'] },
  { id: '201', name: 'Swamp-Water-Top', properties: ['permeable'] },
  { id: '700', name: 'Fence', properties: ['passable'] },
  { id: '701', name: 'Concrete', properties: [] },
  { id: '702', name: 'Girder-I-Bar', properties: [] },
  { id: '703', name: 'Girder-H-Bar', properties: [] },
  { id: '704', name: 'Lattice', properties: [] },
  { id: '705', name: 'Lab-Floor', properties: [] },
  { id: '706', name: 'Girder-Cross-Section', properties: [] },
  { id: '707', name: 'Ventilation-Duct', properties: [] },
  { id: '710', name: 'Pipes-Horizontal', properties: [] },
  { id: '711', name: 'Pipes-Vertical', properties: [] },
  { id: '712', name: 'Pipe-Bend-Top-Left', properties: [] },
  { id: '713', name: 'Pipe-Bend-Top-Right', properties: [] },
  { id: '714', name: 'Pipe-Bend-Bottom-Right', properties: [] },
  { id: '715', name: 'Pipe-Bend-Bottom-Left', properties: [] },
  { id: '720', name: 'Scaffolding', properties: ['permeable'] },
  { id: '721', name: 'Specimen-Jar', properties: ['permeable', 'gif'] },
  { id: '722', name: 'No-Dinosaurs-Zone', properties: ['passable'] },
  { id: '723', name: 'Catwalk', properties: [] },
  { id: '724', name: 'Security-Sign-Left', properties: ['passable'] },
  { id: '725', name: 'Security-Sign-Right', properties: ['passable'] },
  { id: '726', name: 'Elevator-Sign-Left', properties: ['passable'] },
  { id: '727', name: 'Elevator-Sign-Right', properties: ['passable'] },
  { id: '728', name: 'Lava-Sign-Left', properties: ['passable'] },
  { id: '729', name: 'Lava-Sign-Right', properties: ['passable'] },
  { id: '730', name: 'Mechanical-Doodad-1', properties: [] },
  { id: '731', name: 'Mechancal-Doodad-2', properties: [] },
  { id: '732', name: 'Box-1', properties: [] },
  { id: '733', name: 'Lab-Table', properties: [] },
  { id: '734', name: 'Fan', properties: ['gif'] },
  { id: '735', name: 'Bars', properties: [] },
  { id: '736', name: 'Cell-Block-Gate', properties: [] },
  { id: '737', name: 'Control-Panel A', properties: ['gif'] },
  { id: '738', name: 'Control-Panel B', properties: ['gif'] },
  { id: '739', name: 'Control-Panel C', properties: ['gif', 'green-glow'] },  // new prop: green-glow!
  { id: '740', name: 'Control-Panel D', properties: ['gif', 'red-glow'] },  // new prop: red-glow!
  { id: '741', name: 'Box-Stack', properties: [] },
  { id: '742', name: 'Big-Gear', properties: [] },
  { id: '790', name: 'Hanging-Wires', properties: ['passable'] },
  { id: '791', name: 'Hanging-Chains', properties: ['permeable'] },
  { id: '792', name: 'Surgical-Bed', properties: ['passable'] },
  { id: '900', name: 'Standing-Baddie-1002', properties: ['gif', 'passable'] },
  { id: '901', name: 'Standing-Baddie-1002-Left', properties: ['gif', 'passable', 'facing-left'] },
  { id: '902', name: 'Standing-Baddie-1003', properties: ['gif', 'passable'] },
  { id: '903', name: 'Standing-Baddie-1003-Left', properties: ['gif', 'passable', 'facing-left'] },
  { id: '904', name: 'Standing-Baddie-1004', properties: ['gif', 'passable'] },
  { id: '905', name: 'Standing-Baddie-1004-Left', properties: ['gif', 'passable', 'facing-left'] },
  { id: '970', name: 'Bacon-Horizontal-Middle', properties: [] },
  { id: '971', name: 'Bacon-Vertical-Middle', properties: [] },
  { id: '972', name: 'Bacon-Horizontal-Right', properties: [] },
  { id: '973', name: 'Bacon-Horizontal-Left', properties: [] },
  { id: '974', name: 'Bacon-Vertical-Bottom', properties: [] },
  { id: '975', name: 'Bacon-Vertical-Top', properties: [] },
  { id: '988', name: 'High-Voltage', properties: ['gif'] },
  { id: '989', name: 'Portal', properties: ['permeable', 'animated'] },
  { id: '999', name: 'Golden-Egg', properties: [] },
];

// const template = { id: '', name: '', properties: [] },
