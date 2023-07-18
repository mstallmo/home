const Layout = ({ children }) => {
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <div className="h-96 rounded-lg bg-white p-3">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default (page) => <Layout>{page}</Layout>;
