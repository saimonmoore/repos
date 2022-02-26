import { Tree, formatFiles, getProjects, generateFiles, installPackagesTask, joinPathFragments, names } from '@nrwl/devkit';
import { moduleGenerator } from '@nrwl/nest'
import { DDDModuleSchema } from './schema.d'

export default async function(tree: Tree, schema: DDDModuleSchema) {
  await moduleGenerator(tree, { name: schema.name, project: schema.projectName });

  const project = getProjects(tree).get(schema.projectName);

  const templateNames = names(schema.name);

  const substitutions = {
    tmpl: '',
    ...templateNames,
  };

  generateFiles(
    tree,
    joinPathFragments(__dirname, 'templates'),
    joinPathFragments(project.sourceRoot, schema.name),
    substitutions
  );

  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
