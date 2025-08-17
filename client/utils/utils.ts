
export function mapPageToURL(pageName: string) : string{
    if (pageName == "Home") return "/home"
    if (pageName == "Find Car") return "/find_car"
    return ""
}