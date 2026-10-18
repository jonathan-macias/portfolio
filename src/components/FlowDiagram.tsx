import type { Diagram } from "@/data/profile";
import { ArrowIcon } from "./icons";

// Layered architecture sketch: columns on wide screens, stacked rows on phones.
export function FlowDiagram({ layers, caption }: { layers: Diagram; caption: string }) {
  return (
    <figure className="rounded-xl border border-border bg-muted-surface p-4">
      <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center">
        {layers.map((layer, i) => (
          <div key={layer.label} className="contents">
            {i > 0 && (
              <ArrowIcon className="size-4 shrink-0 self-center rotate-90 text-muted md:rotate-0" />
            )}
            <div className="flex-1">
              <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">{layer.label}</p>
              <div className="flex flex-col gap-1.5">
                {layer.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}
