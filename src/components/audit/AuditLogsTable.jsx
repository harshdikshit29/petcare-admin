const AuditLogsTable = ({ logs }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">

      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-left">Action</th>
            <th className="px-4 py-3 text-left">Module</th>
            <th className="px-4 py-3 text-left">Target</th>
            <th className="px-4 py-3 text-left">IP Address</th>
            <th className="px-4 py-3 text-left">Device</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Timestamp</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {logs.map((log) => (
            <tr key={log.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium">{log.user}</td>
              <td className="px-4 py-3">{log.action}</td>
              <td className="px-4 py-3">{log.module}</td>
              <td className="px-4 py-3 text-slate-500">{log.target}</td>
              <td className="px-4 py-3 font-mono">{log.ip}</td>
              <td className="px-4 py-3">{log.device}</td>

              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    log.status === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {log.status}
                </span>
              </td>

              <td className="px-4 py-3 text-slate-500">
                {log.timestamp}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default AuditLogsTable;
