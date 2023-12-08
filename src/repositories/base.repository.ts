import mongoose from "mongoose";

export interface IRepository<T> {

    insert(input: T): T;

    insertMulti(input: T): T | T[];

    update(id: string, updateData: any): T;

    delete(input: string): any;

    findAll(options: any): T[];

    findById(id: string): T;

    findByListId(listId: string[]): T[];

    findOne(options: any): T;
}

export abstract class AbstractMongoRepository<T> implements IRepository<T> {

    constructor(private entity) {
    }

    delete(options: any): any {
        return this.entity.deleteOne(options);
    }

    findAll(options: any): T[] {
        return this.entity.find(options);
    }

    findById(id: string): T {
        return this.entity.findById(id);
    }

    findByListId(listId: string[]): T[] {
        const objectIdList = listId.map((id) => new mongoose.Types.ObjectId(id));
        return this.entity.find({
            '_id': {
                $in: objectIdList
            }
        })
    }

    findOne(options: any): T {
        return this.entity.findOne(options);
    }

    insert(input: T): T {
        return this.entity.save(input);
    }

    insertMulti(input: T): T[] | T {
        return this.entity.save(input);
    }

    update(id: string, updateData: any): T {
        return this.entity.findByIdAndUpdate(id, updateData);
    }

}