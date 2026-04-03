import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DashboardPageContent,
  getRouteTitle,
  isDashboardSlug,
  routeSlugs,
} from "@/components/dashboard/dashboard-content";

export function generateStaticParams() {
  return routeSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  if (!isDashboardSlug(slug)) {
    return {};
  }

  return {
    title: `${getRouteTitle(slug)} | MindWell`,
  };
}

export default async function DashboardSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isDashboardSlug(slug)) {
    notFound();
  }

  return <DashboardPageContent slug={slug} />;
}
