import s from "./UserPage.module.css";
import { useState, useEffect } from "react";
import { StrictNavbar } from "../../components/StrictNavbar/StrictNavbar";
import { UserInfoTab } from "./tabs/UserInfoTab";
import { BoughtBooksTab } from "./tabs/BoughtBooksTab/BoughtBooksTab";
import {axiosInstance} from "../../axios/axiosInstance";


export const UserPage = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const [user, setUser] = useState(null); // Состояние для хранения данных пользователя

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("userToken", token);
      axiosInstance.get("/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
          .then((response) => {
            console.log("Response data:", response.data); // Логирование полного ответа
            setUser(response.data.user);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });

      window.history.replaceState({}, document.title, "/");
    } else {
      const storedToken = localStorage.getItem("userToken");
      if (storedToken) {
        axiosInstance.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        })
            .then((response) => {
              console.log("Response data:", response.data); // Логирование полного ответа
              setUser(response.data.user);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
            });
      }
    }
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "tab1":
        return <UserInfoTab user={user} />; // Передаем данные пользователя в UserInfoTab
      case "tab2":
        return <BoughtBooksTab />;
      default:
        return;
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Можно добавить более красивый прелоадер
  }

  return (
      <>
        <StrictNavbar title="Профіль користувача" />
        <div className="container">
          <div className={s.user}>
            <div className={s.user_tabs}>
              <div
                  className={`${s.user_tab} ${
                      activeTab === "tab1" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("tab1")}
              >
                Настройки профілю
              </div>
              <div
                  className={`${s.user_tab} ${
                      activeTab === "tab2" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("tab2")}
              >
                Куплені товари
              </div>
            </div>
            <div className={s.user_inner}>{renderTab()}</div>
          </div>
        </div>
      </>
  );
};