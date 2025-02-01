import type { BuildOptions } from "esbuild";

const config: BuildOptions = {
  entryPoints: ["./src/extension.ts"],
  bundle: true,
  platform: "node",
  target: "node12",
  format: "cjs",
  outfile: "./dist/extension.cjs",
  external: ["vscode"],
  loader: {
    ".ts": "ts",
    ".js": "js",
  },
  logLevel: "info",
};

export default config;
