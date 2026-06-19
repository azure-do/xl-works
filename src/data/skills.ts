import type { IconType } from "react-icons";
import {
  HiCircleStack,
  HiCloud,
  HiCodeBracket,
  HiGlobeAlt,
  HiServerStack,
  HiShoppingBag,
} from "react-icons/hi2";

export interface SkillGroup {
  title: string;
  icon: IconType;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: HiCodeBracket,
    items: [
      "HTML / CSS / SCSS",
      "JavaScript / TypeScript",
      "React / Next.js / Astro",
      "Tailwind CSS",
      "Vue.js",
      "GSAP",
      "レスポンシブUI設計",
    ],
  },
  {
    title: "CMS / WordPress",
    icon: HiGlobeAlt,
    items: [
      "WordPress オリジナルテーマ",
      "Advanced Custom Fields",
      "Contact Form 7",
      "カスタム投稿タイプ",
      "管理画面・更新フロー設計",
      "SEO内部対策",
    ],
  },
  {
    title: "Shopify / EC",
    icon: HiShoppingBag,
    items: [
      "Shopify ストア構築",
      "Liquid テーマ開発",
      "商品・コレクション設計",
      "Shopifyアプリ連携",
      "レンタル・予約フロー設計",
      "EC UI/UX設計",
    ],
  },
  {
    title: "Backend / API",
    icon: HiServerStack,
    items: [
      "PHP / Laravel",
      "Node.js",
      "Python / FastAPI",
      "REST API設計",
      "認証・権限管理",
      "外部サービス連携",
    ],
  },
  {
    title: "Database",
    icon: HiCircleStack,
    items: [
      "MySQL",
      "PostgreSQL",
      "スキーマ設計",
      "マイグレーション",
      "クエリ最適化",
    ],
  },
  {
    title: "Infra / 公開",
    icon: HiCloud,
    items: [
      "Nginx",
      "Docker",
      "AWS",
      "Git / GitHub",
      "CI/CD",
      "本番デプロイ",
    ],
  },
];

export interface AboutExpertise {
  title: string;
  description: string;
}

export const aboutExpertise: AboutExpertise[] = [
  {
    title: "コーポレートサイト / CMS",
    description:
      "企業情報、サービス紹介、採用、お知らせなどをWordPressで整理。更新しやすいCMS設計と問い合わせ導線まで一貫して構築します。",
  },
  {
    title: "EC / 食品・飲食",
    description:
      "ShopifyをはじめとするECサイトの設計・構築。商品・コレクション設計、購入導線、レンタル・予約連携まで、運用を見据えたストア基盤を整えます。",
  },
  {
    title: "LP / 静的サイト",
    description:
      "HTML/CSS/JavaScript、Astro、GSAPなどを用いたLP・プロモーションサイト。モバイル前提のレスポンシブ設計とCV導線を重視します。",
  },
  {
    title: "バックエンド / API",
    description:
      "フォーム連携、認証、データ管理、外部API統合など、公開サイトの裏側を支えるAPI・サーバー側の実装にも対応します。",
  },
];

export const aboutParagraphs = [
  "向坪 涼。フルスタックエンジニアとして、コーポレートサイト、ECサイト、LP・プロモーションサイトの設計・構築を中心に取り組んできました。要件ヒアリングから情報設計、実装、公開、その後の更新運用まで一貫して担えることが強みです。",
  "得意領域は、事業の強みを整理し、Web上で伝わる構成に落とし込むことです。WordPress / Shopify、CMS・EC構築、問い合わせ導線、SEO内部対策、レスポンシブUIなど、公開と運用を見据えたWeb制作を重視しています。",
  "BtoBコーポレート、サービス業、メディア、ブランドサイトなど、業種はさまざまですが、「信頼感」「読みやすさ」「更新しやすさ」を両立する設計を心がけています。画面制作だけでなく、CMS設計・フォーム導線・表示速度の最適化まで含めて対応します。",
  "公開後の運用も見据え、クライアント自身が更新しやすい管理画面設計、再利用可能なコンポーネント、保守しやすいコード構成を心がけています。新規立ち上げからリニューアル、導線改善・SEO強化まで、Webサイトのライフサイクル全体に伴走します。",
  "事業課題を情報設計と実装方針に落とし込み、短期間での公開と中長期の運用性を両立することを目指しています。「見た目だけで終わらない、選ばれるWebサイト」を届けることを大切にしています。",
];
