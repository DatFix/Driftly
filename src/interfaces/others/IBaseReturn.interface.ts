export interface IBaseCreate{
    data: any,
    statusCode: number,
    message: string
}

export interface IBaseGetMulti{
    data: any,
    totalItems: number
}

export interface IBaseGetOne{
    data: any,
}

export interface IBaseUpdate{
    data: any,
    statusCode: number,
    message: string
}