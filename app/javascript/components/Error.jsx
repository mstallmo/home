import { XCircleIcon } from "@heroicons/react/20/solid";
import { capitalizeFirst } from "../lib/formatText";

export function Error({ errors }) {
  const formattedErrors = Object.keys(errors).flatMap((key) =>
    errors[key].map((error) => capitalizeFirst(error))
  );

  const heading =
    formattedErrors.lengh > 1
      ? `There were ${formattedErrors.length} errors with your submission`
      : `There is an error with your submission`;

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{heading}</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5">
              {formattedErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
