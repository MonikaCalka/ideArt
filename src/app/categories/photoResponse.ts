export interface PhotoResponse {
    urls: Url,
    user: Author
}

interface Url {
    raw: string
}

interface Author {
    name: string,
    link: string,
    instagramName?: string
}