// Runs against the actual rendered cards; start scripts/serve.py first.
const { execFileSync } = require('node:child_process');
const code = `
const task = await taskSpace("Animal Generator full-body photo audit");
const page = task.page("p1");
await page.cdp("Network.enable");
await page.cdp("Network.setCacheDisabled", { cacheDisabled: true });
console.log({ spaceId: task.spaceId });
await page.goto("http://127.0.0.1:8765/");
const findings = [];
for (const width of [1280, 768, 390, 320]) {
  await page.cdp("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 1, mobile: width < 760 });
  findings.push(await page.evaluate(async () => {
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const result = { viewport: innerWidth, checked: 0, failures: [] };
    const section = document.querySelector("#generated-results");
    document.querySelector("#example-result").hidden = true;
    section.hidden = false;
    for (let start = 0; start < animals.length; start += 20) {
      section.classList.remove("single-result");
      const cards = animals.slice(start, start + 20).map(makeCard);
      document.querySelector("#results").replaceChildren(...cards);
      const images = [...document.querySelectorAll("#results img")];
      images.forEach(image => { image.loading = "eager"; });
      await Promise.all(images.map(image => image.decode()));
      for (const image of images) {
        result.checked += 1;
        if (getComputedStyle(image).objectFit !== "contain" || image.naturalWidth === 0 || image.parentElement.querySelector(".scene-label")) result.failures.push(image.alt);
      }
    }
    // Check the separate one-card layout as well as the multi-card grid.
    for (const name of ["Felis silvestris", "Aquila chrysaetos"]) {
      const animal = animals.find(animal => animal.scientificName === name);
      section.classList.add("single-result");
      document.querySelector("#results").replaceChildren(makeCard(animal, 0));
      const image = document.querySelector("#results img");
      await image.decode();
      result.checked += 1;
      if (getComputedStyle(image).objectFit !== "contain" || image.parentElement.querySelector(".scene-label")) result.failures.push(name + " single-card layout");
    }
    return result;
  }));
}
console.log(JSON.stringify(findings, null, 2));
const fs = await import("node:fs/promises");
await fs.writeFile("/Users/caoyizha/Documents/ChatGPT/web出海/animal-generator/animal-photos/review/framing-check.json", JSON.stringify({ checkedOn: "2026-11-04", findings }, null, 2));
if (findings.some(result => result.failures.length > 0)) throw new Error("Photo framing crops source images: object-fit must contain the entire image.");
await page.cdp("Emulation.clearDeviceMetricsOverride");
`;
try {
  process.stdout.write(execFileSync('ego-browser', ['nodejs'], { input: code, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }));
} catch (error) {
  if (error.stdout) process.stdout.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  process.exitCode = 1;
}
