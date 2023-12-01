import {Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn, UpdateDateColumn} from "typeorm";
import {Expose, plainToClass} from "class-transformer";

@Entity({name: "tb_shop"})
export class ShopEntity {

    @ObjectIdColumn()
    id: ObjectId;

    @Column({name: "name", length: 150, nullable: false})
    @Expose()
    name: string;

    @Column({unique: true, nullable: false})
    @Expose()
    email: string;

    @Column({nullable: false})
    @Expose()
    password: string;

    @Column({type: "enum", enum: ["active", "inactive"], default: "inactive"})
    @Expose()
    status: string;

    @Column({enum: ["verified", "not_verified"], default: "not_verified"})
    @Expose()
    verify: string;

    @Column({default: []})
    @Expose()
    roles: string[];

    @CreateDateColumn({nullable: true})
    @Expose()
    createdAt: Date;

    @UpdateDateColumn({nullable: true})
    @Expose()
    updatedAt: Date;

    constructor(shop: Partial<ShopEntity>) {
        Object.assign(
            this,
            plainToClass(ShopEntity, shop, {
                excludeExtraneousValues: true,
            })
        );
    }
}

export default ShopEntity