import { Op }  from 'sequelize'
import { getQuery, readBody, createError } from 'h3';
import sequelize from 'sequelize';

export const commonController = (event, model) => {
  // Helper to parse operator queries (price>=100, date<2023-01-01)
  const parseOperatorQuery = (key, value) => {
    const operators = {
      '>=': Op.gte,
      '<=': Op.lte,
      '>': Op.gt,
      '<': Op.lt,
      '!=': Op.ne,
      '=': Op.eq,
      '~': Op.like,
    };

    for (const [symbol, operator] of Object.entries(operators)) {
      if (key.includes(symbol)) {
        const field = key.split(symbol)[0];
        let val = value;
        
        // Handle special cases for MySQL
        if (symbol === '~') val = `%${value}%`; // For LIKE queries
        if (field.includes('.')) return { association: field.split('.')[0], field: field.split('.')[1], operator, val };
        
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
      sort = '-createdAt',
      fields,
      search,
      include
    } = query;

    // Build WHERE clause
    const where = {};
    const associations = {};

    Object.entries(query).forEach(([key, value]) => {
      if (['page', 'perPage', 'sort', 'fields', 'search', 'include'].includes(key)) return;
      
      const { field, operator, val, association } = parseOperatorQuery(key, value);
      
      if (association) {
        associations[association] = associations[association] || { where: {} };
        associations[association].where[field] = { [operator]: val };
      } else {
        where[field] = { [operator]: val };
      }
    });

    // MySQL full-text search if model has search columns defined
    if (search) {
      if (model.searchColumns) {
        where[Op.or] = model.searchColumns.map(col => 
          sequelize.where(sequelize.col(col), Op.like, `%${search}%`)
        );
      } else {
        // Fallback to simple search
        where[Op.or] = Object.keys(model.rawAttributes)
          .filter(attr => model.rawAttributes[attr].type.key === 'STRING')
          .map(attr => ({ [attr]: { [Op.like]: `%${search}%` }}))
      }
    }

    // Parse sorting (handle association sorting: sort=user.name,-createdAt)
    const order = sort.split(',').map(item => {
      const [field, direction] = item.startsWith('-') 
        ? [item.slice(1), 'DESC'] 
        : [item, 'ASC'];
      
      if (field.includes('.')) {
        const [association, assocField] = field.split('.');
        return [{ model: sequelize.models[association] }, assocField, direction];
      }
      
      return [field, direction];
    });

    // Build includes
    const includes = [];
    if (include) {
      include.split(',').forEach(assocName => {
        const association = {
          model: sequelize.models[assocName],
          attributes: include.includes('*') ? undefined : model.associations[assocName]?.attributes,
          ...(associations[assocName] || {})
        };
        includes.push(association);
      });
    }

    // Execute query
    return model.findAndCountAll({
      where,
      limit: parseInt(perPage),
      offset: (parseInt(page) - 1) * parseInt(perPage),
      order,
      attributes: fields?.split(','),
      include: includes,
      subQuery: false, // Important for MySQL pagination with includes
      distinct: true,  // Fix count for MySQL with joins
    });
 
  };

  const updateMany = async (where, updateData) => {
    
    if (!where || Object.keys(where).length === 0) {
      throw createError({ statusCode: 400, message: 'Missing conditions for update' });
    }
    
    if (!updateData || Object.keys(updateData).length === 0) {
      throw createError({ statusCode: 400, message: 'Missing update data' });
    }

    // Perform the bulk update
    const [affectedCount] = await model.update(updateData, {
      where: where
    });

    if (affectedCount === 0) {
      throw createError({ statusCode: 404, message: 'No records found matching the where conditions to update' });
    }

    // Return updated records
    return await model.findAll({
      where: where,
      attributes: Object.keys(model.rawAttributes) // Return all columns
    });
  };

  const deleteMany = async (where) => {
    // Validate conditions - prevent accidental deletion of all records
    if (!where || Object.keys(where).length === 0) {
      throw createError({
        statusCode: 400,
        message: 'Deletion conditions required for safety'
      });
    }

    // Perform deletion
    const deletedCount = await model.destroy({
      where: where
    });

    // Handle no records found
    if (deletedCount === 0) {
      throw createError({
        statusCode: 404,
        message: 'No records found matching the conditions'
      });
    }
    return deletedCount
  };

  return {
    create,
    get,
    updateMany,
    deleteMany
  };
};