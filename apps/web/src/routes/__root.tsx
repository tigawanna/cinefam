import { lazy, Suspense } from "react";
import {
  TanstackQueryProvider,
  getTanstackQueryContext,
} from "@/lib/tanstack/query/query-provider";
import { ThemeProvider } from "@/lib/tanstack/router/theme-provider";
import { viewerqueryOptions, type TViewer } from "@/data-access-layer/auth/viewer";
import { AppConfig } from "@/utils/system";
import type { QueryClient } from "@tanstack/react-query";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";

const TanstackDevtools = lazy(() =>
  import("@/lib/tanstack/devtools/devtools").then((module) => ({
    default: module.TanstackDevtools,
  })),
);

interface RouterContext {
  queryClient: QueryClient;
  viewer?: TViewer;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }) => {
    const viewer = await context.queryClient.ensureQueryData(viewerqueryOptions);
    return { viewer: viewer.data ?? undefined };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: AppConfig.name },
      { name: "description", content: AppConfig.description },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "48x48" },
    ],
  }),
  component: RootDocument,
});

function RootDocument() {
  const { queryClient } = getTanstackQueryContext();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider storageKey={AppConfig.themeStorageKey}>
          <TanstackQueryProvider queryClient={queryClient}>
            <Outlet />
            <Toaster position="bottom-left" />
            {import.meta.env.DEV ? (
              <Suspense fallback={null}>
                <TanstackDevtools />
              </Suspense>
            ) : null}
          </TanstackQueryProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
