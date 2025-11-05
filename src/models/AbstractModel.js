import Api from "@/utils/Api";

/**
* Abstract class to encapsulate common logic for models
*/
class AbstractModel
{
  #paramName       = 'abstract';
  #indexEndpoint   = 'abstract';
  #createEndpoint  = 'abstract';
  #showEndpoint    = 'abstract';
  #updateEndpoint  = 'abstract';
  #deleteEndpoint  = 'abstract';
  #parentParamName = 'abstract';
  #selfEndpoint    = 'abstract';

  /**
  * Get new instance
  *
  * @param paramName Name of the parameter of the resource
  * @param indexEndpoint Index endpoint, fetch all records
  * @param createEndpoint Create endpoint, create new resource
  * @param showEndpoint Show endpoint, fetch specific record
  * @param updateEndpoint Update endpoint, update a record
  * @param deleteEndpoint Delete endpoint, delete a record
  * @param parentParamName Name of the parameter of the parent of the resource
  * @param selfEndpoint Self endpoint, fetch resources belongs to the user
  */
  constructor(paramName = '', indexEndpoint = '', createEndpoint = '', showEndpoint = '', updateEndpoint = '', deleteEndpoint = '', parentParamName = '', selfEndpoint = '')
  {
    this.#paramName       = paramName;
    this.#indexEndpoint   = indexEndpoint;
    this.#createEndpoint  = createEndpoint;
    this.#showEndpoint    = showEndpoint;
    this.#updateEndpoint  = updateEndpoint;
    this.#deleteEndpoint  = deleteEndpoint;
    this.#parentParamName = parentParamName;
    this.#selfEndpoint    = selfEndpoint;
  }

  /**
  * Replace endpoint param with a value
  */
  #replaceParam(endpoint, value)
  {
    return endpoint.replace(`{${this.#paramName}}`, value);
  }

  /**
  * Replace endpoint parent param with a value
  */
  #replaceParentParam(endpoint, value)
  {
    return endpoint.replace(`{${this.#parentParamName}}`, value);
  }

  /**
  * Get all records
  *
  * @param queryParams Query parameters
  * @param parentId Parent id for nested routes
  */
  async index(queryParams = {}, parentId = '', skipAuth = false)
  {
    let endpoint = `${this.#indexEndpoint}?`;

    if(parentId)
      endpoint = this.#replaceParentParam(endpoint, parentId);

    for(const param in queryParams)
      endpoint += `${param}=${queryParams[param]}&`;

    const res = await Api.get(endpoint, null, skipAuth);

    return res;
  }

  /**
  * Get specific record
  *
  * @param id ID of the record
  */
  async show(id, queryParams = {}, skipAuth = false, isHijri = false)
  {
    let endpoint = `${this.#replaceParam(this.#showEndpoint, id)}?`;

    for(const param in queryParams)
      endpoint += `${param}=${queryParams[param]}&`;

    const res = await Api.get(endpoint, null, skipAuth, isHijri);

    return res
  }

  /**
  * Delete specific record
  *
  * @param id ID of the record
  * @param parentId Parent id for nested routes
  */
  async delete(id, body = {}, parentId = '', skipAuth = false)
  {
    let endpoint = this.#replaceParam(this.#deleteEndpoint, id) + '?';

    if(parentId)
      endpoint = this.#replaceParentParam(endpoint, parentId);

    for(const input in body)
      endpoint += `${encodeURIComponent(input)}=${encodeURIComponent(body[input])}&`;

    const res = await Api.delete(endpoint, body, null, skipAuth);

    return res
  }

  /**
  * Create a new record
  *
  * @param body Body of the request
  * @param isFormData Whether the body content type is form data
  * @param parentId Parent id for nested routes
  */
  async create(body = {}, isFormData = false, parentId = '', skipAuth = false)
  {
    let endpoint  = this.#createEndpoint;
    const headers = {};

    if(isFormData)
      headers['Content-Type'] = 'multipart/form-data';

    if(parentId)
      endpoint = this.#replaceParentParam(endpoint, parentId);

    const res = await Api.post(endpoint, body, {headers}, skipAuth);

    return res
  }

  /**
  * Update specific record
  *
  * @param id ID of the record
  * @param body Body of the request
  * @param isFormData Whether the body content type is form data
  * @param parentId Parent id for nested routes
  */
  async update(id, body = {}, isFormData = false, parentId = '', skipAuth = false)
  {
    let endpoint  = `${this.#replaceParam(this.#updateEndpoint, id)}?`;
    const headers = {};

    if(isFormData)
    {
      headers['Content-Type'] = 'multipart/form-data';
      endpoint += '_method=put';
    }

    if(parentId)
      endpoint = this.#replaceParentParam(endpoint, parentId);

    let res;

    if(isFormData)
      res = await Api.post(endpoint, body, {headers}, skipAuth);
    else
      res = await Api.put(endpoint, body, {headers}, skipAuth);

    return res
  }

  /**
  * Update specific record
  *
  * @param id ID of the record
  * @param body Body of the request
  * @param isFormData Whether the body content type is form data
  * @param parentId Parent id for nested routes
  */
  async updatePatch(id, body = {}, isFormData = false, parentId = '', skipAuth = false)
  {
    let endpoint  = `${this.#replaceParam(this.#updateEndpoint, id)}?`;
    const headers = {};

    if(isFormData)
    {
      headers['Content-Type'] = 'multipart/form-data';
      endpoint += '_method=patch';
    }

    if(parentId)
      endpoint = this.#replaceParentParam(endpoint, parentId);

    let res;

    if(isFormData)
      res = await Api.post(endpoint, body, {headers}, skipAuth);
    else
      res = await Api.patch(endpoint, body, {headers}, skipAuth);

    return res
  }

  /**
  * Get resources that belongs to the current authenticated user
  */
  async self(isHijri = false)
  {
    let endpoint = this.#selfEndpoint;

    const res = await Api.get(endpoint, null, false, isHijri);

    return res
  }

  /**
  * Get resources that belongs to the current authenticated user
  *
  * @param body Body of the request
  * @param isFormData Whether the body content type is form data
  */
  async updateSelf(body = {}, isFormData = false)
  {
    let endpoint  = `${this.#selfEndpoint}?`;
    const headers = {};

    if(isFormData)
    {
      headers['Content-Type'] = 'multipart/form-data';
      endpoint += `_method=put`;
    }

    let res;

    if(isFormData)
      res = await Api.post(endpoint, body, {headers});
    else
      res = await Api.put(endpoint, body, {headers});

    return res
  }
}

export default AbstractModel;

