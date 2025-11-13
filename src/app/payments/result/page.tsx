import { Suspense } from "react";
import PaymentResult from "./PaymentResult";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading payment result...</div>}>
      <PaymentResult />
    </Suspense>
  );
}
