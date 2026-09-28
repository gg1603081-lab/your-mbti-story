import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * Layout for everything under /types.
 * Must render <Outlet /> — without it, child routes like /types/INFJ
 * match but never actually paint.
 */
export const Route = createFileRoute("/types")({
  component: TypesLayout,
});

function TypesLayout() {
  return <Outlet />;
}
