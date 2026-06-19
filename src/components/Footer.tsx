export function Footer() {
  return (
    <footer className="border-t border-gray-200/70 bg-white/60 py-12 backdrop-blur-sm dark:border-gray-800/70 dark:bg-gray-950/60">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} 向坪 涼. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
