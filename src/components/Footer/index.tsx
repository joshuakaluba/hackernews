import NavigationLinks from "../Common/NavigationLinks";

const Footer = () => {
  return (
    <div
      className="mt-auto flex justify-center items-center  border-t mt-5 mb-2 pt-5 text-center text-sm text-secondary"
      style={{ borderColor: "#ff6600", borderTopWidth: "3px" }}
    >
      <div>
        <p className="text-xs text-primary text-center mb-3">Hacker News</p>
        <NavigationLinks />
      </div>
    </div>
  );
};

export default Footer;
