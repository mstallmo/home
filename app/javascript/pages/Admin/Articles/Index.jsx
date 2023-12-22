import { Fragment } from "react";
import { Link } from "@inertiajs/react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  ChevronUpDownIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";

import AdminLayout from "@/components/admin/Layout";
import PageHeader from "@/components/admin/PageHeader";
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
    <main>
      <PageHeader
        title="Articles"
        actionButtonText="Write!"
        actionButtonIcon={PencilSquareIcon}
        actionLink="/admin/articles/new"
      />
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
  );
};

Index.layout = AdminLayout;

export default Index;
