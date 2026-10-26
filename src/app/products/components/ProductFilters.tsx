"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const categories = ['CONES', 'CUPS', 'KULFI', 'STICKS', 'FAMILY PACKS', 'SUNDAES', 'SIP UPS', 'ALL'];
const filters: string[] = [];

type ProductFiltersProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  activeFilters: string[];
  setActiveFilters: (filters: string[]) => void;
};

export function ProductFilters({ activeCategory, setActiveCategory, activeFilters, setActiveFilters }: ProductFiltersProps) {

  const handleSetCategory = (category: string) => {
    setActiveCategory(category);
    setActiveFilters([]);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(
      activeFilters.includes(filter)
        ? activeFilters.filter(f => f !== filter)
        : [...activeFilters, filter]
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="pb-10 sm:pb-14"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">
        {/* Category tabs — wrap on mobile, single row with dividers on desktop */}
        <nav className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-0 gap-y-1">
          {categories.map((category, i) => (
            <div key={category} className="flex items-center">
              {i > 0 && (
                <span className="hidden sm:block w-[1px] h-4 bg-foreground/15 mx-3 sm:mx-5 shrink-0" />
              )}
              <button
                onClick={() => handleSetCategory(category)}
                className={cn(
                  "font-serif italic text-xs sm:text-sm md:text-lg whitespace-nowrap transition-all duration-300 py-2 px-1",
                  activeCategory === category
                    ? 'text-foreground font-semibold not-italic font-sans'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {category}
              </button>
            </div>
          ))}
        </nav>

        {/* Filter pills — smaller, below */}
        <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => toggleFilter(filter)}
              className={cn(
                "px-3 py-1 text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.1em] border rounded-full transition-all duration-200",
                activeFilters.includes(filter)
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
