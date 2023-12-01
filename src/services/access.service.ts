import {ShopEntity} from "@entities";
import * as bcrypt from "bcrypt";
import {AppDataSource} from "@configs";

export class AccessService {
    signUp = async ({name, email, password}) => {
        try {
            AppDataSource
            const passwordHash = await bcrypt.hash(password, 10);
            const shop = {
                name: name,
                email: email,
                password: passwordHash
            }

            const shopEntity = new ShopEntity({...shop});
        } catch (error) {
            console.error(error.message);
        }
    }
}

