import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";
import { projectId, dataset } from "./lib/sanity/env";

export default defineConfig({
  name: "adaptiveops",
  title: "AdaptiveOps Blog",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
