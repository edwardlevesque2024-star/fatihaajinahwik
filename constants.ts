import { JournalStyle } from "./types";

export const POLLINATIONS_API_KEY = 'pk_B9sNLPlFqBcCv7zS';

export const DEFAULT_STYLES: JournalStyle[] = [
  JournalStyle.VINTAGE,
  JournalStyle.BOTANICAL,
  JournalStyle.GRUNGE,
  JournalStyle.STEAMPUNK,
  JournalStyle.EPHEMERA,
  JournalStyle.PASTEL,
  JournalStyle.GOTHIC
];

export const MOCK_IMAGES = [
  "https://picsum.photos/800/1000",
  "https://picsum.photos/800/1001",
  "https://picsum.photos/800/1002",
];

export const SYSTEM_INSTRUCTION_PROMPT_GEN = `
You are an expert AI art prompter specializing in "Junk Journal" and "Scrapbooking" aesthetics.
Your task is to take a simple user topic and a style, and generate highly detailed, artistic image prompts suitable for high-quality image generation models like Flux.

The prompts should emphasize:
- Textures: Old paper, distressed edges, coffee stains, lace, burlap.
- Elements: Dried flowers, vintage stamps, handwriting overlays, ticket stubs, ephemera, washi tape.
- Composition: Collage style, busy but aesthetic, flat lay or scanned texture look.
- Lighting: Soft, antique, vignette.

Return strictly a JSON array of strings. Do not include markdown formatting like \`\`\`json.
`;