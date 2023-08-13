import { useState, Fragment, useRef } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";

import Layout from "@/components/admin/Layout";
import { Error } from "@/components/Error";

function DeleteModal({ open, setOpen, article }) {
  const cancelButtonRef = useRef(null);

  const { delete: destroy, processing } = useForm({});

  function handleSubmit(e) {
    e.preventDefault();

    destroy(`/admin/articles/${article.id}`);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-white"
                    >
                      Delete article
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this article? All of the
                        data will be permanently removed from the servers
                        forever. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
                <form
                  className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse"
                  onSubmit={handleSubmit}
                >
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                    disabled={processing}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-800 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const Edit = ({ article }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data, setData, put, processing, errors } = useForm({
    title: article.title,
    description: article.description,
    content: article.content,
    publish_status: article.publish_status,
  });

  function handleSubmit(e) {
    e.preventDefault();

    put(`/admin/articles/${article.id}`);
  }

  return (
    <>
      <main>
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <Link
            href="/admin/articles"
            className="inline-flex items-center gap-x-1 text-white"
          >
            <ChevronLeftIcon className="h-4 w-4 shrink-0" />
            Back
          </Link>
          <h1 className="text-base font-semibold leading-7 text-white">
            Edit article
          </h1>
        </header>

        <form className="m-10 sm:rounded-lg" onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && <Error errors={errors} />}
          <div className="space-y-12">
            <div className="border-b border-white/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="flex-1 border-0 bg-transparent py-1.5 pl-1 text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Hello World"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      defaultValue={article.description}
                      value={data.description}
                      onChange={(e) => setData("description", e.target.value)}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-400">
                    Write a few sentences about the article.
                  </p>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Article Source Markdown File
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
                            onChange={(e) =>
                              setData("source_file", e.target.files)
                            }
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

                <div className="col-span-full">
                  <div className="flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="publish_status"
                        name="publish_status"
                        type="checkbox"
                        className="h-4 w-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        checked={
                          data.publish_status === "published" ? true : false
                        }
                        onChange={() => {
                          let publish_status = "";
                          if (data.publish_status === "published") {
                            publish_status = "draft";
                          } else {
                            publish_status = "published";
                          }

                          setData("publish_status", publish_status);
                        }}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-white"
                      >
                        Publish
                      </label>
                      <p className="text-gray-400">Publish the article</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              disabled={processing}
            >
              Save
            </button>
          </div>
        </form>
        <DeleteModal
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          article={article}
        />
      </main>
    </>
  );
};

Edit.layout = Layout;
export default Edit;
