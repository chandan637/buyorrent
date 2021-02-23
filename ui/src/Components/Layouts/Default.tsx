import * as React from "react";
import Footer from "../Footer/footer";
import Header from "../Header/header";

interface Props {
  children: React.ReactNode;
}
const DefaultLayout: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default DefaultLayout;
