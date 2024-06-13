import Link from "next/link";

const PageController = ({ page }) => {
  return (
    <div className="flex justify-center items-center mb-5">
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <Link
              href="/?page=1"
              className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-md">
              1
            </Link>
          </li>
          <li>
            <Link
              href="/?page=2"
              className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-md">
              2
            </Link>
          </li>
          <li>
            <Link
              href="/?page=3"
              aria-current="page"
              className="flex items-center justify-center px-3 h-8 leading-tight text-black bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white rounded-md">
              3
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PageController;
