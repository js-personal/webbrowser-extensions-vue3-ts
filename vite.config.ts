//@ts-ignore
import vue from "@vitejs/plugin-vue";
import { join, parse, resolve } from "path";

export default {
  plugins: [vue()],
  alias: {
    "~": __dirname,
  },
  publicDir: 'public',
  build: {
    outDir: join(__dirname, "dist"),
    rollupOptions: {
      input: entryPoints(
          "interface.html",
          "popup.html",
          "panel.html",
      ),
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name]-[extname]',
      },
    },
  },
};

function entryPoints(...paths) {
  const entries = paths.map(parse).map(entry => {
    const { dir, base, name, ext } = entry;
    const key = join(dir, name);
    const path = resolve(__dirname, dir, base);
    return [key, path];
  });

  const config = Object.fromEntries(entries);
  console.log(config);
  return config;
}
