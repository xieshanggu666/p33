export function getWeekDateRange(weekOffset: number): { start: Date; end: Date; weekNumber: number } {
  const today = new Date();
  const currentDay = today.getDay();
  const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + weekOffset * 7);
  
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (monday.getTime() - firstDayOfYear.getTime()) / 86400000;
  const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  
  return { start: monday, end: sunday, weekNumber };
}

export function formatDate(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}月${day}日`;
}

export function getDateForDayOfWeek(weekStart: Date, dayOfWeek: number): Date {
  const result = new Date(weekStart);
  result.setDate(weekStart.getDate() + dayOfWeek - 1);
  return result;
}
