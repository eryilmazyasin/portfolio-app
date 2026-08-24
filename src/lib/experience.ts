const CAREER_START = {
  year: 2019,
  monthIndex: 3,
  day: 1,
} as const

export function getYearsOfExperience(referenceDate = new Date()) {
  // Nisan 2019 başlangıcından itibaren yalnızca tamamlanan çalışma yıllarını sayar.
  const currentYear = referenceDate.getUTCFullYear()
  const anniversary = Date.UTC(
    currentYear,
    CAREER_START.monthIndex,
    CAREER_START.day
  )
  const completedAnniversary = referenceDate.getTime() >= anniversary

  return Math.max(
    0,
    currentYear - CAREER_START.year - (completedAnniversary ? 0 : 1)
  )
}
