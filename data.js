export const image = (id, w = 900, q = 82) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const destinations = [
  { name:'Colombo', region:'West coast', short:'The island begins in motion.', description:'A layered capital of ocean light, old quarters, modern art and late dinners.', category:'City / Culture', tags:['Galle Face','Design','Food'], lat:6.93, lon:79.86 },
  { name:'Galle', region:'South coast', short:'Where history meets the ocean.', title:'Where History Meets the Ocean', description:'Walk the ramparts as the sun drops into the Indian Ocean, then stay for the slow glow of the fort.', category:'Heritage / Ocean', tags:['Galle Fort','Lighthouse','Boutique stays'], lat:6.03, lon:80.22 },
  { name:'Bentota', region:'South west', short:'A river finds the sea.', description:'Glide through mangroves, then let the beach stretch the afternoon open.', category:'Beach / Water', tags:['River safari','Beach','Wellness'], lat:6.42, lon:80.00 },
  { name:'Mirissa', region:'South coast', short:'Where the ocean comes alive.', title:'Where the Ocean Comes Alive', description:'Whale songs at first light, palms in the wind, and a beach that knows how to hold a sunset.', category:'Ocean / Wildlife', tags:['Whale watching','Sunset','Seafood'], lat:5.95, lon:80.46 },
  { name:'Unawatuna', region:'South coast', short:'A quiet cove for golden hours.', description:'A crescent of warm sand backed by reef, palms and slow saltwater days.', category:'Beach / Dive', tags:['Snorkel','Cove','Sunset'], lat:6.01, lon:80.25 },
  { name:'Yala', region:'Deep south', short:'Into the wild.', title:'Into the Wild', description:'Move quietly through dry forest and grassland, where a leopard may become the day’s only headline.', category:'Wildlife / Safari', tags:['Leopard','Safari','Elephant'], lat:6.37, lon:81.52 },
  { name:'Ella', region:'Hill country', short:'Where mountains touch the clouds.', title:'Where Mountains Touch the Clouds', description:'Train windows, tea paths and misty peaks — Ella turns the journey itself into the destination.', category:'Mountains / Tea', tags:['Nine Arch Bridge','Tea','Waterfalls'], lat:6.87, lon:81.05 },
  { name:'Nuwara Eliya', region:'Central highlands', short:'Little England in the clouds.', title:'Little England in the Clouds', description:'A cool green world of tea estates, colonial lines and clouds that arrive before breakfast.', category:'Tea country / Highlands', tags:['Tea estates','Mist','Colonial'], lat:6.95, lon:80.78 },
  { name:'Kandy', region:'Central hills', short:'A city held by the hills.', description:'Temple bells, lake light and the cadence of the highlands — Kandy sits at the heart of the island.', category:'Culture / Highlands', tags:['Temple of the Tooth','Lake','Dance'], lat:7.29, lon:80.63 },
  { name:'Sigiriya', region:'Cultural triangle', short:'The ancient sky kingdom.', title:'The Ancient Sky Kingdom', description:'Rise before the heat and climb through the gardens of a lost royal citadel, where the jungle opens into an endless horizon.', category:'Heritage / Adventure', tags:['Lion Rock','Gardens','Sunrise'], lat:7.96, lon:80.76 },
  { name:'Dambulla', region:'Cultural triangle', short:'A cave of golden stories.', description:'Step into a living archive of murals, monks and centuries of devotion.', category:'Heritage / Spiritual', tags:['Cave temple','Mural art','History'], lat:7.86, lon:80.65 },
  { name:'Trincomalee', region:'East coast', short:'Where the blue ocean begins.', title:'Where the Blue Ocean Begins', description:'Crystal water, quiet temples and the easy brilliance of the east coast morning.', category:'Ocean / Culture', tags:['Diving','Temple','Sunrise'], lat:8.59, lon:81.22 },
  { name:'Nilaveli', region:'East coast', short:'A pale beach, a wide sea.', description:'A north-east ribbon of powder sand and reef-blue water.', category:'Beach / Dive', tags:['Pigeon Island','Diving','Lagoon'], lat:8.69, lon:81.19 },
  { name:'Arugam Bay', region:'East coast', short:'Ride the perfect wave.', title:'Ride the Perfect Wave', description:'An easygoing surf town with long lines, warm water and sunsets made for the afterglow.', category:'Surf / Ocean', tags:['Surfing','Lagoon','Cafés'], lat:6.84, lon:81.83 },
  { name:'Jaffna', region:'Northern peninsula', short:'A different north star.', description:'Palmyra, spice, music and a northern horizon with its own ancient rhythm.', category:'Culture / Food', tags:['Fort','Cuisine','Islands'], lat:9.66, lon:80.01 },
  { name:'Anuradhapura', region:'North central', short:'A city beneath the bodhi tree.', description:'Sacred pools, moonstone steps and ancient cities spread across a quiet plain.', category:'Heritage / Spiritual', tags:['Stupas','Sacred tree','Ruins'], lat:8.31, lon:80.40 },
  { name:'Polonnaruwa', region:'North central', short:'Stone, shade, stillness.', description:'Cycle past reservoirs and masterpieces of stone in an ancient royal city.', category:'Heritage / History', tags:['Ruins','Cycling','Sculpture'], lat:7.94, lon:81.00 },
  { name:'Sinharaja', region:'South west', short:'Enter the emerald rainforest.', title:'Enter the Emerald Rainforest', description:'A living cathedral of rain, endemic birds, hidden streams and green that goes on forever.', category:'Jungle / Nature', tags:['Rainforest','Birds','Waterfalls'], lat:6.42, lon:80.42 },
  { name:'Horton Plains', region:'Central highlands', short:'The world’s edge at dawn.', description:'Walk through cloud forest to a precipice where the country falls away into light.', category:'Mountains / Hike', tags:['World’s End','Cloud forest','Hike'], lat:6.80, lon:80.80 },
  { name:'Knuckles', region:'Central highlands', short:'The mountain range with a pulse.', description:'A raw landscape of ridges, rivers and rare forest, made for moving slowly.', category:'Mountains / Adventure', tags:['Trek','Village life','Rivers'], lat:7.50, lon:80.80 }
];

