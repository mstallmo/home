import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import axios from "axios";
import Layout from "../components/Layout";

const pages = import.meta.glob("../pages/**/*.jsx");

document.addEventListener("DOMContentLoaded", () => {
  const csrfToken = document.querySelector("meta[name=csrf-token]").content;
  axios.defaults.headers.common["X-CSRF-Token"] = csrfToken;

  createInertiaApp({
    resolve: async (name) => {
      const page = (await pages[`../pages/${name}.jsx`]()).default;
      page.layout = page.layout || Layout;

      return page;
    },
    setup({ el, App, props }) {
      const root = createRoot(el);
      root.render(<App {...props} />);
    },
  });
});
