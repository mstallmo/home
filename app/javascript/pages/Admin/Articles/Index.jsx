import { Fragment } from "react";
import { Link } from "@inertiajs/react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

import AdminLayout from "@/components/admin/Layout";
import { formatDate } from "@/lib/formatDate";
import { capitalizeFirst } from "@/lib/formatText";

const statuses = {
  draft: "text-gray-500 bg-gray-100/10",
  published: "text-green-400 bg-green-400/10",
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Index = ({ articles }) => {
  return (
    <>
      <main>
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <h1 className="text-base font-semibold leading-7 text-white">
            Articles
          </h1>

          {/* Sort dropdown */}
          <div className="flex items-center">
            <Menu as="div" className="relative mr-8">
              <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white">
                Sort by
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-40 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/admin/articles?sort=title"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        Title
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/admin/articles?sort=updated_at"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        Date updated
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/admin/articles?sort=publish_status"
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-3 py-1 text-sm leading-6 text-gray-900"
                        )}
                      >
                        Publish Status
                      </Link>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
            <Link
              href="/admin/articles/new"
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Write!
              <PencilSquareIcon className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </header>

        <ul role="list" className="divide-y divide-white/5">
          {articles.map((article) => (
            <li
              key={article.id}
              className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8"
            >
              <div className="min-w-0 flex-auto">
                <div className="flex items-center gap-x-3">
                  <div
                    className={classNames(
                      statuses[article.publish_status],
                      "flex-none rounded-full p-1"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                  </div>
                  <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                    <a
                      href={`/admin/articles/${article.id}/edit`}
                      className="flex gap-x-2"
                    >
                      <span className="whitespace-nowrap">{article.title}</span>
                      <span className="text-gray-400">-</span>
                      <span className="text-gray-400">
                        {`updated_at: ${formatDate(
                          article.updated_at
                        )}, published_at:  ${
                          article.published_at
                            ? formatDate(article.published_at)
                            : "--"
                        } `}
                      </span>
                      <span className="absolute inset-0" />
                    </a>
                  </h2>
                </div>
                <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
                  <p className="max-w-2xl truncate">{article.description}</p>
                  <svg
                    viewBox="0 0 2 2"
                    className="h-0.5 w-0.5 flex-none fill-gray-300"
                  >
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="whitespace-nowrap">
                    {capitalizeFirst(article.publish_status)}
                  </p>
                </div>
              </div>
              <div
                className={classNames(
                  statuses[article.publish_status],
                  "flex-none rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset"
                )}
              >
                {capitalizeFirst(article.publish_status)}
              </div>
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

Index.layout = AdminLayout;

export default Index;
