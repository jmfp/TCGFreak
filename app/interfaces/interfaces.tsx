export interface searchParams{
    q: string
}

export interface card{
    name: string,
    value?: number,
    description?:string,
    image?: string,
    ability?: string,
    traits?: string 
}

export interface collection{
    ownerId: string,
    cards: card[],
    
}