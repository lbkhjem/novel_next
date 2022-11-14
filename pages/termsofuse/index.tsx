import { Container, Pagination, Skeleton, Title } from "@mantine/core";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { baseUrlNovel, getNovelUpdate } from "../../API/APIManage";
import { Layout } from "../../components/PC/Layout";
import { PUBLIC_URL } from "../../config";
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
const data = `<body>
<h1>Novel Fav Terms of Use</h1>
<p>
1. Acceptance and modification of the Terms of Service
<br>
This Agreement is an agreement between Novel Fav Users and Novel Fav regarding the use of the automatic renewal commission service provided by Novel Fav. This Agreement describes the rights and obligations between Novel Fav and its members regarding the use of the Service and related aspects. Members' choice of use of the Service will be deemed to be a binding agreement on the terms of this Agreement.
</p>
<p>
2. Service description
<br>
2.1 The service is for the members of the demand for automatic renewal, members have opened the service under the premise of the members to avoid inadvertent or other reasons leading to failure to renew the charges caused by the introduction of services, members of the VIP is about to expire, From the member's account balance in the next charge of the next billing cycle fee.
<br>
2.2 Automatic Renewal Specifically, Novel Fav collects the chargeback fee for the next billing cycle of the member through the above account. The member shall be responsible for the failure of the renewal fee due to the insufficient balance of the deductible in the account.
</p>
<p>
3. Rights and obligations of both parties
<br>
3.1 Novel Fav deducts the annual fee for the next billing cycle through the member's account. It should be deducted on the same day and the money will be credited to the member's payment record and the member's validity will be extended accordingly.
<br>
3.2 Novel Fav may change or modify the contents, rules and terms of this Agreement in accordance with its business or technical upgrades. Novel Fav will present the changes on the relevant pages of Novel Fav before making such changes or modifications, But no obligation to do separate notice. If the Member does not agree to the modification of this Agreement, it may cancel the service that has been acquired and cease to use it. If the Member continues to use the services provided by Novel Fav, it shall be deemed that the Member has accepted all modifications to this Agreement.
<br>
3.3 If the Novel Fav annual service price is adjusted at the time of automatic renewal, the prevailing prevailing price shall prevail.
<br>
3.4 Novel Fav does not charge any fees for members to open this service, but Novel Fav has the right to decide whether to charge the service itself or to adjust the automatic renewal period and expense according to business needs or market changes, and to publicize the members on the relevant page.
</p>
<p>
4. Term of agreement expires
<br>
4.1 This Agreement shall enter into force upon the acceptance or use of this Service by the Member until termination of the Service / cancellation of membership.
<br>
4.2 Members have the right to choose to terminate the service at any time in the App Store account settings. After the termination of this service, Novel Fav will cease providing the service to the member.
</p>
<p>
5. breach of contract
<br>
5.1 If a party defaults, the parties have the right to be compensated through a dispute resolution agreed upon by both parties.
</p>
<p>
6. Dispute resolution and legal application
<br>
6.1 Novel Fav and Members shall resolve the dispute arising from the fulfillment of this Agreement through friendly negotiation and shall not be resolved by negotiation. Each of them shall have the right to refer the dispute to the action.
</p>
<p>
7. The auto-renewing subscription to read following books without ads<br>
- You can pay $1.99/three month or $5.99/Year to read following books without ads<br>
- Payment will be charged to iTunes Account at confirmation of purchase;<br>
- Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period;<br>
- Subscriptions may be managed by the user and auto-renewal may be turned off by going to the user's Account Setting after purchase.<br>
</p>

</body>`;
export default function Privacy() {
  return (
    <>
      <Layout>
        <Head>
          <link rel="canonical" href={`${PUBLIC_URL}/privacy-policy`} />
        </Head>

        <Container className=" mx-auto">
          <div className="w-full flex flex-col justify-between py-2">
            <Title className="max-md:text-14" size={20} order={1}>
            Novel Fav Terms of Use
            </Title>
            <div
              className="relative antialiased text-14 p-2"
              dangerouslySetInnerHTML={{
                __html: data,
              }}
            />
          </div>
        </Container>
      </Layout>
    </>
  );
}
