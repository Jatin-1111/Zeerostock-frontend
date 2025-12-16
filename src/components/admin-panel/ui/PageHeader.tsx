interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h2 className="text-[28px] font-bold text-black">{title}</h2>
        {description && (
          <p className="text-[14px] text-gray-500">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
