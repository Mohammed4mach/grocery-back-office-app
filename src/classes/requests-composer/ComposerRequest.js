import { ComposerRequestTypes } from '@/enums';

export default class ComposerRequest
{
  #tag           = null;
  #type          = null;
  #title         = null;
  #request       = null;
  #isFailed      = false;
  #className     = null;
  #failedMessage = null;

  response = null;

  constructor(request, title, type)
  {
    if(!(request instanceof Function))
      throw new Error("ComposerRequest's constructor first argument must be async function");

    this.#type    = type;
    this.#title   = title;
    this.#request = request;

    this.#tag       = ComposerRequestTypes.title(type);
    this.#className = ComposerRequestTypes.className(type);
  }

  get request()
  {
    return this.#request;
  }

  get type()
  {
    return this.#type;
  }

  get title()
  {
    return this.#title;
  }

  get tag()
  {
    return this.#tag;
  }

  get className()
  {
    return this.#className;
  }

  get isFailed()
  {
    return this.#isFailed;
  }

  get failedMessage()
  {
    return this.#failedMessage;
  }

  fail(message = null)
  {
    this.#isFailed      = true;
    this.#failedMessage = message;
  }
}
