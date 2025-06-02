function Footer() {
  return (
    <footer
      className="text-center py-4 border-t dark:border-gray-700 fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900"
      style={{ zIndex: 1000 }}
    >
      © {new Date().getFullYear()} DBMatch. All rights reserved.
    </footer>
  );
}

export default Footer;
