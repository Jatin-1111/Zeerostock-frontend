interface StatusBadgeProps {
  status: string;
  variant?:
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "pending"
    | "approved"
    | "rejected";
}

const variantStyles = {
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-700",
  danger: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function StatusBadge({
  status,
  variant = "info",
}: StatusBadgeProps) {
  return (
    <span
      className={`px-2 py-1 text-[10px] font-medium rounded ${variantStyles[variant]}`}
    >
      {status}
    </span>
  );
}
