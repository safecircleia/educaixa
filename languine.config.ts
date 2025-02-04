import { defineConfig } from "languine";

export default defineConfig({
  projectId: "prj_4CWpmQ1jVWa2sWX7U9gjl",
  locale: {
    source: "en",
    targets: ["es"],
  },
  files: {
    json: {
      include: ["locales/[locale].json"],
    },
  },
});
