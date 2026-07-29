import "react";

/**
 * Types for React's `<ViewTransition>`.
 *
 * The component exists in the React build Next bundles for the App Router (see
 * `next/dist/compiled/react-experimental`, and `experimental.viewTransition` in
 * next.config.ts), but the published `@types/react` package doesn't declare it
 * yet. Without this the import type-checks as an error while working perfectly
 * at runtime, which is the worst of both.
 *
 * Delete this file once `@types/react` ships the declaration.
 */

/** Either one class for all transition types, or a map keyed by type name. */
type ViewTransitionClass = string | Record<string, string>;

declare module "react" {
  export interface ViewTransitionProps {
    children?: ReactNode;
    /** Shared identity across routes — matching names morph into each other. */
    name?: string;
    /** Class applied when the same `name` exists on both sides. */
    share?: ViewTransitionClass;
    enter?: ViewTransitionClass;
    exit?: ViewTransitionClass;
    update?: ViewTransitionClass;
    /** Fallback for transitions no other prop matched; "none" opts out. */
    default?: ViewTransitionClass;
  }

  export const ViewTransition: (props: ViewTransitionProps) => ReactNode;
}
