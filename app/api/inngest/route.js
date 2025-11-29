import { serve } from "inngest/next";
import { inngest } from "@/lib/inggest/client";
import { helloWorld } from "@/lib/inggest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
  ],
});