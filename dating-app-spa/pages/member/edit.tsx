import React from "react";
import Layout from "../../components/global/Layout";
import { EditUser } from "../../components/users/edit/EditUser";
import { AuthContext } from "../../contexts";

interface Props {}

const EditMemberPage: React.FunctionComponent<Props> = (props: Props) => {
  const { isLoggedIn, user } = React.useContext(AuthContext);

  if (!user || (user && !user.nameid)) return null;
  return (
    <Layout title="Edit Member">
      <EditUser id={user.nameid} />
    </Layout>
  );
};

export default EditMemberPage;
