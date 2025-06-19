// Minimal type declaration for the "bwip-js" library used for barcode generation.
// This can be replaced with more specific types if needed.

declare module "bwip-js" {
  function toBuffer(options: Record<string, unknown>): Promise<Buffer>;
  export = { toBuffer };
} 