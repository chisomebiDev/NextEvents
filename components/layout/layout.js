import MainHeader from "./main-header";

function Layout(props) {
  return (
    <>
      <MainHeader />
      <main style={{ minHeight: "85vh" }}>{props.children}</main>
    </>
  );
}

export default Layout;
