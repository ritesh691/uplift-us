import Script from "next/script";
import { mindwellMarkup } from "./mindwell-markup";

export default function DashboardPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: mindwellMarkup }} />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js"
        strategy="beforeInteractive"
      />
      <Script src="/mindwell-app.js" strategy="afterInteractive" />
    </>
  );
}
