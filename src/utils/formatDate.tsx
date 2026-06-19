function ddMMYYYY(date: Date): string {
    date = new Date(date)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export { ddMMYYYY }