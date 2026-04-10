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

const firebaseSidebars = [
  ['firebaseStartdashTsSidebar', 'firebase_startdash_ts'],
  ['firebaseFrontendFoundationTsSidebar', 'firebase_frontend_foundation_ts'],
  ['firebaseLoginTsSidebar', 'firebase_login_ts'],
  ['firebaseFirestoreBaseTsSidebar', 'firebase_firestore_base_ts'],
  ['firebaseFirestoreStructureTsSidebar', 'firebase_firestore_struncture_ts'],
  ['firebaseSecurityRoleTsSidebar', 'firebase_security_role_ts'],
  ['firebaseStorageTsSidebar', 'firebase_storage_ts'],
  ['firebaseFunctionsTsSidebar', 'firebase_functions_ts'],
  ['firebaseHostingTsSidebar', 'firebase_hosting_ts'],
  ['firebaseLocalDevTsSidebar', 'firebase_local_dev_ts'],
  ['firebaseNotificationFcmTsSidebar', 'firebase_notification_fcm_ts'],
  ['firebaseAnalyticsPerformanceTsSidebar', 'firebase_analytics_performance_ts'],
  ['firebaseAbusePreventionTsSidebar', 'firebase_abuse_prevention_ts'],
  ['firebaseAiTsSidebar', 'firebase_ai_ts'],
  ['firebaseExtensionsTsSidebar', 'firebase_extensions_ts'],
] as const;

const sidebars: SidebarsConfig = Object.fromEntries(
  firebaseSidebars.map(([sidebarId, folder]) => [sidebarId, generateProjectSidebar(folder)]),
);

export default sidebars;
