import { AbstractDocument } from '@app/common/database/abstract.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  // this.model
  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createDocument = await new this.model({
      ...document,
      _id: new Types.ObjectId(), // objectId생성
    });
    return (await createDocument.save()).toJSON() as unknown as TDocument; // 몽고디비에 저장 그리고 Json으로 js로 객체 반환
  }

  // 재사용을 위해 제네릭
  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery)
      .lean<TDocument>(true); // lean(true)를 호출하여 Mongoose 도큐먼트를 JavaScript 객체로 변환합니다.
    if (!document) {
      this.logger.warn('Document was not found With FilterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, update, {
        new: true,
      })
      .lean<TDocument>(true); // new true 업데이트 된 도류먼트 반환 하는거 false면 업데이트 이전 도큐먼트 반환

    if (!document) {
      this.logger.warn('Document was not found With FilterQuery', filterQuery);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>): Promise<TDocument[]> {
    return this.model.find(filterQuery).lean<TDocument[]>(true);
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
    // 은 지정된 조건에 해당하는 문서를 삭제 된 객체 반환
  }
}
