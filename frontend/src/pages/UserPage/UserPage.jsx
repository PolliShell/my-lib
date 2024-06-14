import s from "./UserPage.module.css";
import { useState, useEffect } from "react";
import { StrictNavbar } from "../../components/StrictNavbar/StrictNavbar";
import { UserInfoTab } from "./tabs/UserInfoTab";
import { BoughtBooksTab } from "./tabs/BoughtBooksTab/BoughtBooksTab";
import { useAuth } from "../../providers/AuthProvider";

export const UserPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("tab1");

  const renderTab = () => {
    switch (activeTab) {
      case "tab1":
        return <UserInfoTab user={user} />;
      case "tab2":
        return <BoughtBooksTab />;
      default:
        return;
    }
  };

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
