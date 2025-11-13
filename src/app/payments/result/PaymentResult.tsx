"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import errorCancel from "../../../../public/payments/error.svg"
import checkRight from "../../../../public/payments/check.svg";
import checkRight_gif_1 from "../../../../public/payments/opt_1.gif";
import errorGIF from "../../../public/payments/Error.gif";
import errorGIF_2 from "../../../../public/payments/errorGIF_2.gif";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentResult = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
const payment = status === "success";

  const [showStaticImage, setShowStaticImage] = useState(false);
  const [showStaticErrorImage, setShowStaticErrorImage] = useState(false);

  useEffect(() => {
    if (payment) {
      const timer = setTimeout(() => {
        setShowStaticImage(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [payment]);

  useEffect(() => {
    if (!payment) {
      const timer = setTimeout(() => {
        setShowStaticErrorImage(true);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [payment]);

  return (
    <div className="w-screen px-4 sm:px-6 md:px-8 lg:px-12 flex justify-center items-center pt-[120px] pb-[125px] sm:pt-[130px] sm:pb-[138px] md:pt-[145px] md:pb-[152px] lg:pt-[166px] lg:pb-[170px]">
      {payment ? (
        <div className="relative w-full flex flex-col justify-center items-center">
          <div className="relative h-[116px] w-[116px] sm:h-[82px] sm:w-[82px] md:h-[96px] md:w-[96px] lg:h-[116px] lg:w-[116px]">
            <Image
              src={checkRight_gif_1}
              alt="payment animation"
              height={1000}
              width={1000}
              className={`absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${
                showStaticImage ? "opacity-0" : "opacity-100"
              }`}
            />

            <Image
              src={checkRight}
              alt="payment successful"
              height={1000}
              width={1000}
              className={`absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${
                showStaticImage ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <h1 className="capitalize font-noto-serif font-normal italic text-[35px] sm:text-[42px] md:text-[42px] lg:text-[48px] text-[#5EA83E] mt-[15px] text-center">
            Payment Successful
          </h1>

          <p className="text-center font-host-grotesk font-normal text-[18px] lg:text-[20px] leading-snug text-[#000000] mt-[8px]">
            Your booking has been confirmed. A world of extraordinary experiences awaits.
          </p>

          <div className="max-w-[630px] w-full mt-[40px] flex flex-col gap-1.5">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-semibold">
                Booking ID:
              </p>
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-normal">
                [XXXXXX]
              </p>
            </div>

            <hr className="max-w-[627px] w-full bg-[#D8D8D8]" />

            <div className="w-full flex flex-row justify-between items-center">
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-semibold">
                Destination:
              </p>
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-normal">
                [Name]
              </p>
            </div>

            <hr className="max-w-[627px] w-full bg-[#D8D8D8]" />

            <div className="w-full flex flex-row justify-between items-center">
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-semibold">
                Dates:
              </p>
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-normal">
                [XX - XX Month]
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="relative h-[72px] w-[72px] sm:h-[82px] sm:w-[82px] md:h-[96px] md:w-[96px] lg:h-[116px] lg:w-[116px]">
            <Image
              src={errorGIF_2}
              alt="payment error animation"
              height={1000}
              width={1000}
              className={`absolute top-0 left-0 transition-opacity duration-700 ease-in-out scale-105 ${
                showStaticErrorImage ? "opacity-0" : "opacity-100"
              }`}
            />

            <Image
              src={errorCancel}
              alt="payment error static"
              height={1000}
              width={1000}
              className={`absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${
                showStaticErrorImage ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <h1 className="capitalize font-noto-serif font-normal italic text-[35px] sm:text-[42px] md:text-[42px] lg:text-[48px] text-[#E6212B] mt-[15px] text-center">
            Payment Unsuccessful
          </h1>

          <p className="text-center font-host-grotesk font-normal text-[18px] lg:text-[20px] leading-snug text-[#000000] mt-[8px]">
            Your transaction could not be completed. Please try again or contact our team for assistance.
          </p>

          <div className="max-w-[630px] w-full mt-[40px] flex flex-col gap-1.5">
            <div className="w-full flex flex-row justify-between items-center">
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-semibold">
                Transaction ID:
              </p>
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-normal">
                [XXXXXX]
              </p>
            </div>

            <hr className="max-w-[627px] w-full bg-[#D8D8D8]" />

            <div className="w-full flex flex-row justify-between items-center">
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-semibold">
                Amount:
              </p>
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-normal">
                [XXX USD]
              </p>
            </div>

            <hr className="max-w-[627px] w-full bg-[#D8D8D8]" />

            <div className="w-full flex flex-row justify-between items-center">
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-semibold">
                Dates:
              </p>
              <p className="font-host-grotesk text-[18px] md:text-[20px] font-normal">
                [XX - XX Month]
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-center items-center flex-wrap gap-x-[26px] gap-y-[20px] mt-[64px]">
            <Link href={"/"}>
              <button className="w-[223px] h-[54px] bg-[#312E29] text-[#FFFFFF] outline-none border-none cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 delay-75 rounded-full text-base sm:text-[18px]">
                Retry Payment
              </button>
            </Link>

            <Link href={"/contact"}>
              <button className="w-[223px] h-[54px] bg-transparent text-[#312E29] border border-[#312E29] cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 delay-75 rounded-full text-base sm:text-[18px]">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentResult;
