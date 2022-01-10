import Head from "next/head";

function NotFoundPage() {
  return (
    <>
      <Head>
        <title>💔 Page not Found</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="center">
        <h1>Page Not Found!</h1>
      </div>
    </>
  );
}

export default NotFoundPage;
