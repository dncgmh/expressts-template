import { ModelType } from '@typegoose/typegoose/lib/types';
import { FilterQuery, ModelPopulateOptions } from 'mongoose';

export const extendService = <T>(model: ModelType<T>) =>
  bindAll(
    {
      create: model.create,
      generate: (doc: T) => new model(doc),
      generateWithType: <U>(doc: U) => new model(doc),
      find: model.find,
      findOne: model.findOne,
      findById: model.findById,
      findOneAndUpdate: model.findOneAndUpdate,
      deleteOne: model.deleteOne,
      countDocuments: model.countDocuments,
      aggregate: model.aggregate,
      updateMany: model.updateMany,
      findWithPagination: async ({
        populate,
        sort = '-createdAt',
        select = '',
        limit = 20,
        page = 1,
        ...query
      }: {
        populate?: string | ModelPopulateOptions | ModelPopulateOptions[];
        sort?: string;
        select?: string;
        limit?: number;
        page?: number;
      } & FilterQuery<T>) => {
        const [data, totalPage] = await Promise.all([
          model
            .find(query as any, select, { skip: page && (page - 1) * limit, limit, sort, populate: populate as any })
            .exec(),
          limit && model.countDocuments(query as any)
        ]);
        return { data, totalPage, page: Math.ceil(totalPage / limit) };
      }
    },
    model
  );

const bindAll = <T>(props: T, bind) => {
  for (const key in props) {
    props[key] = (props[key] as unknown as Function).bind(bind);
  }
  return props;
};
