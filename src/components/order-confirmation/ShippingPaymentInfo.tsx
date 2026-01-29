interface ShippingAddress {
  name: string;
  company: string;
  street: string;
  city: string;
  phone: string;
}

interface PaymentInfo {
  method: string;
  status: string;
}

interface ShippingInfo {
  method: string;
  date: string;
}

interface ShippingPaymentInfoProps {
  shippingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  shippingInfo: ShippingInfo;
  escrowAmount: string;
}

export default function ShippingPaymentInfo({
  shippingAddress,
  paymentInfo,
  shippingInfo,
  escrowAmount,
}: ShippingPaymentInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-3">
      {/* Shipping Address */}
      <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[23px] lg:p-[15px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
        <h3 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal mb-4 sm:mb-5 lg:mb-3">
          Shipping Address
        </h3>
        <div className="space-y-0">
          <p className="font-normal text-[#9c9c9c] text-sm sm:text-[15px] lg:text-[10px] leading-[23px] whitespace-pre-wrap">
            {shippingAddress.name}
            {"\n"}
            {shippingAddress.company}
            {"\n"}
            {shippingAddress.street}
            {"\n"}
            {shippingAddress.city}
          </p>
          <p className="font-normal text-[#9c9c9c] text-sm sm:text-[15px] lg:text-[10px] leading-[17px] pt-2 sm:pt-[9px] lg:pt-[6px]">
            {shippingAddress.phone}
          </p>
        </div>
      </div>

      {/* Payment & Shipping */}
      <div className="bg-white rounded-[15px] p-4 sm:p-5 md:p-[23px] lg:p-[15px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
        <h3 className="font-medium text-[#0d1b2a] text-base sm:text-lg md:text-[18px] lg:text-[12px] leading-normal mb-5 sm:mb-[28px] lg:mb-[19px]">
          Payment &amp; Shipping
        </h3>

        <div className="space-y-2 sm:space-y-[11px] lg:space-y-[7px]">
          {/* Payment Method */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#9c9c9c] text-xs sm:text-[13px] lg:text-[9px] leading-[17px]">
              Payment Method
            </span>
            <span className="font-medium text-black text-xs sm:text-[13px] lg:text-[9px] leading-[17px]">
              {paymentInfo.method}
            </span>
          </div>

          {/* Payment Status */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#9c9c9c] text-xs sm:text-[13px] lg:text-[9px] leading-[17px]">
              Payment Status
            </span>
            <span className="font-medium text-black text-xs sm:text-[13px] lg:text-[9px] leading-[17px]">
              {paymentInfo.status}
            </span>
          </div>

          {/* Shipping Method */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#9c9c9c] text-xs sm:text-[13px] lg:text-[9px] leading-[17px]">
              Shipping Method
            </span>
            <span className="font-medium text-black text-xs sm:text-[13px] lg:text-[9px] leading-[17px]">
              {shippingInfo.method}
            </span>
          </div>

          {/* Invoice Received / Escrow Release */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#9c9c9c] text-xs sm:text-[13px] lg:text-[9px] leading-[17px]">
              Invoice Received
            </span>
            <span className="font-medium text-black text-xs sm:text-[13px] lg:text-[9px] leading-[17px]">
              {escrowAmount || shippingInfo.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
