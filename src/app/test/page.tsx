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
      googleReviewLink="https://www.google.com/maps/place/Hospoda+Na+H%C5%99i%C5%A1ti/@49.196167,13.8978201,10z/data=!4m12!1m2!2m1!1sRestaurants!3m8!1s0x4774ca052fd6ff61:0xc500a6812d9dc5bc!8m2!3d49.112459!4d13.8328516!9m1!1b1!15sCgtSZXN0YXVyYW50c1oNIgtyZXN0YXVyYW50c5IBCnJlc3RhdXJhbnTgAQA!16s%2Fg%2F11b_2zflyn?entry=ttu&g_ep=EgoyMDI2MDgyNi4wIKXMDSoASAFQAw%3D%3D"
    />
  );
}
