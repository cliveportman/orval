import {
  normalizeSafe,
  relative as normalizedRelative,
  sep as seperator,
} from 'upath';
import { getExtension } from './extension';
import { getFileInfo } from './file';
import { isUrl } from './url';

/**
 * Behaves exactly like `path.relative(from, to)`, but keeps the first meaningful "./"
 */
export const relativeSafe = (from: string, to: string) => {
  const normalizedRelativePath = normalizedRelative(from, to);
  /**
   * Prepend "./" to every path and then use normalizeSafe method to normalize it
   * normalizeSafe doesn't remove meaningful leading "./"
   */
  const relativePath = normalizeSafe(`.${seperator}${normalizedRelativePath}`);
  return relativePath;
};

export const getSpecName = (specKey: string, rootSpecKey: string) =>
  (isUrl(specKey)
    ? specKey.replace(rootSpecKey, '')
    : specKey.replace(getFileInfo(rootSpecKey).dirname, '')
  ).replace(`.${getExtension(specKey)}`, '');