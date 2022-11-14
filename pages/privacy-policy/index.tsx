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
<h1>Novel Fav Privacy Policy</h1>
<br>
1. INTRODUCTION<br>
This Privacy Policy will be effective from September 19, 2021. This document aims to inform you regarding the processing, collection, use and disclosure of information, including your personal data in conjunction with your access to and use of Our Products and Services.<br>
<br>
NovelFav observes and complies with the applicable laws and regulations relating to the protection and storage of personal information.<br>
<br>
This Privacy Policy is applied to all services, products, websites, apps, content, together referred as "Products" and/or "Services", managed by NovelFav.<br>
<br>
When this policy mentions "NovelFav", "we," "us," or "our," it refers to the NovelFav. company that is responsible for your information under this Privacy Policy (the "Data Controller").<br>
<br>
This Privacy Policy does not apply to any third-party services or websites linked from or integrated in any Product of NovelFav Such third parties have their own Privacy Policies and Terms of Service, which NovelFav does not control in any way.<br>
<br>
We are committed to protecting your privacy and take special measures to ensure the confidentiality of Personally Identifiable Information collected from or about you. This Privacy Policy explains what information we collect, how we collect it and why,<br>
how we use it and with whom we share it, how you can access and update that information, the choices you can make about how we collect, use, and share your information, how we protect the information we store about you.<br>
<br>
Please read this policy carefully. If you do not agree with this privacy policy, or any part of it, if you do not want us to collect, store, use or share your information in the ways described in this Privacy Policy, you may not use our products. You may ask us to delete your account and receive a copy of your information.<br>
In case you do not notify us in writing of disagreement or do not take the necessary measures to remove your account, it is considered that you agree fully with the Privacy Policy.<br>
<br>
Your using of our Services is treated as an acceptance of the version of this policy in effect at the time of your use.<br>
<br>
Applicable to this privacy policy and all relations deriving therefrom shall be the applicable Bulgarian legislation.<br>
<br>
If you have any questions about this privacy policy, please contact us at service@NovelFav.com and do not use our Products and Services until you are satisfied and can accept this policy in its entirety.<br>
<br>
2. TYPES OF INFORMATION WE COLLECT<br>
There are three general categories of information we collect:<br>
<br>
2.1. Information You Give to Us<br>
<br>
2.1.1. Information that is necessary for the use of the Products<br>
When you use our Services (whether through a social network, through third-party website integrations or through our Service directly), you may give us information directly (like when you're setting up your account) and we will store that on our systems and use it for the purposes described in this Privacy Policy.<br>
<br>
We ask for and collect the following personal information about you when you use the Products. This information is necessary for the adequate performance of the contract between you and us and to allow us to comply with our legal obligations. Without it, we may not be able to provide you with all the requested services.<br>
<br>
2.1.1.1. Account Information<br>
2.1.1.1.1. your email address;<br>
2.1.1.1.2. a password;<br>
2.1.1.1.3. other information that helps us make sure it's you accessing your account or helps us improve our services;<br>
<br>
2.1.2. Information you choose to give us<br>
2.1.2.1. Additional Profile Information.<br>
You may choose to provide additional information as part of your profile (such as gender, preferred language(s), city, and a personal description (status)). Some of this information as indicated in your Account settings is part of your public profile page, and will be publicly visible to others.<br>
<br>
2.1.2.1.1. a profile photo;<br>
2.1.2.1.2. game username;<br>
2.1.2.1.3. your gender;<br>
2.1.2.1.4. approximate location information that you provide (country, city);<br>
2.1.2.1.5. biographical details (like your age or age range);<br>
2.1.2.1.6. status message, that you write;<br>
2.1.2.1.7. links to your profiles on various social networks;<br>
<br>
2.1.3. Information You Generate Using Our Communications Features<br>
When you communicate with Us or use the Products to communicate with other users, we may collect information about your communication and any information you may choose to provide when you fill in a form, conduct a search, update or add information to your Account, respond to surveys, post to community forums, participate in promotions, or use other features of the Products.<br>
<br>
2.1.3.1. Support Correspondence<br>
We will collect and store the contact information you choose to provide in correspondence with Support team like your name and contact email address, information about your activity on the Products, and your player user ID and/or social network ID number. We will also store the communications you have with the Support team and any information in those communications in order to provide support and improve the Products.<br>
<br>
2.1.3.2. Products communications<br>
2.1.3.2.1. participating in message boards;<br>
2.1.3.2.2. sending messages or invitations to other players;<br>
2.1.3.2.3. chatting with other players;<br>
2.1.3.2.4. posting photos, videos, drawings or texts.<br>
We may access in real-time, record and/or store archives of these communications, comments, photos, videos, drawings or texts to make use of them to protect the safety of our players and Our legitimate rights and property in connection with our Services and Products.<br>
<br>
2.2. Information We Automatically Collect from Your Use of the Products<br>
When you use the Products, we automatically collect information, including personal information, about the services you use and how you use them. This information is necessary for the adequate performance of the contract between you and us, to enable us to comply with legal obligations and given our legitimate interest in being able to provide and improve the functionalities of the Products.<br>
<br>
2.2.1. Usage information<br>
We collect information about your interactions with the Products and other actions on the Products. In some cases, we will connect this information with your social network ID or Player user ID. This information may include:<br>
<br>
2.2.1.1. Log Data and Device Information<br>
2.2.1.1.1. IP addresses;<br>
2.2.1.1.2. access dates and times<br>
2.2.1.1.3. the type of computer or mobile device you are using;<br>
2.2.1.1.4. your operating system version;<br>
2.2.1.1.5. your mobile device's identifiers, Identifier For Advertising (IDFA);<br>
2.2.1.1.6. your browser types;<br>
2.2.1.1.7. your browser language;<br>
2.2.1.1.8. referring and exit pages, and URLs;<br>
2.2.1.1.9. platform type;<br>
2.2.1.1.10. click behaviour on a page or feature;<br>
2.2.1.1.11. landing pages;<br>
2.2.1.1.12. pages viewed and the flow through those pages;<br>
2.2.1.1.13. the amount of time spent on particular pages;<br>
2.2.1.1.14. game state and the date and time of activity on our websites or games;<br>
2.2.1.1.15. your telephone number;<br>
2.2.1.1.16. your broad geolocation (from GeoIP location);<br>
2.2.1.1.17. In-game activity<br>
<br>
2.2.2. Cookies and similar technologies<br>
We use cookies and other similar technologies. We and service providers acting on our behalf, like Google Analytics, store log files and use tracking technologies such as:<br>
<br>
2.2.2.1. cookies, which are small pieces of data transferred to your mobile device or computer for record-keeping purposes;<br>
2.2.2.2. web beacons, which let us know if a certain page was visited or whether an email was opened;<br>
2.2.2.3. tracking pixels, which allow us or our advertising partners to advertise more efficiently and effectively; and<br>
2.2.2.4. local storage objects, which help us to reduce fraud, remember your in-game preferences and speed up load times.<br>
2.2.2.5. mobile identifiers<br>
2.2.3. Payment Transaction information<br>
If you purchase a license to use in-game virtual currency or virtual items in the Products, no matter you play it on our domains, on a social network or on your mobile device, our third-party payment processors will collect the billing and financial information it needs to process your charges. We do not collect or store your financial information, like credit card numbers. We may obtain payment information like transaction ID, price and amount, etc.<br>
<br>
Our payment processors include Paypal, Xsolla, Facebook, Google, Apple, Fortumo, Epay, Easypay, Alterpay.<br>
<br>
For any additional questions, please refer to their Privacy Policies.<br>
<br>
2.3. Information We Collect from Third Parties<br>
<br>
2.3.1. Information We Get From Connected Third-Party Applications<br>
If you link, connect, or login to your Account with a third-party service (e.g. Google, Facebook), or access our Service on connected third-party applications (including social networks), the third-party service may send us information such as your registration and profile information from that service. This information varies and is controlled by that service or as authorized by you via your privacy settings at that service.<br>
<br>
If you access our Products and Services from a third-party application or connect our Services to a third-party application, you should also read that third-party application's Terms of Service and Privacy Policy.<br>
If you are unclear about what information a third-party application is sharing with us, please go to the third-party application to find out more about their privacy practices.<br>
<br>
We may access or collect or store some or all of the following information shared by the provider of the connected third-party application:<br>
<br>
2.3.1.1. your first and last name;<br>
2.3.1.2. your profile picture or its URL;<br>
2.3.1.3. your user ID number (like your Facebook ID number), which may be linked to publicly-available information like your name and profile photo;<br>
2.3.1.4. the user ID number and other public data for your friends;<br>
2.3.1.5. the login email you provided to that third-party application when you registered with it;<br>
2.3.1.6. your age range;<br>
2.3.1.7. other publicly-available information on the third-party application;<br>
2.3.1.8. any other information that you or the provider of the third-party application share with us.<br>
<br>
2.3.2. Information About "Friends"<br>
You may link your Products Account with your account at a third-party social networking service. Your contacts on these third-party services are referred to as "Friends". You will be given the option to invite such "Friends" to join you in our Products. Your activities on the Products may be displayed to your Friends on that third-party site with your permission if you decide to share this information.<br>
<br>
2.3.3. Other Sources<br>
We may collect or receive information about you from other sources like third-party information providers to the extent necessary to ensure the adequate performance of our contract with you, or to ensure that we comply with applicable laws, or with your consent. We use this information along with information you provide us directly, for example, to help you and your friends connect or to serve you advertising more tailored to your interests.<br>
<br>
We do not own or control these third-party services. These third-party services have their own rules about the collection, use, and disclosure of information.<br>
<br>
3. LAWFUL BASIS FOR PROCESSING DATA<br>
We comply with all applicable laws including General Data Protection Regulation (the 鈥楪DPR', Regulation (EU) 2016/679, https://www.eugdpr.org/). Under European law, companies must have a legal basis to process data.<br>
<br>
3.1. Your consent<br>
Where you have provided consent, we process your information, including personal information, as described at the time of consent, to prepare targeted offers of our products and services, to process and analyze your personal and Products 5usage data, when you participate in promotional activities conducted by Our partners or third parties.<br>
<br>
3.2. Contract<br>
as necessary to fulfill our Terms of Service;<br>
adequate performance of the contract between you and us;<br>
<br>
3.3. Legal obligation<br>
to enable us to comply with legal obligations;<br>
<br>
3.4. Vital interests<br>
to protect your vital interests, or those of others;<br>
<br>
3.5. Legitimate interests<br>
our legitimate interest in being able to provide and improve the functionalities of the Products and Services;<br>
our legitimate interest in protecting the Products and Services;<br>
detect and prevent any fraudulent or malicious activity against our Products and Services or our users;<br>
to measure the adequate performance of our contract with you;<br>
as necessary for our (or others') legitimate interests, including our interests in providing an innovative, personalized, safe, and profitable service to our users and partners, unless those interests are overridden by your interests or fundamental rights and freedoms that require protection of personal data;<br>
<br>
4. HOW WE USE INFORMATION WE COLLECT<br>
We use, store and process information, including personal information, about you, to provide, understand, improve, and develop the Products, create and maintain a trusted and safer environment and comply with our legal obligations. It is our legitimate interest to research and optimize our Services; to undertake marketing campaigns personalized to you, that may be of your interest; to improve and measure the performance of the contract with you. It is our legitimate interest to protect us, our services and property from any harm and to comply with the law.<br>
<br>
4.1. Provide, Improve, and Develop the Products<br>
Provide access and use of the Products;<br>
Create game account and enable you to play;<br>
Allowing you to use our social features and communicate with other users;<br>
Operate and optimize the Products by researching and analyzing usage and performance;<br>
Provide technical and customer support;<br>
Communicate with you regarding the service, support and updates;<br>
<br>
4.2. Create and Maintain a Trusted and Safer Environment<br>
Detect and prevent fraud, spam, abuse, security incidents, and other harmful activity;<br>
To protect Our rights and property in connection with our Products;<br>
Comply with our legal obligations;<br>
Resolve any disputes with any of our users;<br>
Enforce our Terms of Service and other policies;<br>
<br>
4.3. Provide, Personalize, Measure, and Improve our Advertising and Marketing<br>
Send you promotional messages, offers, marketing, advertising, and other information that may be of interest to you based on your preferences;<br>
To notify players of in-game updates, new products or promotional offers;<br>
Personalize, measure, and improve our advertising;<br>
Administer referral programs, rewards, surveys, sweepstakes, contests, or other promotional activities or events sponsored or managed by Us or our third-party partners;<br>
<br>
5. HOW IS THIS INFORMATION SHARED<br>
<br>
5.1. Aggregated Data<br>
We may share aggregated information (information about our users that we combine together so that it no longer identifies or references an individual user) and other anonymized information for regulatory compliance, industry and market analysis, demographic profiling, marketing and advertising, and other business purposes.<br>
<br>
5.2. Your Consent<br>
With your consent, we may share your information with third parties or allow them to collect your information from our Services in some ways not specifically described in this Privacy Policy.<br>
<br>
5.3. Sharing between Members<br>
When you share and communicate with other users of the Products, some of your data may me shared with or visible to other users. Information about your profile and game activity, like earned in-game currency, number of wins and losses and more, may be visible on leaderboards and to your in-game friends. In addition leaderboards may be posted on our websites. Any posts to messageboards will be visible to other users.<br>
<br>
5.4. Profiles and other Public Information<br>
The Products lets you publish information, including personal information, that is visible to the general public. Parts of your profile page, such as your nickname, your profile picture, game points and account level are publicly visible to others.<br>
<br>
5.5. Third-Party Service Providers<br>
We use a variety of third-party service providers to help us provide services related to our Products.<br>
<br>
We may share information with such third-party service providers like payment processors, data analytics, statistics and research, email, hosting, customer service, consulting, marketing and audit, ad networks.<br>
<br>
These providers have limited access to your information to perform tasks on our behalf, and are contractually bound to protect and to use it only for the purposes for which it was disclosed and consistent with this Privacy Policy.<br>
<br>
5.6. Advertising and Analytics<br>
We have advertising on our Products so we can to offer some of our Products or product functionalities for free. We do not actively share personal information with third-party advertisers for their direct marketing purposes unless you give us your consent.<br>
<br>
Third-party advertisers may collect or we may share information like performance data, aggregated data, technical information.<br>
This information is used to measure performance of the ad campaigns and to provide targeted advertising, whether you have provided consent for this.<br>
<br>
Also we have analytics integrated in our Products which is used to monitor and measure player activity for the purposes of maintenance and improving our services.<br>
<br>
Third-party advertisers may use of tracking technologies like browser cookies and web beacons and others.<br>
<br>
5.7. Safety, Security and Compliance with Law<br>
We access, preserve and share your information with regulators, law enforcement or others:<br>
<br>
In response to a legal request and if required by law;<br>
To detect, prevent and address crime, fraud, unauthorized use of the Products, violations of our terms or policies, or other harmful or illegal activity; to protect our rights and property;<br>
To protect you or others, to prevent death or imminent bodily harm;<br>
<br>
5.8. New owner<br>
If the ownership or control of all or part of our Products or their assets changes, we may transfer your information to the new owner.<br>
<br>
6. HOW CAN YOU EXERCISE YOUR RIGHTS PROVIDED UNDER THE GDPR?<br>
<br>
6.1. Exercise your rights<br>
You may exercise any rights you have to correct, amend or deleted information about you. If you want to exercise any of the rights described in this section, review, delete, or change the information We have about you or have additional questions, email us at service@NovelFav.com. We will respond to your request within thirty (30) days.<br>
Please note that we may ask you to verify your identity before taking further action on your request.<br>
<br>
Please note that once you make any changes on your Account settings, it may take an additional period of time (because or technical and procedural limitations) for the changes to become effective. Those changes will be processed promptly, and in no event longer than thirty days.<br>
<br>
6.2. List of rights under GDPR<br>
<br>
6.2.1. The right to be informed<br>
You have the right to be informed about the collection and use of your personal data.<br>
<br>
If you want to see your personal information we have stored, email us at service@NovelFav.com with subject "Data Export".<br>
<br>
6.2.2. The right of access<br>
You have the right to access your personal data.<br>
<br>
You may access and update some of your information through your Account settings. If you have chosen to connect your Account to a third-party social network, like Facebook or Google, you can change your settings and remove permission for the app by changing your Account settings.<br>
<br>
6.2.3. The right to rectification<br>
You have the right to have inaccurate personal data rectified, or completed.<br>
<br>
If you can not change such personal information on your Account page, email us at service@NovelFav.com with subject "Update My Data". You are responsible for keeping your personal information up-to-date.<br>
<br>
6.2.4. The right to erasure<br>
You have the right to have personal data erased. The right to erasure is also known as 鈥榯he right to be forgotten'. The right is not absolute and only applies in certain circumstances.<br>
<br>
If you want your account to be closed and your personal data deleted, email us at service@NovelFav.com with the subject "Account erasure". Please include your account details like: username, email address and/or your social network ID for the social network from which you access our Services. We will respond to your request within thirty days.<br>
<br>
The user must contact us at service@NovelFav.com by sending us an official request to delete an account from the email address he/she used to register in the Jieyou Games platform, confirming in the same email the name of the account he/she wishes to be deleted.<br>
<br>
If the user has not linked their in-game account to their email, but has used another registration method, they must add an email address as an additional method to log in to their account so that we can use this email address as an official channel to communicate with them on issues related to his personal data and requests to delete his account.<br>
After adding an email to his account, he may request deletion, export of data or other actions related to his personal data by writing to us at service@NovelFav.com from the email address added to his account and confirming the username of the in-game account, which he wishes to be deleted.<br>
<br>
Upon receipt of a request to delete an account at another email address, the user is notified that a formal request to delete the account can only be accepted at service@NovelFav.com in order to be transferred to the department authorized to deal with personal data and its deletion. If the user does not send an email to service@NovelFav.com with the necessary details to confirm his account, his request is not considered received and will not be processed.<br>
<br>
The term for processing a request for deleting an account is the legally established term of 30 calendar days from the date of sending the confirmation by us. Before deleting the account, a member of the department authorized to work with personal data checks all the information provided by the user, as well as his last activity in the platform Jieyou Games.<br>
In case of recent activity data - games played, successful or unsuccessful attempts to purchase in the platform store or other type of activity that certifies the use of the account after sending the request, a member of our team may request additional confirmation of account deletion, as the user may have changed his mind and did not want to delete it.<br>
<br>
The reasons that could lead to an extension of the period for deleting the account are:<br>
<br>
Recent activity related to changes in the player's profile - uploaded photos, changed status, change of username;<br>
Games played after receipt of the request;<br>
Attempts to make purchases or successful purchases in the platform store;<br>
Lack of feedback, or delayed response, when an additional request is made to clarify the identity of the user or the terms of the request for exercise of rights.<br>
<br>
6.2.5. The right to restrict processing<br>
You have the right to request the restriction or suppression of use of personal data.<br>
This is not an absolute right and only applies in certain circumstances. When processing is restricted, we are permitted and may store the personal data, but not use it.<br>
<br>
If you want to stop receiving promotional emails from us and our partners or third-party, click on the "unsubscribe" link in the email. If you want to withdraw your consent about receiving any personalized offers, you may do so by changing your Account settings. If you do not want to receive notifications, you can turn them off by visiting your mobile device's "settings" page.<br>
<br>
6.2.6. The right to data portability<br>
You have the right to obtain and reuse your personal data for your own purposes across different services. The right only applies to information that you have provided to us.<br>
<br>
You may request copies of your personal information that you have provided to us in a structured, commonly used, and machine-readable format.<br>
<br>
6.2.7. The right to object<br>
Individuals have the right to object to:<br>
<br>
processing based on legitimate interests or the performance of a task in the public interest/exercise of official authority (including profiling);<br>
direct marketing (including profiling);<br>
processing for purposes of scientific/historical research and statistics.<br>
<br>
6.2.8. Rights in relation to automated decision making and profiling.<br>
If you do not want to be subject of profiling, you may opt-out in your Account settings.<br>
<br>
6.3. Third-Party Targeted Advertising<br>
If you chose opt-out from seeing "interest based" targeted web advertising, delivered by third parties, you may visit listed third-party websites. These websites are operated by third parties. We do not control or operate them.<br>
<br>
Network Advertising Initiative Consumer Opt-Out Page<br>
Digital Advertising Alliance Opt-Out Page<br>
Your Online Choices<br>
If you chose opt-out from seeing "interest based" targeted in-application advertisements, delivered by third parties, you may adjusting the ad tracking settings on your mobile device. Most modern mobile devices (iOS 6, Android 2.3, and Windows 10 and above) provide advertising identifiers. These identifiers have different names depending on the brand of mobile device. For example, they are called Google Advertising ID (GAID) on Android devices and on iOS, they are called Identifier for Advertisers (IDFA). These operating systems let you see your advertising identifier in the settings of your mobile device, and your control how it is used.<br>
<br>
Please note that you may still receive advertisements from third parties within our Products even if you opt-out of targeted advertising but they will not be based on your activity across unrelated web sites or apps.<br>
<br>
6.4. Cookie Tracking<br>
You can set your web browser to warn you about attempts to place cookies on your computer or limit the type of cookies you allow.<br>
<br>
In addition, your browser or device may offer settings that allow you to choose whether browser cookies are set and to delete them. For more information about these controls, visit your browser or devices' help material. Certain parts of the Products may not work properly if you have disabled browser cookie use.<br>
<br>
If you disable cookies, you may lose some of the features and functionality of our Services because the cookies are necessary to track and enhance your game activities.<br>
<br>
7. THIRD-PARTY SERVICES AND ADVERTISERS<br>
Our Products may contain advertisements from Third-Party Services, which are companies other than us,that may link to their own websites, online services or mobile applications. We are not responsible for the privacy practices or the content of these Third-Party Services. If you have any questions about how these Third-Party Services use your information, you should review their policies and contact them directly.<br>
<br>
8. HOW LONG WE KEEP YOUR INFORMATION<br>
How long we retain your information depends on why we collected it and how we use it. We store data as long as it is necessary to provide our services to you (performance of the contract), or until your account is deleted - whichever comes first.<br>
<br>
In some specific cases it is possible to retain some information for a certain period after you have closed your account:<br>
<br>
As necessary for our legitimate business interests, such as fraud detection and prevention, and security (multi-accounting, spam);<br>
As necessary to comply with our legal obligations like tax, legal reporting, auditing;<br>
Information you have shared with others (messages in message boards) may continue to be publicly visible on the Products, even after your Account is cancelled. However, attribution of such information to you will be removed. Additionally, some copies of your information (e.g., log records) may remain in our database, but are disassociated from personal identifiers;<br>
As we undertake continuous measures to prevent any accidental or malicious data loss on the Products residual copies of your personal information may not be removed from our backup systems for a limited period of time;<br>
<br>
9. SECURITY OF YOUR INFORMATION<br>
We are continuously implementing and updating administrative (including appointment of Data Protection Officer), technical, and physical security measures to help protect your information against unauthorized access, loss, destruction, or alteration.<br>
<br>
Some of the safeguards we use to protect your information are firewalls, data encryption, SSL encrypted communication between client and server, Secure certificate keys, and information access level controls.<br>
<br>
Please keep secure your login credentials, including either your login email and password or the social media account you are using to login. If you know or have reason to believe that your Account credentials have been lost, stolen, misappropriated, or otherwise compromised or in case of any actual or suspected unauthorized use of your Account, please contact us immediately at service@NovelFav.com with subject "Account Security".<br>
<br>
When you sign into your Account or enter payment information in payment processors' page, we or our third-party payment processor use encryption to transmit that information.<br>
<br>
While we take precautions against possible security breaches of our Products and our customer databases and records, no website or Internet transmission is completely secure. We cannot guarantee that unauthorized access, hacking, data loss, or other breaches will never occur, and we cannot guarantee the security of your information while it is being transmitted to our Products.<br>
<br>
10. DATA TRANSFER OUTSIDE EEA<br>
Because of the global nature of our products and to provide better service we may transfer, store, and process information about players and visitors to our Products, including personal information, on servers and equipment, and with service providers based in and outside EEA (European Economic Area), like United States or Canada, for the purposes described and in accordance with this policy.<br>
<br>
These data transfers are necessary to provide the services set forth our Terms and to globally operate and provide our Products to you.<br>
<br>
The data we hold may also be processed by employees operating outside of the EEA who work for us or our partners and service providers. This staff may be engaged in, among other things, (i) the processing of transactions and your payment details and (ii) the provision of support services.<br>
<br>
When we transfer your personal information internationally we will take reasonable steps to ensure that your personal information is treated securely, lawfully and in the manner we describe here. Please note that laws vary from jurisdiction to jurisdiction, and so the privacy laws applicable to the places where your information is transferred to or stored, used or processed in, may be different from the privacy laws applicable to the place where you are resident.<br>
<br>
Where we transfer store, and process your personal information outside of the EEA we have ensured that appropriate safeguards are in place to ensure an adequate level of data protection.<br>
<br>
11. CHANGES TO THIS PRIVACY POLICY<br>
To comply with the latest legislations and to apply the best possible protection, We reserve the right to modify this Privacy Policy at any time in accordance with this provision.<br>
<br>
If we make changes to this Privacy Policy, we will post the revised Privacy Policy on the Products and on this page, and update the "effective date" at the top of this Privacy Policy.<br>
<br>
We will announce the changes by placing a notice on Products and within the games, or by sending a message to the email address we have on file for you. We may also publish additional notices on social network pages, and on other our websites.<br>
<br>
If you disagree with the revised Privacy Policy, you may cancel your Account. If you do not cancel your Account before the date the revised Privacy Policy becomes effective, We will treat your continued use or access to the Products, websites or any other Services as acceptance of the revised Privacy Policy from their effective date as shown above.<br>
<br>
12. CONTACT US<br>
If you have any questions or complaints about this Privacy Policy or Our information handling practices, you may email us or contact us at:<br>
service@NovelFav.com<br>
<br>
NovelFav<br>

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
              Policies for Handling Personal Information
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
