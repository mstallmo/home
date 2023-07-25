import { Head } from "@inertiajs/react";

import { Card } from "@/components/Card";
import { SimpleLayout } from "@/components/SimpleLayout";
import { formatDate } from "@/lib/formatDate";

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.id}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.updated_at}
          className="md:hidden"
          decorate
        >
          {formatDate(article.updated_at)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.updated_at}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.updated_at)}
      </Card.Eyebrow>
    </article>
  );
}

export default function Articles({ articles }) {
  return (
    <>
      <Head>
        <title>Articles - Spencer Sharp</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="Writing on software design, company building, and the aerospace industry."
        intro="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  );
}
