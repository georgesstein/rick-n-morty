export const encodeQueryParams = (p: Record<string, string | number | null>): string => { 
  let result = []

  for (let item in p) {
    if (p[item] === '' || p[item] === null || p[item] === undefined) {
      continue
    }

    result.push(`${item}=${p[item]}`)
  }

  if (result.length === 0) return ''
  
  return `?${result.join('&')}`
}

export const debounce = <T extends (...args: any) => void>(func: T, wait: number): T => {
  let timer: NodeJS.Timeout

  const debouncedFn = (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), wait)
  }

  return debouncedFn as any
}