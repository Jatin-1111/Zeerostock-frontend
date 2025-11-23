"use client";

interface Address {
  name: string;
  company: string;
  street: string;
  city: string;
  phone: string;
}

interface ShippingAddressProps {
  address: Address;
}

export default function ShippingAddress({ address }: ShippingAddressProps) {
  return (
    <div className="bg-white border-2 border-gray-900 rounded p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h3>

      <div className="space-y-1 text-gray-900">
        <p className="font-bold">{address.name}</p>
        <p>{address.company}</p>
        <p>{address.street}</p>
        <p>{address.city}</p>
        <p>{address.phone}</p>
      </div>
    </div>
  );
}
