import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./env";

const isSanityConfigured = projectId && /^[a-z0-9-]+$/.test(projectId);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