export const categories = [
  ['Beaches','Salt, light and a longer afternoon.',image('photo-1507525428034-b723cf961d3e')],
  ['Mountains','Where the air changes first.',image('photo-1464822759023-fed622ff2c3b')],
  ['Waterfalls','The island in free fall.',image('photo-1432405972618-c60b0225b8f9')],
  ['Wildlife','The quietest kind of encounter.',image('photo-1549366021-9f761d450615')],
  ['Jungles','A green world within a world.',image('photo-1516026672322-bc52d61a55d5')],
  ['Tea Country','Mist, altitude, ritual.',image('photo-1594631252845-29fc4cc8cde9')],
  ['Heritage','Time leaves beautiful traces.',image('photo-1537996194471-e657df975ab4')],
  ['Culture','A living inheritance.',image('photo-1564760055775-d63b17a55c44')],
  ['Food','Come hungry. Leave curious.',image('photo-1601050690597-df0568f70950')],
  ['Adventure','The map gets better off-road.',image('photo-1521336575822-6da63fb45455')],
  ['Wellness','Return to your own pace.',image('photo-1544161515-4ab6ce6db874')],
  ['Luxury','A little more time. A lot more feeling.',image('photo-1564501049412-61c2a3083791')]
];

export const waterfalls = [
  ['Ravana Falls','Ella / 25 m','photo-1501785888041-af3ef285b470'],['Diyaluma Falls','Koslanda / 220 m','photo-1433086966358-54859d0ed716'],['Bambarakanda Falls','Kalupahana / 263 m','photo-1511497584788-876760111969'],['Dunhinda Falls','Badulla / 64 m','photo-1500534623283-312aade485b7'],['Baker’s Falls','Horton Plains','photo-1530789253388-582c481c54b0'],['St. Clair’s Falls','Talawakele','photo-1470770841072-f978cf4d019e'],['Devon Falls','Dimbula','photo-1432405972618-c60b0225b8f9'],['Aberdeen Falls','Ginigathhena','photo-1469474968028-56623f02e42e']
];

