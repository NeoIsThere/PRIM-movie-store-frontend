export interface Calculation{
    equation: string;
}

export interface Message{
    author: string;
    content: string;
}

export interface Movie{
    _id: string,
    title: string
    year: number
    imgSrc: string
}

export interface PriceResponse{
    price: number;
}


export interface MoviesDataResponse{
    movies: Movie[];
}