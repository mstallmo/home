import { Fragment } from "react";
import { router } from "@inertiajs/react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import { classNames } from "../../utils/display";

export default function UserProfileMenu({ user }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    router.delete("/users/sign_out");
  };

  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button className="flex items-center gap-x-4 px-3 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 lg:w-72">
        <UserCircleIcon className="h-8 w-8" />
        <span className="sr-only">Your profile</span>
        <span aria-hidden="true" className="truncate">
          {user.email}
        </span>
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
        <Menu.Items className="absolute bottom-14 left-3 z-10 mt-2 w-60 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <form onSubmit={handleSubmit}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
