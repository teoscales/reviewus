import { ReviewGate } from "@/components/ReviewGate";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Rate Test",
  description: "Rate your experience.",
};

export default function TestReviewPage() {
  return (
    <ReviewGate
      slug="test"
      businessName="Test"
      googleReviewLink="https://customerreviews.google.com/"
    />
  );
}
