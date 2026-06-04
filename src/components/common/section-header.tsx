import { cn } from "@/lib/utils";

type SectionHeaderProps = {
    icon ?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    title: string;
    description ?: string;
    className ?: string;
};

export default function SectionHeader({ icon: Icon, title, description, className }: SectionHeaderProps) {
    return (
        <div className="flex items-start gap-3">
            {
                Icon && <Icon className="size-5 text-primary mt-1" strokeWidth={1.5} />
            }
            <div>
                <h2 className={cn("text-base font-semibold", className)}>{title}</h2>
                {
                    description && <p className="text-sm text-slate-500 ">{description}</p>
                }
            </div>
        </div>
    );
}