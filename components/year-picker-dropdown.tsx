"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import {
  format,
  setYear,
  startOfYear,
  endOfYear,
  eachYearOfInterval,
} from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function YearPickerDropdown({
  onChange,
}: {
  onChange: (date: Date) => void;
}) {
  const [date, setDate] = React.useState<Date>(new Date());
  const [currentYear, setCurrentYear] = React.useState(
    new Date().getFullYear()
  );
  const yearsToShow = 12; // 3 rows of 4 years

  const years = React.useMemo(() => {
    const startDate = startOfYear(
      setYear(new Date(), currentYear - yearsToShow / 2)
    );
    const endDate = endOfYear(
      setYear(new Date(), currentYear + yearsToShow / 2 - 1)
    );
    return eachYearOfInterval({ start: startDate, end: endDate });
  }, [currentYear]);

  const onYearSelect = (year: number) => {
    const newDate = setYear(new Date(), year);
    setDate(newDate);
    onChange(newDate);
  };

  const onPreviousYears = () => setCurrentYear(currentYear - yearsToShow);
  const onNextYears = () => setCurrentYear(currentYear + yearsToShow);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[200px] justify-start text-left font-normal"
        >
          <span>{format(date, "MMMM d, yyyy")}</span>
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="w-full max-w-[250px] p-1">
          <div className="flex items-center justify-between px-1 py-2">
            <Button
              variant="outline"
              className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              onClick={onPreviousYears}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous years</span>
            </Button>
            <div className="text-sm font-medium">
              {format(years[0], "yyyy")} -{" "}
              {format(years[years.length - 1], "yyyy")}
            </div>
            <Button
              variant="outline"
              className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              onClick={onNextYears}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next years</span>
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-1 p-1">
            {years.map((year) => (
              <Button
                key={year.getFullYear()}
                onClick={() => onYearSelect(year.getFullYear())}
                variant="ghost"
                className={cn(
                  "h-8 w-12 p-0 font-normal",
                  year.getFullYear() === date.getFullYear() &&
                    "bg-primary text-primary-foreground"
                )}
              >
                <time dateTime={year.toDateString()}>
                  {format(year, "yyyy")}
                </time>
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
