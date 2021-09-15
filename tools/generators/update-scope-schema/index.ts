// import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
// import { libraryGenerator } from '@nrwl/workspace/generators';

// export default async function (tree: Tree, schema: any) {
//   await libraryGenerator(tree, { name: schema.name });
//   await formatFiles(tree);
//   return () => {
//     installPackagesTask(tree);
//   };
// }

// import { Tree, formatFiles, updateJson } from '@nrwl/devkit';

// export default async function (host: Tree) {
//   await updateJson(host, 'workspace.json', (workspaceJson) => {
//     workspaceJson.defaultProject = 'api';
//     return workspaceJson;
//   });
//   await formatFiles(host);
// }

import { Tree, updateJson, formatFiles, readJson } from '@nrwl/devkit';

function getScopes(nxJson: any) {
  const projects: any[] = Object.values(nxJson.projects);
  const allScopes: string[] = projects
    .map((project) =>
      project.tags
        // take only those that point to scope
        .filter((tag: string) => tag.startsWith('scope:'))
    )
    // flatten the array
    .reduce((acc, tags) => [...acc, ...tags], [])
    // remove prefix `scope:`
    .map((scope: string) => scope.slice(6));
  // remove duplicates
  return Array.from(new Set(allScopes));
}

function replaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map(s => `'${s}'`).join(' | ');
  const PATTERN = /interface Schema \{\n.*\n.*\n\}/gm;
  return content.replace(PATTERN,
    `interface Schema {
  name: string;
  directory: ${joinScopes};
}`
  );
}

function addScopeIfMissing(host: Tree) {
  updateJson(host, 'nx.json', json => {
    Object.keys(json.projects).forEach(projectName => {
      if (!json.projects[projectName].tags.some(tag => tag.startsWith('scope:'))) {
        const scope = projectName.split('-')[0];
        json.projects[projectName].tags.push(`scope:${scope}`);
      }
      
    });
    return json;
  });
}

export default async function (host: Tree) {
  const scopes = getScopes(readJson(host, 'nx.json'));
  updateJson(host, 'tools/generators/util-lib/schema.json', schemaJson => {
    schemaJson.properties.directory["x-prompt"].items = scopes.map(scope => ({
      value: scope,
      label: scope
    }))
    return schemaJson;
  });
  const content = host.read('tools/generators/util-lib/index.ts', 'utf-8');
  const newContent = replaceScopes(content, scopes);
  host.write('tools/generators/util-lib/index.ts', newContent);
  addScopeIfMissing(host); // IS THIS RIGHT?
  await formatFiles(host);
}