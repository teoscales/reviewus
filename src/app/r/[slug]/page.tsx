import { ReviewGate } from "@/components/ReviewGate";

export const dynamic = "force-dynamic";

function businessNameFromSlug(slug: string) {
  try {
    return decodeURIComponent(slug)
      .split(/[-_]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  } catch {
    return slug;
  }
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const name = businessNameFromSlug(params.slug);
  return {
    title: `Rate ${name}`,
    description: `How was your visit to ${name}? Rate your experience.`,
  };
}

export default function ReviewPage({ params }: { params: { slug: string } }) {
  const businessName = businessNameFromSlug(params.slug);
  const googleReviewLink = process.env.GOOGLE_REVIEW_LINK ?? "";

  return (
    <ReviewGate
      slug={params.slug}
      businessName={businessName || params.slug}
      googleReviewLink={googleReviewLink}
    />
  );
}
