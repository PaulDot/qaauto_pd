import { APIRequestContext } from "@playwright/test";

export class AuthClient {
    private readonly request: APIRequestContext;

    constructor(request: APIRequestContext){
        this.request = request;
    }

    async loginByApi(user: string, pass: string) {
        return await this.request.post('/authenticate', {
            form: {
                username: user,
                password: pass,
            },
        });
    }
}
