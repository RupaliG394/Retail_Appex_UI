export function PlaceholderPage({ title, description }: { title: string; description?: string }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-navy mb-1">{title}</h1>
        {description && (
          <p className="text-gray-3" style={{ fontSize: '14px' }}>
            {description}
          </p>
        )}
      </div>

      <div className="bg-white border border-gray-2 rounded-xl p-8 text-center">
        <p className="text-gray-3" style={{ fontSize: '16px' }}>
          This page is coming soon...
        </p>
      </div>
    </div>
  );
}
