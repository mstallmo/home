import { useForm } from "@inertiajs/react";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";

import AdminLayout from "@/components/admin/Layout";
import PageHeader from "@/components/admin/PageHeader";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Edit = ({ image }) => {
  const { data, setData, put } = useForm({
    homepage: image.homepage,
  });

  function handleToggleChange(enabled) {
    setData("homepage", enabled);
  }

  function submit(e) {
    e.preventDefault();

    put(`/admin/images/${image.id}`);
  }

  return (
    <main>
      <PageHeader
        title={image.name}
        actionButtonText="Upload"
        actionButtonIcon={ArrowUpCircleIcon}
        actionLink="/admin/images/new"
      />
      <div className="mt-5 pl-16 pr-16">
        <img
          className="aspect-[16/9] w-full rounded-2xl object-cover"
          src={image.url}
          alt=""
        />
        <form className="mb-10 mt-5" onSubmit={submit}>
          <Switch.Group as="div" className="flex items-center space-x-5 ">
            <span className="flex flex-col">
              <Switch.Label
                as="span"
                className="text-sm font-medium leading-6 text-white"
                passive
              >
                Include on homepage
              </Switch.Label>
            </span>
            <Switch
              checked={data.homepage}
              onChange={handleToggleChange}
              className={classNames(
                data.homepage ? "bg-teal-600" : "bg-gray-200",
                "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  data.homepage ? "translate-x-5" : "translate-x-0",
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                )}
              />
            </Switch>
          </Switch.Group>
          <div className="mb-5 mt-5 border-b border-gray-400/50"></div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

Edit.layout = AdminLayout;

export default Edit;
