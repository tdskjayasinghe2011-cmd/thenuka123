import { routeTemplates, destinationByName } from './data.js';

export const travelAI = {
  async generateItinerary({experience='Relaxation', days=7, style='Comfort'}) {
    // Future integration seam: replace the demo response with a request to a real AI endpoint.
    const base = routeTemplates[experience] || routeTemplates.Relaxation;
    const requestedDays = Number(days) || 7;
    const route = [...base];
    while (route.length < Math.min(5, Math.ceil(requestedDays / 2))) route.push(['Kandy','Sigiriya','Galle','Ella'][route.length % 4]);
    const dayNames = [];
    const nodes = route.map((name)=>destinationByName[name]).filter(Boolean);
    for(let day=1;day<=requestedDays;day++){
      const from=nodes[(day-1)%nodes.length]?.name || 'Colombo';
      const to=nodes[Math.min(day,nodes.length-1)]?.name || from;
      const moments=['Arrive into the light','Walk the old paths','Follow the water','A slow morning at altitude','Leave room for the unexpected'];
      dayNames.push({day,route: from===to ? from : `${from} → ${to}`, moment: moments[(day-1)%moments.length]});
    }
    await new Promise((resolve)=>setTimeout(resolve,220));
    return {experience, days:requestedDays, style, route, dayNames};
  },
  async search(query='') {
    // Future integration seam: call an LLM/search API while preserving this result contract.
    const key=query.toLowerCase();
    const fallback=[['Sigiriya','Start with the ancient sky kingdom.'],['Ella','Let the journey become the story.'],['Galle','End where history meets the sea.']];
    const dictionary = {honeymoon:[['Mirissa','A sunrise sea and a private table.'],['Galle','Fort walls, slow light and boutique calm.'],['Ella','Misty train journeys for two.']], beach:[['Unawatuna','A warm-water cove with reef-blue mornings.'],['Nilaveli','Wide sand, clear water, less noise.'],['Bentota','A river, a beach and a softer pace.']], wildlife:[['Yala','The island’s most iconic wild encounter.'],['Sinharaja','Rainforest, birds and green silence.'],['Horton Plains','Cloud forest and a world’s edge.']], mountain:[['Ella','Where mountains touch the clouds.'],['Knuckles','Wild ridges, rivers and rare forest.'],['Nuwara Eliya','Tea country under the mist.']], waterfall:[['Diyaluma Falls','A horizon pool above the forest.'],['Ravana Falls','Ella’s famous ribbon of water.'],['Bambarakanda Falls','Sri Lanka’s tallest cascade.']], luxury:[['Galle','Heritage, ocean and a slower kind of luxury.'],['Yala','A tented lodge at the edge of wild.'],['Hatton','Tea estates and mornings at elevation.']]};
    const match=Object.keys(dictionary).find((item)=>key.includes(item));
    await new Promise((resolve)=>setTimeout(resolve,160));
    return dictionary[match] || fallback;
  }
};
