import ClientCreateUpdateForm from "../../components/client_components/ClientCreateUpdateForm";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ROLES from "../../helper/allowedRoles";
import { useEffect } from "react";

function ClientRegister() {
  const { loggedInUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser?.role === ROLES.Client)
      return navigate(`/users/profile/${loggedInUser._id}`);
    if (loggedInUser?.role === ROLES.Admin) return navigate(`/admin`);

    if (loggedInUser) return navigate("/");
  }, []);

  return (
    <div>
      <ClientCreateUpdateForm />
    </div>
  );
}

export default ClientRegister;
