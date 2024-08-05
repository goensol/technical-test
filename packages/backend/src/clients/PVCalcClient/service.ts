import { MonthlyOptimalRadiationByYear } from "./type";

export const calculateYearlyOptimalIrradience = (
  data: MonthlyOptimalRadiationByYear[]
) => {
  const dataByYear = getMonthlyRadiationGroupByYear(data);

  return getAverageRadiationByYear(dataByYear);
};

const getMonthlyRadiationGroupByYear = (
  data: MonthlyOptimalRadiationByYear[]
) => {
  const dataByYear = new Map<number, number[]>();

  data.forEach((data) => {
    const year = data.year;
    if (!dataByYear.has(year)) {
      dataByYear.set(year, []);
    }
    dataByYear.get(year)?.push(data["H(i_opt)_m"]);
  });
  return dataByYear;
};

const getAverageRadiationByYear = (
  monthlyRadiationGroupByYear: Map<number, number[]>
) => {
  let total = 0;
  monthlyRadiationGroupByYear.forEach((values) => {
    const sum = values.reduce((acc, current) => acc + current, 0);
    total += sum;
  });

  return total / monthlyRadiationGroupByYear.size;
};
