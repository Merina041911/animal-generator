const { filters, matchesFilters, pickAnimals } = AnimalFiltering;
const metadata = new Map((window.ANIMAL_FILTER_DATA || []).map((item) => [item.id, item]));
const animals = (window.ANIMAL_LIBRARY || []).filter((animal) => Boolean(animal.image) && animal.photo?.fullBodyApproved === true).map((animal) => ({ ...animal, filterData: metadata.get(animal.id) }));
const $ = (id) => document.getElementById(id);
$("reviewed-species-count").textContent = `${animals.length} species with reviewed photos`;
const resultGrid = $("results");
const generatedResults = $("generated-results");
const categoryLabel = (animal) => animal.category;
const selections = Object.fromEntries(filters.map(({ key }) => [key, []]));
const filterFields = $("filter-fields");
const dialog = $("mobile-filter-dialog");
let hasGenerated = false;

function matchingAnimals() {
  return animals.filter((animal) => matchesFilters(animal, selections));
}

function closeMenus(except) {
  filterFields.querySelectorAll("details[open]").forEach((field) => {
    if (field !== except) field.open = false;
  });
}

function resetFilters() {
  filters.forEach(({ key }) => { selections[key] = []; });
  filterFields.querySelectorAll("input").forEach((input) => { input.checked = false; });
  updateFilters();
}

function updateFilters() {
  const matching = matchingAnimals();
  const activeGroups = filters.filter(({ key }) => selections[key].length);
  const tags = [];
  filters.forEach((filter) => {
    const field = $(`filter-${filter.key}`);
    const selectedLabels = filter.options.filter(([value]) => selections[filter.key].includes(value)).map(([, label]) => label);
    field.querySelector(".filter-value").textContent = selectedLabels.join(" + ") || filter.empty;
    field.classList.toggle("is-active", selectedLabels.length > 0);
    field.querySelector(".group-reset").hidden = selectedLabels.length === 0;
    filter.options.forEach(([value]) => {
      const count = animals.filter((animal) => matchesFilters(animal, { ...selections, [filter.key]: [value] })).length;
      const input = $(`${filter.key}-${value}`);
      input.closest("label").querySelector(".option-count").textContent = count;
    });
    if (selectedLabels.length) {
      const tag = document.createElement("button");
      tag.type = "button";
      tag.className = "active-filter";
      tag.setAttribute("aria-label", `Remove ${filter.label} filter`);
      const label = document.createElement("span");
      label.textContent = `${filter.label}: ${selectedLabels.join(" + ")}`;
      const mark = document.createElement("span");
      mark.className = "remove-mark";
      mark.textContent = "×";
      mark.setAttribute("aria-hidden", "true");
      tag.append(label, mark);
      tag.addEventListener("click", () => {
        selections[filter.key] = [];
        field.querySelectorAll("input").forEach((input) => { input.checked = false; });
        updateFilters();
        $("reset-filters").hidden ? $("generate").focus() : $("reset-filters").focus();
      });
      tags.push(tag);
    }
  });
  $("active-filters").replaceChildren(...tags);
  $("reset-filters").hidden = activeGroups.length === 0;
  $("active-filter-count").textContent = activeGroups.length ? `${activeGroups.length} active · ${matching.length} matches` : "All animals";
  $("filter-count").textContent = `${matching.length} ${matching.length === 1 ? "species matches" : "species match"}${activeGroups.length ? " your filters" : " · all animal types"}`;
  $("mobile-match-count").textContent = `${matching.length} ${matching.length === 1 ? "species matches" : "species match"} your filters`;
  $("generate").disabled = matching.length === 0;
  $("example-result").hidden = activeGroups.length > 0 || hasGenerated;
  if (hasGenerated) {
    generatedResults.hidden = true;
    resultGrid.replaceChildren();
  }
  $("filter-message").textContent = matching.length === 0 ? "No animals match this combination. Remove a filter or reset all filters to try again." : hasGenerated ? "Filters updated. Generate animals to see your new picks." : "";
}

filters.forEach((filter) => {
  const field = document.createElement("details");
  field.className = "filter-field";
  field.id = `filter-${filter.key}`;
  const summary = document.createElement("summary");
  const label = document.createElement("span");
  label.className = "filter-label";
  label.textContent = filter.label;
  const value = document.createElement("span");
  value.className = "filter-value";
  value.textContent = filter.empty;
  summary.append(label, value);
  const menu = document.createElement("div");
  menu.className = "filter-menu";
  const options = document.createElement("fieldset");
  options.className = "filter-options";
  const legend = document.createElement("legend");
  legend.className = "sr-only";
  legend.textContent = `${filter.label} — choose one or more`;
  options.append(legend);
  filter.options.forEach(([value, label]) => {
    const option = document.createElement("label");
    option.className = "filter-option";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.id = `${filter.key}-${value}`;
    input.name = filter.key;
    input.value = value;
    input.addEventListener("change", () => {
      selections[filter.key] = [...options.querySelectorAll("input:checked")].map((checkbox) => checkbox.value);
      updateFilters();
    });
    const name = document.createElement("span");
    name.textContent = label;
    const count = document.createElement("span");
    count.className = "option-count";
    count.setAttribute("aria-hidden", "true");
    option.append(input, name, count);
    options.append(option);
  });
  const clear = document.createElement("button");
  clear.type = "button";
  clear.className = "group-reset";
  clear.textContent = "Clear this group";
  clear.addEventListener("click", () => {
    selections[filter.key] = [];
    options.querySelectorAll("input").forEach((input) => { input.checked = false; });
    updateFilters();
    summary.focus();
  });
  menu.append(options, clear);
  field.append(summary, menu);
  field.addEventListener("toggle", () => { if (field.open) closeMenus(field); });
  filterFields.append(field);
});

