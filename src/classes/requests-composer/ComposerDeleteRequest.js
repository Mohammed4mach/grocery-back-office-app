import ComposerRequest from './ComposerRequest';
import { ComposerRequestTypes } from '@/enums';

export default class ComposerDeleteRequest extends ComposerRequest
{
  constructor(request, title)
  {
    const type = ComposerRequestTypes.DELETE;

    super(request, title, type);
  }
}
