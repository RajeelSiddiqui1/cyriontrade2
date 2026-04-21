export const Select = ({
  value, onChange, options, label, labelMap,
}) => (
  <label className="relative inline-flex items-center glass border-border/60 rounded-xl hover:border-primary/40 transition-colors">
    <span className="text-xs text-muted-foreground pl-3 pr-1">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-transparent text-sm font-medium pl-1 pr-8 py-2.5 focus:outline-none cursor-pointer appearance-none"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-popover text-popover-foreground">
          {labelMap?.[o] ?? o}
        </option>
      ))}
    </select>
  </label>
);
