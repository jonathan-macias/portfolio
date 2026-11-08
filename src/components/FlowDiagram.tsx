import { Fragment } from "react";
import type { Diagram } from "@/data/profile";
import { ArrowIcon } from "./icons";

// Nodes in a layer are equal-height and flush, so node i of n is centered at (i + 0.5) / n.
const center = (i: number, n: number) => (((i + 0.5) / n) * 100).toFixed(2);

// One route per node on the busier side, so every node on both sides gets a wire.
function Wires({ from, to, stage }: { from: number; to: number; stage: number }) {
  const routes = Array.from(
    { length: Math.max(from, to) },
    (_, k) => `M0 ${center(k % from, from)} H50 V${center(k % to, to)} H100`,
  );

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
      className="hidden size-full overflow-visible md:block"
    >
      {routes.map((d) => (
        <path key={d} d={d} className="stroke-fg" vectorEffect="non-scaling-stroke" />
      ))}
      {routes.map((d, k) => (
        <path
          key={`pulse-${d}`}
          d={d}
          className="stroke-signal opacity-0 motion-safe:animate-signal motion-safe:opacity-100"
          style={{ animationDelay: `${(stage * 1.4 + k * 0.6).toFixed(1)}s` }}
          strokeWidth={2}
          strokeDasharray="16 1000"
          strokeDashoffset={16}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

// Layered architecture schematic: wired columns on wide screens, a single vertical bus on phones.
export function FlowDiagram({
  layers,
  caption,
  figure,
}: {
  layers: Diagram;
  caption: string;
  figure?: string;
}) {
  return (
    <figure className="border border-border bg-drafting p-4 sm:p-5">
      <div className="relative flex flex-col pb-4 md:flex-row md:pb-0">
        <span className="absolute bottom-0 left-1 top-1 w-px bg-fg md:hidden" aria-hidden />
        <span className="absolute bottom-0 left-[1.5px] size-1.5 bg-signal md:hidden" aria-hidden />

        {layers.map((layer, i) => (
          <Fragment key={layer.label}>
            {i > 0 && (
              <div className="relative h-5 shrink-0 md:mt-7 md:h-auto md:w-14">
                <ArrowIcon className="absolute left-[4.5px] top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rotate-90 bg-bg text-fg md:hidden" />
                <Wires from={layers[i - 1].items.length} to={layer.items.length} stage={i - 1} />
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col pl-6 md:pl-0">
              <p className="flex items-center font-mono text-label uppercase text-muted md:h-7 md:items-start">
                {layer.label}
              </p>
              <ul className="mt-1.5 grid flex-1 auto-rows-fr md:mt-0">
                {layer.items.map((item) => (
                  <li
                    key={item}
                    className="relative -mt-px flex min-h-11 items-center border border-fg bg-surface px-3 py-2 text-sm font-medium leading-snug first:mt-0 before:absolute before:-left-[21px] before:top-1/2 before:h-px before:w-5 before:bg-fg md:before:hidden"
                  >
                    {i > 0 && (
                      <span
                        className="absolute -left-px top-1/2 hidden size-2 -translate-y-1/2 bg-signal [clip-path:polygon(0_0,100%_50%,0_100%)] md:block"
                        aria-hidden
                      />
                    )}
                    {item}
                    {i < layers.length - 1 && (
                      <span
                        className="absolute -right-1 top-1/2 hidden size-1.5 -translate-y-1/2 bg-signal md:block"
                        aria-hidden
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Fragment>
        ))}
      </div>
      <figcaption className="mt-5 flex flex-col gap-1 border-t border-border pt-3 sm:flex-row sm:items-baseline sm:gap-4">
        {figure && <span className="shrink-0 font-mono text-label uppercase text-accent">{figure}</span>}
        <span className="text-sm leading-snug text-muted">{caption}</span>
      </figcaption>
    </figure>
  );
}
