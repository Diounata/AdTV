import { format } from "date-fns";

export function DayDisplay({ date = new Date() }: { date?: Date }) {
  const day = format(date, "d");
  const weekday = format(date, "EEEE");
  const monthYear = format(date, "MMMM, yyyy");

  return (
    <section className="flex h-full items-center rounded-lg">
      <article className="z-20 flex aspect-square h-full items-center justify-center rounded-3xl bg-white p-4 shadow-lg">
        <span className="text-7xl font-bold text-[#15803D]">
          {day.padStart(2, "0")}
        </span>
      </article>

      <article className="-ml-2 flex flex-col rounded-r-3xl bg-white px-6 py-2 pl-8 shadow-lg">
        <span className="text-3xl font-bold text-gray-800">
          {weekday.charAt(0).toUpperCase() + weekday.slice(1)}
        </span>

        <span className="text-2xl font-bold text-gray-600">
          {monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}
        </span>
      </article>
    </section>
  );
}
