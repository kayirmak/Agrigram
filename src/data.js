import Facebook from "./assets/imgs/autorization/facebook.svg";
import Google from "./assets/imgs/autorization/google.svg";
import Avatar from "./assets/imgs/profile/av-icon.svg";
import Wallet from "./assets/imgs/profile/wallet.svg";
import History from "./assets/imgs/profile/history-icon.svg";
import Settings from "./assets/imgs/profile/setting-icon.svg";
import Politics from "./assets/imgs/profile/politic-icon.svg";
import Doc from "./assets/imgs/profile/doc-icon.svg";
import NotificationIcon from "./assets/imgs/profile/notifications-icon.svg";
import LanguageIcon from "./assets/imgs/profile/spoken-language-icon.svg";
import ClarityIcon from "./assets/imgs/profile/clarity-icon.svg";
import TrashIcon from "./assets/imgs/profile/trash-icon.svg";
import Phone from "./assets/imgs/contacts-icons/phone.svg";
import Whatsapp from "./assets/imgs/contacts-icons/whatsapp.svg";
import Telegram from "./assets/imgs/contacts-icons/telegram.svg";
import Mail from "./assets/imgs/contacts-icons/mail.svg";
import Arrow from "./assets/imgs/footer-icons/arrow-icon.svg";
import FacebookIcon from "./assets/imgs/footer-icons/facebook.svg";
import InstagramIcon from "./assets/imgs/footer-icons/instagram.svg";
import YuotubeIcon from "./assets/imgs/footer-icons/youtube.svg";
import TelegramIcon from "./assets/imgs/footer-icons/telegram.svg";
import WhatsappIcon from "./assets/imgs/footer-icons/whatsapp.svg";

export const navMenu = [
  {
    title: "stores",
    path: "stores",
  },
  {
    title: "categories",
    path: "category",
  },
  {
    title: "contacts",
    path: "contacts",
  },
  {
    title: "aboutus",
    path: "about-us",
  },
];

export const footerContacts = [
  {
    icon: FacebookIcon,
    path: "/",
  },
  {
    icon: InstagramIcon,
    path: "/",
  },
  {
    icon: YuotubeIcon,
    path: "/",
  },
  {
    icon: TelegramIcon,
    path: "/",
  },
  {
    icon: WhatsappIcon,
    path: "/",
  },
];

export const contacts = [
  {
    icon: Phone,
    title: "+996 554 789 456",
  },
  {
    icon: Whatsapp,
    title: "+996 554 789 456",
  },
  {
    icon: Telegram,
    title: "+996 553 707 437",
  },
  {
    icon: Mail,
    title: "bonton@gmail.com",
  },
];

export const socialMedia = [Facebook, Google];

export const profiles = [
  {
    id: 0,
    type: "link",
    img: Avatar,
    title: "my-data",
    path: "my-data",
  },
  {
    id: 1,
    type: "link",
    img: Wallet,
    title: "my-bonus",
    path: "my-bonus",
    children: [
      {
        img: NotificationIcon,
        title: "бонус",
        path: "notifications",
      },
    ],
  },
  {
    id: 2,
    type: "link",
    img: History,
    title: "my-history",
    path: "my-history",
  },
  {
    id: 3,
    type: "button",
    img: Settings,
    title: "settings",
    path: "settings",
    children: [
      {
        img: NotificationIcon,
        title: "notifications",
        path: "notifications",
      },
      {
        img: LanguageIcon,
        title: "languages",
        path: "spoken-language",
      },
      {
        img: ClarityIcon,
        title: "faq",
        path: "clarity",
      },
      {
        img: TrashIcon,
        title: "delAccount",
        path: "delete-account",
      },
    ],
  },
  {
    id: 4,
    type: "link",
    img: Doc,
    title: "user-agreement",
    path: "user-agreement",
  },
  {
    id: 5,
    type: "link",
    img: Politics,
    title: "privacy-policy",
    path: "privacy-policy",
  },
];

export const questions = [
  {
    title: "one",
    subtitle: "one",
  },
  {
    title: "two",
    subtitle: "two",
  },
  {
    title: "three",
    subtitle: "three",
  },
  {
    title: "four",
    subtitle: "four",
  },
];

export const footerNavLinks = [
  {
    title: "one",
    img: Arrow,
    elements: [
      { name: "stores", path: "/stores" },
      { name: "categories", path: "/category" },
      { name: "contacts", path: "/contacts" },
    ],
  },
  {
    title: "two",
    img: Arrow,
    elements: [
      { name: "texSupport", path: "technical-support" },
      { name: "userAgreement", path: "user-agreement-page" },
      { name: "privacyPolicy", path: "privacy-policy-page" },
    ],
  },
];
