(function (root) {
  const filters = [
    { key: "category", label: "Animal types", empty: "All types", options: [["Mammals", "Mammals"], ["Birds", "Birds"], ["Reptiles", "Reptiles"], ["Amphibians", "Amphibians"], ["Fish", "Fish"], ["Invertebrates", "Invertebrates"]] },
    { key: "habitats", label: "Habitat", empty: "Any habitat", options: [["forest", "Forest"], ["grassland", "Grassland"], ["desert", "Desert"], ["wetland", "Wetland"], ["freshwater", "Freshwater"], ["ocean", "Ocean & coast"], ["mountains", "Mountains"], ["tundra", "Tundra"], ["urban", "Urban & farmland"]] },
    { key: "diets", label: "Diet", empty: "Any diet", options: [["herbivore", "Herbivore"], ["carnivore", "Carnivore"], ["omnivore", "Omnivore"], ["detritivore", "Detritivore"], ["non-feeding", "Non-feeding adults"]] },
    { key: "sizes", label: "Size", empty: "Any size", options: [["small", "Small · under 10 cm"], ["medium", "Medium · 10 cm to under 1 m"], ["large", "Large · 1 m or more"]] },
    { key: "regions", label: "Region", empty: "Anywhere", options: [["africa", "Africa"], ["asia", "Asia"], ["europe", "Europe"], ["north-america", "North America"], ["south-america", "South America"], ["oceania", "Oceania"], ["antarctica", "Antarctica"], ["oceans", "World oceans"]] },
  ];

  function matchesFilters(animal, selections) {
    return filters.every(({ key }) => {
      const selected = selections[key] || [];
      const values = key === "category" ? [animal.category] : (animal.filterData?.[key] || []);
      return selected.length === 0 || selected.some((value) => values.includes(value));
    });
  }

  function shuffled(animals, random) {
    const result = [...animals];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function pickAnimals(pool, requested, previousSeen, random = Math.random) {
    const seen = new Set(previousSeen);
    const count = Math.min(requested, pool.length);
    const selected = shuffled(pool.filter((animal) => !seen.has(animal.scientificName)), random).slice(0, count);
    let startedNewRound = false;
    if (selected.length < count) {
      startedNewRound = true;
      pool.forEach((animal) => seen.delete(animal.scientificName));
      const chosen = new Set(selected.map((animal) => animal.scientificName));
      const remaining = pool.filter((animal) => !chosen.has(animal.scientificName));
      selected.push(...shuffled(remaining, random).slice(0, count - selected.length));
    }
    selected.forEach((animal) => seen.add(animal.scientificName));
    return { selected, seen, startedNewRound };
  }

  const api = { filters, matchesFilters, pickAnimals };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.AnimalFiltering = api;
})(globalThis);
