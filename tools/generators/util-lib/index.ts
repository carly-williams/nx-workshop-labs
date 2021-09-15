// import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
// import { libraryGenerator } from '@nrwl/workspace/generators';

// export default async function (tree: Tree, schema: any) {
//   await libraryGenerator(tree, { name: schema.name });
//   await formatFiles(tree);
//   return () => {
//     installPackagesTask(tree);
//   };
// }

// import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
// import { libraryGenerator } from '@nrwl/workspace/generators';

// export default async function(host: Tree, schema: any) {
//   await libraryGenerator(host, {
//     name: `util-${schema.name}`,
//   });
//   await formatFiles(host);
//   return () => {
//     installPackagesTask(host);
//   };
// }

// import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
// import { libraryGenerator } from '@nrwl/workspace/generators';

// export default async function(host: Tree, schema: any) {
//   await libraryGenerator(host, {
//     name: `util-${schema.name}`,
//     directory: schema.directory
//   });
//   await formatFiles(host);
//   return () => {
//     installPackagesTask(host);
//   };
// }

import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

export default async function(host: Tree, schema: any) {
  await libraryGenerator(host, {
    name: `util-${schema.name}`,
    directory: schema.directory,
    tags: `type:util, scope:${schema.directory}`
  });
  await formatFiles(host);
  return () => {
    installPackagesTask(host);
  };
}