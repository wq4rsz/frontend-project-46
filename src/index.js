import _ from 'lodash';
import fs from 'fs';
import path from 'node:path';

const resolvePath = (filePath) => (filePath.includes('__fixtures__')
  ? path.resolve(process.cwd(), filePath)
  : path.resolve(process.cwd(), `__fixtures__/${filePath}`));

function gendiff(filePath1, filePath2) {
  const path1 = resolvePath(filePath1);
  const path2 = resolvePath(filePath2);

  const file1 = fs.readFileSync(path1, 'utf-8');
  const file2 = fs.readFileSync(path2, 'utf-8');

  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = ['{'];
  for (const key of keys) {
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      result.push(`   - ${key}: ${data1[key]}`);
    } else if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      result.push(`   + ${key}: ${data2[key]}`);
    } else if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      if (data1[key] === data2[key]) {
        result.push(`   ${key}: ${data2[key]}`);
      } else if (data1[key] !== data2[key]) {
        result.push(`   - ${key}: ${data1[key]}`);
        result.push(`   + ${key}: ${data2[key]}`);
      }
    }
  }
  result.push('}');
  return result.join('\n');
}
export default gendiff;
