import { useRef, useEffect } from "react";
import { useLogStore } from "../../store";

export default function LogSection() {
  const { logs } = useLogStore();
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  return (
    <section className="flex-1 min-h-0 flex flex-col border-2 border-border bg-surface p-8">
      <h2 className="text-content font-bold mb-4">Game Log</h2>
      <div
        ref={logRef}
        className="border rounded border-border min-h-0 grid px-2 overflow-y-auto"
      >
        {logs.length > 0 ? (
          logs.map((log, index) => (
            <div
              key={index}
              className="not-last:border-b not-last:border-border p-2"
            >
              <span className="text-content font-medium text-sm mr-2">
                [{log.timestamp.toLocaleTimeString()}]:
              </span>
              <span className="text-content font-medium">{log.message}</span>
            </div>
          ))
        ) : (
          <span className="text-gray-400 text-center p-2">No messages</span>
        )}
      </div>
    </section>
  );
}
