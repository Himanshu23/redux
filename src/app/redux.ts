
//Creating the Actions for the app
export const Actions = {
    APP_increment: "APP_increment",
    APP_decrement: "APP_decrement",
    APP_reset: "APP_reset",
    APP_Login: "APP_Login",
    APP_Register: "APP_Register",
    POST_List: "APP_List",
    PHOTO_List: "PHOTO_List"
}

//Creating the State of the app
interface Login {
    name: string;
    password: string;
    errMsg: string;
}

interface Register {
    name: string;
    password: string;
    errMsg: string;
    succMsg: string;
}
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
interface Photo{
    albumId:number,
    id:number,
    title: string,
    url: string,
    thumbnailUrl: string
}


interface PostList {
    posts: Post[]
    start: number;
    limit: number;
}
export interface IAppState {
    login: Login
    register: Register;
    postList: PostList;
    postDetail: {};
    photos:Photo[];
}

export const INITIAL_STATE: IAppState = {
    login: {
        name: "",
        password: "",
        errMsg: "",
    },
    register: {
        name: "",
        password: "",
        errMsg: "",
        succMsg: ""
    },
    postList: { posts: [], start: 0, limit: 10},
    postDetail: {},
    photos:[]
}

//Creating the reducer for the app
export function reducer(state: IAppState = INITIAL_STATE, action: any): IAppState {
    let currentState = JSON.parse(JSON.stringify(state))
    let newState = currentState;
    switch (action.type) {
        case Actions.APP_Login:
            newState.login = action.data;
            return newState
        case Actions.APP_Register:
            newState.register = action.data;
            return newState
        case Actions.POST_List:
            newState.postList.posts = currentState.postList.posts.concat(action.data.posts);
            newState.postList.start = action.data.start;
            newState.postList.limit = action.data.limit;
            return newState
            case Actions.PHOTO_List:
            newState.photos = action.data;
            return newState
        default:
            return state;
    }
}