export const hotels = [
  {name:'The Grand Weligama',location:'Weligama',category:'5★ Luxury',rating:'5.0',tag:'A private horizon above the sea',image:image('photo-1600607687939-ce8a6c25118c')},
  {name:'Anantara Peace Haven',location:'Tangalle',category:'Luxury Resorts',rating:'4.9',tag:'Palm shade, ocean blue',image:image('photo-1564501049412-61c2a3083791')},
  {name:'The Galle House',location:'Galle',category:'Private Villas',rating:'4.9',tag:'A quiet address inside the fort',image:image('photo-1600607687920-4e2a09cf159d')},
  {name:'Theva Residency',location:'Kandy',category:'Boutique Hotels',rating:'4.9',tag:'A hilltop hideaway',image:image('photo-1602002418082-a4443e081dd1')},
  {name:'Cape Weligama',location:'Weligama',category:'Beach Resorts',rating:'4.8',tag:'Clifftop ocean days',image:image('photo-1566073771259-6a8506099945')},
  {name:'Wild Coast Tented Lodge',location:'Yala',category:'Jungle Lodges',rating:'4.9',tag:'Where wild meets wonder',image:image('photo-1540541338287-41700207dee6')},
  {name:'Amangalla',location:'Galle Fort',category:'Heritage Hotels',rating:'4.8',tag:'Colonial calm, reimagined',image:image('photo-1571896349842-33c89424de2d')},
  {name:'Ceylon Tea Trails',location:'Hatton',category:'Tea Estate Bungalows',rating:'5.0',tag:'Life at elevation',image:image('photo-1564501049412-61c2a3083791')},
  {name:'Santani Wellness',location:'Kandy',category:'Wellness Retreats',rating:'4.8',tag:'Space to become still',image:image('photo-1540555700478-4be289fbecef')}
];

export const experiences = [
  ['Private Yacht','A horizon reserved for you.','photo-1544551763-46a013bb70d5'],['Luxury Safari','The wild, at first light.','photo-1516426122078-c23e76319801'],['Whale Watching','Follow the blue.','photo-1544550285-f813152fb2fd'],['Luxury Train Journey','The journey is the destination.','photo-1530789253388-582c481c54b0'],['Private Villa','Your own quiet place.','photo-1600607687920-4e2a09cf159d'],['Sunset Beach Dinner','Dine where the day dissolves.','photo-1544148103-0773bf10d330'],['Tea Estate Experience','A slower morning.','photo-1594631252845-29fc4cc8cde9'],['Private Chef Dinner','The island, served.','photo-1601050690597-df0568f70950'],['Scuba Diving','Into the clear blue.','photo-1544551763-77ef2d0cfc6c'],['Surfing','Ride the perfect wave.','photo-1502680390469-be75c86b636f'],['Helicopter Experience','See the shape of the island.','photo-1476514525535-07fb3b4ae5f1'],['Hot Air Balloon','Rise above the ancient cities.','photo-1473448912268-2022ce9509d8'],['Wildlife Photography','Patience finds a story.','photo-1550358864-518f202c02ba'],['Ayurveda Wellness','Return to your own rhythm.','photo-1544161515-4ab6ce6db874'],['Cultural Experiences','Meet the living island.','photo-1564769625392-651b2b8c1f1c']
];

export const gallery = [
  ['Sunrise','Sigiriya wakes above the jungle.','photo-1537996194471-e657df975ab4'],['Sunset','The south coast holds the last light.','photo-1500530855697-b586d89ba3ee'],['Mountains','The road into Ella.','photo-1464822759023-fed622ff2c3b'],['Wildlife','A pause in the dry forest.','photo-1516426122078-c23e76319801'],['Culture','Color, rhythm, ritual.','photo-1564769625392-651b2b8c1f1c'],['Tea Country','A morning in the mist.','photo-1594631252845-29fc4cc8cde9'],['Waterfalls','The island in free fall.','photo-1433086966358-54859d0ed716'],['Luxury','Rooms with a horizon.','photo-1564501049412-61c2a3083791'],['Aerial Sri Lanka','Coastline as a compass.','photo-1507525428034-b723cf961d3e'],['Beaches','Blue hour in the south.','photo-1500530855697-b586d89ba3ee']
];

