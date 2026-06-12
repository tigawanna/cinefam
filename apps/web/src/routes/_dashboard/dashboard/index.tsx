import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-neutral-content">
        Your synced watchlists and Jazz library will appear here. Wire up TanStack DB collections to
        join TMDB discover results with your synced media items.
      </p>
    </div>
  );
}
