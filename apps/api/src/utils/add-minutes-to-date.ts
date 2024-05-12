export function addMinutesToDate(date: Date, minutes: number) {
   const total_ms_in_minute = 60_000
   return new Date(date.getTime() + Number(minutes) * total_ms_in_minute)
}
