#!/usr/bin/env node

/**
 * Gemini Image Generator
 * Zero dependencies — runs with Node.js 18+ (uses native fetch)
 *
 * Usage:
 *   node generate-image.mjs "a vintage guitar in dramatic lighting"
 *   node generate-image.mjs "make this look more dramatic" --image ./photo.jpg
 *   node generate-image.mjs "wide hero banner" --aspect 16:9
 *   node generate-image.mjs "product shot" --image ./product.png --model standard
 *
 * Environment:
 *   GEMINI_API_KEY - Your Google AI Studio API key
 */

import * as fs from "node:fs";
import * as path from "node:path";

// --- Config ---

const MODELS = {
  free: "gemini-2.0-flash-exp-image-generation",
  standard: "gemini-2.5-flash-image",
};

const VALID_ASPECTS = [
  "1:1", "3:2", "2:3", "3:4", "4:3",
  "4:5", "5:4", "9:16", "16:9", "21:9",
];

const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// --- Arg parsing ---

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(`
Gemini Image Generator (zero dependencies)

Usage:
  node generate-image.mjs <prompt> [options]

Options:
  --image <path>     Reference image for editing/context (jpg, png, webp)
  --model <id>       Model: "free" (default), "standard", or full model ID
  --aspect <ratio>   Aspect ratio: 1:1, 16:9, 9:16, 3:2, 2:3, 4:3, 3:4, etc.
  --output <path>    Output file path (default: auto-generated in ./generated/)
  -h, --help         Show this help

Examples:
  node generate-image.mjs "a sunburst Les Paul on dark wood"
  node generate-image.mjs "make it vintage and aged" --image ./guitar.jpg
  node generate-image.mjs "wide hero banner" --aspect 16:9 --model standard
  node generate-image.mjs "product shot" --image ./product.png --output hero.png

Environment:
  GEMINI_API_KEY     Get one at https://aistudio.google.com/apikey
`);
    process.exit(0);
  }

  const parsed = { prompt: "", model: MODELS.free };
  const positional = [];
  let i = 0;

  while (i < args.length) {
    const arg = args[i];
    if (arg === "--image" && args[i + 1]) {
      parsed.imagePath = args[++i];
    } else if (arg === "--model" && args[i + 1]) {
      const val = args[++i];
      parsed.model = MODELS[val] || val;
    } else if (arg === "--aspect" && args[i + 1]) {
      const val = args[++i];
      if (!VALID_ASPECTS.includes(val)) {
        console.error(`Invalid aspect ratio "${val}". Valid: ${VALID_ASPECTS.join(", ")}`);
        process.exit(1);
      }
      parsed.aspect = val;
    } else if (arg === "--output" && args[i + 1]) {
      parsed.output = args[++i];
    } else if (!arg.startsWith("--")) {
      positional.push(arg);
    }
    i++;
  }

  parsed.prompt = positional.join(" ");
  if (!parsed.prompt) {
    console.error("Error: No prompt provided. Run with --help for usage.");
    process.exit(1);
  }

  return parsed;
}

// --- Image helpers ---

function readImageAsBase64(filePath) {
  const resolved = path.resolve(filePath);

  if (!fs.existsSync(resolved)) {
    console.error(`Image not found: ${resolved}`);
    process.exit(1);
  }

  const ext = path.extname(resolved).toLowerCase();
  const mimeMap = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };

  const mimeType = mimeMap[ext];
  if (!mimeType) {
    console.error(`Unsupported image format "${ext}". Use jpg, png, webp, or gif.`);
    process.exit(1);
  }

  const buffer = fs.readFileSync(resolved);
  return { data: buffer.toString("base64"), mimeType };
}

function generateOutputPath(prompt) {
  const dir = path.resolve("./generated");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const slug = prompt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);

  const ts = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  return path.join(dir, `${slug}-${ts}.png`);
}

// --- API call ---

async function generateImage(args) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error(`
Error: GEMINI_API_KEY not set.

How to get a key:
  1. Go to https://aistudio.google.com/apikey
  2. Sign in with your Google account
  3. Click "Create API Key"
  4. Copy the key

Then set it:
  export GEMINI_API_KEY="your-key-here"

Or add permanently:
  echo 'export GEMINI_API_KEY="your-key-here"' >> ~/.zshrc && source ~/.zshrc
`);
    process.exit(1);
  }

  // Build request parts
  const parts = [];

  let promptText = args.prompt;
  if (args.aspect) promptText += ` (generate in ${args.aspect} aspect ratio)`;
  parts.push({ text: promptText });

  if (args.imagePath) {
    const img = readImageAsBase64(args.imagePath);
    parts.push({ inlineData: { mimeType: img.mimeType, data: img.data } });
  }

  const body = {
    contents: [{ parts }],
    generationConfig: {
      responseModalities: ["TEXT", "IMAGE"],
    },
  };

  const url = `${API_BASE}/${args.model}:generateContent`;

  console.log(`\nModel:  ${args.model}`);
  console.log(`Prompt: ${args.prompt}`);
  if (args.imagePath) console.log(`Image:  ${args.imagePath}`);
  if (args.aspect) console.log(`Aspect: ${args.aspect}`);
  console.log(`\nGenerating...`);

  const startTime = Date.now();

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`\nAPI Error (${response.status}):\n${errorBody}`);
    process.exit(1);
  }

  const result = await response.json();

  if (result.error) {
    console.error(`\nAPI Error: ${result.error.message}`);
    process.exit(1);
  }

  const candidate = result.candidates?.[0];
  if (!candidate?.content?.parts) {
    console.error("\nNo content in response. Prompt may have been blocked by safety filters.");
    console.error("Try rephrasing your prompt.");
    process.exit(1);
  }

  // Extract text and images
  let imageCount = 0;
  const outputPaths = [];

  for (const part of candidate.content.parts) {
    if (part.text) {
      console.log(`\nModel: ${part.text}`);
    }

    if (part.inlineData?.data) {
      imageCount++;
      const outputPath =
        args.output && imageCount === 1
          ? args.output
          : generateOutputPath(imageCount > 1 ? `${args.prompt}-${imageCount}` : args.prompt);

      const imageBuffer = Buffer.from(part.inlineData.data, "base64");
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

      fs.writeFileSync(outputPath, imageBuffer);
      outputPaths.push(outputPath);
    }
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  if (outputPaths.length === 0) {
    console.error("\nNo images in response. Model returned text only.");
    console.error('Try adding "generate an image of" to your prompt.');
    process.exit(1);
  }

  console.log(`\nDone in ${elapsed}s`);
  for (const p of outputPaths) {
    console.log(`Saved: ${p}`);
  }
}

// --- Run ---

const args = parseArgs();
generateImage(args).catch((err) => {
  console.error("\nUnexpected error:", err.message || err);
  process.exit(1);
});
