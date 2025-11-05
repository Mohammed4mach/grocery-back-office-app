import ComposerRequest from './ComposerRequest';
import { ComposerRequestTypes } from '@/enums';

export default class ComposerStoreRequest extends ComposerRequest
{
  constructor(request, title)
  {
    const type = ComposerRequestTypes.STORE;

    super(request, title, type);
  }
}