export const food = [
  ['Rice & Curry','A table of small stories.','photo-1601050690597-df0568f70950'],['Kottu','The sound of dinner.','photo-1552566626-52f8b828add9'],['Hoppers','Lace-edged, coconut-bright.','photo-1601050690117-94f5f6fa8bd7'],['String Hoppers','Morning, woven by hand.','photo-1601050690597-df0568f70950'],['Lamprais','Wrapped in a banana leaf.','photo-1565299624946-b28f40a0ae38'],['Seafood','The coast on a plate.','photo-1515003197210-e0cd71810b5f'],['Pol Sambol','Heat, citrus, coconut.','photo-1601050690597-df0568f70950'],['Ceylon Tea','The slow pour.','photo-1594631252845-29fc4cc8cde9'],['King Coconut','The island’s golden sip.','photo-1502741224143-90386d7f8c82'],['Traditional sweets','Small, fragrant endings.','photo-1551024506-0bccd828d307']
];

export const weather = [
  {place:'South coast',temp:'28°',condition:'Warm / sea breeze',season:'Dec — Apr',sunrise:'06:05',sunset:'18:18',sea:'Calm',rain:'12%'},
  {place:'Hill country',temp:'19°',condition:'Misty / cool',season:'Jan — Apr',sunrise:'06:12',sunset:'18:05',sea:'—',rain:'34%'},
  {place:'East coast',temp:'30°',condition:'Clear / bright',season:'May — Sep',sunrise:'05:52',sunset:'18:19',sea:'Glass calm',rain:'8%'},
  {place:'Yala region',temp:'27°',condition:'Dry / golden',season:'Feb — Jun',sunrise:'06:01',sunset:'18:16',sea:'—',rain:'18%'}
];

export const stats = [['25+','Districts','Illustrative'],['8','UNESCO sites','Illustrative'],['1600+','km coastline','Illustrative'],['100+','Experiences','Illustrative'],['1','Extraordinary island','Our feeling']];

export const plannerPlaces = ['Colombo','Galle','Mirissa','Yala','Ella','Nuwara Eliya','Kandy','Sigiriya','Trincomalee','Arugam Bay'];

export const searchMap = {
  honeymoon:[['Mirissa','A sunrise sea and a private table.'],['Galle','Fort walls, slow light and boutique calm.'],['Ella','Misty train journeys for two.']],
  beach:[['Unawatuna','A warm-water cove with reef-blue mornings.'],['Nilaveli','Wide sand, clear water, less noise.'],['Bentota','A river, a beach and a softer pace.']],
  wildlife:[['Yala','The island’s most iconic wild encounter.'],['Sinharaja','Rainforest, birds and green silence.'],['Horton Plains','Cloud forest and a world’s edge.']],
  mountain:[['Ella','Where mountains touch the clouds.'],['Knuckles','Wild ridges, rivers and rare forest.'],['Nuwara Eliya','Tea country under the mist.']],
  waterfall:[['Diyaluma Falls','A horizon pool above the forest.'],['Ravana Falls','Ella’s famous ribbon of water.'],['Bambarakanda Falls','Sri Lanka’s tallest cascade.']],
  luxury:[['Galle','Heritage, ocean and a slower kind of luxury.'],['Yala','A tented lodge at the edge of wild.'],['Hatton','Tea estates and mornings at elevation.']],
  default:[['Sigiriya','Start with the ancient sky kingdom.'],['Ella','Let the journey become the story.'],['Galle','End where history meets the sea.']]
};

export const routeTemplates = {
  Relaxation:['Colombo','Galle','Mirissa'], Adventure:['Ella','Knuckles','Arugam Bay'], Honeymoon:['Galle','Mirissa','Ella'], Wildlife:['Yala','Sinharaja','Horton Plains'], Nature:['Sinharaja','Ella','Horton Plains'], Culture:['Kandy','Sigiriya','Anuradhapura'], Luxury:['Galle','Yala','Hatton'], Surfing:['Arugam Bay','Mirissa','Unawatuna'], Photography:['Sigiriya','Ella','Yala'], Wellness:['Bentota','Kandy','Galle'], Family:['Colombo','Kandy','Sigiriya']
};

export const destinationByName = Object.fromEntries(destinations.map((destination) => [destination.name, destination]));
