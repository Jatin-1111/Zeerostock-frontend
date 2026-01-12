import { redirect } from "next/navigation";

/**
 * Static /product route redirects to marketplace
 * Dynamic product pages are at /product/[slug]
 */
export default function ProductPage() {
  redirect("/marketplace");
}
