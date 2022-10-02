import Link from 'next/link';

export const Nav = () => {
  return (
    <nav className="mt-auto flex items-center justify-around border-t border-purple-900">
      <Link href="/">
        <a
          title="Home"
          className="flex w-full justify-center border-r border-purple-900 p-4 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-purple-900"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </a>
      </Link>

      <Link href="/convert">
        <a
          title="Settings"
          className="flex w-full justify-center border-r border-purple-900 p-4 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-purple-900"
            width={24}
            height={24}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
        </a>
      </Link>

      <Link
        href="/max"
        title="Max"
        className="flex w-full justify-center border-r border-purple-900 p-4 text-center"
      >
        <a
          title="Max"
          className="flex w-full justify-center border-r border-purple-900 p-4 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            className="stroke-purple-900"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
            />
          </svg>
        </a>
      </Link>

      <Link href="/settings">
        <a
          title="Settings"
          className="flex w-full justify-center border-purple-900 p-4 text-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="none"
            className="stroke-purple-900"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </a>
      </Link>
    </nav>
  );
};
