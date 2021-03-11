// displaying when the note was created and generating full time stamp
	export default function formatDate() {
		const myDate = new Date()
		const parts = {
			date: myDate.getDate(),
			month: myDate.getMonth() + 1,
			year: myDate.getFullYear(),
			hour: (myDate.getHours() % 12) || 12,
			minutes: myDate.getMinutes().toString().padStart(2, "0"),
			amOrPm: myDate.getHours() < 12 ? "AM" : "PM"
		}

		return `${parts.date}/${parts.month}/${parts.year} at ${parts.hour}:${parts.minutes} ${parts.amOrPm}` ;
	}
