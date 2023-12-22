import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { DirectUpload } from "@rails/activestorage";
import {
  DocumentArrowUpIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";

import AdminLayout from "@/components/admin/Layout";

const New = () => {
  const [files, setFiles] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(files);

    files.forEach((file) => {
      const upload = new DirectUpload(
        file,
        "/rails/active_storage/direct_uploads"
      );

      upload.create((error, blob) => {
        if (error) {
          console.error(error);
        } else {
          router.post("/admin/images", {
            name: file.name,
            media: blob.signed_id,
          });
        }
      });
    });
  }

  return (
    <main>
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <Link
          href="/admin/images"
          className="inline-flex items-center gap-x-1 text-white"
        >
          <ChevronLeftIcon className="h-4 w-4 shrink-0" />
          Back
        </Link>
        <h1 className="text-base font-semibold leading-7 text-white">
          New Photos
        </h1>
      </header>
      <form className="m-10 sm:rounded-lg" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Photos
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                  <div className="text-center">
                    <DocumentArrowUpIcon
                      className="mx-auto h-12 w-12 text-gray-500"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-400">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          multiple
                          onChange={(e) => setFiles(Array.from(e.target.files))}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Post
          </button>
        </div>
      </form>
    </main>
  );
};

New.layout = AdminLayout;

export default New;
