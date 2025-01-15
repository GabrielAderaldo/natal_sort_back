export class User {

    id: number;
    name: string;
    email: string;
    password: string;
    
    constructor(id:number,name:string,email:string,password:string){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    isValidEmail(): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(this.email);
    }

    isValidPassword(): boolean {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(this.password);
    }


}