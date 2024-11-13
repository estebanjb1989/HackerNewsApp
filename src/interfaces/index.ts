export interface IArticle {
    id: string;
    title: string;
    author: string;
    createdAt: string;
    url: string;
}

export interface IError {
    message: string;
}

export interface IState {
    articles: any;
    settings: any;
    permissions: any;
}