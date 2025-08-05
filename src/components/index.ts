import dynamic from "next/dynamic";

//icons
const ArrowIcon = dynamic(() => import("./@icons/ArrowIcon"));
const TwitterIcon = dynamic(() => import("./@icons/TwitterIcon"));
const DiscordIcon = dynamic(() => import("./@icons/DiscordIcon"));
const ExpIcon = dynamic(() => import("./@icons/ExpIcon"));
const ExchangeIcon = dynamic(() => import("./@icons/ExchangeIcon"));
const MenuIcon = dynamic(() => import("./@icons/MenuIcon"));
const CloseIcon = dynamic(() => import("./@icons/CloseIcon"));
const DownloadIcon = dynamic(() => import("./@icons/DownloadIcon"));
//atoms  
const Logo = dynamic(() => import("./atoms/Logo"));
const NumberInput = dynamic(() => import("./atoms/NumberInput"));
const TextInput = dynamic(() => import("./atoms/TextInput"));
//molecules
const PageHead = dynamic(() => import("./molecules/PageHead")); 
const SplashScreen = dynamic(() => import("./molecules/SplashScreen")); 
const TokenListItem = dynamic(() => import("./molecules/TokenListItem"));
const TokenActions = dynamic(() => import("./molecules/TokenActions"));
const Modal = dynamic(() => import("./molecules/Modal"));
const TokenPrice = dynamic(() => import("./molecules/TokenPrice"));
//organisms
const Header = dynamic(() => import("./organisms/Header"));
const Footer = dynamic(() => import("./organisms/Footer")); 
const TokenList = dynamic(() => import("./organisms/TokenList"));
const SendTokenModal = dynamic(() => import("./organisms/SendTokenModal"));
//templates
const PageLayout = dynamic(() => import("./templates/PageLayout"));
const HomeView = dynamic(() => import("./templates/HomeView")); 

export {
  PageHead,
  Logo,
  Header,
  Footer,
  PageLayout,
  ArrowIcon, 
  TwitterIcon,
  DiscordIcon, 
  ExpIcon,
  MenuIcon, 
  ExchangeIcon,
  CloseIcon, 
  DownloadIcon, 
  SplashScreen,
  HomeView, 
  TokenList,
  TokenListItem,
  TokenActions,
  SendTokenModal,
  Modal,
  NumberInput,
  TextInput,
  TokenPrice
}