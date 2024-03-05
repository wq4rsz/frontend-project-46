import gendiff from '../src/index.js';
import resultStylish from '../__fixtures__/result';

test('json', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toBe(resultStylish);
});
