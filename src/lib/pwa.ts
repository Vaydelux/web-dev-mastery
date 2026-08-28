import { useCallback, useEffect, useState } from "react";

/* ————— beforeinstallprompt (Chromium) ————— */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault(); // we surface our own affordance
    deferred = e as BeforeInstallPromptEvent;
    listeners.forEach((l) => l());
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    listeners.forEach((l) => l());
  });
}

export function useInstallPrompt() {
  const [, force] = useState(0);
  useEffect(() => {
    const l = () => force((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  const install = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    deferred = null;
    listeners.forEach((l) => l());
  }, []);
  return { canInstall: !!deferred, install };
}

/* ————— connectivity ————— */
export function useOnline() {
  const [online, setOnline] = useState(() => (typeof navigator === "undefined" ? true : navigator.onLine));
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);
  return online;
}

/* ————— service-worker updates —————
 * The new worker waits (no skipWaiting on install); we surface a "new
 * edition" notice and only take over when the learner reloads, so an
 * open lesson is never swapped mid-read. */
export function useSWUpdate() {
  const [updateReady, setUpdateReady] = useState(false);
  useEffect(() => {
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
    let disposed = false;
    const onControllerChange = () => {
      if (!disposed) window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);
    navigator.serviceWorker.ready
      .then((reg) => {
        if (disposed) return;
        if (reg.waiting && navigator.serviceWorker.controller) setUpdateReady(true);
        reg.addEventListener("updatefound", () => {
          const incoming = reg.installing;
          if (!incoming) return;
          incoming.addEventListener("statechange", () => {
            if (incoming.state === "installed" && navigator.serviceWorker.controller && !disposed) {
              setUpdateReady(true);
            }
          });
        });
      })
      .catch(() => {
        /* SW unsupported or blocked — the site still works */
      });
    return () => {
      disposed = true;
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);
  const applyUpdate = useCallback(() => {
    navigator.serviceWorker.ready.then((reg) => reg.waiting?.postMessage({ type: "SKIP_WAITING" }));
  }, []);
  return { updateReady, applyUpdate };
}
