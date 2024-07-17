export interface Todo {
    text: string;
    complete: boolean;
    priority: boolean;
    duedate: string;
    tags: string[];
    createdate: string;
    checkdate: string;
    id: string;
    list: string;
}

export interface SelectSwitch {
    multi: boolean;
    all: boolean;
    multiSelectItems: string[];
}