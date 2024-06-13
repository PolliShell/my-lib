import React from "react";

function navigate(url) {
  window.location.href = url;
}

async function auth() {
  const response = await fetch("http://127.0.0.1:3000/auth/google", {
    method: "GET",
  });

  if (response.redirected) {
    navigate(response.url);
  } else {
    const data = await response.json();
    navigate(data.url);
  }
}

function GoogleEmail() {
  return (
    <>
      <h1>Welcome to Consulting Ninja!</h1>
      <h3>Google OAuth!</h3>
      <p>
        Visit{" "}
        <a href="https://www.youtube.com/@ConsultingNinja/featured">
          <strong>@ConsultingNinja</strong>
        </a>{" "}
        to see more great videos!
      </p>

      <button className="btn-auth" type="button" onClick={() => auth()}>
        Sign in with Google
      </button>
    </>
  );
}

export default GoogleEmail;
