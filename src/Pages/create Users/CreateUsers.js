import React from "react";
import Form from "../../components/Forms/Form";

export const CreateUsers = () => {
  return (
    <div>
      <Form
        endPoint="user/create"
        navigate="dashboard/users"
        names="Create User"
        button="Create"
        styleInput={true}
      />
    </div>
  );
};

export default CreateUsers;
