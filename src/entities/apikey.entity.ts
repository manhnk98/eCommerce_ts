import {Expose, plainToClass} from "class-transformer";
import {Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn,} from "typeorm";

@Entity({name: "tb_api_key"})
export class ApiKeyEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column()
    @Expose()
    key: string;

    @Column({default: true})
    @Expose()
    status: boolean;

    @Column({enum: ["0000", "1111", "2222"], nullable: false})
    @Expose()
    permissions: string[];

    @CreateDateColumn({nullable: true})
    @Expose()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    @Expose()
    updatedAt: Date;

    constructor(apiKey: Partial<ApiKeyEntity>) {
        Object.assign(
            this,
            plainToClass(ApiKeyEntity, apiKey, {
                excludeExtraneousValues: true,
            })
        );
    }
}

export default ApiKeyEntity;
