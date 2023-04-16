export function formatDate(inputDateStr: string) {
  const inputDate = new Date(inputDateStr)
  const day = inputDate.getDate()
  const month = inputDate.getMonth() + 1
  const year = inputDate.getFullYear()

  // Kiểm tra các giá trị ngày và tháng để thêm số 0 nếu cần thiết
  const formattedDay = day < 10 ? `0${day}` : day
  const formattedMonth = month < 10 ? `0${month}` : month

  // Trả về chuỗi đã được định dạng
  return `${formattedDay}/${formattedMonth}/${year}`
}

export function formatTime(inputTimeStr: string) {
  // Cắt chuỗi để lấy giá trị giờ và phút
  const timeParts = inputTimeStr.slice(11, 16).split(':')
  const hours = timeParts[0]
  const minutes = timeParts[1]

  // Trả về chuỗi đã được định dạng
  return `${hours}:${minutes}`
}
