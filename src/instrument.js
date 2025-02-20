import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

// Ensure to call this before requiring any other modules!
Sentry.init({
    dsn: "https://acdb66b042c4d9d540ff7d207e787f86@o4506666173661184.ingest.us.sentry.io/4508845304905728",
    integrations: [
        // Add our Profiling integration
        nodeProfilingIntegration()
    ],

    // Add Tracing by setting tracesSampleRate
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,

    // Set sampling rate for profiling
    // This is relative to tracesSampleRate
    profilesSampleRate: 1.0
});
