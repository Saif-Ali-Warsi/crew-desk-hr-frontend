function TableShimmerLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-40 rounded-lg bg-gray-200" />

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3.5">
                <div className="h-4 w-24 rounded bg-gray-200" />
              </th>
              <th className="px-6 py-3.5">
                <div className="h-4 w-32 rounded bg-gray-200" />
              </th>
              <th className="px-6 py-3.5">
                <div className="h-4 w-24 rounded bg-gray-200" />
              </th>
              <th className="px-6 py-3.5">
                <div className="h-4 w-28 rounded bg-gray-200" />
              </th>
              <th className="px-6 py-3.5">
                <div className="h-4 w-16 rounded bg-gray-200" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-40 rounded bg-gray-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                </td>
                <td className="px-6 py-4">
                  <div className="h-6 w-20 rounded-full bg-gray-200" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableShimmerLoader;
