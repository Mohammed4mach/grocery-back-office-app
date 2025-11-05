import ComposerRequest from './ComposerRequest';
import { ComposerRequestTypes } from '@/enums';

export default class ComposerIndexRequest extends ComposerRequest
{
  constructor(request, title)
  {
    const type = ComposerRequestTypes.INDEX;

    super(request, title, type);
  }
}
