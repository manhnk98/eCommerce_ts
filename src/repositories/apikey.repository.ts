import {AbstractMongoRepository} from "./base.repository";
import {ApiKeyEntity} from "../entities/apikey.entity";

type ApiKeyEntityType = typeof ApiKeyEntity;

export class ApikeyRepository extends AbstractMongoRepository<ApiKeyEntityType> {

    constructor(private apikey: ApiKeyEntityType) {
        super(apikey);
    }

}