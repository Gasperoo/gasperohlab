// Split point for the animation runtime.
//
// `LazyMotion` imports this dynamically, so the feature code — gestures, layout
// projection, the whole animation engine — lands in its own chunk that loads
// after hydration instead of blocking first paint. `domMax` rather than
// `domAnimation` because the nav pill and the project grids use shared-layout
// animations (`layout` / `layoutId`), which only `domMax` provides.
import { domMax } from "framer-motion";

export default domMax;
