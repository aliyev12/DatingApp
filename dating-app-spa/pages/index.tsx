import Link from "next/link";
import Layout from "../components/global/Layout";
import Values from "../components/Value";
import Home from "../components/Home";
import Users from "../components/users/Users";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <Home />
    {/* <Users /> */}
  </Layout>
);

export default IndexPage;
