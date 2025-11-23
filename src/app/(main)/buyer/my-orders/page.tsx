import { Download } from "lucide-react";
import Link from "next/link";

export default function MyOrdersPage() {
  const orders = [
    {
      id: "ORD-001",
      supplier: "SteelCorp Ind",
      items: "Industrial Steel Pipe",
      amount: "15,000",
      status: "shipped",
      orderDate: "2024-01-10",
      expectedDate: "2024-01-20",
    },
    {
      id: "ORD-001",
      supplier: "SteelCorp Ind",
      items: "Industrial Steel Pipe",
      amount: "15,000",
      status: "shipped",
      orderDate: "2024-01-10",
      expectedDate: "2024-01-20",
    },
    {
      id: "ORD-001",
      supplier: "SteelCorp Ind",
      items: "Industrial Steel Pipe",
      amount: "15,000",
      status: "shipped",
      orderDate: "2024-01-10",
      expectedDate: "2024-01-20",
    },
    {
      id: "ORD-001",
      supplier: "SteelCorp Ind",
      items: "Industrial Steel Pipe",
      amount: "15,000",
      status: "shipped",
      orderDate: "2024-01-10",
      expectedDate: "2024-01-20",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <button className="px-6 py-2.5 bg-white border-2 border-gray-900 text-gray-900 rounded font-medium hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Orders
          </button>
        </div>

        <div className="bg-white border-2 border-gray-900 rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-white border-b-2 border-gray-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Supplier
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Order Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Expected D
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.supplier}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.items}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.orderDate}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.expectedDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-gray-900 hover:text-gray-700 font-medium">
                      Actions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            redirect to track shipment{" "}
            <Link href="/track-order" className="text-blue-600 underline">
              on-click
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
