import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';
const fs = require('fs');
const path = require('path');

function generateProjectSidebar(folder: string) {
  const docsPath = path.join(__dirname, 'docs', folder);

  if (!fs.existsSync(docsPath)) {
    console.warn(`Warning: Docs directory not found: ${docsPath}`);
    return [];
  }

  const files = fs
    .readdirSync(docsPath)
    .filter((file: string) => file.endsWith('.md') || file.endsWith('.mdx'))
    .sort((a, b) => {
      const aIsIndex = a.includes('_index.');
      const bIsIndex = b.includes('_index.');

      if (aIsIndex && !bIsIndex) return -1;
      if (!aIsIndex && bIsIndex) return 1;

      return a.localeCompare(b);
    });

  return files.map((file: string) => {
    const id = `${folder}/${file.replace(/\.mdx?$/, '')}`;
    return {
      type: 'doc' as const,
      id,
    };
  });
}

const dockerSidebars = [
  ['dockerBaseTsSidebar', 'docker_base_ts'],
  ['dockerRuntimeFixTsSidebar', 'docker_runtime_fix_ts'],
  ['dockerDevcomposeCmdTsSidebar', 'docker_devcompose_cmd_ts'],
  ['dockerDeveloperExperienceTsSidebar', 'docker_developer_experience_ts'],
  ['dockerDependCacheTsSidebar', 'docker_depend_cache_ts'],
  ['dockerDataHandlingTsSidebar', 'docker_data_handling_ts'],
  ['dockerSafeIsolationTsSidebar', 'docker_safe_isolation_ts'],
  ['dockerLocalExposureTsSidebar', 'docker_local_exposure_ts'],
  ['dockerDeployTsSidebar', 'docker_deploy_ts'],
  ['dockerObservabilityTsSidebar', 'docker_observability_ts'],
  ['dockerMultiOrchTsSidebar', 'docker_multi_orch_ts'],
] as const;

const sidebars: SidebarsConfig = Object.fromEntries(
  dockerSidebars.map(([sidebarId, folder]) => [sidebarId, generateProjectSidebar(folder)]),
);

export default sidebars;
