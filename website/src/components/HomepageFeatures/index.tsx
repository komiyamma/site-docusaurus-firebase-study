import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const CategorySvg = require('@site/static/img/category.svg').default;

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'スタートダッシュ',
    Svg: CategorySvg,
    description: (
      <>
        Firebaseのプロジェクト作成から、エミュレータエンジンのセットアップ、TypeScript環境の構築までを学びます。
      </>
    ),
    link: '/docs/firebase_startdash_ts/firebase_startdash_ts_index',
  },
  {
    title: 'フロント基礎',
    Svg: CategorySvg,
    description: (
      <>
        FirebaseをWebフロントエンドに組み込む基礎、SDKの初期化や基本的な状態管理について学びます。
      </>
    ),
    link: '/docs/firebase_frontend_foundation_ts/firebase_frontend_foundation_ts_index',
  },
  {
    title: 'ログイン',
    Svg: CategorySvg,
    description: (
      <>
        Firebase Authenticationを用いた認証システムの構築と、セッション管理、セキュリティ実装を学びます。
      </>
    ),
    link: '/docs/firebase_login_ts/firebase_login_ts_index',
  },
  {
    title: 'Firestore基礎',
    Svg: CategorySvg,
    description: (
      <>
        NoSQLデータベースであるFirestoreの基本操作、データ構造の設計、型安全な開発手法を学びます。
      </>
    ),
    link: '/docs/firebase_firestore_base_ts/firebase_firestore_base_ts_index',
  },
  {
    title: 'Firestore構造',
    Svg: CategorySvg,
    description: (
      <>
        Firestoreにおける高度なデータモデリング、サブコレクションの活用、クエリの最適化について学びます。
      </>
    ),
    link: '/docs/firebase_firestore_struncture_ts/firebase_firestore_struncture_ts_index',
  },
  {
    title: 'セキュリティ',
    Svg: CategorySvg,
    description: (
      <>
        Firebase Security Rulesを活用した、セキュアなデータベースおよびストレージアクセスの制御について学びます。
      </>
    ),
    link: '/docs/firebase_security_role_ts/firebase_security_role_ts_index',
  },
  {
    title: 'ストレージ',
    Svg: CategorySvg,
    description: (
      <>
        画像や動画などのファイル管理、アップロード、ダウンロード、セキュリティ制限の実装を学びます。
      </>
    ),
    link: '/docs/firebase_storage_ts/firebase_storage_ts_index',
  },
  {
    title: 'Functions',
    Svg: CategorySvg,
    description: (
      <>
        Cloud Functionsを用いたバックエンドロジックの実装と、他サービスとの連携を学びます。
      </>
    ),
    link: '/docs/firebase_functions_ts/firebase_functions_ts_index',
  },
  {
    title: 'Hosting',
    Svg: CategorySvg,
    description: (
      <>
        ウェブアプリケーションのデプロイ、カスタムドメイン設定、GitHub Actionsによる自動化を学びます。
      </>
    ),
    link: '/docs/firebase_hosting_ts/firebase_hosting_ts_index',
  },
  {
    title: 'ローカル開発',
    Svg: CategorySvg,
    description: (
      <>
        Firebase Local Emulator Suiteを活用したオフライン・ローカルテスト環境の構築と活用法を学びます。
      </>
    ),
    link: '/docs/firebase_local_dev_ts/firebase_local_dev_ts_index',
  },
  {
    title: '通知(FCM)',
    Svg: CategorySvg,
    description: (
      <>
        Firebase Cloud Messagingを活用した、Web・アプリへのプッシュ通知の送信と制御について学びます。
      </>
    ),
    link: '/docs/firebase_notification_fcm_ts/firebase_notification_fcm_ts_index',
  },
  {
    title: '分析・パフォ',
    Svg: CategorySvg,
    description: (
      <>
        Google Analytics for FirebaseやPerformance Monitoringを用いた、ユーザー行動・アプリのパフォーマンス分析を学びます。
      </>
    ),
    link: '/docs/firebase_analytics_performance_ts/firebase_analytics_performance_ts_index',
  },
  {
    title: '悪用防止',
    Svg: CategorySvg,
    description: (
      <>
        App Checkを活用した、APIキーの不正利用やバックエンドの乱用を防ぐ仕組みについて学びます。
      </>
    ),
    link: '/docs/firebase_abuse_prevention_ts/firebase_abuse_prevention_ts_index',
  },
  {
    title: 'AI',
    Svg: CategorySvg,
    description: (
      <>
        Vertex AI for FirebaseやGeminiの組み込みなど、AI機能をアプリケーションで活用する方法を学びます。
      </>
    ),
    link: '/docs/firebase_ai_ts/firebase_ai_ts_index',
  },
  {
    title: 'Extensions',
    Svg: CategorySvg,
    description: (
      <>
        Firebase Extensionsを利用して、決済連携や画像リサイズなどの機能をプラグイン感覚で追加する方法を学びます。
      </>
    ),
    link: '/docs/firebase_extensions_ts/firebase_extensions_ts_index',
  },
];

function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Link to={link}>
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
