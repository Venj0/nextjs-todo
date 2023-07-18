const convertNumber = (value: number) => `${value < 10 ? 0 : ''}${value}`
export const getVisibleTime = (date?: Date): string => {
	if (!date) return ''

	const createdDate = new Date(date)
	const todayDate = new Date(Date.now())

	const today = `${convertNumber(todayDate.getDate())}/${convertNumber(todayDate.getMonth() + 1)}/${todayDate.getFullYear()}`
	const created = `${convertNumber(createdDate.getDate())}/${convertNumber(createdDate.getMonth() + 1)}/${createdDate.getFullYear()}`

	if (created !== today) return created
	return `${convertNumber(createdDate.getHours())}:${convertNumber(createdDate.getMinutes())}`
}
