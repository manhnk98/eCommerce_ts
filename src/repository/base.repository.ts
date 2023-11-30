import {PaginateBaseDto} from "src/common/dto/base-page-response.dto";
import {In} from "typeorm";

export interface IRepository<T> {
    insert(input: T): T;

    insertMulti(input: T): T | T[];

    update(id: number, updateData: any): T;

    updateMulti(options: any, updateData: any): T;

    delete(input: string): any;

    findAll(options: any): T[];

    findById(id: number, relations: any): T;

    findByListId(listId: number[], relations: any): T[];

    findOne(options: any): T;

    paginate(options: any): Promise<PaginateBaseDto<T>>;
}

export abstract class AbstractRepository<T> implements IRepository<T> {
    constructor(private repository) {
    }

    insert(input: T | T[]) {
        return this.repository.save(input);
    }

    insertMulti(input: T | T[]): T[] {
        return this.repository.save(input);
    }

    async updateMapField(
        id: number | string,
        updateData: any,
        filterUpdate: string[] = [],
        forceUpdate: string[] = []
    ): Promise<T> {
        const update = await this.repository.findOne({where: {id: id}});
        Object.keys(update).forEach((field) => {
            if (filterUpdate.length && !filterUpdate.includes(field)) {
                return;
            }
            if (
                (updateData[field] || forceUpdate.includes(field)) &&
                update[field] != updateData[field]
            ) {
                update[field] = updateData[field] || null;
            }
        });
        const {affected} = await this.repository.update({id: id}, update);
        if (!affected) {
            return null;
        }
        return update;
    }

    async updateOneMapField(
        option: any,
        updateData: any,
        filterUpdate: string[] = []
    ): Promise<T> {
        const update = await this.repository.findOne(option);
        Object.keys(update).forEach((field) => {
            if (filterUpdate.length && !filterUpdate.includes(field)) {
                return;
            }
            if (updateData[field] && update[field] != updateData[field]) {
                update[field] = updateData[field];
            }
        });
        const {affected} = await this.repository.update(option, update);
        if (!affected) {
            return null;
        }
        return update;
    }

    update(id: number | string, updateData: any): T {
        return this.repository.update({id: id}, updateData);
    }

    updateMulti(option: any, updateData: any): T {
        return this.repository.update(option, updateData);
    }

    delete(options: any): T {
        return this.repository.delete(options);
    }

    findAll(option: any): T[] {
        return this.repository.find(option);
    }

    findById(id: number | string, relations = []): T {
        return this.repository.findOne({where: {id: id}, relations: relations});
    }

    findByListId(listIds: number[], relations = []): T[] {
        return this.repository.find({
            where: {id: In(listIds)},
            relations: relations,
        });
    }

    findOne(options: any): T {
        return this.repository.findOne(options);
    }

    async paginate(options: any): Promise<PaginateBaseDto<T>> {
        const {page = 1, size = 25} = options.pagination || {};
        const result: PaginateBaseDto<T> = {
            docs: [],
            page: 1,
            size: 0,
            total: 0,
            totalPage: 1,
        };
        options.take = Number(size);
        options.skip = size * page - size;

        const [list, count] = await this.repository.findAndCount(options);
        result.total = count;
        result.docs = list;
        result.size = Number(size);
        result.page = Number(page);
        result.totalPage = Math.ceil(result.total / size);
        return result;
    }
}
