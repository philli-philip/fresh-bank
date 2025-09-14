import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    fresh(
      {
        // Path to main server entry file. Default: main.ts
        serverEntry: "./main.tsx",
      },
    ),
    tailwindcss(),
  ],
});
