const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const pairs = [
  { source: "video.mp4", dest: "video.mp4" },
  { source: "ad-video.mp4", dest: "ad-video.mp4" },
];

function syncFile(sourceName, destName) {
  const source = path.join(root, sourceName);
  const dest = path.join(publicDir, destName);

  if (fs.existsSync(source)) {
    fs.mkdirSync(publicDir, { recursive: true });
    fs.copyFileSync(source, dest);
    console.log(`Synced ${sourceName} → public/${destName}`);
    return true;
  }
  return false;
}

pairs.forEach(({ source, dest }) => syncFile(source, dest));

// Fallback: use hero video as ad if no dedicated ad file
const adPublic = path.join(publicDir, "ad-video.mp4");
if (!fs.existsSync(adPublic)) {
  const heroPublic = path.join(publicDir, "video.mp4");
  const heroRoot = path.join(root, "video.mp4");
  if (fs.existsSync(heroPublic)) {
    fs.copyFileSync(heroPublic, adPublic);
    console.log("Copied public/video.mp4 → public/ad-video.mp4 (ad fallback)");
  } else if (fs.existsSync(heroRoot)) {
    fs.mkdirSync(publicDir, { recursive: true });
    fs.copyFileSync(heroRoot, adPublic);
    console.log("Copied video.mp4 → public/ad-video.mp4 (ad fallback)");
  }
}
