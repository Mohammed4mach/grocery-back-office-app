import ComposerRequest from './ComposerRequest';
import { ComposerRequestTypes } from '@/enums';

export default class ComposerUpdateRequest extends ComposerRequest
{
  constructor(request, title)
  {
    const type = ComposerRequestTypes.UPDATE;

    super(request, title, type);
  }
}
