import { Link } from "@inertiajs/react";
import { ArrowUpCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { DateTime } from "luxon";

import AdminLayout from "@/components/admin/Layout";
import PageHeader from "@/components/admin/PageHeader";

function ImageGallery({ images }) {
  return (
    <div className="py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ul
          role="list"
          className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {images.map((image) => (
            <li key={image.thumbnail_url}>
              <Link href={`/admin/images/${image.id}/edit`}>
                <img
                  className="aspect-[3/2] w-full rounded-2xl object-cover"
                  src={image.thumbnail_url}
                  alt=""
                />
              </Link>
              <h3 className="text-md mt-6 font-semibold leading-8 tracking-tight text-white">
                {image.name}
              </h3>
              <p className="text-base leading-7 text-gray-600">
                {DateTime.fromISO(image.created_at).toLocaleString(
                  DateTime.DATETIME_FULL
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-white">No photos</h3>
      <p className="mt-1 text-sm text-gray-500">Upload some photos!</p>
      <div className="mt-6">
        <Link
          href="/admin/images/new"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          Upload Photos
        </Link>
      </div>
    </div>
  );
}

const Index = ({ images }) => {
  return (
    <main>
      <PageHeader
        title="Images"
        actionButtonText="Upload"
        actionButtonIcon={ArrowUpCircleIcon}
        actionLink="/admin/images/new"
      />
      <div className="mt-16">
        {images.length > 0 ? <ImageGallery images={images} /> : <EmptyState />}
      </div>
    </main>
  );
};

Index.layout = AdminLayout;

export default Index;
