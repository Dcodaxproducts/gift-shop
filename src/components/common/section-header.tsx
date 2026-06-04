type SectionHeaderProps = {
    icon ?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    title: string;
    description: string;
};

export default function SectionHeader({ icon: Icon, title, description }: SectionHeaderProps) {
    return (
        <div className="flex items-start gap-3">
            {
                Icon && <Icon className="size-5 text-slate-500" strokeWidth={1.5} />
            }
            <div>
                <h2 className="text-sm font-semibold ">{title}</h2>
                <p className="mt-0.5 text-[11px] text-slate-400">{description}</p>
            </div>
        </div>
    );
}