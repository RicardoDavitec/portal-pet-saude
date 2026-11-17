import { useCallback, useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";

export function usePanelWidth(key: string, initial: number, min = 160, max = 480) {
  const [width, setWidth] = useState(() => {
    const raw = localStorage.getItem(key);
    const n = raw ? Number(raw) : initial;
    return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : initial;
  });
  const [collapsed, setCollapsed] = useState(() => localStorage.getItem(`${key}:c`) === "1");

  useEffect(() => {
    localStorage.setItem(key, String(width));
  }, [key, width]);

  useEffect(() => {
    localStorage.setItem(`${key}:c`, collapsed ? "1" : "0");
  }, [key, collapsed]);

  const onDragStart = useCallback(
    (e: ReactMouseEvent, edge: "left" | "right") => {
      e.preventDefault();
      const startX = e.clientX;
      const startW = width;
      const onMove = (ev: MouseEvent) => {
        const delta = edge === "left" ? ev.clientX - startX : startX - ev.clientX;
        setWidth(Math.min(max, Math.max(min, startW + delta)));
        setCollapsed(false);
      };
      const onUp = () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("mouseup", onUp);
      };
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseup", onUp);
    },
    [width, min, max],
  );

  return { width, setWidth, collapsed, setCollapsed, onDragStart };
}
