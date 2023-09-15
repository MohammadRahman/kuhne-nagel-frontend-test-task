export function fetchShipmentsUrl(baseUrl: string, pageSize: number, after: string) {
    const url = new URL(baseUrl)
    url.searchParams.set('limit', String(pageSize))
    if (after != null) {
        url.searchParams.set('after', after)
    }
    return url;
}
