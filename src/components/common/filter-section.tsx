import { Search, ListFilter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSectionProps {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
  filters?: Array<{
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    options: FilterOption[];
    width?: string;
  }>;
  showFiltersButton?: boolean;
}

export function FilterSection({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  filters = [],
  showFiltersButton = true,
}: FilterSectionProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="min-w-0 flex-1">
          <Input
            type="search"
            placeholder={searchPlaceholder}
            leftIcon={<Search className="size-4" />}
            className="h-10! rounded-2xl bg-white text-xs"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        
        {filters.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:flex">
            {filters.map((filter, index) => (
              <Select key={index} value={filter.value} onValueChange={filter.onChange}>
                <SelectTrigger className={`h-10 w-full rounded-2xl bg-slate-50 text-xs ${filter.width || 'sm:w-[140px]'}`}>
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {filter.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            
            {showFiltersButton && (
              <button
                type="button"
                className="col-span-2 flex h-10 items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 text-xs font-semibold text-slate-500 transition hover:bg-primary/10 hover:text-primary sm:col-span-1 sm:size-10 sm:px-0"
              >
                <ListFilter className="size-4" strokeWidth={3} />
                <span className="sm:hidden">Filters</span>
              </button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
