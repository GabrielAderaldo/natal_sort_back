export class CustomError implements Error{
    name: string;
    message: string;
    status:number;
    stack?: string | undefined;

    constructor(name: string, message: string, status:number) {
        this.name = name;
        this.message = message;
        this.status = status;
    }

    toJson(){
        return {
            "name": this.name,
            "message": this.message,
            "status": this.status
        }
    }

}