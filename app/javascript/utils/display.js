export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function currentPage(path) {
  return window.location.pathname.includes(path);
}
