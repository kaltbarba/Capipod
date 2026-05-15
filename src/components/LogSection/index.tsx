import { useLogStore } from "../../store";

export default function LogSection() {
  const { logs } = useLogStore();

  return (
    <section className="h-full border-2 border-border bg-surface p-8">
      <h2 className="text-content font-bold mb-4">Game Log</h2>
      <div className="border rounded border-border grid px-2">
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
          <span className="text-gray-400 text-center p-2">No logs</span>
        )}
      </div>
    </section>
  );
}
