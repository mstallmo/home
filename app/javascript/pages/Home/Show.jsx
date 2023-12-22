import { Head, useForm } from "@inertiajs/react";
import clsx from "clsx";

import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Error } from "@/components/Error";
import rocketLogo from "@/images/logos/rocket.svg";
import statsLogo from "@/images/logos/stats.svg";
import { formatDate } from "@/lib/formatDate";
import { socialToIcon } from "../../lib/socialToIcon";
import { DateTime } from "luxon";

function MailIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function BriefcaseIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className="fill-zinc-100 stroke-zinc-400 dark:fill-zinc-100/10 dark:stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className="stroke-zinc-400 dark:stroke-zinc-500"
      />
    </svg>
  );
}

function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Title href={`/articles/${article.id}`}>{article.title}</Card.Title>
      <Card.Eyebrow as="time" dateTime={article.updated_at} decorate>
        {formatDate(article.updated_at)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  );
}

function SocialLink({ icon: Icon, ...props }) {
  return (
    <a className="group -m-1 p-1" {...props}>
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
    </a>
  );
}

function Newsletter() {
  const { data, setData, post, processing, errors } = useForm({ email: "" });

  function handleSubmit(e) {
    e.preventDefault();
    post("/subscribers", { preserveScroll: true });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="mt-6">
        {errors.email && <Error errors={errors} />}
        <div className="mt-4 flex">
          <input
            id="email"
            type="email"
            placeholder="Email address"
            aria-label="Email address"
            required
            className="min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
          />
          <Button
            type="submit"
            disabled={processing}
            className="ml-4 flex-none"
          >
            Join
          </Button>
        </div>
      </div>
    </form>
  );
}

function jobToLogo(job) {
  switch (job.company) {
    case "STATS":
      return statsLogo;
    case "Kaliber AI":
      return rocketLogo;
  }
}

function Resume({ jobs }) {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {jobs.map((job, roleIndex) => {
          const startYear = DateTime.fromISO(job.start).year;
          const endYear = job.end ? DateTime.fromISO(job.end).year : "Present";

          return (
            <li key={roleIndex} className="flex gap-4">
              <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <img
                  src={jobToLogo(job)}
                  alt=""
                  className="h-7 w-7"
                  unoptimized="true"
                />
              </div>
              <dl className="flex flex-auto flex-wrap gap-x-2">
                <dt className="sr-only">Company</dt>
                <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {job.company}
                </dd>
                <dt className="sr-only">Role</dt>
                <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                  {job.title}
                </dd>
                <dt className="sr-only">Date</dt>
                <dd
                  className="ml-auto text-xs text-zinc-400 dark:text-zinc-500"
                  aria-label={`${startYear} until ${endYear}`}
                >
                  <time dateTime={startYear}>{startYear}</time>{" "}
                  <span aria-hidden="true">—</span>{" "}
                  <time dateTime={endYear}>{endYear}</time>
                </dd>
              </dl>
            </li>
          );
        })}
      </ol>
      <Button href="#" variant="secondary" className="group mt-6 w-full">
        Download CV
        <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    </div>
  );
}

function Photos({ images }) {
  let rotations = [
    "rotate-2",
    "-rotate-2",
    "rotate-2",
    "rotate-2",
    "-rotate-2",
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {images.map((image, imageIndex) => (
          <div
            key={imageIndex}
            className={clsx(
              "relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl",
              rotations[imageIndex % rotations.length]
            )}
          >
            <img
              src={image}
              alt=""
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home({ images, articles, jobs, socials }) {
  return (
    <>
      <Head>
        <title>
          Mason Stallmo - Software engineer, photographer, and mountain biker.
        </title>
        <meta
          name="description"
          content="
            I’m Mason, a software engineer based in Phoenix, AZ, USA
            specializing in Rails and AI. When I'm away from my computer you can
            find me behind the lens of my Cannon 6DMarkII or behind the bars of
            my mountain bike. Most times I'd rather be in the mountains or the
            ocean rather than my desk.
          "
        />
      </Head>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software engineer, photographer, and mountain biker.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I’m Mason, a software engineer based in Phoenix, AZ, USA
            specializing in Rails and AI. When I'm away from my computer you can
            find me behind the lens of my Cannon 6DMarkII or behind the bars of
            my mountain bike. Most times I'd rather be in the mountains or the
            ocean rather than my desk.
          </p>
          <div className="mt-6 flex gap-6">
            {socials.map((social) => (
              <SocialLink
                key={social.site}
                href={social.link}
                aria-label={`Follow on ${social.site}`}
                icon={socialToIcon(social)}
              />
            ))}
          </div>
        </div>
      </Container>
      <Photos images={images} />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Resume jobs={jobs} />
          </div>
        </div>
      </Container>
    </>
  );
}
