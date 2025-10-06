import sequelize, { Op } from 'sequelize';
import { e as createError, h as getQuery } from './nitro.mjs';

const commonController = (event, model) => {
  const parseOperatorQuery = (key, value) => {
    const operators = {
      ">=": Op.gte,
      "<=": Op.lte,
      ">": Op.gt,
      "<": Op.lt,
      "!=": Op.ne,
      "=": Op.eq,
      "~": Op.like
    };
    for (const [symbol, operator] of Object.entries(operators)) {
      if (key.includes(symbol)) {
        const field = key.split(symbol)[0];
        let val = value;
        if (symbol === "~") val = `%${value}%`;
        if (field.includes(".")) return { association: field.split(".")[0], field: field.split(".")[1], operator, val };
        return { field, operator, val };
      }
    }
    return { field: key, operator: Op.eq, val: value };
  };
  const create = async (createObject) => {
    return model.create(createObject);
  };
  const get = async () => {
    const query = getQuery(event);
    const {
      page = 1,
      perPage = 10,
      sort = "-createdAt",
      fields,
      search,
      include
    } = query;
    const where = {};
    const associations = {};
    Object.entries(query).forEach(([key, value]) => {
      if (["page", "perPage", "sort", "fields", "search", "include"].includes(key)) return;
      const { field, operator, val, association } = parseOperatorQuery(key, value);
      if (association) {
        associations[association] = associations[association] || { where: {} };
        associations[association].where[field] = { [operator]: val };
      } else {
        where[field] = { [operator]: val };
      }
    });
    if (search) {
      if (model.searchColumns) {
        where[Op.or] = model.searchColumns.map(
          (col) => sequelize.where(sequelize.col(col), Op.like, `%${search}%`)
        );
      } else {
        where[Op.or] = Object.keys(model.rawAttributes).filter((attr) => model.rawAttributes[attr].type.key === "STRING").map((attr) => ({ [attr]: { [Op.like]: `%${search}%` } }));
      }
    }
    const order = sort.split(",").map((item) => {
      const [field, direction] = item.startsWith("-") ? [item.slice(1), "DESC"] : [item, "ASC"];
      if (field.includes(".")) {
        const [association, assocField] = field.split(".");
        return [{ model: sequelize.models[association] }, assocField, direction];
      }
      return [field, direction];
    });
    const includes = [];
    if (include) {
      include.split(",").forEach((assocName) => {
        var _a;
        const association = {
          model: sequelize.models[assocName],
          attributes: include.includes("*") ? void 0 : (_a = model.associations[assocName]) == null ? void 0 : _a.attributes,
          ...associations[assocName] || {}
        };
        includes.push(association);
      });
    }
    return model.findAndCountAll({
      where,
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      order,
      attributes: fields == null ? void 0 : fields.split(","),
      include: includes,
      subQuery: false,
      // Important for MySQL pagination with includes
      distinct: true
      // Fix count for MySQL with joins
    });
  };
  const updateMany = async (where, updateData) => {
    if (!where || Object.keys(where).length === 0) {
      throw createError({ statusCode: 400, message: "Missing conditions for update" });
    }
    if (!updateData || Object.keys(updateData).length === 0) {
      throw createError({ statusCode: 400, message: "Missing update data" });
    }
    const [affectedCount] = await model.update(updateData, {
      where
    });
    if (affectedCount === 0) {
      throw createError({ statusCode: 404, message: "No records found matching the where conditions to update" });
    }
    return await model.findAll({
      where,
      attributes: Object.keys(model.rawAttributes)
      // Return all columns
    });
  };
  const deleteOne = async (id) => {
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "Invalid delete id" });
    }
    const doc = await model.findByPk(id);
    if (!doc) {
      throw createError({ statusCode: 404, statusMessage: "doc not found" });
    }
    return await doc.destroy();
  };
  const deleteMany = async (where) => {
  };
  return {
    create,
    get,
    updateMany,
    deleteOne,
    deleteMany
  };
};

export { commonController as c };
//# sourceMappingURL=commonCrud.mjs.map
