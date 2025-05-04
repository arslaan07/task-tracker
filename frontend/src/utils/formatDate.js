export const formatDate = (date) => {
    const d = date.split('T')[0]
    const [year, month, day] = d.split('-')
    const formattedDate = `${day}-${month}-${year}`
    return formattedDate
}