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
    title: 'Docker基本',
    Svg: CategorySvg,
    description: (
      <>
        Dockerの基本概念から、イメージ・コンテナの操作、Dockerfileの書き方までを学びます。
      </>
    ),
    link: '/docs/docker_base_ts/docker_base_ts_index',
  },
  {
    title: 'ランタイム固定',
    Svg: CategorySvg,
    description: (
      <>
        Node.jsやnpmのバージョンを固定し、開発環境と本番環境の差異をなくす手法を学びます。
      </>
    ),
    link: '/docs/docker_runtime_fix_ts/docker_runtime_fix_ts_index',
  },
  {
    title: 'Compose活用',
    Svg: CategorySvg,
    description: (
      <>
        Docker Composeを用いた複数コンテナの管理と、開発効率を高める設定方法を学びます。
      </>
    ),
    link: '/docs/docker_devcompose_cmd_ts/docker_devcompose_cmd_ts_index',
  },
  {
    title: '開発体験強化',
    Svg: CategorySvg,
    description: (
      <>
        Dev Containersの活用や、高速なフィードバックループを実現する開発環境の構築を学びます。
      </>
    ),
    link: '/docs/docker_developer_experience_ts/docker_developer_experience_ts_index',
  },
  {
    title: '依存とキャッシュ',
    Svg: CategorySvg,
    description: (
      <>
        ビルドキャッシュの最適化や、マルチステージビルドを用いた効率的なイメージ作成を学びます。
      </>
    ),
    link: '/docs/docker_depend_cache_ts/docker_depend_cache_ts_index',
  },
  {
    title: 'データ管理',
    Svg: CategorySvg,
    description: (
      <>
        VolumeやBind Mountを用いたデータの永続化と、データベースの運用方法を学びます。
      </>
    ),
    link: '/docs/docker_data_handling_ts/docker_data_handling_ts_index',
  },
  {
    title: '安全な隔離',
    Svg: CategorySvg,
    description: (
      <>
        セキュリティを考慮したユーザー設定や、最小限の権限での実行方法を学びます。
      </>
    ),
    link: '/docs/docker_safe_isolation_ts/docker_safe_isolation_ts_index',
  },
  {
    title: 'ローカル公開',
    Svg: CategorySvg,
    description: (
      <>
        ポート公開やネットワーク設定、リバースプロキシを用いたローカル環境の構築を学びます。
      </>
    ),
    link: '/docs/docker_local_exposure_ts/docker_local_exposure_ts_index',
  },
  {
    title: 'デプロイ',
    Svg: CategorySvg,
    description: (
      <>
        本番環境へのデプロイ戦略や、CI/CDパイプラインへの組み込み方法を学びます。
      </>
    ),
    link: '/docs/docker_deploy_ts/docker_deploy_ts_index',
  },
  {
    title: '観測性',
    Svg: CategorySvg,
    description: (
      <>
        コンテナのログ監視や、ヘルスチェックの設定方法を学びます。
      </>
    ),
    link: '/docs/docker_observability_ts/docker_observability_ts_index',
  },
  {
    title: 'オーケストレーション',
    Svg: CategorySvg,
    description: (
      <>
        複数のDockerホストを管理するオーケストレーションツールの基礎を学びます。
      </>
    ),
    link: '/docs/docker_multi_orch_ts/docker_multi_orch_ts_index',
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
