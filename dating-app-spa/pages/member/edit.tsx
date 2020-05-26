import React from "react";
import Layout from "../../components/global/Layout";
import { EditUser } from "../../components/users/edit/EditUser";
import { AuthContext } from "../../contexts";

interface Props {}

const EditMemberPage: React.FunctionComponent<Props> = (props: Props) => {
  const { isLoggedIn, user, userDetails } = React.useContext(AuthContext);

  if (!user || (user && !user.nameid)) return null;
  if (!userDetails) return null;
  return (
    <Layout title="Edit Member">
      <EditUser id={user.nameid} user={userDetails} />
    </Layout>
  );
};

export default EditMemberPage;
