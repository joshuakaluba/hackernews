import { useRouter } from "next/router";
import Link from "next/link";

const NavigationLinks = () => {
  const router = useRouter();
  const isStarredRoute = router.pathname.includes("star");
  const isTopRoute = router.pathname.includes("top");

  return (
    <div className="flex items-center">
      <Link href="/" passHref>
        <strong className={isTopRoute ? "hacker-orange" : undefined}>
          latest
        </strong>
      </Link>
      {" | "}
      <Link href="/star" passHref>
        <strong className={isStarredRoute ? "hacker-orange" : undefined}>
          starred
        </strong>
      </Link>
    </div>
  );
};

export default NavigationLinks;
