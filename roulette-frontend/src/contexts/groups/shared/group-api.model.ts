export interface GroupApi {
    id: string
    name: string
    members: string[]
    ceremonies: {id: string, name: string}[]
}