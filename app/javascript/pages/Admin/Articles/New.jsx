import { Link, useForm } from "@inertiajs/react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { DocumentArrowUpIcon } from "@heroicons/react/24/solid";

import AdminLayout from "@/components/admin/Layout";
import { Error } from "@/components/Error";

const New = () => {
  const { data, setData, post, processing, errors, transform } = useForm({
    title: "",
    description: "",
    source_file: null,
  });

  function handleSubmit(e) {
    e.preventDefault();

    const fileReader = new FileReader();
    fileReader.readAsText(data.source_file[0], "UTF-8");
    fileReader.onload = () => {
      transform((data) => ({
        title: data.title,
        description: data.description,
        content: fileReader.result,
      }));

      post("/admin/articles");
    };
  }

  return (
    <>
      <main>
        <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <Link
            href="admin/articles"
            className="inline-flex items-center gap-x-1 text-white"
          >
            <ChevronLeftIcon className="h-4 w-4 shrink-0" />
            Back
          </Link>
          <h1 className="text-base font-semibold leading-7 text-white">
            New Article
          </h1>
        </header>
        <form className="m-10 sm:rounded-lg" onSubmit={handleSubmit}>
          {Object.keys(errors).length > 0 && <Error errors={errors} />}
          <div className="space-y-12">
            <div className="border-b border-white/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-white">
                Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                This information will be displayed publicly so be careful what
                you share.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
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
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              disabled={processing}
            >
              Post
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

New.layout = AdminLayout;

export default New;
