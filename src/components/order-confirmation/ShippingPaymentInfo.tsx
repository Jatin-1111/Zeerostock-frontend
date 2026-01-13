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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {/* Shipping Address */}
      <div className="bg-white rounded-[15px] p-[23px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
        <h3 className="font-medium text-[#0d1b2a] text-xl leading-normal mb-5">
          Shipping Address
        </h3>
        <div className="space-y-0">
          <p className="font-normal text-[#9c9c9c] text-base leading-normal whitespace-pre-wrap">
            {shippingAddress.name}
            {"\n"}
            {shippingAddress.company}
            {"\n"}
            {shippingAddress.street}
            {"\n"}
            {shippingAddress.city}
          </p>
          <p className="font-normal text-[#9c9c9c] text-base leading-normal pt-[9px]">
            {shippingAddress.phone}
          </p>
        </div>
      </div>

      {/* Payment & Shipping */}
      <div className="bg-white rounded-[15px] p-[23px] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.25)]">
        <h3 className="font-medium text-[#0d1b2a] text-xl leading-normal mb-[28px]">
          Payment &amp; Shipping
        </h3>

        <div className="space-y-[11px]">
          {/* Payment Method */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#9c9c9c] text-sm leading-normal">
              Payment Method
            </span>
            <span className="font-medium text-black text-sm leading-normal">
              {paymentInfo.method}
            </span>
          </div>

          {/* Payment Status */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#9c9c9c] text-sm leading-normal">
              Payment Status
            </span>
            <span className="font-medium text-black text-sm leading-normal">
              {paymentInfo.status}
            </span>
          </div>

          {/* Shipping Method */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#9c9c9c] text-sm leading-normal">
              Shipping Method
            </span>
            <span className="font-medium text-black text-sm leading-normal">
              {shippingInfo.method}
            </span>
          </div>

          {/* Invoice Received / Escrow Release */}
          <div className="flex items-center justify-between">
            <span className="font-normal text-[#9c9c9c] text-sm leading-normal">
              Invoice Received
            </span>
            <span className="font-medium text-black text-sm leading-normal">
              {escrowAmount || shippingInfo.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
