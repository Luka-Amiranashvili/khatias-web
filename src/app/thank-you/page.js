export const dynamic = "force-dynamic";

export default function ThankYouPage() {
  if (typeof window === "undefined") return null;

  const ThankYouClient = require("./ThankYouClient").default;
  return <ThankYouClient />;
}
