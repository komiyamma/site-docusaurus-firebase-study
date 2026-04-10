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
    title: 'Storage',
    Svg: CategorySvg,
    description: (
      <>
        画像や動画などのファイル管理、アップロード、ダウンロード、セキュリティ制限の実装を学びます。
      </>
    ),
    link: '/docs/firebase_storage_ts/firebase_storage_ts_index',
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
