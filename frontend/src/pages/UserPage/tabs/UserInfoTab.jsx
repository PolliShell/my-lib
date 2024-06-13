import s from "../UserPage.module.css";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useHelperFuncs } from "../../../providers/HelperProvider";

export const UserInfoTab = ({ user }) => {
  const { navigateTo } = useHelperFuncs();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "", // Если у вас есть поле phone в user
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        phone: user.phone || "", // Если есть phone
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();
    const filteredFormData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== "") {
        acc[key] = formData[key];
      }
      return acc;
    }, {});
    try {
      await axiosInstance.put(
          `/user/profile/${user.objectId}`,
          filteredFormData
      );
      navigateTo("/");
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
                  value={formData.username}
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
              />
            </div>
            <div>
              <label htmlFor="phone">Phone: </label>
              <input
                  type="phone"
                  name="phone"
                  placeholder="Your phone"
                  value={formData.phone}
                  onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit">Change</button>
        </form>
      </>
  );
};