$("reset-filters").addEventListener("click", () => { resetFilters(); $("generate").focus(); });
$("mobile-reset-filters").addEventListener("click", resetFilters);
$("open-filters").addEventListener("click", () => dialog.showModal());
$("close-filters").addEventListener("click", () => dialog.close());
$("done-filters").addEventListener("click", () => dialog.close());
dialog.addEventListener("close", () => closeMenus());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientY < bounds.top || event.clientX < bounds.left || event.clientX > bounds.right)) dialog.close();
});
document.addEventListener("click", (event) => {
  if (!filterFields.contains(event.target)) closeMenus();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dialog.open) {
    const open = filterFields.querySelector("details[open]");
    if (open) { closeMenus(); open.querySelector("summary").focus(); }
  }
});
const mobileQuery = window.matchMedia("(max-width: 760px)");
function placeFilters() {
  if (dialog.open) dialog.close();
  closeMenus();
  (mobileQuery.matches ? $("mobile-filter-host") : $("desktop-filter-host")).append(filterFields);
}
mobileQuery.addEventListener("change", placeFilters);
placeFilters();

      function makeCard(animal, index) {
        const card = document.createElement("article");
        card.className = "result-card";
        const scene = document.createElement("div");
        scene.className = "animal-scene";
        const sceneLabel = document.createElement("span");
        sceneLabel.className = "scene-label";
        sceneLabel.textContent = categoryLabel(animal);
        const sun = document.createElement("span"); sun.className = "sun"; sun.setAttribute("aria-hidden", "true");
        const hillBack = document.createElement("span"); hillBack.className = "hill back"; hillBack.setAttribute("aria-hidden", "true");
        const hill = document.createElement("span"); hill.className = "hill"; hill.setAttribute("aria-hidden", "true");
        if (animal.image) {
          scene.classList.add("has-photo");
          const image = document.createElement("img");
          image.className = "animal-art";
          image.src = animal.image;
          image.alt = `Photo of ${animal.name} (${animal.scientificName})`;
          image.loading = index < 2 ? "eager" : "lazy";
          scene.append(sun, hillBack, hill, image);
        } else {
          const imagePlaceholder = document.createElement("div");
          imagePlaceholder.className = "animal-photo-pending";
          imagePlaceholder.textContent = "Animal photo coming soon";
          scene.append(sun, hillBack, hill, imagePlaceholder);
        }

        const info = document.createElement("div"); info.className = "result-info";
        const top = document.createElement("div"); top.className = "result-top";
        const identity = document.createElement("div");
        const name = document.createElement("h2"); name.className = "animal-name"; name.textContent = animal.name;
        const latin = document.createElement("p"); latin.className = "latin"; latin.textContent = animal.scientificName;
        identity.append(name, latin);
        const copy = document.createElement("button"); copy.className = "copy"; copy.type = "button"; copy.textContent = "Copy name";
        copy.addEventListener("click", async () => {
          try { await navigator.clipboard.writeText(animal.name); copy.textContent = "Copied!"; }
          catch { copy.textContent = animal.name; }
          setTimeout(() => { copy.textContent = "Copy name"; }, 1400);
        });
        top.append(identity);
        info.append(sceneLabel, top, copy);
        if (animal.filterData?.sources?.length) {
          const source = document.createElement("a");
          source.className = "source-link";
          source.href = `animal-data-sources.html#${animal.id}`;
          source.textContent = "Species notes & sources";
          info.append(source);
        }
        card.append(scene, info);
        return card;
      }


function generateAnimals() {
  const pool = matchingAnimals();
  if (!pool.length) return;
  const requested = Number($("quantity").value);
  let savedSeen = [];
  try {
    const stored = JSON.parse(localStorage.getItem("fieldnote-seen-animals") || "[]");
    if (Array.isArray(stored)) savedSeen = stored;
  } catch {}
  const availableSpecies = new Set(animals.map((animal) => animal.scientificName));
  const previousSeen = savedSeen.filter((species) => availableSpecies.has(species));
  const { selected, seen, startedNewRound } = pickAnimals(pool, requested, previousSeen);
  try { localStorage.setItem("fieldnote-seen-animals", JSON.stringify([...seen])); } catch {}
  resultGrid.replaceChildren(...selected.map(makeCard));
  generatedResults.classList.toggle("single-result", selected.length === 1);
  $("example-result").hidden = true;
  generatedResults.hidden = false;
  hasGenerated = true;
  closeMenus();
  $("filter-message").textContent = pool.length < requested ? `Only ${pool.length} unique ${pool.length === 1 ? "species matches" : "species match"} your filters, so every match is shown.` : "";
  $("result-status").textContent = `${selected.length} ${selected.length === 1 ? "animal" : "animals"} · ${pool.length} matching species${startedNewRound ? " · fresh round started" : " · no repeats from earlier picks"}`;
  generatedResults.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

$("generate").addEventListener("click", generateAnimals);
updateFilters();
