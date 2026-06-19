export type CategoryId =
  | "corporate"
  | "ec"
  | "media"
  | "hospitality"
  | "business"
  | "community";

export interface Category {
  id: CategoryId;
  label: string;
}

export const categories: Category[] = [
  { id: "corporate", label: "コーポレート / ブランディング" },
  { id: "ec", label: "EC / 食品・飲食" },
  { id: "media", label: "メディア / 情報発信" },
  { id: "hospitality", label: "旅行 / ライフスタイル" },
  { id: "business", label: "業務支援 / SaaS" },
  { id: "community", label: "マッチング / コミュニティ" },
];
