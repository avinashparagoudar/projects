// Signup Logic
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      document.getElementById("signupError").textContent = "Passwords do not match!";
      return;
    }

    localStorage.setItem("user", JSON.stringify({ username, email, password }));
    window.location.href = "index.html";
  });
}

// Login Logic
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      const now = new Date();
      const formattedTime = now.toLocaleDateString('en-GB') + ", " + now.toLocaleTimeString('en-GB');
      user.lastLogin = formattedTime;
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "dashboard.html";
    } else {
      document.getElementById("loginError").textContent = "Invalid email or password!";
    }
  });
}
