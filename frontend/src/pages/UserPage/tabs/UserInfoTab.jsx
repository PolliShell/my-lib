import { useAuth } from "../../../providers/AuthProvider";
import s from "../UserPage.module.css";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useState } from "react";

export const UserInfoTab = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    const filteredFormData = Object.entries(formData).filter(
      ([key, value]) => value !== ""
    );
    try {
      const res = await axiosInstance.put(
        `/profile/${user.objectId}`,
        filteredFormData
      );
      console.log(res);
      if (res.id) {
        console.log("success");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <form onSubmit={updateUserInfo} className={s.user_info}>
        <div className={s.user_info_inputs}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="username"
              name="username"
              placeholder="Your username"
              onChange={handleChange}
              // value={user.username}
            />
          </div>
          <div>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              onChange={handleChange}
              /*value={user.email}*/
            />
          </div>
          <div>
            <label htmlFor="phone">Phone: </label>
            <input
              type="phone"
              name="phone"
              placeholder="Your phone"
              onChange={handleChange}
              /*value={user.phone}*/
            />
          </div>
        </div>
        <button type="submit">Change</button>
      </form>
    </>
  );
};
